from modules.params import *

def confidence_interval95(arr):
    
# 1. Calculate standard deviation of the array of values
    sd=np.std(arr)
    
# 2. Calculate standard error of the mean: SEM= sd/sqrt(n)
    sem=sd/np.sqrt(len(arr)/2) # pb: penses qu'il y a deux fois plus de participants
    
# 3. Using a t-table, find the t-score for the given degrees of freedom and the chosen confidence interval
    confidence_level = 0.95  # 95% confidence level
    df = len(arr)-1  # degrees of freedom
    t_score = stats.t.ppf((1 + confidence_level) / 2, df)

# 4. Calculate the Margin of Error: MOE=t-score*SEM
    moe=t_score*sem

# 5. Calculate the confidence interval: CI(95)= Mean ± MOE
    ci=(np.mean(arr)-moe,np.mean(arr)+moe)
    
    return ci