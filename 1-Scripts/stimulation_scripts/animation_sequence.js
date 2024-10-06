'use strict';

/* ==========================================
------------- Element's pointers ------------
========================================== */

var bodyElement = document.body;
var containerFigureElement = document.querySelector('.container-figure');

/* ==========================================
-------------- Global variables -------------
========================================== */
var txt_counter = 0;

/* ==========================================
------------- Classes definition ------------
========================================== */

class ExperimentCl {
  constructor(sequences = randomized_sequences) {
    this.participant_id = current_ID;
    this.original_seq = [
      ...sequences_training,
      ...shuffled_sequences,
      ...shuffled_bloc2_sequences,
    ];
    this.seq = [...sequences_training, ...randomized_sequences];
    this.performance = [];
    this.element_selectors = {};
    this.confidence = [];
    this.counter = 0;
    this.presentation_time = true;
    this.start_time = Date.now();
    this.click_timings_before = []; //click_timings before go_signal
    this.click_timings_after = []; //click_timings after go_signal
    this.interclick_timings_before = [];
    this.interclick_timings_after = [];
    this.response_sequences_before = []; //response before go_signal
    this.response_sequences_after = []; //response after go_signal
    this.score = [];
    this.current_score = initialScore;
    this.screen_width = window.screen.width;
    this.screen_height = window.screen.height;
    this.set_delay = set_delay;
    this.break_time = break_time;
    this.SOA = SOA;
    this.last_click = Date.now();
    this.state = 'training';
    this.survey = sessionStorage.getItem('surveyChoices'); //retrieve the participant's survey from last page
  }
  /* ----------------------------
############## API ##############
  ---------------------------- */
  data_collection(response) {
    /**
     * Add the click event that will collect the data during the trial. Will be used in an event listener
     *
     * @param {str} response - Key pushed by the participant. Will be equal to the id of the circle.
     *
     */

    let collect = (index) => {
      // index is either 0 or 1. 0 is for presentation phase, 1 is for reproduction phase.
      let t_now = Date.now(); // set the value of this variable to current time in ms

      if (index === 0) {
        this.click_timings_before[this.counter - 1].push(
          t_now - this.start_time
        );
        let arr_length = this.click_timings_before[this.counter - 1].length;
        if (this.click_timings_before[this.counter - 1].length === 1) {
          //do nothing
        } else {
          this.interclick_timings_before[this.counter - 1].push(
            this.click_timings_before[this.counter - 1][arr_length - 1] -
              this.click_timings_before[this.counter - 1][arr_length - 2]
          );
        }
        this.response_sequences_before[this.counter - 1].push(response);
      } else {
        this.click_timings_after[this.counter - 1].push(
          t_now - this.start_time
        );
        let arr_length = this.click_timings_after[this.counter - 1].length;
        if (this.click_timings_after[this.counter - 1].length === 1) {
          //do nothing
        } else {
          this.interclick_timings_after[this.counter - 1].push(
            this.click_timings_after[this.counter - 1][arr_length - 1] -
              this.click_timings_after[this.counter - 1][arr_length - 2]
          );
        }
        this.response_sequences_after[this.counter - 1].push(response);
      }
    };

    if (this.presentation_time) {
      collect(0);
    } else {
      collect(1);
    }
  }
  create_csv() {
    /* Purpose: Creates a CSV that will hold the data of the new participant. This
    will be done synchronously to avoid overwriting two simultaneous participants' files */
  }
  /*  ----------------------------
############## Visual rendering ##############
  ---------------------------- */
  draw() {
    /* Purpose: This method will draw the figure on the screen */
    function getSizeOfBrowserBars() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      const urlBarHeight = window.outerHeight - windowHeight;
      const bottomBarHeight = documentHeight - windowHeight - urlBarHeight;

      return {
        urlBarHeight: urlBarHeight,
        bottomBarHeight: bottomBarHeight,
      };
    }
    let sizeBrowserBars = getSizeOfBrowserBars();
    //Get measurements of the screen and log them in local variables
    let screen_size_height = window.screen.height;
    let screen_size_width = window.screen.width;
    let urlBarHeight = sizeBrowserBars.urlBarHeight;
    let bottomBarHeight = sizeBrowserBars.bottomBarHeight;

    /* --- Styling the body ---*/
    //Define desired constant styling values (in pixels)
    let marginBody_topBottom = 10;
    let marginBody_leftRight = 0;
    let paddingBody_topBottom = 15;
    let paddingBody_leftRight = 0;
    let figure_radius = 150;

