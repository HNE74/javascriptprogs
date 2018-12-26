/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */

var startX=400;
var startY=550;
var startStepSize=100;
var scaleFactor=0.5;
 
var stepSize=-1;
var turtleX=startX;
var turtleY=startY;
var turtleAngle=0;
var notebook=[];
var nextGenCode=['F','[','L','F',']','F','[','R','F',']'];
var fCodeMutation=['F','[','R','F',']','F','[','L','F',']'];
  
function setup() {
  createCanvas(800,600).parent("sketchholder"); 
  background('white');
  angleMode(DEGREES);
  noLoop();
}

function draw() {  
  initVariables();
  stroke(255,0,0);
  strokeWeight(1);
  
  var code=nextGenCode;
  nextGenCode=[];
  
  for(var instruction of code) {
    if(instruction=='F') {
	  forward();
	}
	else if(instruction=='L') {
	  leftTurn(30);
	}
	else if(instruction=='R') {
	  rightTurn(30);
	}
	else if(instruction=='[') {
	  pushNote();
	}
	else if(instruction==']') {
	  popNote();
	}
  }

  for(var instruction of code) {
	if(instruction=='F') {
	  for(var command of fCodeMutation) {
	    nextGenCode.push(command);
	  }
	}
	else {
      nextGenCode.push(instruction);
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
  if(stepSize==-1) {
    stepSize=startStepSize;
  }
  else {
    stepSize=stepSize*scaleFactor;
  }
  
  turtleX=startX;
  turtleY=startY;
  turtleAngle=0;
  notebook=[];	
}	

function redrawCanvas() {
  clear();
  background('white');
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
