
from modules.params import *
from modules.stat_functions import *
from datetime import datetime



def duration_stats(df, min_number_of_trials=1):
    # Generate filename with current date
    date_str = datetime.today().strftime('%Y-%m-%d')
    time_str = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    output_filename_duration = os.path.join(sanity_checks_plots,f"general_info_complexity_estimation_{date_str}.txt")

    # Prepare data
    holder_duration = []
    unique_participants_IDs = df['participant_ID'].unique()

    # Open file for writing
    with open(output_filename_duration, "w") as f:
        # Print and write general info
        header = (
            "\n" + "="*60 + "\n"
            " GENERAL INFO: COMPLEXITY ESTIMATION DURATION STATS\n"+
            "="*60 + "\n"
            f"📅 Report generated on: {time_str}\n"
            f"There are {len(unique_participants_IDs)} unique datasets of at least {min_number_of_trials} trials.\n"+
            "="*60 + "\n\n"
        )
        
        print(header)
        f.write(header)

        # Compute duration for each participant
        for ID in unique_participants_IDs:
            participant_data = df[df['participant_ID'] == ID]
            if len(participant_data) > 1:  # Ensure there are enough trials
                duration = participant_data['last_click'].iloc[1] - participant_data['participant_startTime'].iloc[1]
                holder_duration.append(duration)

        # Compute statistics (only if durations exist)
        if holder_duration:
            mean_duration_min = np.mean(holder_duration) / 60000
            median_duration_min = np.median(holder_duration) / 60000
            max_duration_min = max(holder_duration) / 60000
            min_duration_min = min(holder_duration) / 60000

            # Format and print stats
            stats_text = (
                f"🔹 Mean duration: {mean_duration_min:.2f} minutes\n"
                f"🔹 Median duration: {median_duration_min:.2f} minutes\n"
                f"🔹 Max duration: {max_duration_min:.2f} minutes\n"
                f"🔹 Min duration: {min_duration_min:.2f} minutes\n"
            )
        else:
            stats_text = "⚠️ No valid durations were found in the dataset.\n"

        print(stats_text)
        f.write(stats_text)

    # Confirm file creation
    print(f"\n✅ Results saved to: {output_filename_duration}")

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

