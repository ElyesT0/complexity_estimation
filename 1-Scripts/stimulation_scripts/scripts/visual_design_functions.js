'use strict';

/*
======================================================
+++++++++++++++ Disable Zoom and Scroll ++++++++++++++
======================================================
*/

function attachGestureListeners(inputElement) {
  inputElement.addEventListener('dblclick', function (e) {
    e.preventDefault();
    console.log('double click prevented');
  });

  inputElement.addEventListener('gesturestart', function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
    console.log('gesturestart event triggered');
  });

  inputElement.addEventListener('gesturechange', function (e) {
    e.preventDefault();
    document.body.style.zoom = 0.99;
    console.log('gesturechange event triggered');
  });

  inputElement.addEventListener('gestureend', function (e) {
    e.preventDefault();
    document.body.style.zoom = 1;
    console.log('gestureend event triggered');
  });

  inputElement.addEventListener(
    'touchmove',
    function (event) {
      if (event.scale !== 1) {
        event.preventDefault();
        console.log('touchmove event triggered with scale:', event.scale);
      }
    },
    { passive: false }
  );
}

/* 
=======================================================================
++++++++++++++++ Visual Elements creation functions +++++++++++++++++
=======================================================================
*/

// -- Draw the figure on the screen and output an object containing all the DOM elements.

