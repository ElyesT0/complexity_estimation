'use strict';

// -- Get language of participant
const lan_selected = sessionStorage.getItem('language-selected') || 'en';
const debbug = false; // FIXME This should ALWAYS BE FALSE before using the code. Change the id of participant to test-id
const post_meg = false; // This parameter is false for the online experiment and true for the post-meg experiment
const code_prolifics = 'dKfc@4k8@K'; // Code for participant compensation on prolifics
const experiment_name = 'complexity'; // this can have one of several values:
// post_meg_version : experiment that is given to participant after MEG
// complexity : online experiment of complexity judgement
// geom_temp : geometry/temporal LoT experiment
// deviant_music : LoT music with the deviant detection task.

// -- Retrieve survey results
let surveyResults = sessionStorage.getItem('surveyChoices');
if (surveyResults) {
  // Parse the JSON string back into an object
  surveyResults = JSON.parse(surveyResults);
} else {
  console.log('No survey data found in sessionStorage.');
  surveyResults = default_survey_results;
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
var state = ''; // Tracks the state of the experiment

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
  sequences = [
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
  ];
} else {
  sequences = [
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
    [0, 2, 0, 5, 0, 3, 0, 2, 0, 5, 0, 3], // Play 4 Tokens
    [0, 2, 0, 5, 2, 3, 0, 2, 0, 5, 2, 3], // Contrôle Play-4 Tokens

    // Zhang geometrical shape-30 [0,3,2,5]
    [0, 3, 0, 2, 0, 5, 0, 3, 0, 2, 0, 5], // Play 4 Tokens
    [0, 3, 0, 2, 3, 5, 0, 3, 0, 2, 3, 5], // Contrôle Play-4 Tokens

    // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
    // Rotation +1 [0,1,2,3]
    [0, 1, 2, 3, 0, 1, 2, 1, 0, 1, 2, 0], // Sub-programs 1
    [0, 1, 2, 3, 0, 2, 1, 2, 0, 1, 2, 0], // Contrôle sub-programs 1
    // Triangle + rotation [0,2,4] + [1,3,5]
    [0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5], // Sub-programs 1
    [0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5], // Contrôle sub-programs 1
    // Separated groups [0,5,3]+[1,2,4]
    [0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4], // Sub-programs 1
    [0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4], // Contrôle sub-programs 1

    // ----- Sub-programs 2 (6 Tokens): treat it as 3 tokens
    // Rotation +1
    [0, 1, 2, 3, 0, 1, 2, 4, 0, 1, 2, 5], // Sub-programs 2
    [0, 1, 2, 3, 0, 2, 1, 4, 0, 1, 2, 5], // Contrôle sub-programs 2
    // Triangle + rotation [0,2,4] + [1,3,5]
    [0, 2, 4, 1, 0, 2, 4, 3, 0, 2, 4, 5], // Sub-programs 2
    [0, 2, 4, 1, 0, 4, 2, 3, 0, 2, 4, 5], // Contrôle sub-programs 2
    // Separated groups [0,5,3]+[1,2,4]
    [0, 5, 3, 1, 0, 5, 3, 2, 0, 5, 3, 4], // Sub-programs 2
    [0, 5, 3, 1, 0, 3, 5, 2, 0, 5, 3, 4], // Contrôle sub-programs 2

    // ----- Indice i (2tokens)
    // - distance between two points = 1
    [0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1], // Indice i
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1], // Contrôle indice i

    // - distance between two points = 2
    [0, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2], // Indice i
    [0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2], // Contrôle indice i
    // - distance between two points = 3
    [0, 3, 0, 0, 3, 3, 0, 0, 0, 3, 3, 3], // Indice i
    [0, 0, 0, 3, 3, 3, 0, 3, 0, 0, 3, 3], // Contrôle indice i

    // ----- Play
    // Rotation +1 [0,1,2,3]
    [0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3], // Play
    [0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 3], // Contrôle play
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 0, 0, 2, 0, 0, 0, 5, 0, 0, 0, 3], // Play
    [0, 0, 0, 2, 0, 0, 5, 0, 0, 0, 0, 3], // Contrôle play
    // Zhang geometrical shape-30 [0,3,2,5]
    [0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 5], // Play
    [0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 5], // Contrôle play

    // Insertion/Suppression (5 Tokens): treat it as 3 +2
    // -- Rotation +1
    [0, 1, 2, 0, 1, 2, 3, 0, 1, 2, 3, 4], // Insertion
    [0, 1, 2, 3, 4, 0, 1, 2, 3, 0, 1, 2], // Suppression (contrôle insertion)
    // -- Triangle + rotation [0,2,4] + [1,3]
    [0, 2, 4, 0, 2, 4, 1, 0, 2, 4, 1, 3], // Insertion
    [0, 2, 4, 1, 3, 0, 2, 4, 1, 0, 2, 4], // Suppression (contrôle insertion)
    // -- 2 Groups [0,5,3]+[1,4]
    [0, 5, 3, 0, 5, 3, 1, 0, 5, 3, 1, 4], // Insertion
    [0, 5, 3, 1, 4, 0, 5, 3, 1, 0, 5, 3], // Suppression (contrôle insertion)

    // ----- Mirror 1
    // Rotation +1 [0,1,2,3]
    [0, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 3], // Mirror 1
    [0, 1, 2, 3, 3, 1, 2, 0, 0, 1, 2, 3], // Contrôle Mirror 1
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 2, 5, 3, 3, 5, 2, 0, 0, 2, 5, 3], // Mirror 1
    [0, 2, 5, 3, 3, 2, 5, 0, 0, 2, 5, 3], // Contrôle Mirror 1
    // Zhang geometrical shape-30 [0,3,2,5]
    [0, 3, 2, 5, 5, 2, 3, 0, 0, 3, 2, 5], // Mirror 1
    [0, 3, 2, 5, 5, 3, 2, 0, 0, 3, 2, 5], // Contrôle Mirror 1

    // ----- Mirror 2
    // Rotation +1 [0,1,2,3]
    [0, 1, 2, 3, 2, 1, 0, 3, 0, 1, 2, 3], // Mirror 2
    [0, 1, 2, 3, 2, 0, 1, 3, 0, 1, 2, 3], // Contrôle Mirror 2
    // Zhang geometrical shape-23 [0,2,5,3]
    [0, 2, 5, 3, 5, 2, 0, 3, 0, 2, 5, 3], // Mirror 2
    [0, 2, 5, 3, 5, 0, 2, 3, 0, 2, 5, 3], // Contrôle Mirror 2
    // Zhang geometrical shape-30 [0,3,2,5]
    [0, 3, 2, 5, 2, 3, 0, 5, 0, 3, 2, 5], // Mirror 2
    [0, 3, 2, 5, 2, 0, 3, 5, 0, 3, 2, 5], // Contrôle Mirror 2

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //probe-easy

    // ----- 6 Tokens
    [0, 3, 4, 1, 4, 1, 2, 5, 5, 3, 0, 2], //probe-hard, version 1
    [0, 1, 2, 3, 2, 3, 4, 5, 5, 1, 0, 4], //probe-hard, version 2
    [1, 2, 3, 4, 3, 4, 5, 0, 0, 2, 1, 5], //probe-hard, version 3
    [0, 1, 5, 2, 5, 2, 4, 3, 3, 1, 0, 4], //probe-hard, version 4
    [0, 1, 3, 4, 3, 4, 2, 5, 5, 1, 0, 2], //probe-hard, version 5
  ];
}

