import numpy as np
import pandas as pd
import os
import datetime


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