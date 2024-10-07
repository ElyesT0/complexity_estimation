let my_object = {
  participant_id: 'fk943NFS9342FFD',
  SOA: 400,
  break_time: 1500,
  click_timings_after: [
    [13503, 13769, 14102, 14336],
    [28448, 28666, 28999, 29199, 29383],
    [37255, 37839, 38206, 38439, 38624],
    [45961, 46147, 46311, 46563],
    [53936, 54203, 54367, 54571, 54970],
    [],
  ],
  click_timings_before: [
    [8830, 9016, 9566, 9749, 9902, 10533, 10715, 10902, 11550, 12186, 12802],
    [26064, 26297, 27031, 27433, 27614],
    [33968, 34203, 34787, 34987, 35154, 36189, 36372],
    [41625, 42024, 43043, 43227, 43878, 44095, 44913, 45079],
    [50083, 50366, 50983, 51285, 51566, 52352, 52768, 52985],
    [],
  ],
  confidence: [300, 300, 300, 300, 300],
  counter: 5,
  current_score: 333,
  element_selectors: {
    btn_next: 'div.btn--next.no--zoom',
    btn_ok: 'div.btn--ok.no--zoom.hidden',
    btn_training: 'div.btn--training.no--zoom.hidden',
    circles: [
      'div#circleElement-0.circle.no--zoom.circle--reproduction.hidden',
      'div#circleElement-1.circle.no--zoom.circle--reproduction.hidden',
      'div#circleElement-2.circle.no--zoom.circle--reproduction.hidden',
      'div#circleElement-3.circle.no--zoom.circle--reproduction.hidden',
      'div#circleElement-4.circle.no--zoom.circle--reproduction.hidden',
      'div#circleElement-5.circle.no--zoom.circle--reproduction.hidden',
    ],
    confidence: [
      'div#conf-1.btn-confidence.no--zoom',
      'div#conf-2.btn-confidence.no--zoom',
      'div#conf-3.btn-confidence.no--zoom',
      'div#conf-4.btn-confidence.no--zoom',
    ],
    container_confidence: 'div.container-confidence.no--zoom.hidden',
    fixation: 'div.fixation.no--zoom.hidden',
    txt_container: 'div.text-container.hidden',
    txt_score: 'div.txt--score.no--zoom',
    txt_score_increase: 'div.increase.no--zoom',
  },
  interclick_timings_after: [
    [266, 333, 234],
    [218, 333, 200, 184],
    [584, 367, 233, 185],
    [186, 164, 252],
    [267, 164, 204, 399],
    [],
  ],
  interclick_timings_before: [
    [186, 550, 183, 153, 631, 182, 187, 648, 636, 616],
    [233, 734, 402, 181],
    [235, 584, 200, 167, 1035, 183],
    [399, 1019, 184, 651, 217, 818, 166],
    [283, 617, 302, 281, 786, 416, 217],
    [],
  ],
  last_click: 1710751660069,
  original_seq: [
    [0, 1, 2, 3, 0, 1, 2, 3],
    [1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
    [0, 1, 0, 1],
    [1, 2, 3, 1, 2, 3],
    [1, 2, 3, 1, 2, 3],
    [0, 1, 0, 1],
  ],
  participant_id: 'NDHM0RC0AJLS',
  performance: ['fail', 'fail', 'fail', 'fail', 'fail'],
  presentation_time: false,
  response_sequences_after: [
    [3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [2, 3, 3, 3, 3],
    [3, 3, 3, 3],
    [2, 2, 2, 2, 2],
    [],
  ],
  response_sequences_before: [
    [3, 3, 2, 2, 2, 1, 1, 1, 0, 1, 2],
    [3, 3, 2, 2, 2],
    [3, 3, 2, 2, 2, 1, 1],
    [3, 3, 2, 2, 3, 3, 2, 2],
    [3, 3, 2, 2, 2, 3, 3, 3],
    [],
  ],
  score: [700, 380, 600, 200, 333],
  screen_height: 844,
  screen_width: 390,
  seq: [
    [0, 1, 2, 3, 0, 1, 2, 3],
    [1, 2, 3, 4, 5, 5, 4, 3, 2, 1],
    [1, 4, 1, 4],
    [4, 5, 1, 4, 5, 1],
    [5, 0, 2, 5, 0, 2],
    [3, 2, 3, 2],
  ],
  set_delay: 750,
  start_time: 1710751604364,
  state: 'main_experiment',
  survey: null,
};

function convertCSV(obj) {
  // >purpose: convert a javascript object to a string with a CSV format

  //variables for the keys
  let keys = Object.keys(obj);

  //variables for the values
  let values = Object.values(obj);
  let csv = '';
  csv = csv + keys + '\n';
  for (let i = 0; i < obj.performance.length; i++) {
    for (let k = 0; k < keys.length; k++) {
      // Loop over the number of keys to get all the keys' values one after the other in a line
      try {
        //Case 1: the value considered is an array (e.g. original_seq, response_seq_before, interclick_timings_before, ...)
        if (typeof values[k] === 'object') {
          csv = csv + '"' + values[k][i] + '",';
        } else {
          //Case 2: the value considered is a string or a single element (e.g. counter, current_score, SOA...)

          csv = csv + values[k] + ',';
        }
      } catch (error) {
        csv = csv + '"",';
      }
    }
    csv = csv + '\n';
  }
  return csv;
}

function oldCSV() {
  //----------

  for (let i = 0; i < keys.length; i++) {
    temp.push(keys[i]);
  }
  txt_keys = temp.join(',') + '\n';

  if (Array.isArray(obj['seq'])) {
    for (let k = 0; k < obj['seq'].length; k++) {
      for (let i = 0; i < keys.length; i++) {
        if (typeof values[i] == 'string' || typeof values[i] == 'number') {
          txt_values += `${values[i]},`;
        } else {
          txt_values += `"${values[i][k]}",`;
        }
      }
      txt_values += '\n';
    }
  } else {
    console.error("'seq' is not an array or is undefined.");
  }

  // let csv = txt_keys + txt_values;

  return csv;
}

// let my_csv = convertCSV(my_object);
// console.log(my_csv);
console.log(convertCSV(my_object));
// console.log(typeof Object.values(my_object)[22][0]);
// console.log(Object.values(my_object)[22][0]);
// console.log(Object.values(my_object).length);
// console.log(Object.keys(my_object));