def plot_mean_complexity_per_geom(data,path,save=True):
    # Estimated complexity (x-axis) per temporal condition (y-axis) 
    # with one point per geometrical condition (roughly 3 points per line).

    # 1. List the lines 


    # 2. Code the plotting
    # (v) 2.a. Create test_sequences_geomTag with rightfully ordered arrays
    # 2.b. For each TempTags: Extract 3 geomTags sub-datasets. Then extract one dataset per participant.
    # 2.c. Compute average per participants then grand average, with SEM.

    # List unique participants' IDs
    participant_list=[participant for participant in data['participant_ID'].unique()]

    # Holder objects -- used for ploting
    meanComp_geom=[]
    semComp_geom=[]
    stdComp_geom=[]

    for index in range(len(test_sequences_tempTags)):
        # Pick one Temporal sequence (example: Rep-3)
        subset_temp=data[data['sequences_temp_tags']==test_sequences_tempTags[index]]

        # Contains the mean & SEM complexity estimation for each geom tag (example: ['rot-1','triangle','2groups'])
        holder_meanComp_geom=[0,0,0]
        holder_semComp_geom=[0,0,0]
        holder_stdComp_geom=[0,0,0]

        for geom_index in range(len(test_sequences_geomTag[index])):
            # Pick one subset of temporal sequence based on geometrical tag (example: Rep-3>rot-1)
            subset_geom=subset_temp[subset_temp['sequences_geom_tags']==test_sequences_geomTag[index][geom_index]]

            # For each participant compute mean
            holder_participant_mean=[]
            for participant in participant_list:
                subset_participant=subset_geom[subset_geom['participant_ID']==participant]
                holder_participant_mean.append(subset_participant['participant_response'].mean())
            holder_meanComp_geom[geom_index]=np.mean(holder_participant_mean)
            holder_semComp_geom[geom_index]=np.std(holder_participant_mean)
            holder_stdComp_geom[geom_index]=stats.sem(holder_participant_mean)

        # Append to global holder objects -- used for ploting
        meanComp_geom.append(holder_meanComp_geom)
        semComp_geom.append(holder_semComp_geom)
        stdComp_geom.append(holder_stdComp_geom)

    # Ploting part

    # -- Formating
    plt.rcParams["figure.facecolor"] = "white"
    fig, ax=plt.subplots(figsize=plot_figsize)
    plt.subplots_adjust(right=0.8)
    colors = ['black', 'red', 'forestgreen']
    grey_background=[0,1,0,1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1]
    ytick_weight=[]

    # -- Ploting
    x=np.arange(1,7)
    sec_axis =ax.secondary_yaxis('right') # Create the second y-axis for legend

    for i in range(len(test_sequences_tempTags)):
        txt_weight='bold'
        if grey_background[i]:
            ax.axhspan(i - 0.5, i + 0.5, facecolor='lightgrey', alpha=0.5)
            txt_weight=''
            
        ytick_weight.append((test_sequences_tempTags[i],txt_weight))
            
        for k in range(len(test_sequences_geomTag[i])):
            color=colors[k]
            ax.errorbar(meanComp_geom[i][k], i, xerr=stdComp_geom[i][k],fmt='-o', capsize=5, linewidth=bar_frame_width,color=color) 

    # setting x-ticks
    ax.set_yticks(np.arange(len(test_sequences_tempTags)))
    ax.set_yticklabels(test_sequences_tempTags, fontsize=ticks_fontsize)
    ax.set_xticks(x)
    ax.set_xticklabels(x, fontsize=ticks_fontsize)
    ax.invert_yaxis()

    # Setting y-ticks for the secondary y-axis
    yticklabels2 = ["/".join(seq) for seq in test_sequences_geomTag]
    sec_axis.set_yticks(np.arange(len(test_sequences_tempTags)))
    sec_axis.set_yticklabels([""] * len(yticklabels2))  # Hide default labels

    # Determine the correct x position for text labels (just outside the secondary axis)
    x_position = 6.1  # Adjust this to be slightly outside the secondary y-axis

    # Apply colored annotations with correct spacing
    for y, label in enumerate(yticklabels2):
        sub_labels = label.split("/")  # Split into parts
        offset = 0  # Initialize horizontal spacing

        for i, text in enumerate(sub_labels):
            match i:
                case 0:
                    offset=0
                case 1:
                    offset=0.5
                case 2:
                    offset += 0.8  # Adjust horizontal spacing (increase if still overlapping)
            color = colors[i % len(colors)]  # Assign colors cyclically
            ax.text(x_position + offset, y, text, transform=ax.transData,  # Use `ax.transData` for correct alignment
                    fontsize=ticks_fontsize, color=color, ha='left', va='center')
            
    # Remove the frame
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.spines['left'].set_visible(False)

    sec_axis.spines['top'].set_visible(False)
    sec_axis.spines['right'].set_visible(False)
    sec_axis.spines['left'].set_visible(False)

    # Make some ticks lighter
    for tick, (label, weight) in zip(ax.get_yticklabels(), ytick_weight):
        tick.set_text(label)
        tick.set_fontsize(14) # Keep fontsize consistent.
        if weight == 'bold':
            tick.set_alpha(1.0) #  fully opaque for 'bold'
        else:
            tick.set_alpha(0.5) # 50% transparent for lighter text
        # or you can try this for other option
        # tick.set_color((0, 0, 0, 0.5))  # RGBA: Black with 50% opacity
    fig.text(0.5, 0, "Mean Estimated Complexity per Geometry (errBar: std)", ha='center', va='center', fontsize=title_size, fontweight="bold")
    if save:
        plt.savefig(f'{path}/mean_comp_TEMP_GEOM.jpg',bbox_inches='tight', dpi=800)
        print(f"\n✅ Plot saved to {path}/mean_comp_TEMP_GEOM.jpg")
