"use strict";

// -- Adapt figure to size of the screen
containerFigureElement.style.height = `${document.documentElement.clientHeight}px`;
containerFigureElement.style.width = `${document.documentElement.clientWidth}px`;

// -- Draw the figure and Define the element selectors object (which allows DOM manipulation)
const element_selectors = draw_figure();

// -- Add the game dynamic to the elements
init(element_selectors);
