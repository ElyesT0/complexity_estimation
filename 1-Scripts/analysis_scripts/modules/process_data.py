from modules.params import *
from modules.functions import *
from modules.stat_functions import *
from modules.aggregate_data import *

# 0. Open file
df=pd.read_json(all_data_raw_path)

df_pilot=pd.read_json(os.path.join(processed_data_path,"aggregated_data_pilot.json"))

# 1. Remove bad participants from df
df = df[~df["participant_ID"].isin(excluded_participants)]

# 2. Merge pilot with prolific
    # a. remove the "participant_prolific_id" column before merge.
df.drop(columns=["participant_prolific_id"], inplace=True, errors="ignore")
    # b. Merge in a processed_merged_data.json
merged_df = pd.concat([df, df_pilot],ignore_index=True)  # Change to "inner" if needed


merged_df.to_json(merged_processed_path, orient="records")

print(f"Processed merged data saved to: {merged_processed_path}")