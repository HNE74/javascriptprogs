/**
 * Color expriments based on the book.
 * Rashid, Tariq. Make Your Own Algorithmic Art  
 */
function setup() {
  createCanvas(800,500).parent("sketchholder"); 
  background('white');
  noLoop();
}

function draw() {
  colorrects(true, false, false, 50);
  colorrects(false, true, false, 100);
  colorrects(false, false, true, 150);
  colorrects(true, true, false, 200);
  colorrects(false, true, true, 250);
  colorrects(true, false, true, 300);
  colorrects(true, true, true, 350);
}

function colorrects(redf, greenf, bluef, yp) {
  for (var x = 0; x < 800; x += 20) { 
    if(redf) { 
      var red=(sin(x/100) + 1) * 127.5; 
    }
    else {
      var red=255;
    }

    if(bluef) { 
      var blue=(sin(x/100) + 1) * 127.5; 
    }
    else {
      var blue=255;
    }

    if(greenf) { 
      var green=(sin(x/100) + 1) * 127.5; 
    }
    else {
      var green=255;
    }    

    fill(red, green, blue); 
    rect(x, yp, 20, 20); 
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
