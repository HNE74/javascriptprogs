function setup() {
  createCanvas(800,600);
}

function draw() {
  background(204);

  fill(255, 255, 255);  
  strokeWeight(1);
  point(10, 10);
  point(12, 10);
  point(12, 12);
  point(10, 12);
  ellipse(50, 50, 80, 40);

  line(150, 50, 250, 40);

  triangle(270, 80, 300, 50, 320, 90);

  quad(340, 20, 400, 40, 410, 100, 350, 100);

  rect(420, 50, 100, 40);

  arc(580, 60, 50, 50, QUARTER_PI, PI+(QUARTER_PI*2));
  arc(680, 60, 70, 70, radians(45), radians(325));

  ellipse(75, 160, 90, 90);
  strokeWeight(8);  
  ellipse(175, 160, 90, 90);
  ellipse(279, 160, 90, 90);
  strokeWeight(20);  
  ellipse(389, 160, 90, 90);
  
  strokeWeight(1);
  fill(255, 0, 0, 160);       
  ellipse(170, 360, 100, 100);   
  fill(0, 255, 0, 160);         
  ellipse(228, 300, 100, 100);  
  fill(0, 0, 255, 160);         
  ellipse(268, 340, 100, 100);

  fill(255, 255, 255);  
  strokeWeight(1);  
  beginShape();
  xd=200;yd=200;
  vertex(xd+180, yd+82);
  vertex(xd+207, yd+36);
  vertex(xd+214, yd+63);
  vertex(xd+407, yd+11);
  vertex(xd+412, yd+30);
  vertex(xd+219, yd+82);
  vertex(xd+226, yd+109);
  endShape(CLOSE);

  yd=450;
  for (var i = 20; i < 400; i += 20) {
    line(i, yd+0, i + i/2, yd+80);
    line(i + i/2, yd+80, i*1.2, yd+120);
  }

}