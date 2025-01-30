"""

How to use the pipeline and the data analysis modules.

0.a. Download the data from the server. Store them in:
/Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/2-Data/online_exp_data/raw

0.b. Delete the archive folder from the downloaded data.

1. Run the sanity check pipeline (check_prolific_data.py). This will produce the following in the sanity_check folder (/Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/4-Figures/sanity_checks)
  i - A report with general data about the study. -> general_info_complexity_estimation_{date}.txt
  ii - A report with detailed exclusion criteria and validation for the participants with linked ID. -> layer_1_2_sanity_check_results.txt
  iii - A mean complexity estimation plot for each sequence.
  iv - A mean complexity estimation plot for training and probe sequences.

2. Examine the layer_1_2_sanity_check_results.txt report. Select participants you want to remove.
Copy their Participant ID and paste them in modules>params.py>excluded_participants

3. Run the process_data.py script. Your processed data is not in /Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation/2-Data/online_exp_data/processed

"""



import numpy as np
import sys
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import json
import os
import datetime
import scipy.stats as stats

# List of excluded participants
excluded_participants= []

# Exclusion Criteria
# -----
min_number_of_trials=80 # If there are less than this number of trials, the dataset is removed from the whole.

# PATHS
# -----
root_project_path="/Users/elyestabbane/Documents/UNICOG/2-Experiments/complexity_estimation"

data_path=os.path.join(root_project_path,"2-Data/online_exp_data")
raw_data_path=os.path.join(data_path,"raw")
processed_data_path=os.path.join(data_path,"processed")
all_data_raw_path=os.path.join(processed_data_path,'aggregated_data.json')

# For sanity checks
sanity_checks_plots=os.path.join(root_project_path,'4-Figures/sanity_checks')

# SANITY CHECKS Parameters
# ---------------------------
sanity_checks_sequence_names=[
    "training-1",
"training-2",
"training-3",
"training-4",
"probe-easy",
"probe-hard-1",
"probe-hard-2",
"probe-hard-3",
"probe-hard-4",
"probe-hard-5"
]


# KEY Experimental Parameters
# ---------------------------
test_sequences_tempTags=[
        'Rep2',
        'CRep2',
        'Rep3',
        'CRep3',
        'Rep4',
       'CRep4',
        'Rep-Nested',
        'Nested-Global-Rep',
        'Nested-Local-Rep',

        'Play',
        'CPlay',
        'Play4',
        'CPlay4',
        'Sub-1',
        'CSub-1',

        'Sub-2',
        'CSub-2',

       'Mirror-Rep',
        'CMirror-Rep',
        'Mirror-NoRep',
       'CMirror-NoRep',
       'Index',
       'CIndex',

       'Suppression',
       'Insertion',

]

real_mapping={'Play4': '010203010203',
 'CPlay4': '010213010213',
 'Sub-1': '012301210120',
 'CSub-1': '012302120120',
 'Sub-2': '012301240125',
 'CSub-2': '012302140125',
 'Index': '010011000111',
 'CIndex': '000111010011',
 'Play': '000100020003',
 'CPlay': '000100200003',
 'Insertion': '012012301234',
 'Suppression': '012340123012',
 'Mirror-Rep': '012332100123',
 'CMirror-Rep': '012331200123',
 'Mirror-NoRep': '012321030123',
 'CMirror-NoRep': '012320130123',
 'Rep2': '010101010101',
 'CRep2': '011110010001',
 'Rep3': '012012012012',
 'CRep3': '012021120102',
 'Rep4': '012301230123',
 'CRep4': '012321300312',
 'Rep-Nested': '001122001122',
 'Nested-Global-Rep': '012021012021',
 'Nested-Local-Rep': '001122002211',
 'training-1':'000000000000',
 'training-2':'035143320530',
'training-3':'000111222333',
'training-4':'145252300413',
'probe-easy':'111111111111',
'probe-hard-1':'034141255302',
'probe-hard-2':'012323455104',
'probe-hard-3':'123434500215',
'probe-hard-4':'015252433104',
'probe-hard-5':'013434255102'

}

reverse_mapping = {value: key for key, value in real_mapping.items()}


# ---------------------------------------
# ************ Plot variables ************
# ---------------------------------------
plot_figsize_coef = 0.8
plot_figsize=(10,10)
plot_colors=['#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4','#ADE8F4',
         '#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4', 
         '#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4']
title_size=15
padding_size=10
# Legend size for the plot_regression function
legend_size=10
bar_thickness=0.8
bar_frame_width=3 # define linewidht parameter in barh plots

# ------------------------------------------------
# ************ Backward compatibility ************
# ------------------------------------------------
