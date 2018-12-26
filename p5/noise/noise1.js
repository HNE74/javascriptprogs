/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  noLoop();

}

function draw() {
  noStroke();

  for(var x=200; x<=600; x+=1) { 
    for(var y=100; y<=500; y+=1) { 
	  var c = noise(x/50, y/50)*255;
	  stroke(c); 
	  point(x, y); 
	} 
  }
}

function redrawCanvas() {
  clear();
  noiseSeed(random()*100);
  background('white');
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
