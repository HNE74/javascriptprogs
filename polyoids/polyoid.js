class Polyoid {

    static polyoids = [];
    
    constructor(x, y, type=3, verticeCnt=5, rotationAngle=0, speed=2, directionAngle=0, removeCnt=30) {
        this.canvas=document.getElementById("gameCanvas");  
        if(type > 0) {
            this.polygon = new Polygon(x, y, type * 12, verticeCnt, rotationAngle); 
        }
        else {
            this.polygon = new Polygon(x, y, 5, verticeCnt, rotationAngle); 
        }
        this.speed = speed;
        this.directionAngle = directionAngle;
        this.rotation = Math.floor(Math.random() * 7) - 3;
        this.type = type;
        this.removeCnt = removeCnt;
    }

    #draw(ctx) {
        this.polygon.draw(ctx);
    }

    static draw(ctx) {

        for(let i=0; i<this.polyoids.length; i++) {
            Polyoid.polyoids[i].polygon.draw(ctx);
        }        
    }    

    #move() {
        this.polygon.rotationAngle += this.rotation;
        if(this.polygon.rotationAngle > 359) {
            this.polygon.rotationAngle = 0;
        } else if (this.polygon.rotationAngle < 0) {
            this.polygon.rotationAngle = 359;
        }

        let rad = calcRadFromAngle(this.directionAngle);
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

        this.polygon.update();
    }

    static update() {
        let toBeRemoved = []
        for(let i=0; i<Polyoid.polyoids.length; i++) {
            if(Polyoid.polyoids[i].type == 0) {
                Polyoid.polyoids[i].removeCnt -= 1;
                if(Polyoid.polyoids[i].removeCnt == 0) {
                    toBeRemoved.push(Polyoid.polyoids[i]);
                }
                else {
                    Polyoid.polyoids[i].#move();                    
                }
            }
            else {
                Polyoid.polyoids[i].#move();
            }
        }  
        
        for(let i=0; i<toBeRemoved.length; i++) { 
            Polyoid.removePolyoid(toBeRemoved[i]);
        }       
    }

    static addPolyoid(x, y, type=3, verticeCnt=5, rotationAngle=0, speed=2, directionAngle=0, removeCnt=30) {
        this.polyoids.push(new Polyoid(x, y, type, verticeCnt, rotationAngle, speed, directionAngle, removeCnt));
    }

    static removePolyoid(polyoid) {
        const index = Polyoid.polyoids.indexOf(polyoid);
        if (index > -1) {
          Polyoid.polyoids.splice(index, 1); 
        }        
    }

    static breakPolyoid(polyoid, game) {
        Polyoid.explosionSound();
        let newPolyCnt = 0;
        let newPolyType = -1;
        switch(polyoid.type) {
            case 3:
                newPolyCnt = 2;
                newPolyType = 2;
                Game.score += 100;
                break;
            case 2:
                newPolyCnt = 3;
                newPolyType = 1;
                Game.score += 50;
                break;
            case 1:
                newPolyCnt = 5;
                newPolyType = 0;
                Game.score += 25;
            default:
                break;
        }

        for(let i=0; i<newPolyCnt; i++) {
            this.createPolyoid(polyoid.polygon.x, polyoid.polygon.y, newPolyType);
        }

        this.removePolyoid(polyoid);
    }

    static explosionSound() {
        Sounds.playPolyoidhit();
      }    

    static createPolyoid(newX=-1, newY=-1, polyoidType=-1) {
        let x = newX;
        if(newX == -1) {
            x = Math.random() * canvas.width;
        }
        let y = newY;
        if(newY == -1) {
            let y = Math.random() * canvas.height;    
        }
        let type = Math.floor(Math.random() * 3) + 1;
        if(polyoidType > -1) {
            type = polyoidType;
        }
        let verticeCnt = Math.floor(Math.random() * 3) + 5;
        if(type == 0) {
            verticeCnt = 2;
        }
        let speed = Math.floor(Math.random()*3)+1;
        let rotationAngle = Math.floor(Math.random()*360);
        let directionAngle = Math.floor(Math.random()*360);

        Polyoid.polyoids.push(new Polyoid(x, y, type, verticeCnt, rotationAngle, speed, directionAngle));
    }
    
    static spawnPolyoids(count = 5) {
        Polyoid.polyoids = []
        for(let i=0; i<count; i++) {
            Polyoid.createPolyoid();
        }
    }

    #checkCollision(shape) {
        return polysIntersect(this.polygon, shape.polygon);
    }

    static checkCollisions(shape) {
        let collisions = []
        for(let i=0; i<Polyoid.polyoids.length; i++) {
            if(Polyoid.polyoids[i].#checkCollision(shape)) {
                collisions.push(Polyoid.polyoids[i]);
            }
        }

        return collisions;
    }

    #checkInDistance(shape, distance) {
        let calcDist = calculateDistance(this.polygon, shape);
        if(calcDist <= distance) {
            return true;
        }
        return false;
    }
    
    static inDistance(shape, distance) {
        let inDistance = []
        for(let i=0; i<Polyoid.polyoids.length; i++) {
            if(Polyoid.polyoids[i].#checkInDistance(shape, distance)) {
                inDistance.push(Polyoid.polyoids[i]);
            }
        } 
        
        return inDistance;
    }
}