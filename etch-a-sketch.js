/* Constants */ 
const maxResolution = 48; 
const maxCellFade = 4; 

/* Global variables */ 
let resolution = 16;
let mode = `standard`;

/* Actions to perform on window load/refresh */ 
function onLoad() { 
  createCanvas(); 
}

/* Creates the the etch-a-sketch grid on the page */ 
function createCanvas() {
  // remove the existing canvas if any
  removeCanvas(); 

  // create the new canvas to be displayed
  for (row = 0; row < resolution; row++) {
    const canvasRow = document.createElement(`div`); 
    canvasRow.classList.add(`canvas-row`);
    canvas.appendChild(canvasRow);

    for (column = 0; column < resolution; column++) {
      const canvasCell = document.createElement(`div`);
      canvasCell.classList.add(`canvas-cell`);
      canvasCell.setAttribute(`data-row`, row);
      canvasCell.setAttribute(`data-column`, column);
      canvasCell.setAttribute(`data-fade`, maxCellFade);
      canvasCell.classList.add(`inactive`);
      canvasRow.appendChild(canvasCell); 
    }
  }
}

/* Removes the elements that make up the canvas */
function removeCanvas() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild); 
  }
  canvas.classList.add(`inactive`);
}

/* Returns a random color */
function getRandomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padEnd(6, 0)}`;
}

/* Triggers the appropriate behavior when user hovers over a canvas cell */
function onCellHover(e) {
  if (e.target.classList.contains(`canvas-cell`)) {
    const canvasCell = e.target;  
    canvasCell.classList.remove(`inactive`);
    switch(mode) {
      case`standard`:
        canvasCell.dataset.fade = 0; 
        break; 
      case `natural`:
        const fade = canvasCell.dataset.fade; 
        canvasCell.dataset.fade = Math.max(0, fade-1); 
        break; 
      case `random`:
        canvasCell.style.backgroundColor = getRandomColor();
        break;
      default: 
        break; 
    }
  }
}

/* Clears the canvas */ 
function onClear() {
  createCanvas(); 
}

/* Shows the options panel */ 
function onOptions() {
  removeCanvas(); 
  optionsPanel.classList.remove(`hidden`);
  resolutionDisplayValue.textContent = resolution; 
}

/* Changes the sketch mode */ 
function onMode(e) {
  mode = e.target.dataset.mode; 
  optionsPanel.classList.add(`hidden`);
  createCanvas(); 
}

/* Re-creates the canvas after resolution is set */ 
function onResolutionSet() {
  optionsPanel.classList.add(`hidden`);
  createCanvas(); 
}

/* Increases the resolution, up to the max value */ 
function onResolutionIncrement() {
  if (resolution < maxResolution) {
    resolution++; 
  } 
  resolutionDisplayValue.textContent = resolution; 
}

/* Decreases the resolution, down to 1 */ 
function onResolutionDecrement() {
  if (resolution > 1) {
    resolution--;
  }
  resolutionDisplayValue.textContent = resolution; 
}

/* Query selectors */ 
const canvas = document.querySelector(`.canvas`);
const clearButton = document.querySelector(`button.clear`); 
const optionsButton = document.querySelector(`button.options`);
const optionsPanel = document.querySelector(`.options-panel`);
const modeButtons = document.querySelectorAll(`.mode button`);
const resolutionSetButton = document.querySelector(`.resolution .set`);
const resolutionIncrementButton = document.querySelector(`.resolution .plus`);
const resolutionDecrementButton = document.querySelector(`.resolution .minus`);
const resolutionDisplayValue = document.querySelector(`.resolution .value`);

/* Event listeners */ 
window.addEventListener(`load`, onLoad);
window.addEventListener(`mouseover`, onCellHover);
clearButton.addEventListener(`click`, onClear);
optionsButton.addEventListener(`click`, onOptions);
modeButtons.forEach((modeButton)=>modeButton.addEventListener(`click`, onMode));
resolutionSetButton.addEventListener(`click`, onResolutionSet);
resolutionIncrementButton.addEventListener(`click`, onResolutionIncrement);
resolutionDecrementButton.addEventListener(`click`, onResolutionDecrement);
