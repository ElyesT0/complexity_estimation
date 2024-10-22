'use strict';

// -- Adapt figure to size of the screen
containerFigureElement.style.height = `${document.documentElement.clientHeight}px`;
containerFigureElement.style.width = `${document.documentElement.clientWidth}px`;

// -- Draw the figure and Define the element selectors object (which allows DOM manipulation)
const element_selectors = draw_figure();

// -- Add the game dynamic to the elements
init(element_selectors);

// -- Add the end message for participant to get compensation
if (lan_selected === 'fr') {
  end_txt += `<br>Votre Identifiant aléatoire est le ${participantData.participant_id[0]} <br><br> Le code est : ${code_prolifics}`;
} else {
  end_txt += `<br>Your random ID is the following: ${participantData.participant_id[0]} <br><br> The code is: ${code_prolifics}`;
}
