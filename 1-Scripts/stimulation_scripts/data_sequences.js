'use strict';

/* NOTE
======================================================
++++++++++++++++ Data of the Sequences +++++++++++++++
======================================================
*/
/*
const sequences_training = [
  // only used for the training phase: use to train and calibrate experiment
  [0, 1, 2, 3, 0, 1, 2, 3],
  [1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
];
*/

const sequences_training = [
  // only used for the training phase: use to train and calibrate experiment
  [0, 1, 2, 3, 0, 1, 2, 3],
  [1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
  //PHASE 2 training: learning sequence length
  [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5],
  //PHASE 3 training: learning repetitions
  [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3],
  [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0],
];

/*
const sequences = [
  [0, 1, 0, 1],
  [1, 2, 3, 1, 2, 3],
];
*/

const sequences = [
  [0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3], // Play 4 Tokens
  [0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3], // Contrôle Play-4 Tokens
  [0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0], // Sub-programs 1
  [0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0], // Contrôle sub-programs 1
  [0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5], // Sub-programs 2
  [0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5], // Contrôle sub-programs 2
  [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i
  [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
  [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play
  [0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4], // Insertion
  [0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2], // Suppression (contrôle insertion)
  [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Miroir 1
  [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Miroir 1
  [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Miroir 2
  [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Miroir 2
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], // token:2 ; repetition: 6
  [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], // token:3 ; repetition: 4
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4], // token:4 ; repetition: 3
  [1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3], // token:3 ; repetition: 2levels/nested
  [1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2], // token:2 ; repetition: 6; control
  [1, 2, 3, 1, 3, 2, 2, 3, 1, 2, 1, 3], // token:3 ; repetition: 4; control; no structure
  [1, 2, 3, 4, 3, 2, 4, 1, 1, 4, 2, 3], // token:4 ; repetition: 3; control
  [1, 2, 3, 1, 3, 2, 1, 2, 3, 1, 3, 2], // token:3 ; repetition: 2levels/nested; control 1 global repetition but not local
  [1, 1, 2, 2, 3, 3, 1, 1, 3, 3, 2, 2], // token:3 ; repetition: 2levels/nested; control 2 local repetition but not global
];

/*
const sequences = [
  [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], // token:2 ; repetition: 6
  [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], // token:3 ; repetition: 4
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4], // token:4 ; repetition: 3
  [1, 1, 2, 2, 3, 3, 1, 1, 2, 2, 3, 3], // token:3 ; repetition: 2levels/nested
  [1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 2], // token:2 ; repetition: 6; control
  [1, 2, 3, 1, 3, 2, 2, 3, 1, 2, 1, 3], // token:3 ; repetition: 4; control; no structure
  [1, 2, 3, 4, 3, 2, 4, 1, 1, 4, 2, 3], // token:4 ; repetition: 3; control
  [1, 2, 3, 1, 3, 2, 1, 2, 3, 1, 3, 2], // token:3 ; repetition: 2levels/nested; control 1 global repetition but not local
  [1, 1, 2, 2, 3, 3, 1, 1, 3, 3, 2, 2], // token:3 ; repetition: 2levels/nested; control 2 local repetition but not global
];
*/
// const sequences = [[1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3]];

var progress = 0; //Represent the progression of the participant towards the end of the experiment
var completion = 0; //Represent the percentage of completion of the experiment
var feedbackTXT = '';
var distanceDL;
var lan_selected = sessionStorage.getItem('lan_selected');
const nb_repetition = 2; // number of times the series of sequences are presented
const blink = 300; //actual visual duration of the stimuli in ms
const SOA = 400;
const initialScore = 1000; //Starting number of points for the score
const keyEvent = 'touchend'; //touchend or click depending on the device
const set_delay = 750; //Short delay before start/end of presentation
const break_time = 1500; //Delay between end of presentation and start of reproduction
const instruction_training_start_eng = [
  'A sequence of points will be presented to you. Try to memorize it.',
  "After a short delay, you'll be asked to reproduce it. Please use your index finger.",
  'Once you are done, push one of the buttons at the bottom of the screen to bet on your guess. The higher your bet, the higher your potential gains or losses!',
  'You have to enter at least 3 points before you are able to bet.',
];
const instruction_training_end_eng = [
  'Congratulation, you were successful in completing the training!',
  'The following game will be more challenging. Even if you do not know, please try to give an answer on each trial.',
  'All your answers and mistakes will give us valuable insight into the human mind.',
  'You will now start the full experiment.',
];

const instruction_training_start_fr = [
  'Une séquence de points vous sera présentée. Essayez de la mémoriser.',
  'Après un court délai, vous devrez la reproduire. Veuillez utiliser votre index.',
  "Une fois terminé, appuyez sur l'un des boutons en bas de l'écran pour parier sur votre estimation. Plus vous misez, plus vos gains ou pertes potentiels sont élevés !",
  'Vous devez saisir au moins 3 points avant de pouvoir parier.',
];

const instruction_training_end_fr = [
  "Félicitations, vous avez réussi à terminer l'entraînement !",
  'Le jeu suivant sera plus difficile. Même si vous ne savez pas, essayez de donner une réponse à chaque essai.',
  "Toutes vos réponses et erreurs nous fourniront des informations précieuses sur l'esprit humain.",
  "Vous allez maintenant commencer l'expérience complète.",
];

if (lan_selected === 'Fr') {
  var instruction_training_start = instruction_training_start_fr;
  var instruction_training_end = instruction_training_end_fr;
} else {
  var instruction_training_start = instruction_training_start_eng;
  var instruction_training_end = instruction_training_end_eng;
}
/* NOTE
======================================================
++++++++++++++ Base functions definition +++++++++++++
======================================================
*/

const shuffle = function (seq = randomized_sequences) {
  // purpose: shuffle the sequences by switching positions of the sequences in the array several times

  for (let i = 0; i < seq.length; i++) {
    let rand_1 = Math.trunc(Math.random() * seq.length);
    let rand_2 = Math.trunc(Math.random() * seq.length);
    let temp = seq[rand_1];
    seq[rand_1] = seq[rand_2];
    seq[rand_2] = temp;
  }

  return seq;
};

const makeId = function () {
  let participant_ID = '';
  // >purpose: generating a random ID for participant
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 12; i++) {
    participant_ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return participant_ID;
};

const randomize_points = function (seq = sequences) {
  // >purpose: randomize spatial positions while saving structure of sequences

  /* avec cette méthode toutes les séquences doivent être inscrites sous forme
1,2,3,4... ou 1,2,3... etc. Mais 2,4,5... ne fonctionnent pas.
*/
  var unique_sequences = []; // will contain the unique positions of each sequence
  var randomized_uniques = []; // will contain the randomized unique positions of each sequence

  for (let i = 0; i < seq.length; i++) {
    // >purpose: fill the unique_sequences array with unique positions of the sequences array
    unique_sequences.push([...new Set(seq[i])]);
  }
  let rand_sequence = [];
  let temp = [0, 1, 2, 3, 4, 5];
  let arr = [];
  for (let k = 0; k < seq.length; k++) {
    // will be in the big for loop
    temp = [0, 1, 2, 3, 4, 5];
    shuffle(temp);
    arr = [];
    for (let i = 0; i < unique_sequences[k].length; i++) {
      arr.push(temp.shift());
    }
    randomized_uniques.push(arr);
    temp = [];

    for (let i = 0; i < seq[k].length; i++) {
      if (seq[k][i] == unique_sequences[k][0]) {
        temp.push(randomized_uniques[k][0]);
      } else if (seq[k][i] == unique_sequences[k][1]) {
        temp.push(randomized_uniques[k][1]);
      } else if (seq[k][i] == unique_sequences[k][2]) {
        temp.push(randomized_uniques[k][2]);
      } else if (seq[k][i] == unique_sequences[k][3]) {
        temp.push(randomized_uniques[k][3]);
      } else if (seq[k][i] == unique_sequences[k][4]) {
        temp.push(randomized_uniques[k][4]);
      } else {
        temp.push(randomized_uniques[k][5]);
      }
    }
    rand_sequence.push(temp);
  }
  return rand_sequence;
};

/* NOTE
======================================================
++++++++++++++ Communication with server +++++++++++++
======================================================
*/

function send_post(data) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    'POST',
    'https://private.unicog.org/manip_meg/code_ext/test_save_data_here/test2.php',
    true
  );
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onload = function () {
    if (xhr.status === 200 && xhr.responseText !== 'GOT IT') {
      // document.body.innerHTML += xhr.responseText;
    } else if (xhr.status !== 200) {
      // alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(encodeURI('filedata=' + data));
  console.log('Data has been sent');
}

function convertCSV(obj) {
  // >purpose: convert a javascript object to a string with a CSV format

  //variables for the keys
  let keys = Object.keys(obj);

  //variables for the values
  let values = Object.values(obj);
  let csv = '';
  csv = csv + keys + '\n';
  for (let i = 0; i < obj.performance.length; i++) {
    for (let k = 0; k < keys.length; k++) {
      // Loop over the number of keys to get all the keys' values one after the other in a line
      try {
        //Case 1: the value considered is an array (e.g. original_seq, response_seq_before, interclick_timings_before, ...)
        if (typeof values[k] === 'object') {
          csv = csv + '"' + values[k][i] + '",';
        } else if (typeof values[k] === 'string') {
          csv = csv + '"' + values[k] + '"' + ',';
        } else {
          //Case 2: the value considered is a string or a single element (e.g. counter, current_score, SOA...)

          csv = csv + values[k] + ',';
        }
      } catch (error) {
        csv = csv + '"",';
      }
    }
    csv = csv + '\n';
  }
  return csv;
}

/*
function convertCSV(obj, fileName) {
  // >purpose: convert a javascript object to a string with a CSV format

  //variables for the keys
  let keys = Object.keys(obj);
  let temp = [];
  let txt_keys = '';

  //variables for the values
  let values = Object.values(obj);
  let txt_values = '';

  for (let i = 0; i < keys.length; i++) {
    temp.push(keys[i]);
  }
  txt_keys = temp.join(',') + '\n';

  for (let k = 0; k < obj['seq'].length; k++) {
    for (let i = 0; i < keys.length; i++) {
      if (typeof values[i] == 'string') {
        txt_values += `${values[i]},`;
      } else if (typeof values[i] == 'number') {
        txt_values += `${values[i]},`;
      } else {
        txt_values += `"${values[i][k]}",`;
      }
    }
    txt_values += '\n';
  }

  let csv = txt_keys + txt_values;
  fileName += `${obj.participant_id}`;

  // let csvData = new Blob([csv], { type: "text/csv" });
  // let csvUrl = URL.createObjectURL(csvData);

  // let hiddenElement = document.createElement("a");
  // hiddenElement.href = csvUrl;
  // hiddenElement.target = "_blank";
  return csv;
}
*/

/* NOTE
======================================================
+++++++++++++++ Score and progress bar +++++++++++++++
======================================================
*/

function correct_tokens(seqResp, seqRef) {
  //>purpose: check if all the points answered are in the sequence shown
  let test_bool = 0; //equal to 1 if at least one of the element isn't in the reference sequence
  for (let i = 0; i < seqResp.length; i++) {
    if (seqRef.includes(seqResp[i]) == 0) {
      test_bool = 1;
    }
  }
  return test_bool;
}

function increase() {
  // >purpose: make a more dynamic progression update
  // Change the variable to modify the speed of the number increasing from 0 to (ms)
  let SPEED = 15;
  // Retrieve the percentage value
  let limit = parseInt(document.getElementById('value1').innerHTML, 0);

  for (let i = 0; i <= limit; i++) {
    setTimeout(function () {
      document.getElementById('value1').innerHTML = i + '%';
    }, SPEED * i);
  }
}

function update_progression(percent) {
  // >purpose: Visually Update the progression Bar
  document.documentElement.style.setProperty('--my-end-width', `${percent}%`);
  value1.textContent = `${percent}%`;
}

function damerauLevenshteinDistance(str1, str2) {
  const matrix = Array.from({ length: str1.length + 1 }, () =>
    Array(str2.length + 1).fill(0)
  );

  for (let i = 0; i <= str1.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );

      if (
        i > 1 &&
        j > 1 &&
        str1[i - 1] === str2[j - 2] &&
        str1[i - 2] === str2[j - 1]
      ) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost);
      }
    }
  }

  return matrix[str1.length][str2.length];
}

function score_update(
  origin_seq,
  repro_seq,
  bet,
  initialScore,
  txt_score_element
) {
  //>purpose: update the score based on bet and performance in reproduction (damerauLevenshtein distance)
  /* NOTE: this allows to have a more accurate score update => the more similar the produced
  sequence to the presented sequence, the more point. Instead of all or none. */

  let distDL = damerauLevenshteinDistance(origin_seq, repro_seq); //Damerau-Levenshtein distance
  //NOTE score must be negative if Damerau-Levenshtein distance ≥5 and positive if <5
  // score_dl will be in [-1;1]

  if (distDL >= 5) {
    var score_dl = -distDL / origin_seq.length;
  } else {
    var score_dl = (origin_seq.length - distDL) / origin_seq.length;
  }

  //compute new score
  var final_score;
  if (initialScore === 0) {
    final_score = initialScore;
    //Do nothing we don't want negative scores
  } else {
    if (correct_tokens(repro_seq, origin_seq)) {
      final_score = Math.round(-bet) + initialScore;
    } else {
      final_score = Math.round(score_dl * bet) + initialScore;
    }
  }

  if (final_score < 0) {
    final_score = 0;
  } else {
    //do nothing
  }

  /* progression bar updating */
  progress += 1; //FIXME recent addition, increment the progress, replace with increase
  completion = Math.floor((100 * progress) / (2 * sequences.length));

  //>purpose: set the variables that will give word and sound feedback to participants
  if (correct_tokens(repro_seq, origin_seq)) {
    if (lan_selected == 'Fr') {
      feedbackTXT = 'Erreur de position';
    } else {
      feedbackTXT = 'Wrong position';
    }
  } else {
    if (distDL == 0) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Parfait';
      } else {
        feedbackTXT = 'Flawless';
      }
    } else if (distDL == 1) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Incroyable!';
      } else {
        feedbackTXT = 'Genius';
      }
    } else if (distDL == 2) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Génial!';
      } else {
        feedbackTXT = 'Amazing!';
      }
    } else if (distDL == 3) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Très bien!';
      } else {
        feedbackTXT = 'Great!';
      }
    } else if (distDL == 4) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Bravo!';
      } else {
        feedbackTXT = 'Well done';
      }
    } else if (distDL == 5) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Presque';
      } else {
        feedbackTXT = 'Almost';
      }
    } else if (distDL == 6) {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Pas loin';
      } else {
        feedbackTXT = 'That was close';
      }
    } else {
      if (lan_selected == 'Fr') {
        feedbackTXT = 'Faux';
      } else {
        feedbackTXT = 'Try again';
      }
    }
  }

  //Adjust position of feedback text so that it is somewhat centered
  /*
  if (feedbackTXT.split(' ').length == 1) {
    txt_score_element.style.transform = `translate(-${
      50 + feedbackTXT.length * 8
    }px,-50px)`;
  } else if (feedbackTXT.split(' ').length == 2) {
    txt_score_element.style.transform = `translate(-${
      50 +
      Math.max(
        feedbackTXT.split(' ')[0].length,
        feedbackTXT.split(' ')[1].length
      ) *
        8
    }px,-50px)`;
  } else if (feedbackTXT.split(' ').length == 3) {
    txt_score_element.style.transform = `translate(-${
      50 +
      Math.max(
        feedbackTXT.split(' ')[0].length,
        feedbackTXT.split(' ')[1].length,
        feedbackTXT.split(' ')[2].length
      ) *
        8
    }px,-50px)`;
  } else {
    txt_score_element.style.transform = `translate(-${
      50 + feedbackTXT.length
    }px,-50px)`;
  }*/

  return { final_score: final_score, feedbackTXT: feedbackTXT };
}

