from modules import *

df=pd.read_json(merged_processed_path)
plot_mean_complexity_per_geom(df,plot_path)
plot_mean_estimated_complexity(df,path=plot_path,print_values=True,seq_expression=True,sequences=test_sequences_tempTags,save=True,unfill_controls=True, colors_figure=distinct_colors_all)
