class Polygon {
    constructor(x, y, radius=50, verticeCnt=5, rotationAngle = 0, topline = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.verticeCnt = verticeCnt;
        this.vertices = [];
        this.rotationAngle = rotationAngle;
        this.topline = topline;
        this.calculateVertices();
    }

    update() {
        this.calculateVertices();
    }

    calculateVertices() {
        this.vertices = [];
        const segmentAngle = 360 / this.verticeCnt;
        let verticeAngle = 90 + this.rotationAngle;
        for(let i=0; i<this.verticeCnt; i++) {
            let radAngle = calcRadFromAngle(verticeAngle); 
            this.vertices.push({
                x: this.x - Math.cos(radAngle) * this.radius,
                y: this.y - Math.sin(radAngle) * this.radius
            });  
            verticeAngle += segmentAngle;           
        }
    }

    draw(ctx) {
        ctx.beginPath();
        if(this.topline) {
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
        }
        else {
            ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        }
        for(let i=0; i<this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.lineTo(this.vertices[0].x, this.vertices[0].y);
        
        ctx.strokeStyle = "white";
        ctx.closePath();
        ctx.stroke();
    }
}