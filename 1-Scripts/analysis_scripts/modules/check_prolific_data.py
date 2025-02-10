# pipeline that will check the performance of the participants and will output at several stages which participants are good and which are bad. 

# Key info:
# - participant id is in df["participant_prolific_id"]
# - layer 1 sanity checks: performance on training sequences. Did the responses of the participants match the instructions?
# - layer 2 sanity checks: inside experiments probes. I have easy probes and hard probes.
# - layer 3 sanity checks: sequences CRep4 is notouriously hard and Rep-Nested notouriously easy. Are they consistent.

# Each layer should print in a very clear way the ID of the participants that fulfill that check and the ones who fail.

from modules.params import *
from modules.functions import *
from modules.stat_functions import *
from modules.aggregate_data import *
date_str = datetime.today().strftime('%Y-%m-%d')
time_str = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
output_filename = os.path.join(sanity_checks_plots,f"layer_1_2_sanity_check_results{date_str}.txt")
collection_data = [os.path.join(raw_data_path, f) for f in os.listdir(raw_data_path)]

aggregate_json_files(collection_data)
df=pd.read_json(all_data_raw_path)

# Produce and Save Plot for training and probes mean complexity estimation
sanity_check_plot_colors=['grey' for name in sanity_checks_sequence_names]
plot_mean_complexity_estimate(df,sanity_checks_sequence_names,file_name='sanity_checks',path=sanity_checks_plots,print_values=True,seq_expression=True,unfill_controls=False,colors_figure=sanity_check_plot_colors,save=True)

# Produce and Save Plot for test sequences
sanity_check_plot_colors=['grey' for name in test_sequences_tempTags]
plot_mean_complexity_estimate(df,test_sequences_tempTags,file_name='test_sequences',path=sanity_checks_plots,print_values=True,seq_expression=True,unfill_controls=False,colors_figure=sanity_check_plot_colors,save=True)

## Layer 1 & Layer 2 sanity checks: Performance on training sequences and probe validation
# ------------------------------------------------------------------------------
# LAYER 1: Checks if participants correctly followed training instructions.
# LAYER 2: Checks if participants responded correctly to probe sequences.
#   - Easy probes: All responses must be 1 or 2.
#   - Hard probes: All responses must be 6 or 7.
# Participants who pass both layers move on; others are flagged.
# ------------------------------------------------------------------------------

# 0. Prepare useful data
list_participants_prolific_ID = df["participant_prolific_id"].unique()
match_prolific_filename = dict(zip(df["participant_prolific_id"], df["participant_ID"]))

training_baseline = {'training-1': 1, 'training-2': 7}  # Expected responses
name_training_seq = list(training_baseline.keys())
response_training_seq = list(training_baseline.values())

# Initialize lists to track valid and invalid participants
layer_1_valid = []
layer_1_invalid = []
layer_2_valid = []
layer_2_invalid = []
layer_3_valid = []
layer_3_invalid = []

# For each participant
for sub in list_participants_prolific_ID:
    subset_data = df[df['participant_prolific_id'] == sub]
    
    # Extract responses for training sequences
    response1 = subset_data[subset_data['sequences_temp_tags'] == name_training_seq[0]]['participant_response']
    response2 = subset_data[subset_data['sequences_temp_tags'] == name_training_seq[1]]['participant_response']
    
    # Ensure we compare correctly (check if both exist and match the expected values)
    response_match = (
        not response1.empty and not response2.empty and  # Ensure responses exist
        (response1.values[0] == response_training_seq[0]) and 
        (response2.values[0] == response_training_seq[1])
    )

    # Classify participant based on response match (Layer 1)
    if response_match:
        layer_1_valid.append(sub)
    else:
        layer_1_invalid.append(sub)

    # --- Layer 2: Easy & Hard Probes ---
    responses_probes_easy = subset_data[subset_data['sequences_temp_tags'] == 'probe-easy']['participant_response']
    responses_probes_hard = subset_data[subset_data['sequences_temp_tags'].isin([
        'probe-hard-1', 'probe-hard-2', 'probe-hard-3', 'probe-hard-4', 'probe-hard-5'
    ])]['participant_response']

    # Validate easy probes (all must be 1 or 2)
    valid_easy = not responses_probes_easy.empty and all(response in [1, 2] for response in responses_probes_easy.values)

    # Validate hard probes (all must be 6 or 7)
    valid_hard = not responses_probes_hard.empty and all(response in [6, 7] for response in responses_probes_hard.values)

    # Classify participants for Layer 2
    if valid_easy and valid_hard:
        layer_2_valid.append(sub)
    else:
        layer_2_invalid.append(sub)

