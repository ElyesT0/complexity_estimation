'use strict';

// -- Temporary variables
const lan_selected = 'Fr';
const debbug = false; // FIXME This should ALWAYS BE FALSE before using the code. Change the id of participant to test-id
const post_meg = true; // This parameter is false for the online experiment and true for the post-meg experiment

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

const prompt_txt_eng =
  'How difficult was that sequence to memorize ?<br> 1: Very Easy [...] 7: Impossible';

const prompt_txt_fr =
  'Quelle est le niveau de difficulté de mémorisation de cette séquence ?<br> 1 : Très facile [...] 7 : Impossible';

const end_txt_fr = "L'expérience est terminée. Merci d'avoir participé !";
const end_txt_eng =
  'You successfully completed the experiment. Thank you for your efforts !';

if (lan_selected === 'Fr') {
  var instruction_training_start = instruction_training_start_fr;
  var instruction_training_end = instruction_training_end_fr;
  var prompt_txt = prompt_txt_fr;
  var end_txt = `<div style="font-size:35px">${end_txt_fr}</div>`;
} else {
  var instruction_training_start = instruction_training_start_eng;
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
