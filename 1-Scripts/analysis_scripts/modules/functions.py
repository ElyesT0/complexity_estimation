
from modules.params import *
from modules.stat_functions import *

def duration_stats(df):
    
    holder_duration=[]
    unique_participants_IDs=[ID for ID in df['participant_ID'].unique()]
    print(f'There are {len(unique_participants_IDs)} unique datasets of at least {min_number_of_trials} trials')
    
    for ID in unique_participants_IDs:
        holder_duration.append(df[df['participant_ID']==ID]['last_click'].iloc[1]-
                               df[df['participant_ID']==ID]['participant_startTime'].iloc[1])
    
    mean_duration_sec=np.mean(holder_duration)/60000
    median_duration_sec=np.median(holder_duration)/60000
    
    print(f'Mean duration : {mean_duration_sec:.2f}')
    print(f'Median duration : {median_duration_sec:.2f}')
    print(f'Max duration : {max(holder_duration)/60000}')
    print(f'Min duration : {min(holder_duration)/60000}')

def plot_mean_complexity_estimate(data,sequences,path,print_values=True,seq_expression=True,unfill_controls=False,colors_figure=plot_colors,save=True,file_name='sanity_checks'):
    colors_figure=colors_figure[:len(sequences)]
    # Participants IDs
    IDs=[data.iloc[0]["participant_ID"]]
    for i in range(len(data)-1):
        if data.iloc[i]["participant_ID"] not in IDs:
            IDs.append(data.iloc[i]["participant_ID"])
    
    # Calculate the mean complexity_estimate for each sequence per participant
    temp_complexity_estimate_perParticipant = []
    
    # Gather sequence_expression
    sequence_expressions=[real_mapping[key] for key in sequences]

    for name in sequences:
        new_arr = []
        for participant in IDs:
            subset = data[(data["participant_ID"] == participant) & (data["sequences_temp_tags"] == name)]
            mean_complexity_estimate = np.nanmean(subset["participant_response"])  # Use np.nanmean to handle NaN values
            new_arr.append(mean_complexity_estimate)
                
        temp_complexity_estimate_perParticipant.append(new_arr)

    # Convert the list of lists into a 2D NumPy array
    complexity_estimate_perParticipant = np.array(temp_complexity_estimate_perParticipant)

    # Calculate confidence intervals
    CI_meanDL = [confidence_interval95(complexity) for complexity in complexity_estimate_perParticipant]
    all_sem = [stats.sem(complexity, nan_policy='omit') for complexity in complexity_estimate_perParticipant]
    
    mean_complexity_estimate_perParticipant=[]
   
    for i in range(len(all_sem)):
        # We use np.nanmean because participants from experiment 1 don't have values for sequences tested in experiment 2
        mean_complexity_estimate_perParticipant.append(round(np.nanmean(complexity_estimate_perParticipant[i]),2))
        if print_values:
            print(f'[{sequences[i]}] mean Complexity Estimate: {round(np.nanmean(complexity_estimate_perParticipant[i]),2)}')
            print(f'[{sequences[i]}] SEM: {round(all_sem[i],2)}\n')
        

    # Extract the lower and upper bounds of the confidence interval
    lower_bound = np.array([item[0] for item in CI_meanDL])
    upper_bound = np.array([item[1] for item in CI_meanDL])

 
    # Plotting
    plt.rcParams["figure.facecolor"] = "white"


    # fig, ax = plt.subplots(figsize=(10,8))
    plot_figsize_original = (10, len(sequences))
    plot_figsize_current = (plot_figsize_coef * plot_figsize_original[0], (plot_figsize_coef-0.3) * plot_figsize_original[1])

   
    fig, ax = plt.subplots(figsize=plot_figsize_current)

    # Alternate colors for y-tick labels based on 'control' keyword
    yticklabels = []
    fill_conditions=[]
    for label in sequences:
        #color = 'grey' if 'control' in label.lower() else 'black'
        # yticklabels.append((label, color))
        weight='bold' if 'control' not in label.lower() else 'skip'
        yticklabels.append((label, weight))
        
    
    if unfill_controls:
        for label in sequences:
            fill_conditions.append(not 'control' in label.lower())
    else:
        fill_conditions = [True] * len(sequences)

    
    for i, (filled, color) in enumerate(zip(fill_conditions, colors_figure)):
        
        ax.barh(i, mean_complexity_estimate_perParticipant[i],
                xerr=all_sem[i], capsize=5, align="center",
                edgecolor=color, facecolor=color if filled else 'none',height=bar_thickness,linewidth=bar_frame_width)

    ax.set_yticks(np.arange(len(sequences)))
    ax.set_yticklabels(sequences, fontsize=14)
    

    for tick, (label, weight) in zip(ax.get_yticklabels(), yticklabels):
        # tick.set_color(color)
        tick.set_text(label)
        tick.set_fontsize(14)
        if weight=='bold':
            tick.set_fontweight('bold')

    ax.invert_yaxis()

    if seq_expression:
        sec_axis = ax.secondary_yaxis("right")
        sec_axis.set_yticks(np.arange(len(sequences)))
        sec_axis.set_yticklabels(sequence_expressions, fontsize=12)
        
        # Set colors for secondary y-tick labels
        sec_yticklabels = sec_axis.get_yticklabels()
        for tick, (label, weight) in zip(sec_yticklabels, yticklabels):
            if weight=='bold':
                tick.set_fontweight('bold')
    #_-----

    ax.tick_params(axis='x', labelsize=16)
    ax.tick_params(axis='y', labelsize=16)
    ax.set_xlabel("Mean Complexity Estimation", fontsize=title_size, labelpad=padding_size)

    if save:
        plt.savefig(f'{path}/mean_complexity_estimate_{file_name}.jpg', 
                    bbox_inches='tight', dpi=800)
    else:
        plt.show()