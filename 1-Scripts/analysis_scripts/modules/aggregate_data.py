from modules.params import *
from datetime import datetime  # ✅ Fixes the issue

date_str = datetime.today().strftime('%Y-%m-%d')  # ✅ Works now
time_str = datetime.today().strftime('%Y-%m-%d %H:%M:%S')  # ✅ Works now



#####################################
# ------- Functions -------------
#####################################

def aggregate_json_files(collection_data, output_filename="combined_data.json"):
    """
    Aggregates an arbitrary number of JSON files into one JSON file.

    Args:
        collection_data (list): List of file paths or JSON-like objects.
        output_file (str): Name of the output file to save the aggregated JSON data.

    Returns:
        None
    """
    output_file=os.path.join(processed_data_path,'aggregated_data.json')
    # Initialize an empty list to hold DataFrames
    dataframes = []

    # Load each JSON file into a DataFrame
    for data in collection_data:
        try:
            df = pd.read_json(data)
            if len(df) >= min_number_of_trials and (df['participant_timings'] != -1).all():
                dataframes.append(df)
        except ValueError as e:
            print(f"Error reading file: {data} - {e}")
        except KeyError as e:
            print(f"Missing expected column 'participant_timings' in file: {data} - {e}")

    # Combine all DataFrames
    combined_df = pd.concat(dataframes, ignore_index=True)

    # BACKWARD COMPATIBILITY
    # ----------------------
    # Change the column name participant_id to participant_ID
    if 'participant_id' in combined_df.columns:
        combined_df.rename(columns={'participant_id': 'participant_ID'}, inplace=True)

    # Replace values in the 'seq_temp_name' column
    if 'sequences_temp_tags' in combined_df.columns:
        replacements = {
            'Mirror-1': 'Mirror-Rep',
            'CMirror-1': 'CMirror-Rep',
            'Mirror-2': 'Mirror-NoRep',
            'CMirror-2': 'CMirror-NoRep',
            'CRep-Global': 'Nested-Global-Rep',
            'CRep-Local': 'Nested-Local-Rep'
        }
        combined_df['sequences_temp_tags'] = combined_df['sequences_temp_tags'].replace(replacements)


    # SAVE FILE TO JSON
    # ----------------------
    # Convert the combined DataFrame to JSON format
    combined_json = combined_df.to_json(orient='records', date_format='iso', indent=4)

    # Save the combined JSON to a file
    with open(output_file, "w") as file:
        file.write(combined_json)

    print(f"Combined JSON data saved to {output_file}")

# Example usage
# collection_data = ["file1.json", "file2.json", "file3.json"]
# aggregate_json_files(collection_data)

#####################################
# ------- Execution -------------
#####################################
collection_data = [os.path.join(raw_data_path, f) for f in os.listdir(raw_data_path)]

aggregate_json_files(collection_data)