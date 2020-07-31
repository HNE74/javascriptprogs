/**
 * Implementation based on youtube video:
 * https://www.youtube.com/results?search_query=marching+squares+algorithm
 */
const width = 800;
const height = 600;
const rez = 100;
const noiseInc = 0.1;
const cols = 1 + width / rez;
const rows = 1 + height / rez;
const field = new Array(cols).fill(null).map(()=>new Array(rows).fill(0));
const zoffInc = 0.008;
let zoff = 0;

function setup() {
  createCanvas(width, height);
}

function generateFieldValues() {  let yoff = 0;
  for(let i=0; i<cols; i++) {
    yoff += noiseInc;
    let xoff = 0;
    for(let j=0; j<rows; j++) {
      xoff += noiseInc;
      field[i][j] = noise(xoff, yoff, zoff)*2-1;
    }
  }
  //zoff += zoffInc;
}

function draw() {
  background(127);

  generateFieldValues();
  drawSquareRects(false);
  drawSquarePoints();

  stroke(25);
  strokeWeight(1);
  drawSquareSeparationLines();
}

function drawSquareRects(doFill) {
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      rect(i*rez, j*rez, rez, rez);      
      if(doFill) {
        fill(field[i][j]*255);
        noStroke();
      } 
      else {
        stroke(0);
      }
    }
  }  
}

function drawSquarePoints() {
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      stroke(field[i][j]*255);
      strokeWeight(rez*0.3)
      point(i*rez, j*rez);
    }
  }  
}

function drawSquareSeparationLines() {
  for(let i=0; i<cols-1; i++) {
    for(let j=0; j<rows-1; j++) {
      let x = i * rez;
      let y = j * rez;
      let a = { xp: x + rez*0.5,  yp: y };
      let b = { xp: x + rez,  yp: y + rez*0.5 };
      let c = { xp: x + rez*0.5,  yp: y+rez };
      let d = { xp: x,  yp: y + rez*0.5 }; 
      let state = getState(Math.ceil(field[i][j]),
        Math.ceil(field[i+1][j]),
        Math.ceil(field[i+1][j+1]),
        Math.ceil(field[i][j+1])); 
      switch(state) {
        case 1:
          drawLine(c, d, i, j, true);
          break;
        case 2:
          drawLine(b, c, i, j, true);
          break;    
        case 3:
          drawLine(b, d, i, j, true);
          break; 
        case 4:
          drawLine(a, b, i, j, true);
          break;
        case 5:
          drawLine(a, d, i, j, true);
          drawLine(b, c, i, j, true);          
          break;    
        case 6:
          drawLine(a, c, i, j, true);
          break; 
        case 7:
          drawLine(a, d, i, j, true);
          break;
        case 8:
          drawLine(a, d, i, j, true);
          break;    
        case 9:
          drawLine(a, c, i, j, true);
          break; 
        case 10:
          drawLine(a, b, i, j, true);
          drawLine(c, d, i, j, true);          
          break;
        case 11:
          drawLine(a, b, i, j, true);
          break;    
        case 12:
          drawLine(b, d, i, j, true);
          break; 
        case 13:
          drawLine(b, c, i, j, true);
          break;    
        case 14:
          drawLine(c, d, i, j, true);
          break;                                    
        default:
          break;
      }       
    }
  }  
}

function drawLine(v1, v2, col, row, doInterpolate) {
  let p1x = v1['xp'];
  let p1y = v1['yp'];
  let p2x = v2['xp'];
  let p2y = v2['yp'];

  if(doInterpolate) {   
    if(p1y >= p2y) {
      let v1 = field[col][row];   
      let v2 = field[col][row+1];
      p1y = linearInterpolation(v1, v2, p1y);
    }
    if(p2x >= p1x) {
      let v1 = field[col][row];   
      let v2 = field[col+1][row];
      p2x = linearInterpolation(v1, v2, p1x);      
    }
  }
  
  line(p1x, p1y, p2x, p2y);
}

function linearInterpolation(v1, v2, offset) {
  return v1 / (v1 - v2) * rez + offset;
}
 
function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1; 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}