class Spaceship {

    constructor(polygon) {
        this.canvas=document.getElementById("gameCanvas");     
        this.init();
    }

    init() {
        this.polygon = new Polygon(canvas.width/2, canvas.height/2, 10, 3, 0, true);
        this.left = false;
        this.right = false;
        this.forward = false;
        this.reverse = false;
        this.speed = 0.0;
        this.acceleration = 1.0;
        this.maxSpeed = 3.0;
        this.friction = 0.01;

        this.readyFire = true;
        this.fire = false;
        this.explosionCount = 0;        
    }    

    update() {
        this.#move()

        if(this.left) {
            this.polygon.rotationAngle -= 5;
            if(this.polygon.rotationAngle < 0) {
                this.polygon.rotationAngle = this.polygon.rotationAngle + 360;
            }         
        }
        else if(this.right) {
            this.polygon.rotationAngle += 5;
            if(this.polygon.rotationAngle > 359) {
                this.polygon.rotationAngle = this.polygon.rotationAngle - 360;
            }            
        }

        this.polygon.update();
    }

    draw(ctx) {
        this.polygon.draw(ctx);
    }

    #move() {
        if(this.forward) {
            this.speed += this.acceleration;
        }
        if(this.reverse) {
            this.speed -= this.acceleration;
        }

        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }        
        if(this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }

        if(this.speed>0) {
            this.speed = this.speed -= this.friction;
        }
        if(this.speed<0) {
            this.speed = this.speed += this.friction;
        }
        if(Math.abs(this.speed)<this.friction) {
            this.speed = 0;
        }

        let rad = calcRadFromAngle(this.polygon.rotationAngle);
        this.polygon.x += Math.sin(rad) * this.speed;
        this.polygon.y -= Math.cos(rad) * this.speed;

        if(this.polygon.x < 0) {
            this.polygon.x = canvas.width;
        } else if(this.polygon.x > this.canvas.width) {
            this.polygon.x = 0;
        }

        if(this.polygon.y < 0) {
            this.polygon.y = canvas.height;
        } else if(this.polygon.y > this.canvas.height) {
            this.polygon.y = 0;
        } 
        
        if(this.fire) {
            this.fire = false;
            Missle.fireMissle(this.polygon.x, this.polygon.y, this.polygon.rotationAngle);
        }
    }

    checkSpaceshipHit(ufo) {
        let hit = false;
        for(let i=0; i<Polyoid.polyoids.length; i++) {
            let polyoidsHit = Polyoid.checkCollisions(this);
            for(let j=0; j<polyoidsHit.length; j++) {
                Polyoid.breakPolyoid(polyoidsHit[j]);
                hit = true;
            }
        }

        if(ufo.active) {
            let ufoCollision = polysIntersect(this.polygon, ufo.polygon)
            if(ufoCollision) {
                ufo.explode();
                hit = true;
            }
        }

        if(hit) {
            this.explosionSound();
            Game.state = State.SPACESHIP_HIT;
        }
    }  
    
    explosionSound() {
        Sounds.playExplosion();
      }    

    onkeydown(event) {
        switch(event.key) {
            case "ArrowLeft":
                this.left = true;
                break;
            case "ArrowRight":
                this.right = true;
                break;  
            case "ArrowUp":
                this.forward = true;
                Sounds.toggleThrust(true);
                break;
            case "ArrowDown":
                this.reverse = true;
                Sounds.toggleThrust(true);                
                break;
            case " ":
                if(this.readyFire) {
                    this.fire = true;
                    this.readyFire = false;
                }
                break;
        }
    }

    onkeyup(event) {
        switch(event.key) {
            case "ArrowLeft":
                this.left = false;
                break;
            case "ArrowRight":
                this.right = false;
                break;  
            case "ArrowUp":
                this.forward = false;
                Sounds.toggleThrust(false);                
                break;
            case "ArrowDown":
                this.reverse = false;
                Sounds.toggleThrust(false);                
                break;
            case " ":
                this.readyFire = true;
                break;                    
        }
    }
}