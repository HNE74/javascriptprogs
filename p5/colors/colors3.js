function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  noLoop();
}

function draw() {
  for (var count = 0; count < 50; count += 1) { 
    my_flower(random(100, 700), random(100, 500), random(10, 30)); 
  }
}

function my_flower(x, y, size) { 
  noStroke(); 
  fill(255, 255, 0, 100); 
  ellipse(x, y, size); // f

  fill(255, 0, 0, 100); 
  ellipse(x + (size * 0.6), y, size * 0.8); 
  ellipse(x - (size * 0.6), y, size * 0.8); 
  ellipse(x, y - (size * 0.6), size * 0.8); 
  ellipse(x, y + (size * 0.6), size * 0.8); 
}
  
function redrawCanvas() {
  clear();
  background('white');
  redraw();
}
  
function canvasToImage(path) {
  saveCanvas(path, "jpg");
}