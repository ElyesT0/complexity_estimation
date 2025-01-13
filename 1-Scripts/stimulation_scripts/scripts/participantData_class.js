"use strict";

class ParticipantCl {
  constructor() {
    this.sequences_temp_tags = "toFill";
    this.sequences_geom_tags = "toFill";

    this.sequences_original = "toFill";
    this.sequences_shown = "toFill";

    this.participant_id = "toFill";
    this.participant_prolific_id = "toFill";
    this.participant_response = [];
    this.participant_timings = "toFill";
    this.participant_startTime = "toFill";
    this.participant_screenWidth = "toFill";
    this.participant_screenHeight = "toFill";
    this.participant_language = "toFill";
    this.participant_trialCounter = "toFill";
    this.last_click = "toFill";

    this.experiment_SOA = "toFill";
    this.experiment_blink = "toFill";
    this.experiment_rangeEstimationComplexity = "toFill";

    //survey Results
    this.age = "toFill";
    this.diplome = "toFill";
    this.musicExp = "toFill";
    this.musicScoreReading = "toFill";
    this.instrumentProficiency = "toFill";
    this.mathExp = "toFill";
  }
}
