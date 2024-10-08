'use strict';

/* 
=======================================================================
++++++++++++++++++ Visual Effect and design functions +++++++++++++++++
=======================================================================
*/

// -- Draw the figure on the screen and output an object containing all the DOM elements.

const draw_figure = function () {
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

  // estimation_complexity buttons
  var btn_estimation_complexity = [];
  // -- Create a container for estimation_complexity buttons
  var container_estimation_complexity = document.createElement('div');
  container_estimation_complexity.classList.add(
    'container-estimation_complexity',
    'hidden',
    'no--zoom'
  );
  containerFigureElement.appendChild(container_estimation_complexity);
  // -- Center the estimation_complexity buttons
  container_estimation_complexity.style.left =
    centerX_containerFigure / 5 + 'px';
  container_estimation_complexity.style.width = `${screen_size_width / 1.25}px`;

  // -- Create estimation_complexity buttons and add them to the array of selectors
  for (let i = 1; i < range_estimation_complexity + 1; i++) {
    var div = document.createElement('div');
    div.id = `complexity-${i}`;
    div.classList.add('btn-estimation_complexity', 'no--zoom');
    div.textContent = `${i}`;
    container_estimation_complexity.appendChild(div);
    btn_estimation_complexity.push(div);
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
  btn_ok.style.top = `${screen_size_height - translate_up * 2 - 30}px`;
  containerFigureElement.appendChild(btn_ok);
  btn_ok.style.left = '50%';
  btn_ok.style.transform = `translate(-50%,-200%)`;

  // Create the Next button and place it
  let btn_next = document.createElement('div');
  btn_next.textContent = 'NEXT';
  btn_next.classList.add('btn--next', 'no--zoom');
  containerFigureElement.appendChild(btn_next);
  btn_next.style.top = `${screen_size_height - translate_up * 2 - 30}px`;
  btn_next.style.left = '50%';
  btn_next.style.transform = 'translate(-50%,-200%)';
  btn_next.classList.add('hidden');

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

  // Add a prompt element for the response phase
  let prompt = document.createElement('div');
  prompt.innerHTML = prompt_txt;
  prompt.classList.add('prompt-txt', 'no--zoom');
  containerFigureElement.appendChild(prompt);
  prompt.classList.add('hidden');

  chart.style.left = `${screen_size_width / 2 - chart_width / 2}px`;
  const progression_bar = document.getElementById('progression--bar');

  /* --- Add created elements to the object element_selectors ---
    Then we are able to use them in other methods. This will allow animating them,
    making them appear/disappear, linking event listeners to them without
    creating unwanted interactions */
  const element_selectors = {};
  element_selectors.circles = circleElements;
  element_selectors.fixation = fixationElement;
  element_selectors.estimation_complexity = btn_estimation_complexity;
  element_selectors.container_estimation_complexity =
    container_estimation_complexity;
  element_selectors.btn_next = btn_next;
  element_selectors.btn_training = btn_training;
  element_selectors.btn_ok = btn_ok;
  element_selectors.txt_container = txt_container;
  element_selectors.pauseElement = pauseElement;
  element_selectors.progression_bar = progression_bar;
  element_selectors.prompt = prompt;

  return element_selectors;
};

// -------------------------------------------------------------------------------------------

const hideElements = function (my_elements, element_selectors) {
  for (let i = 0; i < my_elements.length; i++) {
    const my_key = my_elements[i];
    console.log('Hiding: ', my_key);

    const elements = element_selectors[my_key];
    //check if elements is an array or a single element
    if (Array.isArray(elements)) {
      elements.forEach((element) => element.classList.add('hidden'));
    } else {
      elements.classList.add('hidden');
    }
  }
};

// const clearScreen = function () {
//   for (let i = 0; i < Object.keys(element_selectors).length; i++) {
//     const my_key = Object.keys(element_selectors)[i];
//     const elements = element_selectors[my_key];
//     //check if elements is an array or a single element
//     if (Array.isArray(elements)) {
//       elements.forEach((element) => element.classList.add('hidden'));
//     } else {
//       elements.classList.add('hidden');
//     }
//   }
// };

function clearScreen() {
  hideElements(Object.keys(element_selectors), element_selectors);
}

// -------------------------------------------------------------------------------------------

const revealElements = function (my_elements, element_selectors) {
  for (let i = 0; i < my_elements.length; i++) {
    const my_key = my_elements[i];
    console.log('revealing: ', my_key);

    const elements = element_selectors[my_key];
    //check if elements is an array or a single element
    if (Array.isArray(elements)) {
      elements.forEach((element) => element.classList.remove('hidden'));
    } else {
      elements.classList.remove('hidden');
    }
  }
};

// -------------------------------------------------------------------------------------------

const activate_point = function (circleElement) {
  /* Purpose: Animate the point circleElement (ex: this.element_selectors.circles[0]) on the screen. Used in presentation() lower down.*/
  circleElement.classList.add('circle--active');
  setTimeout(() => {
    circleElement.classList.remove('circle--active');
  }, blink);
};
