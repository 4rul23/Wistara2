import csv
import os

# Define the input and output filenames
input_filename = 'tourism.csv'
output_filename = 'place_id_name_mapping.csv'

# Check if the input file exists
if not os.path.exists(input_filename):
    print(f"Error: Input file '{input_filename}' not found.")
    print("Please make sure the file is in the same directory as the script or provide the correct path.")
else:
    try:
        # Open the input CSV file for reading and the output CSV file for writing
        with open(input_filename, mode='r', newline='', encoding='utf-8') as infile, \
             open(output_filename, mode='w', newline='', encoding='utf-8') as outfile:

            # Create CSV reader and writer objects
            reader = csv.reader(infile)
            writer = csv.writer(outfile)

            # Read the header row from the input file
            header = next(reader)

            # Find the indices of the required columns
            try:
                place_id_index = header.index('Place_Id')
                place_name_index = header.index('Place_Name')
            except ValueError:
                print("Error: Required columns 'Place_Id' or 'Place_Name' not found in the header.")
                print(f"Header found: {header}")
                exit() # Exit if columns are missing

            # Write the header for the new CSV file
            writer.writerow(['Place_Id', 'Place_Name'])

            # Iterate over each row in the input CSV file (after the header)
            for row in reader:
                # Ensure the row has enough columns before trying to access indices
                if len(row) > max(place_id_index, place_name_index):
                    # Extract the data from the specified columns
                    place_id = row[place_id_index]
                    place_name = row[place_name_index]

                    # Write the extracted data as a new row to the output CSV file
                    writer.writerow([place_id, place_name])
                else:
                    # Optionally, you can print a warning for rows that are too short
                    # print(f"Skipping malformed row: {row}")
                    pass

        print(f"Successfully created '{output_filename}' with Place_Id and Place_Name.")

    except Exception as e:
        print(f"An error occurred during processing: {e}")
