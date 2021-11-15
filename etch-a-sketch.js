/* Constants */ 
const maxResolution = 64; 

/* Global variables */ 
let resolution = 16;
let grid = []; 

/* Actions to perform on window load/refresh */ 
function onLoad() { 
  createGrid(); 
  displayCanvas(); 
}

/* Creates the internal representation of the etch-a-sketch grid */ 
function createGrid() {
  // clear the existing grid
  grid.length = 0; 

  // create the new grid
  for (row = 0; row < resolution; row++) {
    let row = [];
    for (column = 0; column < resolution; column++) {
      row.push(0);
    }
    grid.push(row); 
  }
}

/* Displays the the etch-a-sketch grid on the page */ 
function displayCanvas() {
  // clear the existing canvas if any
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild); 
  }

  // create the new canvas to be displayed
  grid.forEach((row) => {
    const canvasRow = document.createElement(`div`); 
    canvasRow.classList.add(`canvas-row`);
    canvas.appendChild(canvasRow);
    row.forEach((column) => {
      const canvasCell = document.createElement(`div`);
      canvasCell.classList.add(`canvas-cell`);
      canvasRow.appendChild(canvasCell); 
    });
  });
}

/* Query selectors */ 
const canvas = document.querySelector(`.canvas`);

/* Event listeners */ 
window.addEventListener(`load`, onLoad)

/* Temporary helper functions */ 
function printGridToConsole() {
  grid.forEach((row) => {
    console.log(row);
  });
}