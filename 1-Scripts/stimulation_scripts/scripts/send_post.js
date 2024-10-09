'use strict';

const saveParticipantData = (
  post_meg_version,
  initial_participantID,
  participantData
) => {
  if (debbug) {
    var participantID = `TEST-${initial_participantID}`;
  } else {
    var participantID = initial_participantID;
  }
  axios

    .post(`http://etabbane.fr:3456/api/saveParticipantData`, {
      post_meg_version: post_meg_version,
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
