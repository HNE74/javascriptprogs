class Missle {

    static MAX_MISSLES = 3;
    static missles = []

    constructor(x, y, rotationAngle) {
        this.canvas=document.getElementById("gameCanvas");

        this.speed = 5;
        this.polygon = new Polygon(x, y, 5, 2, rotationAngle);
    }

    #draw(ctx) {
        this.polygon.draw(ctx);
    }

    #move() {
        let rad = calcRadFromAngle(this.polygon.rotationAngle);
        let xd = Math.sin(rad) * this.speed;
        let yd = -(Math.cos(rad) * this.speed);        
        this.polygon.x = this.polygon.x + xd;
        this.polygon.y = this.polygon.y + yd;
        this.polygon.update();

        if(this.polygon.x < 0 || this.polygon.x > this.canvas.width
            || this.polygon.y < 0 || this.polygon.y > this.canvas.height) {
            Missle.removeMissle(this);
        }
    }
    
    static draw(ctx) {
        for(let i=0; i<Missle.missles.length; i++) {
            Missle.missles[i].#draw(ctx);
        }
    }

    static removeMissle(missle) {
        const index = Missle.missles.indexOf(missle);
        if (index > -1) {
          Missle.missles.splice(index, 1); 
        }        
    }

    static update() {
        for(let i=0; i<this.missles.length; i++) {
            Missle.missles[i].#move();
        }
    }

    static fireMissle(x, y, rotationAngle) {
        if(Missle.missles.length >= Missle.MAX_MISSLES) {
            return;
        }

        Missle.shootSound();
        let missle = new Missle(x, y, rotationAngle);
        Missle.missles.push(missle);
    }

    static checkPolyoidsHit() {
        let misslesHit = []
        for(let i=0; i<Missle.missles.length; i++) {
            let polyoidsHit = Polyoid.checkCollisions(Missle.missles[i]);
            for(let j=0; j<polyoidsHit.length; j++) {
                Polyoid.breakPolyoid(polyoidsHit[j]);
            }
            if(polyoidsHit.length > 0) {
                misslesHit.push(Missle.missles[i])
            }
        }

        for(let i=0; i<misslesHit.length; i++) {
            Missle.removeMissle(misslesHit[i]);
        }
    }

    static checkUfoHit(ufo) {
        if(ufo.exploding || !ufo.active) {
            return;
        }

        let missleHit = null;
        for(let i=0; i<Missle.missles.length; i++) {
            if(polysIntersect(Missle.missles[i].polygon, ufo.polygon)) {
                missleHit = Missle.missles[i];
                break;
            }
        } 

        if(missleHit) {
            Missle.removeMissle(missleHit);
            Game.score += 200;
            ufo.explode();      
        }
    }

    static shootSound() {
        Sounds.playMissle();
    }
   
}