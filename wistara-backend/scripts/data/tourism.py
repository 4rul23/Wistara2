import csv
import re
import os

def generate_name_id(place_name):
    """Generates a URL-friendly ID from a place name."""
    if not place_name:
        return "unknown-place" # Handle empty names if they occur

    # Convert to lowercase
    name_id = place_name.lower()

    # Replace spaces and common problematic characters with hyphens
    name_id = re.sub(r'[\s/(),]+', '-', name_id)

    # Remove any characters that are not alphanumeric or hyphens
    name_id = re.sub(r'[^\w-]+', '', name_id)

    # Replace multiple consecutive hyphens with a single hyphen
    name_id = re.sub(r'-+', '-', name_id)

    # Remove leading or trailing hyphens
    name_id = name_id.strip('-')

    # Handle cases where the name might become empty after cleaning
    if not name_id:
        # Fallback using a generic name or hash if needed,
        # but for this specific task, just returning something might be okay
        # For more robustness, you might hash the original name or add original ID
        return "cleaned-place-name-empty"

    return name_id

# --- Main Script ---
input_filename = 'tourism.csv'
output_filename = 'tourism_place_named_id.csv'

# Check if the input file exists
if not os.path.exists(input_filename):
    print(f"Error: Input file '{input_filename}' not found.")
    print("Please make sure the file is in the same directory as the script or provide the correct path.")
else:
    try:
        output_rows = []
        processed_ids = set() # Optional: to check for generated ID uniqueness

        with open(input_filename, mode='r', newline='', encoding='utf-8') as infile:
            reader = csv.reader(infile)
            header = next(reader)

            # Find column indices
            try:
                place_id_index = header.index('Place_Id')
                place_name_index = header.index('Place_Name')
            except ValueError:
                print("Error: Required columns 'Place_Id' or 'Place_Name' not found in header.")
                print(f"Header found: {header}")
                exit()

            # Modify header for output
            output_header = header[:] # Make a copy
            output_header[place_id_index] = 'Place_Name_Id' # Rename the ID column
            output_rows.append(output_header)

            # Process data rows
            for row in reader:
                 # Ensure the row has enough columns before trying to access indices
                if len(row) > max(place_id_index, place_name_index):
                    original_place_name = row[place_name_index]
                    new_id = generate_name_id(original_place_name)

                    # --- Optional: Uniqueness Check ---
                    # if new_id in processed_ids:
                    #     print(f"Warning: Duplicate generated ID '{new_id}' for Place Name '{original_place_name}'. Consider adding original ID or a counter for uniqueness.")
                    # processed_ids.add(new_id)
                    # --- End Optional Check ---

                    # Create the modified row
                    output_row = row[:] # Make a copy
                    output_row[place_id_index] = new_id # Replace the ID
                    output_rows.append(output_row)
                else:
                    # print(f"Skipping malformed row: {row}") # Optional warning
                    pass


        # Write the modified data to the output file
        with open(output_filename, mode='w', newline='', encoding='utf-8') as outfile:
            writer = csv.writer(outfile)
            writer.writerows(output_rows)

        print(f"Successfully created '{output_filename}' with Place_Name as the basis for the ID.")
        print(f"The ID column has been renamed to 'Place_Name_Id'.")

    except Exception as e:
        print(f"An error occurred: {e}")
