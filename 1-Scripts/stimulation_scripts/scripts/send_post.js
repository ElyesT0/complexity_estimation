'use strict';

const saveParticipantData = (participantID, participantData) => {
  axios
    .post(`/api/saveParticipantData`, {
      participantID: participantID,
      participantData: participantData,
    })
    .then((response) => {
      console.log('Data successfully saved:', response.data);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
};

// Call the function when you want to save data
saveParticipantData(participantID, participantData);
