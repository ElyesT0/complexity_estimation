import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats as stats
import math
import random
import seaborn as sns
from datetime import datetime
import pytz
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from scipy.stats import pearsonr
from statsmodels.stats.proportion import proportion_confint
from modules.params import *
from IPython.display import Markdown
import os
import zlib
import warnings
import collections
from scipy.stats import wilcoxon
from scipy.stats import ttest_rel
from scipy.stats import friedmanchisquare
from scipy.stats import shapiro
from scipy.stats import kstest, norm
from matplotlib.ticker import FuncFormatter
import statsmodels.api as sm
import statsmodels.formula.api as smf

"""
This file contains the constant necessary for the data analysis
"""

# ---------------------------------------
# ************** Constants **************
# ---------------------------------------
#SOA: 400ms
#delay before presentation and between presentation and reproduction: 750ms

experimenter_id=['BDT45D782PQS']

# Labels of columns that will need to be turned into ints/arrays of ints
# label_int_col_old is used for pre_processing
# label_int_col is used in plotting 
label_int_col_old=['sequences_structure',
    'seq',
    'confidence',
    'counter',
    'click_timings_before',
    'click_timings_after',
    'interclick_timings_before',
    'interclick_time',
    'response_sequences_before',
    'response_sequences_after',
    'score'
]

label_int_col=['sequences_structure',
    'seq',
    'confidence',
    'counter',
    'click_timings_before',
    'click_timings_after',
    'interclick_timings_before',
    'interclick_time',
    'sequences_response_before',
    'sequences_response',
    'score',
    "comparable_temp",
    "geom_dist_point",
    'response_structure'
]

label_int_col_old_exp1=['sequences_structure',
    'seq',
    'confidence',
    'click_timings_after',
    'interclick_time',
    'sequences_response',
    'score',
    'geom_dist_point'
]

seq_name_list=[
    "Repetition-2", 
    "control Repetition-2", 
    "Repetition-3", 
    "control Repetition-3", 
    "Repetition-4", 
    "control Repetition-4",
    "Repetition-Nested",
    "control NoLocal nested",
    "control NoGlobal nested",
    "play 4 tokens",
    "control play 4 tokens",
    "sub-programs 1",
    "control sub-programs 1",
    "sub-programs 2",
    "control sub-programs 2",
    "index i",
    "control index i",
    "play",
    "control play",
    "Insertion",
    "Suppression",
    "Mirror-Rep",
    "control Mirror-Rep",
    "Mirror-NoRep",
    "control Mirror-NoRep",
    
]

# Create a list that contains the sequences expressions
list_seq_expression=[
                    "AB.AB.AB.AB.AB.AB",
                     "ABBBBAABAAAB",
                     "ABC.ABC.ABC.ABC",
                     "ABCACBBCABAC",
                     "ABCD.ABCD.ABCD",
                     "ABCDCBDAADBC",
                     "AABBCC.AABBCC",
                     "ABC.ACB.ABC.ACB",
                     "AABBCC.AACCBB",
                        "ABACAD.ABACAD",
                     "ABACBD.ABACBD",
                     "ABCDABCBABCA",
                     "ABCD.ACBC.ABCA",
                     "ABCDABCEABCF",
                     "ABCDACBEABCF",
                     "ABAABBAAABBB",
                     "AAABBB.AB.AABB",
                     "AAABAAACAAAD",
                     "AAABAACAAAAD",
                     "ABC.ABCD.ABCDE",
                     "ABCDE.ABCD.ABC",
                     "ABCDDCBAABCD",
                     "ABCDDBCAABCD",
                     "ABCDCBADABCD",
                     "ABCDCABDABCD"
                     
                    ]

dict_expressions=dict(zip(seq_name_list,list_seq_expression))

alpha_seq_expression=[
                    "ABABABABABAB",
                     "ABBBBAABAAAB",
                     "ABCABCABCABC",
                     "ABCACBBCABAC",
                     "ABCDABCDABCD",
                     "ABCDCBDAADBC",
                     "AABBCCAABBCC",
                     "ABCACBABCACB",
                     "AABBCCAACCBB",
                    "ABACADABACAD",
                     "ABACBDABACBD",
                     "ABCDABCBABCA",
                     "ABCDACBCABCA",
                     "ABCDABCEABCF",
                     "ABCDACBEABCF",
                     "ABAABBAAABBB",
                     "AAABBBABAABB",
                     "AAABAAACAAAD",
                     "AAABAACAAAAD",
                     "ABCABCDABCDE",
                     "ABCDEABCDABC",
                     "ABCDDCBAABCD",
                     "ABCDDBCAABCD",
                     "ABCDCBADABCD",
                     "ABCDCABDABCD"
                     
                    ]

