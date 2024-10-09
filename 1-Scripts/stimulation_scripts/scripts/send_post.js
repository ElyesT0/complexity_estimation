'use strict';

const saveParticipantData = (
  post_meg_version,
  multiplied_participantID,
  participantData
) => {
  var initial_participantID = multiplied_participantID[0];
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
