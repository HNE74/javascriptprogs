
const readline = require('readline-sync');

class Maze {
    constructor(width=11, height=11, holes=10, player) {
        this.width = width;
        this.height = height;
        this.holes = holes; 
        this.player = player;
        this.createMaze();    
    }

    partialShowMaze(yPos, xPos, wHeight, wWidth) {
        let yNd = yPos;
        while(yNd < yPos+wHeight && yNd <= this.height+3) {
            let rowtxt = "";
            let xNd = xPos;
            while(xNd < xPos+wWidth && xNd <= this.width+3) {
                let val = this.maze[yNd][xNd];
                if(val === 1) {
                    rowtxt = rowtxt + "#"
                }
                else if(val === 0 && (this.player === null || (this.player.getPosition().yp !== yNd || this.player.getPosition().xp !== xNd))) {
                    rowtxt = rowtxt + " ";
                }
                else if(val === 0 && (this.player !== null && (this.player.getPosition().yp === yNd && this.player.getPosition().xp === xNd))) {
                    rowtxt = rowtxt + "O";
                }                
                else {
                    rowtxt = rowtxt + "?";
                }
                xNd+=1;                
            }
            console.log(rowtxt);
            yNd+=1;
        }
    }

    showMaze() {
        console.log("Width: %d, Height: %d, Holes: %d", this.width, this.height, this.holes);
        let yp = 0;
        for(let row of this.maze) {
            let rowtxt = "";
            let xp = 0;
            for(let col of row) {
                if(col === 1) {
                    rowtxt = rowtxt + "#"
                }
                else if(col === 0 && (this.player === null || (this.player.getPosition().yp !== yp || this.player.getPosition().xp !== xp))) {
                    rowtxt = rowtxt + " ";
                }
                else if(col === 0 && (this.player !== null && (this.player.getPosition().yp === yp && this.player.getPosition().xp === xp))) {
                    rowtxt = rowtxt + "O";
                }                
                else {
                    rowtxt = rowtxt + "?";
                }
                xp++;
            }
            yp++;
            console.log(rowtxt);        
        }
    }
    
    createMaze() {
        this.maze = [];        
        for(let r=0; r<this.height+4; r++) {
            let row = [];
            for(let c=0; c<this.width+4; c++) {
                row.push(1);
            }
            this.maze.push(row);
        }
        this.digMaze(2, 2);
        this.digHoles();
    }
    
    digMaze(row, col) {
        this.maze[row][col] = 0;    
        const vectors = [1, 1, 1, 1];
        while(this.calcArraySum(vectors) > 0) {
            let digndx = Math.floor(Math.random()*4); 
            if(vectors[digndx] === 1) {
                vectors[digndx] = 0;       
                let xd =0; 
                let yd = 0;
                if(digndx == 0) {
                    yd = -1;
                }
                else if(digndx == 1) {
                    yd = 1;
                }
                else if(digndx == 2) {
                    xd = -1;
                }
                else if(digndx == 3) {
                    xd = 1;
                }
                if(row+(yd*2) > 1 && row+(yd*2) <= this.height+1 && 
                   col+(xd*2) > 1 && col+(xd*2) <= this.width+1 && 
                    this.maze[row+(yd*2)][col+(xd*2)] === 1) {
                    this.maze[row+yd][col+xd] = 0;
                    this.digMaze(row+(yd*2), col+(xd*2));
                }
            }
        }
    }
    
    digHoles() {
        for(let cnt=0; cnt<this.holes; cnt++) {
            let holedug = false;
            let cnt = 0;
            do {
                let col = Math.floor(Math.random()*(this.width-2)) + 3; 
                let row = Math.floor(Math.random()*(this.height-2)) + 3; 
    
                if(this.maze[row][col] === 1 && (
                    (this.maze[row-1][col] === 1 && this.maze[row+1][col] === 1) ||
                     this.maze[row][col-1] === 1 && this.maze[row][col+1] === 1)) {
                    this.maze[row][col] = 0;
                    holedug = true;
                }
            }
            while(!holedug && ++cnt<5);
        }
    }
    
    calcArraySum(vals) {
        let result = 0;
        for(let v of vals) {
            result += v;
        }
    
        return result;    
    }

    fetchMovementDirections(row, col) {
        result = [];
        if(this.maze[row][col] !== 0) {
            return result;
        }

        if(this.maze[row-1][col] === 0) {
            result.push(['North', -1, 0]);
        }
        if(this.maze[row+1][col] === 0) {
            result.push(['South', 1, 0]);
        }
        if(this.maze[row][col-1] === 0) {
            result.push(['West', 0, -1]);
        }
        if(this.maze[row][col+1] === 0) {
            result.push(['East', 0, 1]);
        }

        return result;
    }                
}

class Player {
    constructor(yp, xp) {
        this.position={}
        this.position.yp = yp;
        this.position.xp = xp;
    }

    movePlayer(yd, xd) {
        this.position.yp += yd;
        this.position.xp += xd;
    }

    getPosition() {
        return this.position;
    }
}

function readMazeDimension() {
    result = {}
    result.width = readline.questionInt("Maze width: ");
    result.height = readline.questionInt("Maze height: ");
    result.holes = readline.questionInt("Wall holes: ");
    return result;
}

function selectMovementDirection() {
    let mvDirs = mz.fetchMovementDirections(...Object.values(pl.getPosition()));
    let mvTxts = [];
    for(mvDir of mvDirs) {
        mvTxts.push(mvDir[0]);
    }

    console.log("You can go: " + mvTxts);
    let selection = readline.question("Select direction: ");
    for(mvDir of mvDirs) {
        if(mvDir[0].toLowerCase().startsWith(selection.toLowerCase())) {
            return mvDir;
        }
    }

    return null;
}

console.clear();
const mazedim = readMazeDimension();
pl = new Player(2, 2);
mz = new Maze(...Object.values(mazedim), pl);

mz.showMaze();
do {
    console.log("\n\n=====================================");
    mz.partialShowMaze(pl.getPosition().yp-2, pl.getPosition().xp-2, 5, 5);   
    console.log("Player position: %s - %s", pl.getPosition().xp, pl.getPosition().yp);
    selectedDirection = selectMovementDirection();
    if(selectedDirection !== null) {
        pl.movePlayer(selectedDirection[1], selectedDirection[2]);
    }
    else {
        console.log("Invalid direction!");
    }
}
while(true);


