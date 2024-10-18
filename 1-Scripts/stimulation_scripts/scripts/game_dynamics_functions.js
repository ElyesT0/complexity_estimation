'use strict';

const init = function (element_selectors) {
  // Make the OK button skip through instructions
  element_selectors['btn_ok'].addEventListener(keyEvent, () => {
    if (txt_counter < instruction_training_end.length) {
      element_selectors.txt_container.innerHTML =
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

/* 
======================================================
++++++++++ Experimental Timeline Functions +++++++++++
======================================================
*/

// -------------------------------------------------------------------------------------------

const runTrial = function () {
  var sequence = sequence_train_test[counter_presentation];
  // 0 - Clean the screen
  clearScreen();

  // -- Update progression bar
  let percentage_progression =
    100 * (counter_presentation / sequence_train_test.length);
  update_progression(percentage_progression);
  participantData.last_click = Array(sequence_train_test.length).fill(
    last_click
  );
  // -- Check if there are still sequences to show
  if (counter_presentation < sequence_train_test.length) {
    // 1 - Show the Sequence
    presentation(sequence, element_selectors);
    // 2 - Make the response buttons appear (complexity estimation)
    // -----------------------------
    // -- Training Trials Definition
    //

    if (counter_presentation < training_sequences.length) {
      handle_training(counter_presentation, sequence);
    }

    // -----------------------------
    // -- Test Trials Definition
    //
    else {
      handle_testing(counter_presentation, sequence);
    }
    // 3 - Register the response to the participant's Object

    // 4 - Send partial data
    saveParticipantData(
      post_meg,
      participantData.participant_id[0],
      participantData
    );
  } else {
    // Show end screen
    element_selectors.txt_container.innerHTML = end_txt;
    revealElements(['txt_container'], element_selectors);
    saveParticipantData(
      post_meg,
      participantData.participant_id[0],
      participantData
    );
  }
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
  participantData.participant_response[counter_presentation - 1] =
    participant_input;
  participantData.participant_timings[counter_presentation - 1] =
    Date.now() - last_click;
  last_click = Date.now();
  participantData.participant_trialCounter = Array(
    sequence_train_test.length
  ).fill(counter_presentation);

  // - Go to Next page
  display_pageNext(participant_input);
}

/* 
======================================================
++++++++++++++++ Transition functions +++++++++++++++
======================================================
*/
function display_pageNext(participant_input) {
  if (counter_presentation == training_sequences.length) {
    element_selectors.txt_container.innerHTML = transition_instructions;
  } else if (counter_presentation < training_sequences.length) {
    element_selectors.txt_container.innerHTML = `
  <div style="font-size: 36px; text-align: center; justify-content: center; font-family:'Bungee',sans-serif;">
    ${training_feedback_txt} <br><br><br> <div style="font-size:100px;transform: translate(0%, -30%)">${
      training_answer_examples[counter_presentation - 1]
    }</div>
  </div>`;
  } else {
    // - Display a page as an attentional buffer. Remind participant of their response.
    element_selectors.txt_container.innerHTML = `
  <div style="font-size: 36px; text-align: center; justify-content: center; font-family:'Bungee',sans-serif;">
    ${next_txt} <br><br><br> <div style="font-size:100px;transform: translate(0%, -30%)">${participant_input}</div>
  </div>`;
  }
  clearScreen();
  revealElements(page_next_elements, element_selectors);
}

function handle_training(counter_presentation, sequence) {
  if (counter_presentation == 0) {
    element_selectors.prompt.innerHTML = training_prompt_txt[0];
    move_arrow(1, sequence);
  } else if (counter_presentation == 1) {
    move_arrow(7, sequence);
    element_selectors.prompt.innerHTML = training_prompt_txt[1];
  } else if (counter_presentation + 1 == sequence_train_test.length) {
    element_selectors.prompt.innerHTML = training_prompt_txt[2];
  } else {
    element_selectors.prompt.innerHTML = training_prompt_txt[2];
  }
}

function handle_testing(counter_presentation, sequence) {
  console.log('this is a Test trial');
  element_selectors.prompt = prompt_txt;
}