tested_sequences=["010203010203",
"010213010213",
"012301210120",
"012302120120",
"012301240125",
"012302140125",
"010011000111",
"000111010011",
"000100020003",
"000100200003",
"012012301234",
"012340123012",
"012332100123",
"012331200123",
"012321030123",
"012320130123",
"121212121212",
"122221121112",
"123123123123",
"123132231213",
"123412341234",
"123432411423",
"112233112233",
"123132123132",
"112233113322"]

real_mapping={'play 4 tokens': '010203010203',
 'control play 4 tokens': '010213010213',
 'sub-programs 1': '012301210120',
 'control sub-programs 1': '012302120120',
 'sub-programs 2': '012301240125',
 'control sub-programs 2': '012302140125',
 'index i': '010011000111',
 'control index i': '000111010011',
 'play': '000100020003',
 'control play': '000100200003',
 'Insertion': '012012301234',
 'Suppression': '012340123012',
 'Mirror-Rep': '012332100123',
 'control Mirror-Rep': '012331200123',
 'Mirror-NoRep': '012321030123',
 'control Mirror-NoRep': '012320130123',
 'Repetition-2': '010101010101',
 'control Repetition-2': '011110010001',
 'Repetition-3': '012012012012',
 'control Repetition-3': '012021120102',
 'Repetition-4': '012301230123',
 'control Repetition-4': '012321300312',
 'Repetition-Nested': '001122001122',
 'control NoLocal nested': '012021012021',
 'control NoGlobal nested': '001122002211'}

reverse_mapping = {value: key for key, value in real_mapping.items()}


## List complexities calculated with Santiago's code 

''' Parameters
set(
	BASE				        = 6,
	include_MOVE_AND_PLAY  		= True,
	include_PLAY                = False,
	include_REPEAT              = True,
	include_REPEAT_JUMP         = False,
	include_REPEAT_APPLY_NOTES  = False,
	include_REPEAT_APPLY_PEVAL  = False,
	include_REFLECT    		    = False,
	include_MIRROR  			= False,
	include_SUB		  			= False,
	with_POINTERS				= False,
	with_CHUNKS					= False
 
)

Version: music6.py
Path: /Users/et/Documents/UNICOG/PSC/code_santiago/20240326_test_elyes.py
'''

complexities_initial_version={
    "play 4 tokens":10,
    "control play 4 tokens":8,
    "sub-programs 1":13,
    "control sub-programs 1":12,
    "sub-programs 2":13,
    "control sub-programs 2":12,
    "index i":11,
    "control index i":1,
    "play":8,
    "control play":13,
    "Insertion":9,
    "Suppression":9,
    "Mirror-Rep":9,
    "control Mirror-Rep":10,
    "Mirror-NoRep":11,
    "control Mirror-NoRep":12,
    
    "Repetition-2":4, 
    "control Repetition-2":13, 
    "Repetition-3":4, 
    "control Repetition-3":15, 
    "Repetition-4":4, 
    "control Repetition-4":13,
    "Repetition-Nested":5,
    "control NoLocal nested":9,
    "control NoGlobal nested":11,
}

''' Parameters
set(
	BASE				        = 6,
	include_MOVE_AND_PLAY  		= True,
	include_PLAY                = True,
	include_REPEAT              = True,
	include_REPEAT_JUMP         = False,
	include_REPEAT_APPLY_NOTES  = False,
	include_REPEAT_APPLY_PEVAL  = False,
	include_REFLECT    		    = False,
	include_MIRROR  			= False,
	include_SUB		  			= False,
	with_POINTERS				= False,
	with_CHUNKS					= True
 
)

Version: music6.py
Path: /Users/et/Documents/UNICOG/PSC/code_santiago/20240326_test_elyes.py
'''

complexities_play_version={
    "play 4 tokens":14,
    "control play 4 tokens":18,
    "sub-programs 1":17,
    "control sub-programs 1":15,
    "sub-programs 2":17,
    "control sub-programs 2":16,
    "index i":16,
    "control index i":16,
    "play":6,
    "control play":15,
    "Insertion":15,
    "Suppression":13,
    "Mirror-Rep":19,
    "control Mirror-Rep":19,
    "Mirror-NoRep":14,
    "control Mirror-NoRep":17,
    "Repetition-2":8, 
    "control Repetition-2":15, 
    "Repetition-3":9, 
    "control Repetition-3":17, 
    "Repetition-4":9, 
    "control Repetition-4":17,
    "Repetition-Nested":10,
    "control NoLocal nested":16,
    "control NoGlobal nested":18,
}

''' Parameters
set(
	BASE				        = 6,
	include_MOVE_AND_PLAY  		= True,
	include_PLAY                = False,
	include_REPEAT              = True,
	include_REPEAT_JUMP         = False,
	include_REPEAT_APPLY_NOTES  = False,
	include_REPEAT_APPLY_PEVAL  = False,
	include_REFLECT    		    = False,
	include_MIRROR  			= True,
	include_SUB		  			= True,
	with_POINTERS				= False,
	with_CHUNKS					= True
 
)

Version: music6.py
Path: /Users/et/Documents/UNICOG/PSC/code_santiago/20240326_test_elyes.py
'''

