'use strict';

// -- Get language of participant
const lan_selected = sessionStorage.getItem('language-selected') || 'en';
const debbug = false; // FIXME This should ALWAYS BE FALSE before using the code. Change the id of participant to test-id
const post_meg = false; // This parameter is false for the online experiment and true for the post-meg experiment

// -- Retrieve survey results
let surveyResults = sessionStorage.getItem('surveyChoices');
if (surveyResults) {
  // Parse the JSON string back into an object
  surveyResults = JSON.parse(surveyResults);
} else {
  console.log('No survey data found in sessionStorage.');
}

/* 
============================================================
+++++++++++++++ Participant Device Parameters ++++++++++++++
============================================================
*/

const bodyElement = document.body;
const containerFigureElement = document.querySelector('.container-figure');
const keyEvent = 'click'; //'touchend' (smartphone) or 'click' (computer) depending on the device

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

// ---------------------------------------------------
// -- Sequence expressions
//
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
    // +++++++++++++++++
    //+++++ Experiment 1
    //
    // ----- REP2
    // - distance between two points = 1
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], // CREP2

    // - distance between two points = 2
    [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2],
    [0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2], // CREP2

    // - distance between two points = 3
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
    [0, 3, 3, 3, 3, 0, 0, 3, 0, 0, 0, 3], // CREP2

    // ----- REP3
    // Rotation cluster form
    [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], // REP3
    [0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2], // CREP3

    // Triangle + rotation form
    [0, 2, 4, 0, 2, 4, 0, 2, 4, 0, 2, 4], // REP3
    [0, 2, 4, 0, 4, 2, 2, 4, 0, 2, 0, 4], // CREP3

    // 2 groups
    [0, 5, 3, 0, 5, 3, 0, 5, 3, 0, 5, 3], // REP3
    [0, 5, 3, 0, 3, 5, 5, 3, 0, 5, 0, 3], // CREP3

    // ----- REP4
    // Rotation +1
    [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], // REP4
    [0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2], // CREP4

    // Zhang geometrical shape-23
    [0, 2, 5, 3, 0, 2, 5, 3, 0, 2, 5, 3], // REP4
    [0, 2, 5, 3, 5, 2, 3, 0, 0, 3, 2, 5], // CREP4

    // Zhang geometrical shape-30
    [0, 3, 2, 5, 0, 3, 2, 5, 0, 3, 2, 5], // REP4
    [0, 3, 2, 5, 2, 3, 5, 0, 0, 5, 3, 2], // CREP4

    // ---- REP-Nested
    // Rotation +1
    [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2], // REP-Nested
    [0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1], // REP-Global
    [0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1], // REP-Local

    // Triangle + rotation form
    [0, 0, 2, 2, 4, 4, 0, 0, 2, 2, 4, 4], // REP-Nested
    [0, 2, 4, 0, 4, 2, 0, 2, 4, 0, 4, 2], // REP-Global
    [0, 0, 2, 2, 4, 4, 0, 0, 4, 4, 2, 2], // REP-Local

    // 2 groups
    [0, 0, 5, 5, 3, 3, 0, 0, 5, 5, 3, 3], // REP-Nested
    [0, 5, 3, 0, 3, 5, 0, 5, 3, 0, 3, 5], // REP-Global
    [0, 0, 5, 5, 3, 3, 0, 0, 3, 3, 5, 5], // REP-Local

    // +++++++++++++++++
    //+++++ Experiment 2
    //
    // ----- 4 Tokens
    // Rotation +1 [0,1,2,3]
    // Zhang geometrical shape-23 [0,2,5,3]
    // Zhang geometrical shape-30 [0,3,5,2]

    // ----- Play 4 Tokens
    // Rotation +1 [0,1,2,3]
    [0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3], // Play 4 Tokens
    [0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3], // Contrôle Play-4 Tokens

    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3], // Play 4 Tokens
    [0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3], // Contrôle Play-4 Tokens

    // Zhang geometrical shape-30 [0,3,5,2]
    [0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3], // Play 4 Tokens
    [0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3], // Contrôle Play-4 Tokens

    // ----- 4 Tokens
    // Rotation +1 [0,1,2,3]
    // Zhang geometrical shape-23 [0,2,5,3]
    // Zhang geometrical shape-30 [0,3,5,2]
    [0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0], // Sub-programs 1
    [0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0], // Contrôle sub-programs 1

    // ----- 6 Tokens
    [0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5], // Sub-programs 2
    [0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5], // Contrôle sub-programs 2

    // ----- Indice i (2tokens)
    // - distance between two points = 1
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i

    // - distance between two points = 2
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i
    // - distance between two points = 3
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i

    // ----- 4 Tokens
    // Rotation +1 [0,1,2,3]
    [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
    [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
    [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play
    // Zhang geometrical shape-30 [0,3,5,2]
    [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
    [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play

    // 5 Tokens
    [0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4], // Insertion
    [0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2], // Suppression (contrôle insertion)

    // ----- 4 Tokens
    // Rotation +1 [0,1,2,3]
    [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Miroir 1
    [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Miroir 1
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Miroir 1
    [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Miroir 1
    // Zhang geometrical shape-30 [0,3,5,2]
    [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Miroir 1
    [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Miroir 1

    // ----- 4 Tokens
    // Rotation +1 [0,1,2,3]
    [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Miroir 2
    [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Miroir 2
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Miroir 2
    [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Miroir 2
    // Zhang geometrical shape-30 [0,3,5,2]
    [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Miroir 2
    [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Miroir 2

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
    // ----- 6 Tokens
    [0, 3, 4, 1, 4, 1, 2, 5, 5, 3, 0, 2], //probe-hard, version 1
    [0, 1, 2, 3, 2, 3, 4, 5, 5, 1, 0, 4], //probe-hard, version 2
    [1, 2, 3, 4, 3, 4, 5, 0, 0, 2, 1, 5], //probe-hard, version 3
    [0, 1, 5], //probe-hard, version 4
    [0, 1, 2, 3, 2, 3, 4, 5, 5, 1, 0, 4], //probe-hard, version 5
  ]);
}

const training_sequences = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 5, 1, 4, 3, 3, 2, 0, 5, 3, 0],
  [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 4, 5, 2, 5, 2, 3, 0, 0, 4, 1, 3],
];

// ---------------------------------------------------
// -- Sequence Names / Tags / Dictionary
//

const sequences_tags = {
  'training-1': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  'training-2': [0, 3, 5, 1, 4, 3, 3, 2, 0, 5, 3, 0],
  'training-3': [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
  'training-4': [1, 4, 5, 2, 5, 2, 3, 0, 0, 4, 1, 3],
  'probe-easy': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
  'probe-hard': [0, 3, 4, 1, 4, 1, 2, 5, 5, 3, 0, 2], //probe-hard

  'Rep-2': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // REP2
  'Rep-3': [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2], // REP3
  'Rep-4': [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], // REP4
  'Rep-Nested': [0, 0, 1, 1, 2, 2, 0, 0, 1, 1, 2, 2], // REP-Nested
  'CRep-2': [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1], // CREP2
  'CRep-3': [0, 1, 2, 0, 2, 1, 1, 2, 0, 1, 0, 2], // CREP3
  'CRep-4': [0, 1, 2, 3, 2, 1, 3, 0, 0, 3, 1, 2], // CREP4
  'CRep-Nested-Global': [0, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 1], // REP-Global
  'CRep-Nested-Local': [0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 1, 1], // REP-Local

  'Play-4': [0, 1, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3], // Play 4 Tokens
  'CPlay-4': [0, 1, 0, 2, 1, 3, 0, 1, 0, 2, 1, 3], // Contrôle Play-4 Tokens
  'Sub-1': [0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0], // Sub-programs 1
  'CSub-1': [0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0], // Contrôle sub-programs 1
  'Sub-2': [0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5], // Sub-programs 2
  'CSub-2': [0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5], // Contrôle sub-programs 2
  Index: [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
  CIndex: [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i
  Play: [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
  CPlay: [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play
  Insertion: [0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4], // Insertion
  Suppression: [0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2], // Suppression (contrôle insertion)
  'Mirror-1': [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Miroir 1
  'CMirro-1': [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Miroir 1
  'Mirror-2': [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Miroir 2
  'CMirror-2': [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Miroir 2
};

// -- Reverse dictionary. Associates the sequences expressions to the tags.
const reverse_sequences_tags = Object.fromEntries(
  Object.entries(sequences_tags).map(([key, value]) => [value, key])
);

/* 
======================================================
++++++++++++++++++++ Text holders ++++++++++++++++++++
======================================================
*/
// --------------------------------------------------------------
// -- Instructions
//
const instruction_training_end_eng = [
  'Sequences of dots will be presented to you.',
  'Please rate their complexity.',
  'Please maintain your gaze on the fixation cross at the center of the screen',
  'The rating scale is the following <br><br>1: very simple <br>... to <br>7: very complex.',
];

const instruction_training_end_fr = [
  'Des séquences de points vont vous être présentées.',
  'Veuillez évaluer leur complexité.',
  "Veuillez maintenir votre regard sur la croix de fixation au centre de l'écran.",
  "L'échelle d'évaluation est la suivante <br><br>1 : très simple <br>... à <br>7 : très complexe.",
];

// --------------------------------------------------------------
// -- Trial Prompts
//
const prompt_txt_eng =
  'How difficult was that sequence to memorize ?<br> 1: Very Simple [...] 7: Very Complex';

const prompt_txt_fr =
  'Quelle est le niveau de difficulté de mémorisation de cette séquence ?<br> 1 : Très facile [...] 7 : Impossible';

// --------------------------------------------------------------
// -- Training Text
//

const training_prompt_txt_eng = [
  'This sequence was really simple ! <br>So you should click 1.',
  'This sequence was super complex ! <br>So you should click 7.',
  "Now it's your turn ! What was the complexity of this sequence?",
];
const training_prompt_txt_fr = [
  'Cette séquence était vraiment simple ! <br>Donc vous devez cliquer sur 1.',
  'Cette séquence était vraiment complexe ! <br>Donc vous devez cliquer sur 7.',
  'A vous de jouer ! Quelle était la complexité de cette séquence ?',
];

const training_feedback_eng = ['The right answer was :'];
const training_feedback_fr = ['La bonne réponse était :'];

const transition_instructions_eng =
  '<div>The experiment will now start.<br>Stay focused!<br>At the end of the experiment you will get a rating of how close you are to the optimal guesser.</div>';
const transition_instructions_fr =
  "<div>L'expérience va maintenant commencer.<br>Restez concentré.e !<br>À la fin de l'expérience, vous recevrez une évaluation de votre proximité avec l'estimateur idéal.</div>";

// --------------------------------------------------------------
// -- Ending Text
//
const end_txt_fr = "L'expérience est terminée. Merci d'avoir participé !";
const end_txt_eng =
  'You successfully completed the experiment. Thank you for your efforts !';

const next_txt_fr = 'Vous avez répondu';
const next_txt_eng = 'You responded';

// --------------------------------------------------------------
// -- Language selection
//

if (lan_selected === 'fr') {
  var instruction_training_end = instruction_training_end_fr;
  var prompt_txt = prompt_txt_fr;
  var end_txt = `<div style="font-size:35px">${end_txt_fr}</div>`;
  var next_txt = next_txt_fr;
  var training_prompt_txt = training_prompt_txt_fr;
  var training_feedback_txt = training_feedback_fr;
  var transition_instructions = transition_instructions_fr;
} else {
  var instruction_training_end = instruction_training_end_eng;
  var prompt_txt = prompt_txt_eng;
  var end_txt = `<div style="font-size:35px">${end_txt_eng}</div>`;
  var next_txt = next_txt_eng;
  var training_prompt_txt = training_prompt_txt_eng;
  var training_feedback_txt = training_feedback_eng;
  var transition_instructions = transition_instructions_eng;
}

/* 
============================================================
++++++++++++++ Building the stimuli collection +++++++++++++
============================================================
*/

// Define training 'right answers'
const training_answer_examples = [1, 7, 1, 7];
// Define how many times each sequence is presented.
const presentation_number = 2;

// Sequences need to be presented in random order.
const shuffled_sequences = Array(presentation_number)
  .fill() // Create an array with 'presentation_number' undefined elements
  .flatMap(() => shuffle(sequences.slice())); // Shuffle and flatten the array

// Keep temporal structure but randomize the points.
const randomized_sequences = randomize_points(shuffled_sequences);

// We put training sequences and testing sequences with preserved structure in a same object. Used to tag sequences and to keep the original structure.
const original_sequence_train_test = [
  ...training_sequences,
  ...shuffled_sequences,
];

// We put training sequences and testing sequences (already randomized and shuffled) in a same object. Used to present stimuli to participants.
const sequence_train_test = [...training_sequences, ...randomized_sequences];

/* 
============================================================
+++++++++++++++++ Participant Data Variables +++++++++++++++
============================================================
*/
const participant_id = makeId();

// Fill the participantData object which will be sent to the server.
var participantData = new ParticipantCl();
participantData.participant_id = Array(sequence_train_test.length).fill(
  participant_id
);
participantData.sequences_tags = original_sequence_train_test.map(
  (seq_exp) => reverse_sequences_tags[seq_exp.join(',')]
);
participantData.sequences_structure = original_sequence_train_test;
participantData.sequences_shown = sequence_train_test;
participantData.participant_startTime = Array(sequence_train_test.length).fill(
  Date.now()
);
participantData.participant_language = Array(sequence_train_test.length).fill(
  lan_selected
);
participantData.experiment_SOA = Array(sequence_train_test.length).fill(SOA);
participantData.experiment_blink = Array(sequence_train_test.length).fill(
  blink
);
participantData.experiment_rangeEstimationComplexity = Array(
  sequence_train_test.length
).fill(range_estimation_complexity);
participantData.participant_timings = Array(sequence_train_test.length).fill(
  -1
);
participantData.participant_response = Array(sequence_train_test.length).fill(
  -1
);
participantData.participant_screenHeight = Array(
  sequence_train_test.length
).fill(window.screen.height);
participantData.participant_screenWidth = Array(
  sequence_train_test.length
).fill(window.screen.width);

// -- Fill survey results
participantData.age = Array(sequence_train_test.length).fill(
  surveyResults['age']
);
participantData.diplome = Array(sequence_train_test.length).fill(
  surveyResults['diplome']
);
participantData.musicExp = Array(sequence_train_test.length).fill(
  surveyResults['musicExp']
);
participantData.musicScoreReading = Array(sequence_train_test.length).fill(
  surveyResults['musicScoreReading']
);
participantData.instrumentProficiency = Array(sequence_train_test.length).fill(
  surveyResults['instrumentProficiency']
);
participantData.mathExp = Array(sequence_train_test.length).fill(
  surveyResults['mathExp']
);
