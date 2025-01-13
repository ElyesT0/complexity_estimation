function setLanguage(language) {
  const langElements = document.querySelectorAll(".lang");
  langElements.forEach((el) => {
    el.textContent = el.getAttribute(`data-${language}`);
  });
  document.getElementById("language-selection").classList.add("hidden");
  document.getElementById("presentation").classList.remove("hidden");
  sessionStorage.setItem("language-selected", language);
}

function showConsent() {
  document.getElementById("presentation").classList.add("hidden");
  document.getElementById("consent-form").classList.remove("hidden");
}

function acceptConsent() {
  document.getElementById("consent-form").classList.add("hidden");
  document.getElementById("survey").classList.remove("hidden");
}

function declineConsent() {
  alert("You have declined the consent. Thank you for your time.");
}

function submitSurvey() {
  const prolificID = document.getElementById("prolificID").value;
  const age = document.getElementById("age").value;
  const diplome = document.getElementById("diplome").value;
  const musicExp = document.getElementById("musicExp").value;
  const musicScoreReading = document.getElementById("musicScoreReading").value;
  const instrumentProficiency = document.getElementById(
    "instrumentProficiency"
  ).value;
  const mathExp = document.getElementById("mathExp").value;

  if (
    prolificID &&
    age &&
    diplome &&
    musicExp &&
    musicScoreReading &&
    instrumentProficiency &&
    mathExp
  ) {
    document.getElementById("submitBtn").classList.add("hidden");
    document.getElementById("goToTraining").classList.remove("hidden");
    saveSurveyData(
      prolificID,
      age,
      diplome,
      musicExp,
      musicScoreReading,
      instrumentProficiency,
      mathExp
    );
  } else {
    alert("Please fill out all fields.");
  }
}

function saveSurveyData(
  prolificID,
  age,
  diplome,
  musicExp,
  musicScoreReading,
  instrumentProficiency,
  mathExp
) {
  let surveyChoices = {
    prolificID: prolificID,
    age: age,
    diplome: diplome,
    musicExp: musicExp,
    musicScoreReading: musicScoreReading,
    instrumentProficiency: instrumentProficiency,
    mathExp: mathExp,
  };

  // Store the data as a JSON string in sessionStorage
  sessionStorage.setItem("surveyChoices", JSON.stringify(surveyChoices));
}

// Add event listener to the "Go to Training" button
document.getElementById("goToTraining").addEventListener("click", () => {
  // Get values from the form fields
  const prolificID = document.getElementById("prolificID").value;
  const age = document.getElementById("age").value;
  const diplome = document.getElementById("diplome").value;
  const musicExp = document.getElementById("musicExp").value;
  const musicScoreReading = document.getElementById("musicScoreReading").value;
  const instrumentProficiency = document.getElementById(
    "instrumentProficiency"
  ).value;
  const mathExp = document.getElementById("mathExp").value;

  // Call the saveSurveyData function with the form values
  saveSurveyData(
    prolificID,
    age,
    diplome,
    musicExp,
    musicScoreReading,
    instrumentProficiency,
    mathExp
  );

  // sends to the experiment
  window.location.href = "main.html";
});
