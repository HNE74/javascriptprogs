class Ufopolygon extends Polygon {

    calculateVertices() {
        this.xSegsize = 6;
        this.ySegsize = 8;
        this.vertices = [];
        this.vertices.push({
            x: this.x, 
            y: this.y - this.ySegsize 
        });

        this.vertices.push({
            x: this.x - 3 * this.xSegsize, 
            y: this.y 
        });

        this.vertices.push({
            x: this.x - 2 * this.xSegsize, 
            y: this.y + this.ySegsize  
        });        

        this.vertices.push({
            x: this.x + 2 * this.xSegsize, 
            y: this.y + this.ySegsize  
        });

        this.vertices.push({
            x: this.x + 3 * this.xSegsize, 
            y: this.y 
        });        
    }    
}