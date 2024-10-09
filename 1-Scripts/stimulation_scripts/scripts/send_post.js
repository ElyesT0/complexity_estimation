'use strict';

const saveParticipantData = (initial_participantID, participantData) => {
  if (debbug) {
    participantID = `TEST-${initial_participantID}`;
  } else {
    participantID = initial_participantID;
  }
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
