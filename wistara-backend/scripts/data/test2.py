import csv
import os

# --- Configuration ---
mapping_filename = 'place_id_name_mapping.csv'
click_history_input_filename = 'click.csv'
click_history_output_filename = 'click_history_with_names.csv'
# --- End Configuration ---

# 1. Create the ID-to-Name Mapping Dictionary
id_to_name_map = {}
if not os.path.exists(mapping_filename):
    print(f"Error: Mapping file '{mapping_filename}' not found.")
    print("Please run the script to create the mapping file first.")
    exit()

try:
    with open(mapping_filename, mode='r', newline='', encoding='utf-8') as mapfile:
        reader = csv.reader(mapfile)
        header = next(reader) # Skip header
        for row in reader:
            if len(row) >= 2:
                place_id_num = row[0].strip() # Numerical ID (as string)
                place_name_str = row[1].strip() # Place Name string
                id_to_name_map[place_id_num] = place_name_str
            else:
                # print(f"Skipping invalid row in mapping file: {row}") # Optional warning
                pass
    print(f"Loaded {len(id_to_name_map)} mappings from '{mapping_filename}'.")

except Exception as e:
    print(f"Error reading mapping file '{mapping_filename}': {e}")
    exit()

# 2. Process the Click History File
if not os.path.exists(click_history_input_filename):
    print(f"Error: Click history file '{click_history_input_filename}' not found.")
    exit()

try:
    output_rows = []
    missing_ids_count = 0
    processed_rows_count = 0

    with open(click_history_input_filename, mode='r', newline='', encoding='utf-8') as infile:
        reader = csv.reader(infile)
        header = next(reader)

        # Find the index of Place_Id
        try:
            place_id_col_index = header.index('Place_Id')
        except ValueError:
            print(f"Error: 'Place_Id' column not found in '{click_history_input_filename}'.")
            print(f"Header found: {header}")
            exit()

        # Prepare the output header (renaming Place_Id to Place_Name)
        output_header = header[:] # Copy
        output_header[place_id_col_index] = 'Place_Name'
        output_rows.append(output_header)

        # Process data rows
        for row in reader:
            processed_rows_count += 1
            if len(row) > place_id_col_index:
                numeric_id = row[place_id_col_index].strip()
                # Look up the name using the numeric ID
                place_name = id_to_name_map.get(numeric_id) # Use .get() for safety

                output_row = row[:] # Copy the row

                if place_name:
                    # Replace the numeric ID with the Place Name string
                    output_row[place_id_col_index] = place_name
                else:
                    # Handle cases where the ID wasn't found in the mapping
                    # print(f"Warning: Place_Id '{numeric_id}' from click history not found in mapping file. Keeping original ID.")
                    missing_ids_count += 1
                    # Keep the original numeric ID in this case or use a placeholder like 'UNKNOWN'
                    # output_row[place_id_col_index] = 'UNKNOWN_PLACE_ID' # Optional placeholder

                output_rows.append(output_row)
            else:
                 # print(f"Skipping malformed row in click history: {row}") # Optional warning
                 pass

    # 3. Write the modified data to the new output file
    with open(click_history_output_filename, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(output_rows)

    print(f"\nProcessing complete.")
    print(f"Successfully created '{click_history_output_filename}'.")
    print(f"Processed {processed_rows_count} rows from click history.")
    if missing_ids_count > 0:
        print(f"Warning: {missing_ids_count} Place_Ids from the click history were not found in the mapping file '{mapping_filename}'. Their original IDs were kept in the output.")
    print(f"The 'Place_Id' column has been replaced with 'Place_Name'.")

except FileNotFoundError:
    print(f"Error: One of the input files was not found during processing.")
except Exception as e:
    print(f"An error occurred during click history processing: {e}")