complexities_allOperationsButPlay_version={
    "play 4 tokens":13,
    "control play 4 tokens":18,
    "sub-programs 1":12,
    "control sub-programs 1":14,
    "sub-programs 2":12,
    "control sub-programs 2":17,
    "index i":18,
    "control index i":18,
    "play":7,
    "control play":15,
    "Insertion":12,
    "Suppression":11,
    "Mirror-Rep":13,
    "control Mirror-Rep":18,
    "Mirror-NoRep":13,
    "control Mirror-NoRep":16,
    "Repetition-2":8, 
    "control Repetition-2":16, 
    "Repetition-3":9, 
    "control Repetition-3":20, 
    "Repetition-4":9, 
    "control Repetition-4":18,
    "Repetition-Nested":13,
    "control NoLocal nested":11,
    "control NoGlobal nested":22,
}

''' Parameters
set(
	BASE				        = 6,
	include_MOVE_AND_PLAY  		= True,
	include_PLAY                = True,
	include_REPEAT              = True,
	include_REPEAT_JUMP         = False,
	include_REPEAT_APPLY_NOTES  = False,
	include_REPEAT_APPLY_PEVAL  = False,
	include_REFLECT    		    = False,
	include_MIRROR  			= True,
	include_SUB		  			= True,
	with_POINTERS				= False,
	with_CHUNKS					= True
 
)

Version: music6.py
Path: /Users/et/Documents/UNICOG/PSC/code_santiago/20240326_test_elyes.py
'''

complexities_allOperations_version={
    "play 4 tokens":11,
    "control play 4 tokens":18,
    "sub-programs 1":12,
    "control sub-programs 1":14,
    "sub-programs 2":12,
    "control sub-programs 2":15,
    "index i":15,
    "control index i":15,
    "play":6,
    "control play":14,
    "Insertion":12,
    "Suppression":11,
    "Mirror-Rep":13,
    "control Mirror-Rep":17,
    "Mirror-NoRep":13,
    "control Mirror-NoRep":16,
    "Repetition-2":5, 
    "control Repetition-2":14, 
    "Repetition-3":9, 
    "control Repetition-3":16, 
    "Repetition-4":9, 
    "control Repetition-4":17,
    "Repetition-Nested":10,
    "control NoLocal nested":11,
    "control NoGlobal nested":18,
}

''' Parameters
set(
	BASE				        = 6,
	include_MOVE_AND_PLAY  		= True,
	include_PLAY                = True,
	include_REPEAT              = True,
	include_REPEAT_JUMP         = False,
	include_REPEAT_APPLY_NOTES  = False,
	include_REPEAT_APPLY_PEVAL  = False,
	include_REFLECT    		    = False,
	include_MIRROR  			= True,
	include_SUB		  			= True,
	with_POINTERS				= False,
	with_CHUNKS					= False
 
)

Version: music6.py
Path: /Users/et/Documents/UNICOG/PSC/code_santiago/20240326_test_elyes.py

'''
complexities_allOperations_noChunk={
    "play 4 tokens":11,
    "control play 4 tokens":18,
    "sub-programs 1":12,
    "control sub-programs 1":14,
    "sub-programs 2":12,
    "control sub-programs 2":15,
    "index i":15,
    "control index i":14,
    "play":6,
    "control play":12,
    "Insertion":12,
    "Suppression":11,
    "Mirror-Rep":9,
    "control Mirror-Rep":9,
    "Mirror-NoRep":13,
    "control Mirror-NoRep":16,
    "Repetition-2":5, 
    "control Repetition-2":14, 
    "Repetition-3":9, 
    "control Repetition-3":15, 
    "Repetition-4":9, 
    "control Repetition-4":11,
    "Repetition-Nested":8,
    "control NoLocal nested":11,
    "control NoGlobal nested":10,
}

# ---------------------------------------
# ************ Sequences subsets for plotting ************
# ---------------------------------------
seq_subset1=[
    'Repetition-Nested',
 'control NoLocal nested',
 'control NoGlobal nested',
 'Repetition-2',
 'control Repetition-2',
 'Repetition-3',
 'control Repetition-3',
 'Repetition-4',
 'control Repetition-4'
 ]

seq_subset2=['play 4 tokens',
 'control play 4 tokens',
 'sub-programs 1',
 'control sub-programs 1',
 'sub-programs 2',
 'control sub-programs 2',
 'index i',
 'control index i',
 'play',
 'control play',
 'Insertion',
 'Suppression',
 'Mirror-Rep',
 'control Mirror-Rep',
 'Mirror-NoRep',
 'control Mirror-NoRep']
