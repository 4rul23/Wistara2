import csv
import json
import re
import os
import ast # For safely evaluating the coordinate string

# --- Configuration ---
input_filename = 'tourism_place_named_id.csv' # Use the file with name-based IDs
output_filename = 'Full-tourism.csv'
default_region = "Unknown Region" 
image_path_template = "/images/{city}/{place_id}.jpg"
# --- End Configuration ---

def safe_float(value, default=0.0):
    """Safely convert value to float."""
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

def safe_int(value, default=0):
    """Safely convert value to int."""
    try:
        return int(value)
    except (ValueError, TypeError):
        return default

def parse_coordinate_string(coord_str):
    """Safely parses the specific coordinate string format from the CSV."""
    try:
        # Use ast.literal_eval for safety on this specific format
        coord_dict = ast.literal_eval(coord_str)
        if isinstance(coord_dict, dict) and 'lat' in coord_dict and 'lng' in coord_dict:
             # Ensure values are floats
             lat = safe_float(coord_dict.get('lat'))
             lng = safe_float(coord_dict.get('lng'))
             # Rename lng to longitude for consistency with JSON example
             return {"latitude": lat, "longitude": lng}
        elif isinstance(coord_dict, dict) and 'lat' in coord_dict :
             # Handle cases where lng might be missing or malformed in source
             lat = safe_float(coord_dict.get('lat'))
             print(f"Warning: Coordinate string '{coord_str}' seems incomplete. Using only latitude.")
             return {"latitude": lat, "longitude": None} # Or some default longitude
        else:
            print(f"Warning: Could not parse coordinate string properly: {coord_str}")
            return {"latitude": None, "longitude": None}
    except (ValueError, SyntaxError, TypeError):
        print(f"Warning: Error parsing coordinate string: {coord_str}")
        return {"latitude": None, "longitude": None}

def format_entrance_fee(price_str):
    """Formats the price into a more descriptive fee string."""
    try:
        price = int(price_str)
        if price == 0:
            return "Free"
        else:
            # Format with commas for readability
            return f"IDR {price:,}"
    except (ValueError, TypeError):
        return "Fee Unknown" # Default for non-numeric prices

def get_region(city_name):
    """Maps city to a region (simple example, expand as needed)."""
    city_lower = city_name.lower()
    if city_lower == "jakarta":
        return "DKI Jakarta"
    elif city_lower == "bandung":
        return "Jawa Barat"
    elif city_lower == "yogyakarta":
        return "DI Yogyakarta"
    elif city_lower == "semarang":
        return "Jawa Tengah"
    elif city_lower == "surabaya":
        return "Jawa Timur"
    else:
        return default_region

# --- Main Script ---
if not os.path.exists(input_filename):
    print(f"Error: Input file '{input_filename}' not found.")
    print("Please make sure you have the CSV file with name-based IDs.")
    exit()

try:
    output_rows = []

    with open(input_filename, mode='r', newline='', encoding='utf-8') as infile:
        reader = csv.DictReader(infile) # Use DictReader for easier column access by name

        # Define the header for the new output file based on the JSON structure
        output_header = [
            'id', 'name', 'description', 'location', 'region', 'category',
            'image', 'likes', 'rating', 'bestTimeToVisit', 'entranceFee',
            'activities', 'coordinates', 'transportation', 'accommodations',
            'nearbyAttractions', 'tags' # Added tags as a field
        ]
        output_rows.append(output_header)

        for row in reader:
            # --- Prepare data for each field ---
            place_id = row.get('Place_Name_Id', '') # Already generated name ID
            city = row.get('City', 'Unknown City')
            place_name = row.get('Place_Name', 'Unknown Place')

            # Existing fields (cleaned/renamed)
            description_val = row.get('Description', '')
            category_val = row.get('Category', '')
            location_val = city # Use City column for location
            likes_val = safe_int(row.get('Rating_Count', 0)) # Rename Rating_Count
            rating_val = safe_float(row.get('Rating', 0.0))
            entrance_fee_val = format_entrance_fee(row.get('Price', ''))
            coordinates_val = parse_coordinate_string(row.get('Coordinate', '{}'))
            tags_str = row.get('Tags', '')
            tags_list = [tag.strip() for tag in tags_str.split(',') if tag.strip()] if tags_str else []

            # New fields (with defaults)
            region_val = get_region(city)
            image_val = image_path_template.format(city=city.lower().replace(" ", "-"), place_id=place_id)
            best_time_val = "Generally dry season (May-Sep), weekdays recommended" # Generic default
            # Default complex structures
            default_activities = ["Explore the area", "Photography", "Enjoy local cuisine"]
            default_transport = ["Taxi", "Ride-hailing apps (Gojek/Grab)", "Private vehicle"]
            default_accom = {
                "budget": "IDR 150,000 - 400,000 (Hostels/Guesthouses)",
                "midRange": "IDR 400,000 - 1,000,000 (Standard Hotels)",
                "luxury": "IDR 1,000,000+ (Higher-end Hotels/Resorts)"
            }
            default_nearby = ["Local markets", "Other nearby points of interest", "Restaurants and Cafes"]

            # --- Assemble the output row ---
            # Use json.dumps to store complex types as JSON strings in CSV cells
            output_row = [
                place_id,
                place_name,
                description_val,
                location_val,
                region_val,
                category_val,
                image_val,
                likes_val,
                rating_val,
                best_time_val,
                entrance_fee_val,
                json.dumps(default_activities), # Store list as JSON string
                json.dumps(coordinates_val),    # Store dict as JSON string
                json.dumps(default_transport),  # Store list as JSON string
                json.dumps(default_accom),      # Store dict as JSON string
                json.dumps(default_nearby),     # Store list as JSON string
                json.dumps(tags_list)           # Store list as JSON string
            ]
            output_rows.append(output_row)

    # Write the enriched data to the new CSV file
    with open(output_filename, mode='w', newline='', encoding='utf-8') as outfile:
        writer = csv.writer(outfile)
        writer.writerows(output_rows)

    print(f"Successfully created '{output_filename}' with enriched data structure.")
    print("Complex fields like coordinates, activities, etc., are stored as JSON strings.")
    print("New fields have been added with default values.")

except FileNotFoundError:
    print(f"Error: Input file '{input_filename}' not found.")
except Exception as e:
    print(f"An error occurred during processing: {e}")
