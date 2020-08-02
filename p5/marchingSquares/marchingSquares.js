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

/**
 * Called on initialization.
 */
function setup() {
  createCanvas(width, height);
}

/**
 * Draws frame to canvas.
 */
function draw() {
  background(1);

  generateFieldValues();
  drawSquareRects(false, false);
  drawSquarePoints(true);

  stroke(255);
  strokeWeight(1);
  drawSquareSeparationLines(true);
}

/** 
 * Generates field values between -1 and 1 using the P5 inbuild noise function.
 */
function generateFieldValues() {  let yoff = 0;
  for(let i=0; i<cols; i++) {
    yoff += noiseInc;
    let xoff = 0;
    for(let j=0; j<rows; j++) {
      xoff += noiseInc;
      field[i][j] = map(noise(xoff, yoff, zoff), 0, 1, -1, 1);
    }
  }
  zoff += zoffInc;
}

/**
 * Draws square rectangles.
 */
function drawSquareRects(doDraw, doFill) {
  if(!doDraw) {
    return;
  }
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      rect(i*rez, j*rez, rez, rez);      
      if(doFill) {
        fill(map(field[i][j], -1, 1, 0, 1) * 255);
        noStroke();
      } 
      else {
        stroke(255);
      }
    }
  }  
}

/**
 * Draws square vertex points with grey scale color derived from 
 * corresponding field value.
 */
function drawSquarePoints(doDraw) {
  if(!doDraw) {
    return;
  }
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      stroke(map(field[i][j], -1, 1, 0, 1) * 255);
      strokeWeight(rez*0.3)
      point(i*rez, j*rez);
    }
  }  
}

/**
 * Draws square point separation lines using the marching squares algorithm.
 * Line vertexes might be subject to linear interpolation.
 */
function drawSquareSeparationLines(doInterpolate) {
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
      if(state >=1 && state <= 14) {
        if(doInterpolate) {
          interpolateBorderVertices(a, b, c, d, i, j, x, y);
        }
        drawSeparationLine(state, a, b, c, d, i, j);
      }
    }
  }  
}

/**
 * Draws separation line within a square according to passed state.
 */
function drawSeparationLine(state, a, b, c, d) {
  switch(state) {
    case 1:
      drawLine(c, d);
      break;
    case 2:
      drawLine(b, c);
      break;    
    case 3:
      drawLine(b, d);
      break; 
    case 4:
      drawLine(a, b);
      break;
    case 5:
      drawLine(a, d);
      drawLine(b, c);          
      break;    
    case 6:
      drawLine(a, c);
      break; 
    case 7:
      drawLine(a, d);
      break;
    case 8:
      drawLine(a, d);
      break;    
    case 9:
      drawLine(a, c);
      break; 
    case 10:
      drawLine(a, b);
      drawLine(c, d);          
      break;
    case 11:
      drawLine(a, b);
      break;    
    case 12:
      drawLine(b, d);
      break; 
    case 13:
      drawLine(b, c);
      break;    
    case 14:
      drawLine(c, d);
      break;                                    
    default:
      break;
  }       
}

/**
 * Linear interpolation of border line vertices based on field values of the
 * corresponding square vertices.
 */
function interpolateBorderVertices(a, b, c, d, i, j, x, y) {
  a['xp'] = linearInterpolation(field[i][j], field[i+1][j], x);
  b['yp'] = linearInterpolation(field[i+1][j], field[i+1][j+1], y);
  c['xp'] = linearInterpolation(field[i][j+1], field[i+1][j+1], x);
  d['yp'] = linearInterpolation(field[i][j], field[i][j+1], y);
}

/**
 * Draws a line from v1 to v2.
 */
function drawLine(v1, v2) {
  let p1x = v1['xp'];
  let p1y = v1['yp'];
  let p2x = v2['xp'];
  let p2y = v2['yp'];
  line(p1x, p1y, p2x, p2y);
}

/**
 * Linear interpolation of coordinate component.
 */
function linearInterpolation(v1, v2, offset) {
  return v1 / (v1 - v2) * rez + offset;
}

/**
 * Derive state from binary encoding of square vertices.
 */
function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1; 
}

