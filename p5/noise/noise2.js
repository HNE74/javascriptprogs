/**
 * Noise experiments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
 

var doNoise=true;
var doLoop=false;
 
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  if(!doLoop) {  
    noLoop();
  }
}

function draw() {
  noStroke();
  noiseSeed(random()*100);    
  var col1=color(200,0,0);
  var col2=color(255,255,255);

  for(var x=200; x<=600; x+=1) { 
    for(var y=100; y<=500; y+=1) { 
	  var d=dist(400,300,x,y);
	  if(doNoise) {
		d+=40*noise(x/50, y/50);
	  }
	  var fraction = Math.pow(sin(d/10), 2);
	  var col=lerpColor(col1, col2, fraction);
	  stroke(col); 
	  point(x, y); 
	} 
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
