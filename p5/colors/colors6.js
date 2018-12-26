/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('grey');
  noLoop();
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  noStroke();

  size = 50; 
  for (var y=size; y<=600-(2*size); y+=size) { 
    for (var x=size; x<=800-(2*size); x+=size) { 
      var hue1=random(360); 
	  fill(hue1, 80, 90); 
	  rect(x, y, size, size); 
	  var d=dist(x+(size/2), y+(size/2), 400, 300); 
	  var angle=exp(-pow(d/200,2))* 180; 
	  var hue2 = (hue1+angle)%360; 
	  fill(hue2, 80, 90); 
	  ellipse(x+(size/2), y+(size/2), size*0.3); 
	} 
  }
}

function redrawCanvas() {
  clear();
  background('grey');
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
