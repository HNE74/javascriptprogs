function setup() { 
  createCanvas(1200, 600); 
  background('grey'); 
  noLoop();
  colorMode(HSB); 
} 

function draw() { 
  noStroke(); 
  fill(255, 0, 0, 50); // shift for each layer 
  var shift=0;
  var seaAltitude=70; 
  
  // layers downwards 
  for (var y=300; y<=600; y+=1) { 
    // peaks across 
    for (var x=50; x<=800; x+=1) { 
      var altitude=200*noise(x/200, y/200);
      altitude+=30*noise(x/30, y/30);
      if(altitude<seaAltitude) {
        altitude=seaAltitude;
        fill(200, 200, 200);
      }
      else {    
        var hue = map(altitude, 0, 230, 200, 0);
        fill(hue, 100, 100, 0.3);
      }      
      ellipse(x+shift, y-altitude, 2); 
    }
    shift+=1;
  }
}