const draw_figure = function () {
  /* Purpose: This method will draw the figure on the screen */
  //Get measurements of the screen and log them in local variables
  let displayport_size_height = window.innerHeight;
  let displayport_size_width = window.innerWidth;

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
    displayport_size_height -
    marginBody_topBottom * 2 -
    paddingBody_topBottom * 2
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
  let shift_circles;
  if (post_meg) {
    shift_circles = Math.PI / 6; // Shift parameter: using it to match the MEG experiment display
  } else {
    shift_circles = Math.PI / 6; // Shift parameter: using it to match the MEG experiment display
  }

  // Updated angles with shift_circles
  let circle_coordinates_top = [
    Math.sin(-Math.PI / 2 + shift_circles),
    Math.sin(-Math.PI / 6 + shift_circles),
    Math.sin(Math.PI / 6 + shift_circles),
    Math.sin(Math.PI / 2 + shift_circles),
    Math.sin((5 * Math.PI) / 6 + shift_circles),
    Math.sin((-5 * Math.PI) / 6 + shift_circles),
  ];
  let circle_coordinates_left = [
    Math.cos(-Math.PI / 2 + shift_circles),
    Math.cos(-Math.PI / 6 + shift_circles),
    Math.cos(Math.PI / 6 + shift_circles),
    Math.cos(Math.PI / 2 + shift_circles),
    Math.cos((5 * Math.PI) / 6 + shift_circles),
    Math.cos((-5 * Math.PI) / 6 + shift_circles),
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
  container_estimation_complexity.style.width = `${
    displayport_size_width / 1.25
  }px`;

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
  btn_ok.style.top = `${displayport_size_height - translate_up}px`;
  containerFigureElement.appendChild(btn_ok);
  btn_ok.style.left = '50%';
  btn_ok.style.transform = `translate(-50%,-200%)`;

  // Create the Next button and place it
  let btn_next = document.createElement('div');
  btn_next.textContent = 'NEXT';
  btn_next.classList.add('btn--next', 'no--zoom');
  containerFigureElement.appendChild(btn_next);
  btn_next.style.top = `${displayport_size_height - translate_up * 2 - 30}px`;
  btn_next.style.left = '50%';
  btn_next.style.transform = 'translate(-50%,-200%)';
  btn_next.classList.add('hidden');

  //style Text container
  let txt_container = document.querySelector('.text-container');
  txt_container.style.height = displayport_size_height + 'px';
  txt_container.style.width = `${displayport_size_width - 50}px`;
  txt_container.textContent = instruction_training_end[txt_counter];
  txt_counter += 1;

  // Manage the size (1) and (2) location of the progression bar
  // (1) Manage size
  var chart = document.querySelector('.chart');
  var chart_width = displayport_size_width / 1.5;
  chart.style.width = `${chart_width}px`;
  chart.style.height = `${displayport_size_height / 100}px`;
  var bar = document.querySelector('.bar');
  bar.style.width = `${displayport_size_width}px`;
  bar.style.height = `${displayport_size_height / 100}px`;
  // (2) Manage location

  // Add a prompt element for the response phase
  let prompt = document.createElement('div');
  prompt.innerHTML = prompt_txt;
  prompt.classList.add('prompt-txt', 'no--zoom');
  containerFigureElement.appendChild(prompt);
  prompt.classList.add('hidden');

  chart.style.left = `${displayport_size_width / 2 - chart_width / 2}px`;
  const progression_bar = document.getElementById('progression--bar');

  // -----------------------------------------------------------------------------------
  // -- Guiding Arrows for the training phase
  //
  // -- Container
  const container_chevron = document.querySelector('.container-chevron');

  // -- Individual arrows (the animation needs 3 arrows)
  var all_chevron_selectors = [];
  for (let i = 0; i < 3; i++) {
    var div = document.createElement('div');
    div.classList.add('chevron', 'no--zoom');
    container_chevron.appendChild(div);
    all_chevron_selectors.push(div);
  }

  // -----------------------------------------------------------------------------------
  // Apply the function disabling zoom and scroll to EVERY element.
  // Sorry I did not find any other way

  for (let i = 0; i < circleElements.length; i++) {
    attachGestureListeners(circleElements[i]);
  }
  for (let i = 0; i < all_chevron_selectors.length; i++) {
    attachGestureListeners(all_chevron_selectors[i]);
  }
  attachGestureListeners(fixationElement);
  for (let i = 0; i < btn_estimation_complexity.length; i++) {
    attachGestureListeners(btn_estimation_complexity[i]);
  }
  attachGestureListeners(container_estimation_complexity);
  attachGestureListeners(btn_next);
  attachGestureListeners(btn_training);
  attachGestureListeners(btn_ok);
  attachGestureListeners(txt_container);
  attachGestureListeners(pauseElement);
  attachGestureListeners(progression_bar);
  attachGestureListeners(prompt);
  attachGestureListeners(container_chevron);

  // -----------------------------------------------------------------------------------
  /*--- Add created elements to the object element_selectors ---
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
  element_selectors.container_chevron = container_chevron;

  // -----------------------------------------------------------------------------------
  // -- Move Arrow function
  //

  const move_arrow = function (target, sequence) {
    setTimeout(() => {
      // target (num): digit of the complexity button (for example: 3) over which the arrow should be placed
      let target_element = element_selectors.estimation_complexity[target - 1];

      // Get the bounding box of the target element
      let rect = target_element.getBoundingClientRect();
      let height = target_element.offsetHeight;

      // Extract the left and top positions
      let target_left = rect.left + window.scrollX; // Accounts for horizontal scroll
      let target_top = rect.top + window.scrollY; // Accounts for vertical scroll

      // moving the arrow
      element_selectors.container_chevron.style.position = 'absolute';
      element_selectors.container_chevron.style.left = `${target_left}px`;
      element_selectors.container_chevron.style.top = `${
        target_top - height * 3
      }px`;
      if (state == 'response') {
        element_selectors.container_chevron.classList.remove('hidden');
      }
    }, sequence.length * SOA + set_delay * 4);
  };
  // Expose the move_arrow function globally by attaching it to the window object
  window.move_arrow = move_arrow;

  return element_selectors;
};

// -------------------------------------------------------------------------------------------

const hideElements = function (my_elements, element_selectors) {
  for (let i = 0; i < my_elements.length; i++) {
    const my_key = my_elements[i];
    const elements = element_selectors[my_key];
    //check if elements is an array or a single element
    if (Array.isArray(elements)) {
      elements.forEach((element) => element.classList.add('hidden'));
    } else {
      elements.classList.add('hidden');
    }
  }
};

function clearScreen() {
  hideElements(Object.keys(element_selectors), element_selectors);
}

/* 
======================================================
++++++++++++++++ Animation functions +++++++++++++++++
======================================================
*/

const revealElements = function (my_elements, element_selectors) {
  for (let i = 0; i < my_elements.length; i++) {
    const my_key = my_elements[i];
    const elements = element_selectors[my_key];

    // Helper function to reveal child elements recursively if they exist
    const revealWithChildren = (element) => {
      if (!element) return; // If the element is null or undefined, skip

      element.classList.remove('hidden'); // Reveal the current element

      // Check if the element has child elements
      if (element.hasChildNodes()) {
        const childElements = element.querySelectorAll('*'); // Select all child elements
        childElements.forEach((child) => child.classList.remove('hidden'));
      }
    };

    // Check if 'elements' is an array or a single element
    if (Array.isArray(elements)) {
      elements.forEach((element) => revealWithChildren(element)); // Apply to each element in the array
    } else {
      revealWithChildren(elements); // Apply directly if it's a single element
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

// -------------------------------------------------------------------------------------------
// Progression Bar
//

function increase() {
  // >purpose: make a more dynamic progression update
  // Change the variable to modify the speed of the number increasing from 0 to (ms)
  let SPEED = 15;
  // Retrieve the percentage value
  let limit = parseInt(document.getElementById('value1').innerHTML, 0);

  for (let i = 0; i <= limit; i++) {
    setTimeout(function () {
      document.getElementById('value1').innerHTML = i + '%';
    }, SPEED * i);
  }
}

function update_progression(percent) {
  let round_percent = Math.trunc(percent);
  // >purpose: Visually Update the progression Bar
  document.documentElement.style.setProperty(
    '--my-end-width',
    `${round_percent}%`
  );
  value1.textContent = `${round_percent}%`;
}
