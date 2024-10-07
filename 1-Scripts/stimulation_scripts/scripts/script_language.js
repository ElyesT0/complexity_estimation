/* 
=========== Fixing page design parameters ===========
*/
const set_margin_top = 20; //copy margin top from the container element (pixels)
const set_margin_side = 10; //copy margin side from the container element (pixels)
const window_width = window.screen.width;
// const window_height = window.screen.height; // NOTE changed for smartphone
const window_height = window.innerHeight;
const btn_Fr = document.getElementById("languageFr");
const btn_Eng = document.getElementById("languageEng");
var lan_selected; //contain language selected

//set size of container
document.querySelector(".container").style.height = `${
  window_height - set_margin_top * 2
}px`;
document.querySelector(".container").style.width = `${
  window_width - set_margin_side * 3.5
}px`;

//set language onclick for other pages. Useful in Scripts (feedbacks on performance for example)
btn_Fr.addEventListener("click", function () {
  lan_selected = "Fr";
  sessionStorage.setItem("lan_selected", lan_selected);
});
btn_Eng.addEventListener("click", function () {
  lan_selected = "Eng";
  sessionStorage.setItem("lan_selected", lan_selected);
});
