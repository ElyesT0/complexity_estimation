'use strict';

/* 
=========== Variables and Selectors ===========
*/

const btnConsent = document.querySelector('.btn--consent');
const btnSurvey = document.querySelector('.btn--survey');
const btnConsentAgree = document.querySelector('.btn-consent-agree');
const btnConsentDisagree = document.querySelector('.btn-consent-disagree');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
var consentFilled = false;

/* 
=========== Fixing page design parameters ===========
*/
const set_margin_top = 12; //copy margin top from the container element (pixels)
const set_margin_side = 6; //copy margin side from the container element (pixels)
const window_width = window.screen.width;
// const window_height = window.screen.height; // NOTE changed for smartphone
const window_height = window.innerHeight;

//set size of container
document.querySelector('.container').style.height = `${
  window_height - set_margin_top * 2
}px`;
document.querySelector('.container').style.width = `${
  window_width - set_margin_side * 3.5
}px`;

//set size of modal
document.querySelector('.modal').style.height = `${(9 / 10) * window_height}px`;
document.querySelector('.modal').style.width = `${window_width}px`;

/* 
=========== Functions definition ===========
*/
const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
/*
const nextPhaseReady = function () {
  // >purpose: Make "Survey" visible when Consent is filled
  if (isSafari && isNotChrome) {
    btnConsent.classList.add("hidden");
    btnSurvey.classList.add("hidden");
    document.querySelector(".instruction-text").textContent =
      "We are sorry but Safari Browser does not support this experiment, please reload the page using another browser";
  } else if (consentFilled) {
    btnSurvey.classList.remove("hidden");
    btnConsent.classList.add("hidden");
  } else {
    btnSurvey.classList.add("hidden");
  }
};
*/

const nextPhaseReady = function () {
  // >purpose: Make "Survey" visible when Consent is filled
  if (consentFilled) {
    btnSurvey.classList.remove('hidden');
    btnConsent.classList.add('hidden');
  } else {
    btnSurvey.classList.add('hidden');
  }
};

/* 
=========== Code execution ===========
*/

//NOTE This ensure the functionning of the modal window for consent.
btnConsent.addEventListener('click', showModal);

// Collect Consent choice
btnConsentAgree.addEventListener('click', function () {
  consentFilled = true;
  hideModal();
  btnConsent.classList.add('btn--green');
  btnConsent.classList.remove('btn--red');
  nextPhaseReady();
});

btnConsentDisagree.addEventListener('click', function () {
  consentFilled = false;
  hideModal();
  btnConsent.classList.add('btn--red');
  btnConsent.classList.remove('btn--green');
  nextPhaseReady();
});

// Closing the modal window
overlay.addEventListener('click', hideModal);
btnCloseModal.addEventListener('click', hideModal);

//=========== fixing bugs ===========

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); //experiment bugs a lot on safari
var isNotChrome = navigator.userAgent.match('CriOS') == null; //check if user uses chrome
console.log(navigator.userAgent.match('CriOS') == null);
