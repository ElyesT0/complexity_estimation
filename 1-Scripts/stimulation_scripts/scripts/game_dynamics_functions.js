'use strict';

const init = function (element_selectors) {
  // Make the OK button skip through instructions
  element_selectors['btn_ok'].addEventListener(keyEvent, () => {
    if (txt_counter < instruction_training_start.length) {
      element_selectors.txt_container.textContent =
        instruction_training_end[txt_counter];
      txt_counter += 1;
    } else {
      hideElements(instruction_elements, element_selectors);
      runTrial();
    }
  });

  // Make the complexity estimator buttons record answers
  for (let i = 1; i < range_estimation_complexity + 1; i++) {
    document
      .getElementById(`complexity-${i}`)
      .addEventListener(keyEvent, () => {
        response(i);
      });
  }

  // Make the NEXT button lead to next trial
  element_selectors.btn_next.addEventListener(keyEvent, () => {
    runTrial();
  });
};

// -------------------------------------------------------------------------------------------

const runTrial = function () {
  var sequence = sequences[counter_presentation];
  // 0 - Clean the screen
  clearScreen();

  // 1 - Show the Sequence
  presentation(sequence, element_selectors);
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
  setTimeout(
    () => revealElements(response_phase_elements, element_selectors),
    SOA * sequence.length + set_delay
  );
}

// -------------------------------------------------------------------------------------------

function response(participant_input) {
  presentation_time = false;
  // update the progression bar
  //   update_progression(completion);
  // - Hide answer buttons
  clearScreen();

  // - Increment the sequence counter
  counter_presentation += 1;

  // - Record participant's answer
  participantData.participant_response.push(participant_input);
  participantData.participant_trialCounter = counter_presentation;

  // - Go to Next page
  display_pageNext(participant_input);
}

// -------------------------------------------------------------------------------------------

function display_pageNext(participant_input) {
  // - Display a page as an attentional buffer. Remind participant of their response.
  element_selectors.txt_container.innerHTML = `
  <div style="font-size: 36px; text-align: center; justify-content: center; font-family:'Bungee',sans-serif; height: 100%;">
    You responded <br><br><br> <div style="font-size:100px;transform: translate(0%, -30%)">${participant_input}</div>
  </div>`;
  clearScreen();
  revealElements(page_next_elements, element_selectors);

  // - Go to next trial by pushing the NEXT button
}
