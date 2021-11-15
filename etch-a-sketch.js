/* Constants */ 
const maxResolution = 64; 

/* Global variables */ 
let resolution = 16;

/* Actions to perform on window load/refresh */ 
function onLoad() { 
  createCanvas(); 
}

/* Creates the the etch-a-sketch grid on the page */ 
function createCanvas() {
  // remove the existing canvas if any
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild); 
  }

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
      canvasCell.classList.add(`inactive`);
      canvasRow.appendChild(canvasCell); 
    }
  }
}

/* Triggers the appropriate behavior when user hovers over a canvas cell */
function onHover(e) {
  if (e.target.classList.contains(`canvas-cell`)) {
    const canvasCell = e.target;  
    canvasCell.classList.remove(`inactive`);
  }
}

/* Clears the canvas */ 
function onClear() {
  canvas.childNodes.forEach((canvasRow) => {
    canvasRow.childNodes.forEach((canvasCell) => {
      canvasCell.classList.add(`inactive`);
    }); 
  });
}

/* Query selectors */ 
const canvas = document.querySelector(`.canvas`);
const clearButton = document.querySelector(`button.clear`); 

/* Event listeners */ 
window.addEventListener(`load`, onLoad);
window.addEventListener(`mouseover`, onHover);
clearButton.addEventListener(`click`, onClear);
