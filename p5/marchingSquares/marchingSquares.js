const width = 800;
const height = 600;
const rez = 10;
const cols = width / rez;
const rows = height / rez;
const field = new Array();

function setup() {
  createCanvas(width, height);
  for(let i=0; i<cols-1; i++) {
    for(let j=0; j<rows-1; j++) {
      line = new Array();
      line.push((Math.random()>0.5) ? 1 : 0);
    }
    field.push(line);
  }

}

function draw() {
  background(204);

  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      stroke(field[i][j]*255);
      point(i*rez, j*rez);
    }
  }

}