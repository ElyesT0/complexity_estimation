from modules import *

df=pd.read_json(merged_processed_path)
plot_mean_complexity_per_geom(df,plot_path)