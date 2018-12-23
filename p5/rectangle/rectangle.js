function setup() {
  createCanvas(800,600);
}

function Rectangle(xpos, ypos, width, height, angle) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
  this.angle = angle;
  this.xp = [];
  this.yp = []

  this.rotate = function(angle) {
    for(var i=0; i<this.xp.length; i++) {
        this.xp[i] = this.normX(this.xp[i]) + cos(radians(angle)) +this.normY(this.yp[i]) * sin(radians(angle));
        this.yp[i] = -this.normX(this.xp[i]) * sin(radians(angle)) + this.normY(this.yp[i]) * cos(radians(angle));
    }
  }

  this.normX = function(xp) {
    return -this.width/2;
  }

  this.normY = function(yp) {
    return -this.height/2;
  }
  

  this.draw = function() {
    this.xp[0] = this.xpos - this.width/2;
    this.xp[1] = this.xpos + this.width/2;
    this.xp[2] = this.xpos + this.width/2;
    this.xp[3] = this.xpos - this.width/2;

    this.yp[0] = this.ypos - this.height/2;
    this.yp[1] = this.ypos - this.height/2;
    this.yp[2] = this.ypos + this.height/2;
    this.yp[3] = this.ypos + this.height/2;

    this.rotate(this.angle);

    quad(this.xp[0], this.yp[0], this.xp[1], this.yp[1], this.xp[2], this.yp[2], this.xp[3], this.yp[3]);
  }
}

function draw() {
  background(204);

  fill(255, 255, 255);  
  strokeWeight(1);

  rect = new Rectangle(200, 100, 200, 100, 45);
  rect.draw();
}