/* Constants */ 
const maxResolution = 64; 

/* Global variables */ 
let resolution = 16;

/* Actions to perform on window load/refresh */ 
function onLoad() { 
  // createGrid(); 
  createCanvas(); 
}

/* Displays the the etch-a-sketch grid on the page */ 
function createCanvas() {
  // clear the existing canvas if any
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

function onHover(e) {
  if (e.target.classList.contains(`canvas-cell`)) {
    const canvasCell = e.target;  
    canvasCell.classList.remove(`inactive`);
  }
}

/* Query selectors */ 
const canvas = document.querySelector(`.canvas`);

/* Event listeners */ 
window.addEventListener(`load`, onLoad);
window.addEventListener(`mouseover`, onHover);
