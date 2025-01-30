"use strict";

// -- Adapt figure to size of the screen
containerFigureElement.style.height = `${document.documentElement.clientHeight}px`;
containerFigureElement.style.width = `${document.documentElement.clientWidth}px`;

// -- Draw the figure and Define the element selectors object (which allows DOM manipulation)
const element_selectors = draw_figure();

// -- Add the game dynamic to the elements
init(element_selectors);

// -- Add the end message for participant to get compensation
if (lan_selected === "fr") {
  end_txt += `<br> Le code Prolific est : ${code_prolifics}`;
} else {
  end_txt += `<br> The prolific code is: ${code_prolifics}`;
}
