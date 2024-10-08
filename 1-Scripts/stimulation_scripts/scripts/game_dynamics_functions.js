'use strict';

const init = function (element_selectors) {
  // Make the OK button skip through instructions
  element_selectors['btn_ok'].addEventListener(keyEvent, () => {
    if (txt_counter < instruction_training_start.length) {
      element_selectors.txt_container.textContent =
        instruction_training_end[txt_counter];
      txt_counter += 1;
    } else {
      const { btn_ok, txt_container } = element_selectors;
      hideElements(btn_ok, txt_container);
      runBlock();
    }
  });
};

// -------------------------------------------------------------------------------------------

const runBlock = function () {
  // 0 - Hide instructions related elements
  hideElements(instruction_elements, element_selectors);

  // 1 - Generate the participant's Object if it's the first time running a block
  if (block_counter == 0) {
    
    block_counter += 1;
  } else {
    // 0 - Check if the experiment is continuing: start a new block or end the experiment
    // 2 - Loop through trials
    // __ 2.a - Wait for trigger 'end of trial'
    // __ 2.b - Check if the block is continuing: start a new trial or end the block
  }
};

// -------------------------------------------------------------------------------------------

const runTrial = function () {
  // 1 - Show the Sequence
  presentation(sequences[counter_presentation], element_selectors);
  // 2 - Make the response buttons appear (complexity estimation)
  // 3 - Register the response to the participant's Object
  // 4 - Send partial data
};

// -------------------------------------------------------------------------------------------

function presentation(sequence, element_selectors) {
  presentation_time = true;
  revealElements(experimental_elements, element_selectors);

  for (let i = 0; i < sequence.length; i++) {
    setTimeout(
      () => activate_point(element_selectors.circles[sequence[i]]),
      SOA * (i + 1)
    );
  }
}

function response() {
  // update the progression bar
  //   update_progression(completion);
}
