/**
 * Implementation based on youtube video:
 * https://www.youtube.com/results?search_query=marching+squares+algorithm
 */
const width = 800;
const height = 600;
const rez = 10;
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
  zoff += zoffInc;
}

function draw() {
  background(127);

  generateFieldValues();
  drawSquareRects(false);
  drawSquarePoints(false);

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
        stroke(255);
      }
    }
  }  
}

function drawSquarePoints(doDraw) {
  if(!doDraw) {
    return;
  }
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
      a['xp'] = linearInterpolation(field[i][j], field[i+1][j], x);
      b['yp'] = linearInterpolation(field[i+1][j], field[i+1][j+1], y);
      c['xp'] = linearInterpolation(field[i][j+1], field[i+1][j+1], x);
      d['yp'] = linearInterpolation(field[i][j], field[i][j+1], y);
      switch(state) {
        case 1:
          drawLine(c, d, i, j);
          break;
        case 2:
          drawLine(b, c, i, j);
          break;    
        case 3:
          drawLine(b, d, i, j);
          break; 
        case 4:
          drawLine(a, b, i, j);
          break;
        case 5:
          drawLine(a, d, i, j);
          drawLine(b, c, i, j);          
          break;    
        case 6:
          drawLine(a, c, i, j);
          break; 
        case 7:
          drawLine(a, d, i, j);
          break;
        case 8:
          drawLine(a, d, i, j);
          break;    
        case 9:
          drawLine(a, c, i, j);
          break; 
        case 10:
          drawLine(a, b, i, j);
          drawLine(c, d, i, j);          
          break;
        case 11:
          drawLine(a, b, i, j);
          break;    
        case 12:
          drawLine(b, d, i, j);
          break; 
        case 13:
          drawLine(b, c, i, j);
          break;    
        case 14:
          drawLine(c, d, i, j);
          break;                                    
        default:
          break;
      }       
    }
  }  
}

function drawLine(v1, v2, col, row) {
  let p1x = v1['xp'];
  let p1y = v1['yp'];
  let p2x = v2['xp'];
  let p2y = v2['yp'];
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