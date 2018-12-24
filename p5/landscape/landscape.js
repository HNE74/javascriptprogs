/**
 * Noise based landscape generator as explained in the book:
 * Rashid, Tariq. Make Your Own Algorithmic Art 
 * Extended by sea level altitude feature.
 */

var first=true;

function setup() { 
  cnv = createCanvas(1200, 600);
  cnv.parent("sketchholder"); 
  background('grey'); 
  noLoop();
  colorMode(HSB); 
} 

function draw() { 
  noStroke(); 
  fill(255, 0, 0, 50);  
  var xstart=50;
  var xend=800;
  var ystart=250;
  var yend=600;
  var shift=0;
  var seaAltitude=70; 
  
  // layers downwards 
  for (var y=ystart; y<=yend; y+=1) { 
    // peaks across 
    for (var x=xstart; x<=xend; x+=1) { 
      var altitude=200*noise(x/200, y/200);
      altitude+=30*noise(x/30, y/30);
      if(altitude<seaAltitude) {  // Draw sea
        altitude=seaAltitude;
        fill(200, 200, 200);
      }
      else { // Draw hill  
        var hue = map(altitude, 0, 230, 200, 0);
        fill(hue, 100, 100, 0.3);
      }      
      ellipse(x+shift, y-altitude, 2); 
    }
    shift+=1;
  }

  if(first) {
    first=false; 
    redraw();
  }  
}

function redrawCanvas() {
  clear();
  noiseSeed(random()*100);
  background('grey');
  first=true;
  redraw();
}

function canvasToImage(path) {
  saveCanvas(path, "jpg");
}
