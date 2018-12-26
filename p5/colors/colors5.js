/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,500).parent("sketchholder"); 
  background('white');
  noLoop();
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  noStroke();

  for(var angle=0; angle<360; angle+=10) {
    fill(angle, 100, 100);
    var x=150*cos(angle);
    var y=150*sin(angle);
    ellipse(400+x, 300-y, 20);
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
