from modules.params import *
def finish_date_time(df):
    
    # Example of timestamp from JavaScript's Date.now()
    timestamp_ms = df['last_click'].unique()[0]  # Assuming this is in milliseconds

    # Convert milliseconds to seconds (because Python's datetime uses seconds)
    timestamp_s = timestamp_ms / 1000

    # Convert to a datetime object
    datetime_obj = datetime.datetime.fromtimestamp(timestamp_s)

    # Format the datetime object to get date, time in hours and minutes
    formatted_date = datetime_obj.strftime('%Y-%m-%d %H:%M:%S')
    
    return formatted_date

def which_seq(seq):
    # Convert the sequence to a string
    seq_str = ''.join(map(str, seq))
    
    # Look up the sequence in the reverse mapping dictionary
    name = reverse_mapping.get(seq_str, "Training")
    
    return name
    
    
def tag_sequence(df):
    return df['sequences_structure'].apply(which_seq)