    //Set the size of the body to be equal to window size
    bodyElement.style.margin = `${marginBody_topBottom}px ${marginBody_leftRight}px`;
    bodyElement.style.padding = `${paddingBody_topBottom}px ${paddingBody_leftRight}px`;
    bodyElement.style.height = `${
      screen_size_height - marginBody_topBottom * 2 - paddingBody_topBottom * 2
    }px`;

    /* --- Styling the figure container ---*/
    //Define measurements useful for inside elements additions
    let centerX_containerFigure = containerFigureElement.offsetWidth / 2;
    let centerY_containerFigure = containerFigureElement.offsetHeight / 2;
    let translate_up = 70;

    //Create fixation cross
    var fixationElement = document.createElement('div');
    fixationElement.classList.add('fixation', 'no--zoom');
    containerFigureElement.appendChild(fixationElement);

    // Create Pause for training
    var pauseElement = document.createElement('div');
    pauseElement.textContent = 'Pause';
    pauseElement.classList.add('pause', 'hidden', 'no-zoom');
    pauseElement.style.top = `${centerY_containerFigure - translate_up}px`;
    pauseElement.style.left = `${centerX_containerFigure}px`;
    containerFigureElement.appendChild(pauseElement);

    //Style fixation cross
    fixationElement.textContent = '+';
    let fixationElement_height = fixationElement.offsetHeight;
    let fixationElement_width = fixationElement.offsetWidth;
    fixationElement.style.top = `${
      centerY_containerFigure - fixationElement_height / 3 - translate_up
    }px`;
    fixationElement.style.left = `${
      centerX_containerFigure - fixationElement_width / 3
    }px`;
    fixationElement.classList.add('hidden');

    //Create the circles inside the container
    var circleElements = [];
    for (let i = 0; i < 6; i++) {
      var div = document.createElement('div');
      div.classList.add('circle', 'no--zoom');
      div.classList.add('hidden');
      div.id = `circleElement-${i}`;
      containerFigureElement.appendChild(div);
      circleElements.push(div);
    }

    //Arange the circles in an hexagonal shape
    // %%Defining key variables
    let circle_radius = document.querySelector('.circle').offsetHeight;
    let circle_coordinates_top = [
      Math.sin(-Math.PI / 2),
      Math.sin(-Math.PI / 6),
      Math.sin(Math.PI / 6),
      Math.sin(Math.PI / 2),
      Math.sin((5 * Math.PI) / 6),
      Math.sin((-5 * Math.PI) / 6),
    ];
    let circle_coordinates_left = [
      Math.cos(-Math.PI / 2),
      Math.cos(-Math.PI / 6),
      Math.cos(Math.PI / 6),
      Math.cos(Math.PI / 2),
      Math.cos((5 * Math.PI) / 6),
      Math.cos((-5 * Math.PI) / 6),
    ];
    circle_coordinates_top = circle_coordinates_top.map(
      (coord) =>
        figure_radius * coord + centerY_containerFigure - circle_radius / 2
    );
    circle_coordinates_left = circle_coordinates_left.map(
      (coord) =>
        figure_radius * coord + centerX_containerFigure - circle_radius / 2
    );

    // %%Positioning the circles
    for (let i = 0; i < 6; i++) {
      circleElements[i].style.top = `${
        circle_coordinates_top[i] - translate_up
      }px`;
      circleElements[i].style.left = `${circle_coordinates_left[i]}px`;
    }

    // Confidence buttons
    var btn_confidence = [];
    // -- Create a container for confidence buttons
    var container_confidence = document.createElement('div');
    container_confidence.classList.add(
      'container-confidence',
      'hidden',
      'no--zoom'
    );
    containerFigureElement.appendChild(container_confidence);
    // -- Center the confidence buttons
    container_confidence.style.left = centerX_containerFigure / 5 + 'px';
    container_confidence.style.width = `${screen_size_width / 1.25}px`;

    // -- Create confidence buttons and add them to the array of selectors
    for (let i = 1; i < 5; i++) {
      var div = document.createElement('div');
      div.id = `conf-${i}`;
      div.classList.add('btn-confidence', 'no--zoom');
      div.textContent = `${i * 100}`;
      container_confidence.appendChild(div);
      btn_confidence.push(div);
    }

