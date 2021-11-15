/* Constants */ 
const maxResolution = 64; 

/* Global variables */ 
let resolution = 16;
let grid = []; 


/* Actions to perform on window load/refresh */ 
function onLoad() { 
  createGrid(); 
  createCanvas(); 
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
function createCanvas() {
  // clear the existing canvas if any
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild); 
  }

  // create the new canvas to be displayed
  grid.forEach((row, rowIndex) => {
    const canvasRow = document.createElement(`div`); 
    canvasRow.classList.add(`canvas-row`);
    canvas.appendChild(canvasRow);

    row.forEach((column, columnIndex) => {
      const canvasCell = document.createElement(`div`);
      canvasCell.classList.add(`canvas-cell`);
      canvasCell.setAttribute(`data-row`, rowIndex);
      canvasCell.setAttribute(`data-column`, columnIndex);
      canvasCell.classList.add(`inactive`);
      canvasRow.appendChild(canvasCell); 
    });
  });
}

function onHover(e) {
  if (e.target.classList.contains(`canvas-cell`)) {
    const canvasCell = e.target; 
    grid[canvasCell.dataset.row][canvasCell.dataset.column] = 1; 
    canvasCell.classList.remove(`inactive`);
  }
}

/* Query selectors */ 
const canvas = document.querySelector(`.canvas`);

/* Event listeners */ 
window.addEventListener(`load`, onLoad);
window.addEventListener(`mouseover`, onHover);

/* Temporary helper functions */ 
function printGridToConsole() {
  grid.forEach((row) => {
    console.log(row);
  });
}