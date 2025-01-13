'use strict';

const saveParticipantData = (
  experiment_name_loc,
  initial_participantID,
  participantData_loc
) => {
  if (debbug) {
    var participantID_loc = `TEST-${initial_participantID}`;
  } else {
    var participantID_loc = initial_participantID;
  }
  console.log('sending data');
  console.log('sent object POST : ', {
    experiment_name: experiment_name_loc,
    participantID: participantID_loc,
    participantData: participantData_loc,
  });
  axios

    .post(`https://etabbane.fr:3456/api/saveParticipantData`, {
      experiment_name: experiment_name_loc,
      participantID: participantID_loc,
      participantData: participantData_loc,
    })
    .then((response) => {
      console.log('Data successfully saved:', response.data);
    })
    .catch((error) => {
      console.error('Error saving data:', error);
    });
};