    // Create the Start Training button and place it
    let btn_training = document.createElement('div');
    btn_training.textContent = 'TRAINING';
    btn_training.classList.add('btn--training', 'no--zoom');
    btn_training.classList.add('no--zoom');
    btn_training.classList.add('hidden');
    btn_training.style.top = '50%';
    containerFigureElement.appendChild(btn_training);
    btn_training.style.left = '50%';
    btn_training.style.transform = 'translate(-50%,0%)';

    // Create the Start Training button and place it
    let btn_ok = document.createElement('div');
    btn_ok.textContent = 'OK';
    btn_ok.classList.add('btn--ok', 'no--zoom');
    btn_ok.style.top = `${screen_size_height - translate_up * 2 - 15}px`;
    containerFigureElement.appendChild(btn_ok);
    btn_ok.style.left = '50%';
    btn_ok.style.transform = `translate(-50%,-200%)`;

    // Create the Next button and place it
    let btn_next = document.createElement('div');
    btn_next.textContent = 'NEXT';
    btn_next.classList.add('btn--next', 'no--zoom');
    containerFigureElement.appendChild(btn_next);
    btn_next.style.top = `${screen_size_height - translate_up * 2 - 15}px`;
    btn_next.style.left = '50%';
    btn_next.style.transform = 'translate(-50%,-200%)';
    btn_next.classList.add('hidden');

    // Create the score text for Intermediate score page
    let txt_score_increase = document.createElement('div');
    containerFigureElement.appendChild(txt_score_increase);
    txt_score_increase.classList.add('increase', 'no--zoom');
    txt_score_increase.classList.add('hidden');

    //Create the score text that will be displayed on top right
    let txt_score = document.createElement('div');
    txt_score.classList.add('txt--score', 'no--zoom');
    txt_score.textContent = `score : ${this.current_score}`;
    bodyElement.appendChild(txt_score);

    //style Text container
    let txt_container = document.querySelector('.text-container');
    txt_container.style.height = screen_size_height / 2 + 'px';
    txt_container.style.width = `${screen_size_width - 50}px`;
    txt_container.textContent = instruction_training_start[txt_counter];
    txt_counter += 1;

    // Manage the size (1) and (2) location of the progression bar
    // (1) Manage size
    var chart = document.querySelector('.chart');
    var chart_width = screen_size_width / 1.5;
    chart.style.width = `${chart_width}px`;
    chart.style.height = `${screen_size_height / 100}px`;
    var bar = document.querySelector('.bar');
    bar.style.width = `${chart_width}px`;
    bar.style.height = `${screen_size_height / 100}px`;
    // (2) Manage location

    chart.style.left = `${screen_size_width / 2 - chart_width / 2}px`;
    const progression_bar = document.getElementById('progression--bar');

