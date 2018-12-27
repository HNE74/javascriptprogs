/**
 * Color experiments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  noLoop();
}

function draw() {
  noStroke();
  for (count = 0; count < 200; count += 1) { 
    var x = random(100, 700); 
    var y = random(100, 500); 
    var size = random(20, 100); 
    
    var red = random(150, 255); 
    var green = random(200, 255); 
    var blue = random(150, 255); 
    fill(red, green, blue, random(200,220)); 
    ellipse(x, y, size); 
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