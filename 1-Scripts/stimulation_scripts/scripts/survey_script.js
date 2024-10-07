/* 
======================================================
++++++++++++++++ Variable definition +++++++++++++++++
======================================================
*/

//>Link elements to variables
const btnSubmit = document.getElementById("submit");
let answerAge = document.getElementById("age");
let answerDiplome = document.getElementById("diplome");
let answerMusicExp = document.getElementById("musicExp");
let answerMathExp = document.getElementById("mathExp");
const errorMess = document.getElementById("errorMess");
const btnGoToTraining = document.getElementById("goToTraining");

var surveyChoices = []; // This variable will contain the survey's answers
var nb_answered = 0; //This variable counts the number of questions that have been answered (must be 4)

/* 
======================================================
++++++++++++++++++ Prepare visual ++++++++++++++++++++
======================================================
*/

// adjust size of the screen
const set_margin_top = 12; //copy margin top from the container element (pixels)
const set_margin_side = 6; //copy margin side from the container element (pixels)
const window_width = window.screen.width;
// const window_height = window.screen.height; // NOTE changed for smartphone
const window_height = window.innerHeight;

//set size of survey--body
document.querySelector(".survey--body").style.height = `${
  window_height - set_margin_top * 2
}px`;
document.querySelector(".survey--body").style.width = `${
  window_width - set_margin_side * 3.5
}px`;

/* 
======================================================
++++++++++++++++++++ Functions +++++++++++++++++++++++
======================================================
*/

function submitSurvey() {
  // >purpose: register the choices in variables
  surveyChoices.pop();
  console.log("Survey has been submitted");
  let collectAge = answerAge.value;
  let collectDiplome = answerDiplome.value;
  let collectMusicExp = answerMusicExp.value;
  let collectMathExp = answerMathExp.value;
  surveyChoices.push([
    collectAge,
    collectDiplome,
    collectMusicExp,
    collectMathExp,
  ]);
  console.log(surveyChoices); //FIXME delete me
  nb_answered = 0;
  //>purpose: check if all information have been entered correctly else display message
  for (let i = 0; i < 4; i++) {
    if (surveyChoices[0][i].length != 0) {
      nb_answered += 1;
    }
  }
  if (nb_answered == 4) {
    btnSubmit.classList.add("hidden");
    btnGoToTraining.classList.remove("hidden");
    // errorMess.textContent = "Clickez sur le boutton Training pour commencer"; //give the instruction that the participant can start
    // errorMess.classList.remove("hidden");
    //send the survey data in the storage
    sessionStorage.setItem("surveyChoices", surveyChoices); //create the ID value
  } else {
    errorMess.classList.remove("hidden");
  }
}

/* 
======================================================
+++++++++++++++++++ Survey Logic +++++++++++++++++++++
======================================================
*/
// Log in the information the user entered if "submit" is pushed
btnSubmit.addEventListener("click", submitSurvey);