const training_sequences = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 3, 5, 1, 4, 3, 3, 2, 0, 5, 3, 0],
  [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 4, 5, 2, 5, 2, 3, 0, 0, 4, 1, 3],
];

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
  'At the end of the experiment, your random ID and a code will be displayed <br>Please save these information.<br>You will need to send a screenshot or the information to <br><br>online.psyexp+complexity@gmail.com<br><br> for compensation.',
];

const instruction_training_end_fr = [
  'Des séquences de points vont vous être présentées.',
  'Veuillez évaluer leur complexité.',
  "Veuillez maintenir votre regard sur la croix de fixation au centre de l'écran.",
  "L'échelle d'évaluation est la suivante <br><br>1 : très simple <br>... à <br>7 : très complexe.",
  "A la fin de l'expérience, votre identifiant et un code seront affichés <br>Veuillez enregistrer ces informations.<br>Il vous faudra envoyer une capture d'écran ou l'information seule à <br><br>online.psyexp+complexity@gmail.com<br><br> pour la compensation.",
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
const end_txt_fr =
  "L'expérience est terminée. Merci d'avoir participé ! Veuillez envoyer les informations suivantes à l'adresse: online.psyexp+complexity@gmail.com<br>";
const end_txt_eng =
  'You successfully completed the experiment. Thank you for your efforts ! Please send the information below to the email address:  online.psyexp+complexity@gmail.com<br>';

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

// Sequences need to be presented in random order.
const shuffled_sequences = shuffle_seq(sequences);

// Keep temporal structure but randomize the starting points.
const randomized_sequences = shuffled_sequences.map((seq) =>
  randomizeStartingPoint(seq)
);

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

// ---------------------------------------------------------------------
// --- Fill the participantData object which will be sent to the server.
//
var participantData = new ParticipantCl();

// Participant: ID
participantData.participant_id = Array(sequence_train_test.length).fill(
  participant_id
);

//
// ** Participant: Survey and Demographics
//
// age
participantData.age = Array(sequence_train_test.length).fill(
  surveyResults['age']
);
// diplome
participantData.diplome = Array(sequence_train_test.length).fill(
  surveyResults['diplome']
);
// musicExperience
participantData.musicExp = Array(sequence_train_test.length).fill(
  surveyResults['musicExp']
);
// Level of Score reading ability
participantData.musicScoreReading = Array(sequence_train_test.length).fill(
  surveyResults['musicScoreReading']
);
// Proficiency at playing an instrument
participantData.instrumentProficiency = Array(sequence_train_test.length).fill(
  surveyResults['instrumentProficiency']
);
// Experience in Mathematics
participantData.mathExp = Array(sequence_train_test.length).fill(
  surveyResults['mathExp']
);
// Language chosen
participantData.participant_language = Array(sequence_train_test.length).fill(
  lan_selected
);
//
// ** Participant: Tech used
//
// Screen size
participantData.participant_screenHeight = Array(
  sequence_train_test.length
).fill(window.screen.height);
participantData.participant_screenWidth = Array(
  sequence_train_test.length
).fill(window.screen.width);
// Start time
participantData.participant_startTime = Array(sequence_train_test.length).fill(
  Date.now()
);

//
// Experiment: Parameters
//
// SOA
participantData.experiment_SOA = Array(sequence_train_test.length).fill(SOA);
// Blink
participantData.experiment_blink = Array(sequence_train_test.length).fill(
  blink
);
// Range Complexity
participantData.experiment_rangeEstimationComplexity = Array(
  sequence_train_test.length
).fill(range_estimation_complexity);

//
// ** Sequences and Responses
//
// Tags: temporal structure name
participantData.sequences_temp_tags = original_sequence_train_test.map(
  (seq_exp) => sequence_tag_temporal[seq_exp.join(', ')]
);

// Tags: Geometrical structure name
participantData.sequences_geom_tags = original_sequence_train_test.map(
  (seq_exp) => sequence_tag_geometry[seq_exp.join(', ')]
);

// Structure: pure temporal
participantData.sequences_original = original_sequence_train_test;

// Sequences shown
participantData.sequences_shown = sequence_train_test;

// -- Responses
// Timings
participantData.participant_timings = Array(sequence_train_test.length).fill(
  -1
);
// Ratings
participantData.participant_response = Array(sequence_train_test.length).fill(
  -1
);

//
// ** Initializing counters
// Last Click
participantData.last_click = Array(sequence_train_test.length).fill(-1);
// Trial counter
participantData.participant_trialCounter = Array(
  sequence_train_test.length
).fill(-1);
