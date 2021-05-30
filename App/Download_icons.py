# From node.js, extracted a .csv referencing all url's containing the icons off Google play application.
# Next part is to download all of them in order to generate a database for deep-learning
import numpy as np
import pandas as pd
import urllib.request
from pathlib import Path
dataframe_name = 'applications_Google_Play.csv'
df = pd.read_csv(dataframe_name, sep='\t', encoding='latin-1')
# print(df.head(10)['icon'])

my_dir_db = 'Google_Icons'
Path(my_dir_db).mkdir(parents=True, exist_ok=True)

inc=0
delta_info = 1000
for icon in df['icon']:
    name_icon = '{:06}'.format(inc) + '.png'
    urllib.request.urlretrieve(icon, my_dir_db+'/'+name_icon)
    inc+=1
    if inc%delta_info==0:
        print(str(inc)+' icons saved')
print('All icons saved')
