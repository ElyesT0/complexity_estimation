'use strict';

const saveParticipantData = (initial_participantID, participantData) => {
  if (debbug) {
    var participantID = `TEST-${initial_participantID}`;
  } else {
    var participantID = initial_participantID;
  }
  axios

    .post(`http://etabbane.fr:3456/api/saveParticipantData`, {
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
