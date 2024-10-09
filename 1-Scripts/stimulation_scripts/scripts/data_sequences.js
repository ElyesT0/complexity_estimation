'use strict';

// -- Temporary variables
const lan_selected = 'Fr';
const debbug = false; // FIXME This should ALWAYS BE FALSE before using the code. Change the id of participant to test-id
const post_meg = false; // This parameter is false for the online experiment and true for the post-meg experiment

/* 
============================================================
+++++++++++++++ Participant Device Parameters ++++++++++++++
============================================================
*/

const bodyElement = document.body;
const containerFigureElement = document.querySelector('.container-figure');
const keyEvent = 'touchend'; //'touchend' (smartphone) or 'click' (computer) depending on the device

/* 
============================================================
+++++++++++++++++++ Game dynamics Variables +++++++++++++++++
============================================================
*/
const instruction_elements = ['btn_ok', 'txt_container']; // Elements to be displayed to read the instructions.
const experimental_elements = ['circles', 'fixation']; // Elements to be displayed all throughout presentation and response phase.
const page_next_elements = ['txt_container', 'btn_next']; // Elements that needs to be displayed during the presentation phase.
const response_phase_elements = [
  'container_estimation_complexity',
  'progression_bar',
  'prompt',
]; // Elements that needs to be displayed during the response phase.
var counter_presentation = 0;
var last_click = Date.now();

/* 
============================================================
+++++++++++++++++++ Experimental Variables +++++++++++++++++
============================================================
*/

const SOA = 400;
const blink = 300; //actual visual duration of the stimuli in ms
const nb_repetition = 2; // number of times the series of sequences are presented
const range_estimation_complexity = 7; // number of complexity buttons
const set_delay = 750; //Short delay after end of presentation
var presentation_time = false; // Tracks if a sequence is currently being presented
var txt_counter = 0;

/* 
======================================================
++++++++++++++++ Data of the Sequences +++++++++++++++
======================================================
*/
let sequences;

if (post_meg) {
  sequences = Object.freeze([
    //Experiment 1
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // REP2
    [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], // REP3
    [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], // REP4
    [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2], // REP-Nested
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], // CREP2
    [0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2], // CREP3
    [0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2], // CREP4
    [0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1], // REP-Global
    [0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1], // REP-Local
  ]);
} else {
  sequences = Object.freeze([
    //Experiment 1
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // REP2
    [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], // REP3
    [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], // REP4
    [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2], // REP-Nested
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], // CREP2
    [0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2], // CREP3
    [0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2], // CREP4
    [0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1], // REP-Global
    [0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1], // REP-Local
    //Experiment 2
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
  ]);
}

/* 
======================================================
++++++++++++++++++++ Instructions ++++++++++++++++++++
======================================================
*/

const instruction_training_end_eng = [
  'You will observe sequences of points and rate their difficulty.',
  'Please provide a judgment on each trial, even if you are unsure.',
  'The rating scale is the following <br><br>1: very easy <br>... to <br>7: nearly impossible to remember.',
  'Your ratings will help us better understand human memory and learning.',
];

const instruction_training_end_fr = [
  'Vous allez observer des séquences de points et évaluer leur difficulté.',
  "Donnez un jugement à chaque essai, même si vous n'êtes pas sûr.",
  "L'échelle de notation est la suivante <br><br>1 : très facile <br>... <br>7 : presque impossible à mémoriser.",
  "Vos évaluations nous aideront à mieux comprendre la mémoire et l'apprentissage chez l'humain.",
];

const prompt_txt_eng =
  'How difficult was that sequence to memorize ?<br> 1: Very Easy [...] 7: Impossible';

const prompt_txt_fr =
  'Quelle est le niveau de difficulté de mémorisation de cette séquence ?<br> 1 : Très facile [...] 7 : Impossible';

const end_txt_fr = "L'expérience est terminée. Merci d'avoir participé !";
const end_txt_eng =
  'You successfully completed the experiment. Thank you for your efforts !';

if (lan_selected === 'Fr') {
  var instruction_training_end = instruction_training_end_fr;
  var prompt_txt = prompt_txt_fr;
  var end_txt = `<div style="font-size:35px">${end_txt_fr}</div>`;
} else {
  var instruction_training_end = instruction_training_end_eng;
  var prompt_txt = prompt_txt_eng;
  var end_txt = `<div style="font-size:35px">${end_txt_eng}</div>`;
}

/* 
============================================================
++++++++++++++ Building the stimuli collection +++++++++++++
============================================================
*/

const presentation_number = 2; // Define how many times each sequence is presented
const shuffled_sequences = Array(presentation_number)
  .fill() // Create an array with 'presentation_number' undefined elements
  .flatMap(() => shuffle(sequences.slice())); // Shuffle and flatten the array
const randomized_sequences = randomize_points(shuffled_sequences);

/* 
============================================================
+++++++++++++++++ Participant Data Variables +++++++++++++++
============================================================
*/
const participant_id = makeId();

var participantData = new ParticipantCl();
participantData.participant_id = Array(randomized_sequences.length).fill(
  participant_id
);
participantData.sequences_structure = shuffled_sequences;
participantData.sequences_shown = randomized_sequences;
participantData.participant_startTime = Array(randomized_sequences.length).fill(
  Date.now()
);
participantData.participant_language = Array(randomized_sequences.length).fill(
  lan_selected
);
participantData.experiment_SOA = Array(randomized_sequences.length).fill(SOA);
participantData.experiment_blink = Array(randomized_sequences.length).fill(
  blink
);
participantData.experiment_rangeEstimationComplexity = Array(
  randomized_sequences.length
).fill(range_estimation_complexity);
participantData.participant_timings = Array(randomized_sequences.length).fill(
  -1
);
participantData.participant_response = Array(randomized_sequences.length).fill(
  -1
);
participantData.participant_screenHeight = Array(
  randomized_sequences.length
).fill(window.screen.height);
participantData.participant_screenWidth = Array(
  randomized_sequences.length
).fill(window.screen.width);
