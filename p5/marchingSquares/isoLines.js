/**
 * Implementation based on youtube video:
 * https://www.youtube.com/results?search_query=marching+squares+algorithm
 */
const width = 800;
const height = 600;
const rez = 40;
const noiseInc = 0.1;
const cols = 1 + width / rez;
const rows = 1 + height / rez;
const field = new Array(cols).fill(null).map(()=>new Array(rows).fill(0));
const zoffInc = 0.008;
const fieldMinVal = 1;
const fieldMaxVal = 100;
const isoRange = 10;
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
  background(255);

  generateFieldValues();
  drawSquareRects(true, true);
  drawSquarePoints(true);

  stroke(1);
  strokeWeight(1);
 // drawIsoLine(50, 10, true);
  for(isoVal = fieldMinVal+isoRange; isoVal <= fieldMaxVal-isoRange; isoVal += isoRange) {
    drawIsoLine(isoVal, isoRange, true);
  }
  //zoff++;
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
      field[i][j] = map(noise(xoff, yoff, zoff/1000), 0, 1, fieldMinVal, fieldMaxVal);
    }
  }
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
      stroke(0);
      rect(i*rez, j*rez, rez, rez);      
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
      stroke(0);
      strokeWeight(rez*0.1)
      point(i*rez, j*rez);
      strokeWeight(1);
      textSize(0.4*rez);
      text(Math.floor(field[i][j]),i*rez+0.1*rez, j*rez+0.2*rez+2);
    }
  }  
}

/**
 * Draws isoline the marching squares algorithm.
 * Line vertexes might be subject to linear interpolation.
 */
function drawIsoLine(isoVal, isoRange, doInterpolate) {
  for(let i=0; i<cols-1; i++) {
    for(let j=0; j<rows-1; j++) {
      let x = i * rez;
      let y = j * rez;
      let a = { xp: x + rez*0.5,  yp: y };
      let b = { xp: x + rez,  yp: y + rez*0.5 };
      let c = { xp: x + rez*0.5,  yp: y+rez };
      let d = { xp: x,  yp: y + rez*0.5 }; 
      let state = getState(field[i][j], field[i+1][j], field[i+1][j+1], field[i][j+1], isoVal, isoRange); 
      if(state >= 1 && state <= 14) {
        if(doInterpolate) {
          interpolateBorderVertices(a, b, c, d, i, j, x, y, isoVal, isoRange);
        }
        drawSeparationLine(state, a, b, c, d, i, j);
      }
    }
  }  
}

/**
 * Derive state from binary encoding of square vertices.
 */
function getState(av, bv, cv, dv, isoval, range) {
  let minval = isoval - range / 2;
  let maxval = isoval + range / 2;
  let a = Math.ceil(mapValue(av, minval, maxval));
  let b = Math.ceil(mapValue(bv, minval, maxval));
  let c = Math.ceil(mapValue(cv, minval, maxval));
  let d = Math.ceil(mapValue(dv, minval, maxval));

  return a * 8 + b * 4 + c * 2 + d * 1; 
}

/**
 * Maps the provided invalue to one between 0 and 1
 */
function mapValue(inval, minval, maxval) {
  let v = 0;
  if(inval < minval) {
    v = 0;
  }
  else if(inval > maxval) {
    v = 1;
  }
  else {
    v = map(inval, minval, maxval, 0, 1);
  }

  return v;
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
function interpolateBorderVertices(a, b, c, d, i, j, x, y, isoval, range) {
  let minval = isoval - range / 2;
  let maxval = isoval + range / 2;  
  let va = map(field[i][j], minval, maxval, 0, 1);
  let vb = map(field[i+1][j], minval, maxval, 0, 1);
  let vc = map(field[i+1][j+1], minval, maxval, 0, 1);
  let vd = map(field[i][j+1], minval, maxval, 0, 1);
  a['xp'] = linearInterpolation(va, vb, x);
  b['yp'] = linearInterpolation(vb, vc, y);
  c['xp'] = linearInterpolation(vd, vc, x);
  d['yp'] = linearInterpolation(va, vd, y); 
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