/* NOTE
======================================================
+++++++++++++++++++++ Final ranking ++++++++++++++++++
======================================================
*/
// DOM manipulation variables
const successRate_ranking = document.getElementById('success--rate--ranking');
const score_ranking = document.getElementById('score--ranking');
var rankValue_score = 0;
// var rankValue_successRate = 0;

const final_rank = function (/*success_rate,*/ finalScore) {
  //>purpose: compute the rank of the participant compared to previous pilot studies
  //-----------> According to success rate
  /* FIXME removed
  if (success_rate == 1) {
    rankValue_successRate = 0.0001;
  } else if (success_rate >= 0.8) {
    rankValue_successRate = 0.001;
  } else if (success_rate >= 0.7) {
    rankValue_successRate = 0.01;
  } else if (success_rate >= 0.65) {
    rankValue_successRate = 0.03;
  } else if (success_rate > 0.6) {
    rankValue_successRate = 0.05;
  } else if (success_rate >= 0.55) {
    rankValue_successRate = 0.1;
  } else if (success_rate >= 0.5) {
    rankValue_successRate = 0.2;
  } else if (success_rate >= 0.4) {
    rankValue_successRate = 0.3;
  } else if (success_rate >= 0.35) {
    rankValue_successRate = 0.4;
  } else if (success_rate >= 0.3) {
    rankValue_successRate = 0.5;
  } else if (success_rate >= 0.25) {
    rankValue_successRate = 0.6;
  } else if (success_rate >= 0.2) {
    rankValue_successRate = 0.7;
  } else if (success_rate >= 0.15) {
    rankValue_successRate = 0.8;
  } else {
    rankValue_successRate = 0.99;
  }
*/
  //-----------> According to final score
  if (finalScore >= 6000) {
    rankValue_score = 0.0001;
  } else if (finalScore >= 4000) {
    rankValue_score = 0.001;
  } else if (finalScore >= 3500) {
    rankValue_score = 0.01;
  } else if (finalScore >= 3300) {
    rankValue_score = 0.03;
  } else if (finalScore > 3000) {
    rankValue_score = 0.05;
  } else if (finalScore >= 2800) {
    rankValue_score = 0.1;
  } else if (finalScore >= 2600) {
    rankValue_score = 0.2;
  } else if (finalScore >= 2500) {
    rankValue_score = 0.3;
  } else if (finalScore >= 2300) {
    rankValue_score = 0.4;
  } else if (finalScore >= 2000) {
    rankValue_score = 0.5;
  } else if (finalScore >= 1800) {
    rankValue_score = 0.6;
  } else if (finalScore >= 1600) {
    rankValue_score = 0.7;
  } else if (finalScore >= 1000) {
    rankValue_score = 0.8;
  } else {
    rankValue_score = 0.99;
  }
  const low_limit = 0.5; //rate of success under which the feedback message becomes negative
  if (lan_selected == 'Fr') {
    //NOTE FRench
    /*
    if (rankValue_successRate > low_limit) {
      successRate_ranking.textContent = `${Math.trunc(
        (1 - rankValue_successRate) * 100
      )}% des plus basses performances.`;
    } else if (rankValue_successRate < 0.01) {
      successRate_ranking.textContent = `TOP ${
        rankValue_successRate * 100
      }% meilleurs joueurs`;
    } else {
      successRate_ranking.textContent = `TOP ${Math.trunc(
        rankValue_successRate * 100
      )}% meilleurs joueurs`;
    }
    */
    if (rankValue_score > low_limit) {
      score_ranking.textContent = `${Math.trunc(
        (1 - rankValue_score) * 100
      )}% des plus basses performance.`;
    } else if (rankValue_score < 0.01) {
      score_ranking.textContent = `TOP ${
        rankValue_score * 100
      }% meilleurs joueurs`;
    } else {
      score_ranking.textContent = `TOP ${Math.trunc(
        rankValue_score * 100
      )}% meilleurs joueurs`;
    }
  } else {
    //NOTE ENglish
    if (rankValue_score > low_limit) {
      score_ranking.textContent = `BOTTOM ${Math.trunc(
        (1 - rankValue_score) * 100
      )}% performance`;
    } else if (rankValue_score < 0.01) {
      score_ranking.textContent = `TOP ${
        rankValue_score * 100
      }% best performers`;
    } else {
      score_ranking.textContent = `TOP ${Math.trunc(
        rankValue_score * 100
      )}% best performers`;
    }
  }
};

/* NOTE
======================================================
+++++++++++++++ Execution of the script ++++++++++++++
======================================================
*/

var current_ID = makeId();

var shuffled_sequences = shuffle(sequences);
var randomized_core_sequences = randomize_points(shuffled_sequences); // Shuffled sequences with random points (see data_sequence for detail on function)

var bloc2_sequences = [...sequences]; // Bloc 2 sequences are 2 times the sequences presented in bloc 1
var shuffled_bloc2_sequences = shuffle(bloc2_sequences);
var randomized_bloc2_sequences = randomize_points(shuffled_bloc2_sequences);

var randomized_sequences = [
  ...randomized_core_sequences,
  ...randomized_bloc2_sequences,
]; // we put all the randomized sequences in the same array that will be run in the experiment