# ---------------------------------------
# ************ Plot variables ************
# ---------------------------------------
plot_figsize_coef = 0.8
plot_figsize=(10,10)
color_structure_control=['#386641','#bc4749']*3+['#386641','#bc4749','#bc4749']+['#386641','#bc4749']*8
plot_colors=['#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4','#ADE8F4',
         '#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4', 
         '#03045E', '#03045E', '#0077B6', '#0077B6', '#00B4D8', '#00B4D8', '#ADE8F4', '#ADE8F4']
figure_format_points=['o','o','s','s','v','v','s','s','s','D','D','^','^','o','o','s','s','v','v','D','D','^','^','o','o']
title_size=15
padding_size=10
"""
'o': Circle
's': Square
'D': Diamond
'^': Upward-pointing triangle
'v': Downward-pointing triangle
"""
plot_colors2=['#FEC89A', '#FEC89A', # play-4
              '#fec5bb', '#fec5bb', # sub-programs 1
              '#d8e2dc', '#d8e2dc', # sub-programs 2
              '#ECE4DB', '#ECE4DB', # index i
              '#c997a0','#c997a0', # play
              '#9d8189', '#9d8189', # insertion - Suppression
              '#f4acb7', '#f4acb7', # Mirror 1
              '#ffe5d9', '#ffe5d9'] # Mirror 2

distinct_colors_all=[
            '#001219','#001219', # Repetition-2
            '#005F73','#005F73', # Repetition-3
            '#0A9396','#0A9396', # Repetition-4
            '#9B2226','#9B2226','#9B2226', # Repetition-Nested
            
            '#EE9B00', '#EE9B00', # play-4
            '#fec5bb', '#fec5bb', # sub-programs 1
            '#E9D8A6', '#E9D8A6', # sub-programs 2
            '#ECE4DB', '#ECE4DB', # index i
            '#0466C8','#0466C8', # play
            '#33415C', '#33415C', # insertion - Suppression
            '#9d4edd', '#9d4edd', # Mirror 1
            '#b76935', '#b76935'] # Mirror 2

distinct_colors_base=[
            '#9B2226','#9B2226','#9B2226', # Repetition-Nested
            '#001219','#001219', # Repetition-2
            '#005F73','#005F73', # Repetition-3
            '#0A9396','#0A9396', # Repetition-4
] 

distinct_colors_ext=['#EE9B00', '#EE9B00', # play-4
            '#fec5bb', '#fec5bb', # sub-programs 1
            '#E9D8A6', '#E9D8A6', # sub-programs 2
            '#ECE4DB', '#ECE4DB', # index i
            '#0466C8','#0466C8', # play
            '#33415C', '#33415C', # insertion - Suppression
            '#9d4edd', '#9d4edd', # Mirror 1
            '#b76935', '#b76935'] # Mirror 2

# Legend size for the plot_regression function
legend_size=10
bar_thickness=0.8
bar_frame_width=3 # define linewidht parameter in barh plots

# Fill conditions
#fill_condition_all=np.concatenate(np.tile([])

# ---------------------------------------
# ************Complexity models************
# ---------------------------------------
chunk_comp_array=[9.509775,
                  10.754887,
                  8.0,
                  7.754887,
                  6.965784,
                  12.0,
                  5.61470984,
                  9.509775004,
                  5.61470984,
                  9.50977,
                  10.3398,
                  8.32192,
                  8.90689,
                  8.32193,
                  9.321928,
                  8.754887,
                  8.754887,
                  9.0,
                  8.90689,
                  6.90689,
                  6.90689,
                  6.96578,
                  8.491853,
                  8.6438561,
                  9.3219280
                  ]



name_complexities=[
    'LoT Complexity',
    'Shannon Entropy',
    'Lempel_Ziv',
    'Change Complexity',
    'Algorithmic Complexity',
    'Subsymetries',
    'Chunk Complexity'
]

aic_values=[
   30011.59,
    30476.97,
    30198.04,
    31153.64,
    30264.89,
    30999.08,
    31316.567039
]

AIC_models={key:value for key,value in zip(name_complexities,aic_values)}



# -- AIC Values for only the 9 sequences of the Base experiment
aic_values_base=[
    7950.93,
    8378.090948,
    7821.419402,
    8419.572723,
    7985.370794,
    8461.354038,
    8225.430172
]

AIC_models_base={key:value for key,value in zip(name_complexities,aic_values_base)}


# -- AIC Values for only the 9 sequences of the EXTENDED experiment
aic_values_ext=[
    18662.938918,
    18777.861045,
    18927.785273,
    19340.990176,
    18891.144083,
    19080.786168,
    19354.671435
]

AIC_models_ext={key:value for key,value in zip(name_complexities,aic_values_ext)}
