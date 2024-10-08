'use strict';

// -- Temporary variables
const lan_selected = 'eng';

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

const experimental_elements = ['circles', 'fixation']; // Elements to be displayed all throughout presentation and response phase.
const presentation_phase_elements = []; // Elements that needs to be displayed during the presentation phase.
const response_phase_elements = [
  'container_estimation_complexity',
  'progression_bar',
  'prompt',
]; // Elements that needs to be displayed during the response phase.
var counter_presentation = 0;

/* 
============================================================
+++++++++++++++++++ Experimental Variables +++++++++++++++++
============================================================
*/

const SOA = 400;
const blink = 300; //actual visual duration of the stimuli in ms
const nb_repetition = 2; // number of times the series of sequences are presented
const range_estimation_complexity = 8; // number of complexity buttons
var presentation_time = false; // Tracks if a sequence is currently being presented
var txt_counter = 0;

/* 
======================================================
++++++++++++++++ Data of the Sequences +++++++++++++++
======================================================
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

if (lan_selected === 'Fr') {
  var instruction_training_start = instruction_training_start_fr;
  var instruction_training_end = instruction_training_end_fr;
  var prompt_txt = prompt_txt_fr;
} else {
  var instruction_training_start = instruction_training_start_eng;
  var instruction_training_end = instruction_training_end_eng;
  var prompt_txt = prompt_txt_eng;
}
