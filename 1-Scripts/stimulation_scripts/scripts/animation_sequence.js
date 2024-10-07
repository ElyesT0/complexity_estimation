'use strict';

/*----------------------------------------------------------------------------------------------------------
 ********************************************** Styling Code **********************************************
----------------------------------------------------------------------------------------------------------*/

containerFigureElement.style.height = `${document.documentElement.clientHeight}px`;
containerFigureElement.style.width = `${document.documentElement.clientWidth}px`;

/*----------------------------------------------------------------------------------------------------------
 ***************************************** Running the experiment *****************************************
----------------------------------------------------------------------------------------------------------*/


// -- Variables that tracks the progress of the experiment timeline
var completion = 0;
var feedbackTXT = '';

// -- Define an instance of ExperimentCl
const experiment = new ExperimentCl(sequences_training, sequences_test);

// -- Draw the figure on the screen
experiment.draw();

experiment.init();