    /* --- Add created elements to the object element_selectors ---
    Then we are able to use them in other methods. This will allow animating them,
    making them appear/disappear, linking event listeners to them without
    creating unwanted interactions */
    this.element_selectors.circles = circleElements;
    this.element_selectors.fixation = fixationElement;
    this.element_selectors.confidence = btn_confidence;
    this.element_selectors.container_confidence = container_confidence;
    this.element_selectors.btn_next = btn_next;
    this.element_selectors.btn_training = btn_training;
    this.element_selectors.btn_ok = btn_ok;
    this.element_selectors.txt_score_increase = txt_score_increase;
    this.element_selectors.txt_score = txt_score;
    this.element_selectors.txt_container = txt_container;
    this.element_selectors.pauseElement = pauseElement;
    this.element_selectors.progression_bar = progression_bar;
  }

  init() {
    /**
     * Initialize all the event listeners after the first drawing of the figure
     *
     * @param {Type} paramName - Description of the parameter.
     *
     * @returns {Type} Description of the return value.
     */
    // The button ok goes through the explanations and once it's over, button Training appears
    this.element_selectors.btn_ok.addEventListener(keyEvent, () => {
      if (this.state === 'training') {
        if (txt_counter < instruction_training_start.length) {
          this.element_selectors.txt_container.textContent =
            instruction_training_start[txt_counter];
          txt_counter += 1;
        } else {
          this.element_selectors.btn_ok.classList.add('hidden');
          this.element_selectors.txt_container.classList.add('hidden');
          txt_counter = 0;
          this.element_selectors.txt_container.textContent =
            instruction_training_end[txt_counter];
          this.element_selectors.btn_training.classList.remove('hidden');
        }
      }
      // Case: starting main experiment after explanations and training
      else {
        if (txt_counter < instruction_training_end.length) {
          this.element_selectors.txt_container.textContent =
            instruction_training_end[txt_counter];
          txt_counter += 1;
        } else {
          this.element_selectors.btn_ok.classList.add('hidden');
          this.element_selectors.txt_container.classList.add('hidden');
          this.trial();
        }
      }
    });

    // The button training will start the presentation of sequences
    this.element_selectors.btn_training.addEventListener(keyEvent, () => {
      setTimeout(() => this.trial(this.seq[this.counter]), this.set_delay);
      this.element_selectors.btn_training.classList.add('hidden');
      this.element_selectors.txt_container.classList.add('hidden');
    });
    for (let k = 0; k < this.seq.length; k++) {
      this.interclick_timings_before.push([]); //Both have two arrays: first is for pre-reproduction, Second is for reproduction
      this.interclick_timings_after.push([]); //Both have two arrays: first is for pre-reproduction, Second is for reproduction
      this.click_timings_before.push([]);
      this.click_timings_after.push([]);
      this.response_sequences_before.push([]);
      this.response_sequences_after.push([]);
    }
    for (let i = 0; i < 6; i++) {
      this.element_selectors.circles[i].addEventListener(keyEvent, () =>
        this.data_collection(i)
      );
    }
    for (let i = 0; i < 4; i++) {
      this.element_selectors.confidence[i].addEventListener(keyEvent, () => {
        /* Purpose: is attached to confidence buttons. End a trial once at least 4 items have been entered */
        console.log(
          'this.response_sequences_after : ',
          this.response_sequences_after
        );
        if (this.response_sequences_after[this.counter - 1].length < 3) {
          // in this scenario, we do nothing and wait for more inputs
        } else {
          let { final_score, feedbackTXT } = this.display_score_update(i);
          this.element_selectors.txt_score.textContent = `score: ${final_score}`;
          this.element_selectors.txt_score_increase.textContent = `${feedbackTXT}`;
          this.log_intermediate_data();
        }
      });
    }

    this.element_selectors.btn_next.addEventListener(keyEvent, () => {
      if (this.counter === sequences_training.length) {
        this.state = 'main_experiment';
        completion = 0;
        progress = 0;
        this.element_selectors.btn_ok.classList.remove('hidden');
        this.element_selectors.txt_container.classList.remove('hidden');
        this.current_score = initialScore;
        this.element_selectors.progression_bar.classList.add('hidden');
        this.element_selectors.txt_score.textContent = `score : ${this.current_score}`;
        this.reset_next();
      } else {
        if (Date.now() - this.last_click > 1000) {
          this.trial(this.seq[this.counter]);
          this.reset_next();
        }
      }
    });
  }

  elements() {
    /* Purpose: Allows retrieving elements selectors from the object */
    return this.element_selectors;
  }

  activate_point(circleElement) {
    /* Purpose: Animate the point circleElement (ex: this.element_selectors.circles[0]) on the screen. Used in presentation() lower down.*/
    circleElement.classList.add('circle--active');
    setTimeout(() => {
      circleElement.classList.remove('circle--active');
    }, blink);
  }

  start() {
    /* Purpose: start the experiment*/
    console.log('starting experiment', this.element_selectors.length);
    for (
      let i = 0;
      i < Object.keys(this.element_selectors.circles).length;
      i++
    ) {
      //FIXME Ne fonctionne pas, je veux cacher tous les éléments et afficher le bouton START
      //TODO Regarder la partie AJAX du cours Javascript
      console.log(this.element_selectors.cicles);
      console.log(Object.keys(this.element_selectors.cicles[i]));

      // this.element_selectors[
      //   Object.keys(this.element_selectors)[i]
      // ].classList.add('hidden');
    }
  }

  /*  ----------------------------
############## App Dynamics ##############
  ---------------------------- */
  counter_increment() {
    this.counter += 1;
  }

  click() {
    /**
     * Handle touch events/clicks by logging the click into the response array and activating the point for some duration after the point
     * has been touched
     *
     * @param {Type} paramName - Description of the parameter.
     *
     * @returns {Type} Description of the return value.
     */
  }

  /*----------------------------------------------------------------------------------------------------------
 ******************************************** Display Methods ********************************************
----------------------------------------------------------------------------------------------------------*/
  explanations(before = true) {
    /* Purpose: Display Explanations on the screen. Pass to the next explanation with the ok button 
    before=true indicates that the explanations served are presented before the start of training
    before=false indicates that the explanations served are presented after the end of training
    */

    this.element_selectors.btn_ok.classList.remove('hidden');
    if (before) {
    } else {
    }
  }

  reset_next() {
    this.element_selectors.btn_next.classList.add('hidden');
    this.element_selectors.txt_score_increase.classList.add('hidden');
    document.querySelector('body').classList.remove('success');
    document.querySelector('body').classList.remove('fail');
    document.querySelector('body').classList.remove('moderate--failure');
  }

  hideFigure() {
    /*Purpose: Hides the hexagon*/
    this.element_selectors.container_confidence.classList.add('hidden');
    this.element_selectors.progression_bar.classList.add('hidden');
    this.element_selectors.fixation.classList.add('hidden');
    for (let i = 0; i < element_selectors.circles.length; i++) {
      this.element_selectors.circles[i].classList.add('hidden');
    }
  }

  display_screen_next() {
    /*Purpose: Display the screen with score update and next button*/
    this.element_selectors.btn_next.classList.remove('hidden');
    this.hideFigure();
    this.element_selectors.txt_score_increase.classList.remove('hidden');
  }

  display_score_update(
    confidence,
    current_seq = this.seq[this.counter - 1],
    current_sequence_response = this.response_sequences_after[this.counter - 1]
  ) {
    let { final_score, feedbackTXT } = score_update(
      this.seq[this.counter - 1],
      this.response_sequences_after[this.counter - 1],
      (confidence + 1) * 100,
      this.current_score,
      this.element_selectors.txt_score_increase
    );

    let score_gain = final_score - this.current_score;

    //Assessing performance and registering it to the data
    if (current_seq.join() === current_sequence_response.join()) {
      let current_performance = 'success';
      this.performance.push(current_performance);

      //update screen display of current gain or loss
      feedbackTXT = `${feedbackTXT} \n+${score_gain}`;

      //Success animation
      document.querySelector('body').classList.add('success');
      setTimeout(function () {
        document.querySelector('body').classList.remove('success');
      }, 100);
      setTimeout(function () {
        document.querySelector('body').classList.add('success');
      }, 250);
    } else if (score_gain > 0) {
      let current_performance = 'fail';

      //update display of current gain or loss
      feedbackTXT = `${feedbackTXT} \n+${score_gain}`;
      this.performance.push(current_performance);

      //moderate--failure animation
      document.querySelector('body').classList.add('moderate--failure');
      setTimeout(function () {
        document.querySelector('body').classList.remove('moderate--failure');
      }, 100);
      setTimeout(function () {
        document.querySelector('body').classList.add('moderate--failure');
      }, 250);
    } else {
      let current_performance = 'fail';

      //update display of current gain or loss
      feedbackTXT = `${feedbackTXT} \n ${score_gain}`;

      this.performance.push(current_performance);

      //Fail animation
      document.querySelector('body').classList.add('fail');
      setTimeout(function () {
        document.querySelector('body').classList.remove('fail');
      }, 100);
      setTimeout(function () {
        document.querySelector('body').classList.add('fail');
      }, 250);
    }
    this.confidence.push(confidence * 100);
    this.score.push(final_score);
    this.current_score = final_score;
    this.display_screen_next();
    this.last_click = Date.now();
    return { final_score, feedbackTXT };
  }

  log_intermediate_data() {
    var data_experiment = convertCSV(this);
    console.log('intermediate data has been sent');
    send_post(data_experiment);
    /* Purpose: Logging a line with the new values in a common CSV */
    let data2send = this;
    console.log('data2send:', data2send);
    postData(serverAddress, data2send).then(() => {
      console.log('Data has been sent'); // JSON data parsed by `data.json()` call
    });
  }

  /*--------------------------------------------------------------------------------------------------------
 ******************************************** Experiment timeline methods **********************************
----------------------------------------------------------------------------------------------------------*/

  presentation(seq = this.seq) {
    /**
     * display the sequences of positions one after the other on the screen
     *
     * @param {array} seq - The array containing the sequence to be played.
     *
     *
     * @returns {animation} animate the screen based on the sequence pattern to be played
     */
    this.presentation_time = true;
    this.element_selectors.fixation.classList.remove('hidden');
    this.element_selectors.fixation.style.color = 'white';
    for (let i = 0; i < this.element_selectors.circles.length; i++) {
      this.element_selectors.circles[i].classList.remove('hidden');
      //FIXME NEW
      this.element_selectors.circles[i].classList.remove(
        'circle--reproduction'
      );
    }

    for (let i = 0; i < seq.length; i++) {
      setTimeout(
        () => this.activate_point(this.element_selectors.circles[seq[i]]),
        SOA * (i + 1)
      );
    }

    // update the progression bar
    update_progression(completion);
  }

  reproduction() {
    /* Purpose: display the response screen */
    this.presentation_time = false;
    for (let i = 0; i < this.element_selectors.circles.length; i++) {
      this.element_selectors.circles[i].classList.add('circle--reproduction');
    }
    this.element_selectors.progression_bar.classList.remove('hidden');
    this.element_selectors.container_confidence.classList.remove('hidden');
  }

  pre_rep_break() {
    let total_break_time =
      this.set_delay +
      this.seq[this.counter].length * this.SOA +
      this.break_time;

    //purpose: creates a short break between end of presentation and start of reproduction
    setTimeout(() => {
      //hide the validation button to signify the break
      this.element_selectors.fixation.classList.add('hidden');
      if (this.state === 'training') {
        this.element_selectors.pauseElement.classList.remove('hidden');
      }
    }, total_break_time - this.break_time);

    setTimeout(() => {
      //display the validation button and the fixation cross to signify start of reproduction
      this.element_selectors.fixation.style.color = '#3bc9db';
      this.element_selectors.fixation.classList.remove('hidden');
      this.element_selectors.pauseElement.classList.add('hidden');
      this.element_selectors.progression_bar.classList.remove('hidden');
    }, total_break_time);

    return total_break_time;
  }

  end_experiment() {
    //Sends data to the server to write in CSV
    var data_experiment = convertCSV(this);
    console.log('data_experiment = ', data_experiment);

    send_post(data_experiment);
    this.hideFigure();
    this.element_selectors.txt_container.classList.remove('hidden');
    this.element_selectors.txt_container.textContent =
      'You have finished the experiment. Thank you for your participation !';
  }

  trial(seq = this.seq[this.counter]) {
    /* Purpose: Does one cycle of Presentation + Reproduction */
    if (this.counter < this.seq.length - 1) {
      this.presentation(seq);
      let delay = this.pre_rep_break();
      setTimeout(() => this.reproduction(), delay);
      this.counter_increment();
    } else {
      this.end_experiment();
    }
  }

  /*--------------------------------------------------------------------------------------------------------
 ******************************************** Debugging Methods **********************************
----------------------------------------------------------------------------------------------------------*/

  info() {
    console.log(this);
    console.log(this.element_selectors);
    console.log('Tested sequences: ', this.seq);
  }

  testDataTransmission() {
    /*>Purpose: Fill in an instance of the class with keys as values and sends the data to the server for test*/
    const defaultValues = {
      performance: [],
      element_selectors: {},
      confidence: [],
      click_timings_before: [],
      click_timings_after: [],
      interclick_timings_before: [],
      interclick_timings_after: [],
      response_sequences_before: [],
      response_sequences_after: [],
      score: [],
      survey: null, // Assuming survey is nullable
    };

    for (const key in defaultValues) {
      if (this[key] === undefined || this[key] === null) {
        this[key] = defaultValues[key];
      }
    }
    this.end_experiment();
  }
}
//#################################################################### END OF CLASS

/* ==========================================
-------------- Code Execution --------------
========================================== */
//Style the main container
containerFigureElement.style.height = `${document.documentElement.clientHeight}px`;
containerFigureElement.style.width = `${document.documentElement.clientWidth}px`;
const online_exp = new ExperimentCl();
online_exp.draw();
const element_selectors = online_exp.elements();
online_exp.init();

/* ==========================================
--------------------- TODO ------------------
========================================== */

/*
1. Presentation of sequences
2. Reproduction screen
3. Capturing participants' inputs
4. In real-time using node.js logging in their results in a csv
    a. Logging a line with the new values in a common CSV
    b. (at the end, create a new csv file with only data from this participant)

*/

/* NOTE
=================================================
+++++++++++++++++ Bug fixes +++++++++++++++++++++
=================================================
*/

// Disable pinch zoom
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});

// Disable double tap zoom
document.addEventListener('dblclick', function (e) {
  e.preventDefault();
});

//TODO
// Régler le CSV de manière à avoir chaque ligne avec seq, response ... plutôt que toutes_seq puis toutes_reponses (faire comme dans le convertCSV de la V0)
