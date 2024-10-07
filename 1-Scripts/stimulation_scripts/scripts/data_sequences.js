'use strict';

// -- FIXME -- These will disappear but I need to define those variables artificially for development
var txt_counter = 0;

/*----------------------------------------------------------------------------------------------------------
 ******************************************** Experimental Data ********************************************
----------------------------------------------------------------------------------------------------------*/

// -- Retrieve selected Language
var lan_selected = sessionStorage.getItem('lan_selected');

// -- Experimental Parameters --

const blink = 300; //actual visual duration of the stimuli in ms
const SOA = 400;
const keyEvent = 'touchend'; //touchend or click depending on the device
const set_delay = 750; //Short delay before start of presentation
const break_time = 1500; //Delay between end of presentation and participant answer

// -- Training Sequences --
const sequences_training = [
  [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5],
  [2, 4, 1, 0, 5, 3, 4, 0, 1, 3, 2, 5],
  [5, 0, 4, 1, 3, 2, 5, 0, 4, 1, 3, 2], // ZigZag
];

// -- Test Sequences --
const sequences_test = [
  // Experiment 1 : Repetition Based Sequences
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Rep2
  [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], // CRep2

  [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], // Rep3
  [0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2], // CRep3

  [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], // Rep4
  [0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2], // CRep4

  [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2], // RepNested
  [0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1], // CRepNest-NoLocal
  [0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1], // CRepNest-NoGlobal

  // Experiment 2 : Extension
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
];

// -- Instructions --
const instruction_training_start_eng = [];
const instruction_training_end_eng = [];

const instruction_training_start_fr = [];

const instruction_training_end_fr = [];

if (lan_selected === 'Fr') {
  var instruction_training_start = instruction_training_start_fr;
  var instruction_training_end = instruction_training_end_fr;
} else {
  var instruction_training_start = instruction_training_start_eng;
  var instruction_training_end = instruction_training_end_eng;
}
