/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */

var stepSize=100;
var turtleX=400;
var turtleY=300;
var turtleAngle=0;
var notebook=[];
  
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  angleMode(DEGREES);
  noLoop();
}

function draw() {  
  initVariables();
  stroke(255,0,0);
  strokeWeight(4);
  
  var code=['F', '[', 'R', 'F', ']', 'L', 'F'];
  
  for(var instruction of code) {
    if(instruction=='F') {
	  forward();
	}
	else if(instruction=='L') {
	  leftTurn(90);
	}
	else if(instruction=='R') {
	  rightTurn(90);
	}
	else if(instruction=='[') {
	  pushNote();
	}
	else if(instruction==']') {
	  popNote();
	}
  }
}

function forward() {
  var newX=turtleX-(stepSize*sin(turtleAngle));
  var newY=turtleY-(stepSize*cos(turtleAngle));	
	
  line(turtleX, turtleY, newX, newY);
  turtleX=newX;
  turtleY=newY;
}

function leftTurn(angle) {
  turtleAngle=(turtleAngle+=angle)%360;
}

function rightTurn(angle) {
  turtleAngle=(turtleAngle-=angle)%360;
}

function pushNote() {
  notebook.push(turtleX);
  notebook.push(turtleY);
  notebook.push(turtleAngle);	
}	

function popNote() {
  turtleAngle=notebook.pop();
  turtleY=notebook.pop();
  turtleX=notebook.pop();
}

function initVariables() {
  stepSize=100;
  turtleX=400;
  turtleY=300;
  turtleAngle=0;
  notebook=[];	
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
