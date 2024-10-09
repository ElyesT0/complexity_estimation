'use strict';

/* 
Here we define the functions used to prepare the experiment. Typically, functions used to randomize the presentation order of the stimuli.
*/

/*
======================================================
++++++++++++++ Base functions definition +++++++++++++
======================================================
*/

const shuffle = function (seq) {
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

// -------------------------------------------------------------------------------------------

const makeId = function () {
  let participant_ID = '';
  // >purpose: generating a random ID for participant
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (var i = 0; i < 12; i++) {
    participant_ID += characters.charAt(Math.floor(Math.random() * 36));
  }
  return participant_ID;
};


// -------------------------------------------------------------------------------------------

const randomize_points = function (seq) {
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
