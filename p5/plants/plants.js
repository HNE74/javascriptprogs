/**
 * Plant generator as explained in the book:
 * Rashid, Tariq. Make Your Own Algorithmic Art 
 */

var first=true;
var multiple=true;

function setup() { 
  cnv = createCanvas(800, 600);
  cnv.parent("sketchholder"); 
  background('grey'); 
  noLoop();
  angleMode(DEGREES);
} 

function draw() { 
  stroke(0, 250, 0, 100);
  strokeWeight(2);

  if(multiple) {
    for(var y=180;y<600;y+=200) {
      for(var x=150;x<700;x+=240) {
        tree(x, y, random(-15,15), 6, 60);
      }
    } 
  }
  else {
    tree(400, 500, random(-15,15), 6, 140);
  }
 
  if(first) {
    first=false; 
    redraw();
  }  
}

/**
 * Draws tree a provided x,y position.
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} angle 
 * @param {*} depth 
 * @param {*} size
 */
function tree(x1, y1, angle, depth, size) {
  strokeWeight(0.2 + depth/2);
  var length=size*Math.tanh(depth/6);
  var angle1=angle+20+random(-15, 15); 
  var angle2=angle-20+random(-15, 15);

  var x2=x1-(length*sin(angle));
  var y2=y1-(length*cos(angle));
  line(x1,y1,x2,y2);

  var x3=x1-(0.7*length*sin(angle)); 
  var y3=y1-(0.7*length*cos(angle)); 
  var x4=x1-(0.4*length*sin(angle)); 
  var y4=y1-(0.4*length*cos(angle));

  if(depth > 1) {
    tree(x2, y2, angle1, depth-1, size); 
    tree(x2, y2, angle2, depth-1, size);
    tree(x3, y3, angle1, depth-1, size);    
    tree(x4, y4, angle2, depth-1, size);  
  }

}

function redrawCanvas() {
  clear();
  background('grey');
  first=true;
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
