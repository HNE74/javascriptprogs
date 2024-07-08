class Ufo {
    constructor() {
        this.xd = 0;
        this.yOld = -1;
        this.yOffset = 0;
        this.active = false;
        this.polygon = new Ufopolygon(canvas.width/2-100, canvas.height/2, 0, 5, 0, true);
        this.exploding = false;
        this.explodeCnt = 30;
    }

    #init(ypos) {
        this.amplitude = Math.floor(Math.random() * 100) + 25;
        this.period = Math.floor(Math.random() * 300) + 100;
        this.frequency = 1 / this.period;
        this.phase = 0;

        this.polygon.x = (Math.random() * canvas.width)
        this.yOffset = ypos;
        this.polygon.y = this.yOffset;
        this.yd = 0;
        if(Math.floor(Math.random() * 2) == 1) {
            this.polygon.x = canvas.width;
            this.xd = -(Math.floor(Math.random() * 3) + 1);
        }
        else {
            this.polygon.x = 0;
            this.xd = Math.floor(Math.random() * 3) + 1;
        }
    }

    explode() {
        Polyoid.explosionSound();
        this.exploding = true;

        for(let i=0; i<6; i++) {
            let speed = Math.floor(Math.random()*3)+1;
            let rotationAngle = Math.floor(Math.random()*360);
            let directionAngle = Math.floor(Math.random()*360);
            Polyoid.addPolyoid(
                this.polygon.x, 
                this.polygon.y,
                0, 2, rotationAngle, speed, directionAngle);        
        }
    }

    checkPolyoidsHit() {
        let polyoidsHit = Polyoid.checkCollisions(this);
        if(polyoidsHit && polyoidsHit.length > 0) {
            for(let j=0; j<polyoidsHit.length; j++) {
                Polyoid.breakPolyoid(polyoidsHit[j]);
            }
            this.explode();
        }
    }    

    update(spaceship) {
        if(!this.active) {
            this.active = Math.floor(Math.random() * 800) == 0;
            if(this.active) {
                Sounds.playUfo();                
                this.#init(spaceship.polygon.y); 
            }
        }

        if(this.exploding) {
            this.explodeCnt--;
            if(this.explodeCnt == 0) {
                this.exploding = false;
                this.active = false;
                this.explodeCnt = 30;
            }
        }

        if(this.active && !this.exploding) {            
            this.checkPolyoidsHit();
            this.polygon.x += this.xd;
            this.polygon.y = calcYfromSinus(this.amplitude, this.frequency, this.phase, this.polygon.x) + this.yOffset;
            if(this.polygon.x < 0 || this.polygon.x > canvas.width) {
                this.active = false;
            }
        }
        this.polygon.update();
    }

    draw(ctx) {
        if(this.active && !this.exploding) {
            this.polygon.draw(ctx);
        }
    }
}