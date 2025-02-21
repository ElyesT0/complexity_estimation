How to use the pipeline and the data analysis modules.

0.a. Download the data from the server. Store them in:
/Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/2-Data/online_exp_data/raw

0.b. Delete the archive folder from the downloaded data.

1. Run the sanity check pipeline. This will produce the following in the sanity_check folder (/Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/4-Figures/sanity_checks)
  i - A report with general data about the study. -> general_info_complexity_estimation_{date}.txt 
  ii - A report with detailed exclusion criteria and validation for the participants with linked ID. -> layer_1_2_sanity_check_results.txt
  iii - A mean complexity estimation plot for each sequence.
  iv - A mean complexity estimation plot for training and probe sequences.
use: python -m modules.check_prolific_data

2. Examine the layer_1_2_sanity_check_results.txt report. Select participants you want to remove. 
Copy their Participant ID and paste them in modules>params.py>excluded_participants

3. Run the process_data.py script. Your processed data is not in /Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/2-Data/online_exp_data/processed

4. Use the run_plotting.py to generate the main plots of the experiment.