# --- PRINT RESULTS ---
# General Data
duration_stats(df)
# Define the output filename

with open(output_filename, "w") as f:
    # Print explanation ONCE
    header = (
        "\n" + "="*70 + "\n"
        " 🛠️  LAYER 1 & 2: TRAINING + PROBE PERFORMANCE CHECK\n"+
        "="*70 + "\n"
        "🔹 Layer 1: Did participants follow instructions in training?\n"
        "   - Training-1 → Expected: 1\n"
        "   - Training-2 → Expected: 7\n"
        "\n"
        "🔹 Layer 2: Are their responses valid for easy and hard probes?\n"
        "   - Easy probes → Expected: Only 1 or 2\n"
        "   - Hard probes → Expected: Only 6 or 7\n"
        "\n Participants who pass both move forward.\n"
        " Those who fail are flagged with errors.\n"+
        "="*70 + "\n\n"
    )

    # Print and write the header **only once**
    print(header)
    f.write(header)

    # ---- Print Layer 1 Results ----
    if layer_1_valid:
        print("\n🎯 Participants who PASSED Layer 1:\n" + "-"*60)
        f.write("\n🎯 Participants who PASSED Layer 1:\n" + "-"*60 + "\n")
        for sub in layer_1_valid:
            line = f" 🔹 Prolific ID: {sub} | Participant ID: {match_prolific_filename.get(sub, 'N/A')}\n"
            print(line, end="")
            f.write(line)

    if layer_1_invalid:
        print("\n Participants who FAILED Layer 1 (with errors):\n" + "-"*60)
        f.write("\n\n Participants who FAILED Layer 1 (with errors):\n" + "-"*60 + "\n")
        for sub in layer_1_invalid:
            participant_id = match_prolific_filename.get(sub, 'N/A')
            subset_data = df[df['participant_prolific_id'] == sub]

            # Get responses for training sequences
            response1 = subset_data[subset_data['sequences_temp_tags'] == name_training_seq[0]]['participant_response']
            response2 = subset_data[subset_data['sequences_temp_tags'] == name_training_seq[1]]['participant_response']

            # Extract actual values (or indicate missing responses)
            response1_val = response1.values[0] if not response1.empty else "MISSING"
            response2_val = response2.values[0] if not response2.empty else "MISSING"

            fail_text = (
                f" 🔹 Prolific ID: {sub} | Participant ID: {participant_id}\n"
                f"    →  Expected: {training_baseline[name_training_seq[0]]} |  Given: {response1_val} (Training-1)\n"
                f"    →  Expected: {training_baseline[name_training_seq[1]]} |  Given: {response2_val} (Training-2)\n\n"
            )

            print(fail_text)
            f.write(fail_text)

    # ---- Print Layer 2 Results ----
    if layer_2_valid:
        print("\n🎯 Participants who PASSED Layer 2:\n" + "-"*60)
        f.write("\n\n🎯 Participants who PASSED Layer 2:\n" + "-"*60 + "\n")
        for sub in layer_2_valid:
            line = f" 🔹 Prolific ID: {sub} | Participant ID: {match_prolific_filename.get(sub, 'N/A')}\n"
            print(line, end="")
            f.write(line)

    if layer_2_invalid:
        print("\n❌ Participants who FAILED Layer 2 (with errors):\n" + "-"*60)
        f.write("\n\n❌ Participants who FAILED Layer 2 (with errors):\n" + "-"*60 + "\n")
        for sub in layer_2_invalid:
            participant_id = match_prolific_filename.get(sub, 'N/A')
            subset_data = df[df['participant_prolific_id'] == sub]

            # Get responses for easy & hard probes
            responses_probes_easy = subset_data[subset_data['sequences_temp_tags'] == 'probe-easy']['participant_response']
            responses_probes_hard = subset_data[subset_data['sequences_temp_tags'].isin([
                'probe-hard-1', 'probe-hard-2', 'probe-hard-3', 'probe-hard-4', 'probe-hard-5'
            ])]['participant_response']

            fail_text = (
                f"  Prolific ID: {sub} | Participant ID: {participant_id}\n"
                f"    →  Expected: Only [1, 2] |  Given: {list(responses_probes_easy.values) if not responses_probes_easy.empty else 'MISSING'} (Easy Probes)\n"
                f"    →  Expected: Only [6, 7] |  Given: {list(responses_probes_hard.values) if not responses_probes_hard.empty else 'MISSING'} (Hard Probes)\n\n"
            )

            print(fail_text)
            f.write(fail_text)

# Confirm file creation
print("\n✅ Results saved to:", output_filename)

