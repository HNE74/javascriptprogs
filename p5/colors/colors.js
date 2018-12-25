/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,500).parent("sketchholder"); 
  background('white');
  noLoop();
}

function draw() {
  var xstart=100;
  strokeWeight(10);
  for (var x=xstart; x<=600; x+=25) { 
    stroke(random(255), random(255), random(200,255));
    line(x, 50, x, 150); 
  }
  
  for (var x=xstart; x<=600; x+=25) { 
    stroke(random(255), random(200, 255), random(255));
    line(x, 200, x, 300); 
  } 
  
  for (var x=xstart; x<=600; x+=25) { 
    stroke(random(200, 255), random(255), random(255));
    line(x, 350, x, 450); 
  }   
}

function redrawCanvas() {
  clear();
  background('white');
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
