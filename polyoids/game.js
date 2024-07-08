const State = {
    INTRO: 0,
    INIT: 1,
    PLAYING: 2,
    SPACESHIP_HIT: 3,
    SPACESHIP_EXPLODING: 4,
    EXPLODING: 5,
    WAITING: 6,
    OVER: 7
}

const START_SHPIS = 3;
const MAX_WAIT_CNT = 1000;
const GAME_OVER_CNT = 40;

class Game {

    static score = 0;
    static highscore = 0;
    static spaceshipCnt = 0;
    static polyCnt = 1;
    static state = State.INTRO;
    static overCnt = GAME_OVER_CNT;
    static waitCnt = MAX_WAIT_CNT;

    constructor() {
        this.canvas=document.getElementById("gameCanvas");
    }

    draw(ctx) {    
        ctx.font = "20px Arial";          
        ctx.fillStyle = "white";        
        if(Game.state == State.INTRO) {
            ctx.font = "40px Arial";              
            ctx.textAlign = "center";
            ctx.fillText("POLYOIDS", 
            lerp(0,canvas.clientWidth, 0.5), lerp(0, canvas.clientHeight, 0.4));
            ctx.font = "20px Arial";  
            ctx.fillText("CREATED BY NOLTISOFT IN 2024", 
            lerp(0,canvas.clientWidth, 0.5), lerp(0, canvas.clientHeight, 0.5));
            ctx.fillText("HIGHSCORE: " + padNumber(Game.highscore, 6), 
            lerp(0,canvas.clientWidth, 0.5), lerp(0, canvas.clientHeight, 0.6));
        }
        else if(Game.state != State.INIT && Game.state != State.INTRO) {
            ctx.textAlign = "left";
            ctx.fillText("SCORE: " + padNumber(Game.score, 6), 
            lerp(0,canvas.clientWidth, 0.05), lerp(0, canvas.clientHeight, 0.05));

            ctx.textAlign = "left";
            ctx.fillText("SHIPS: " + padNumber(Game.spaceshipCnt, 2), 
            lerp(0,canvas.clientWidth, 0.8), lerp(0, canvas.clientHeight, 0.05));

        }
        if (Game.state == State.OVER) {
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER !",lerp(0,canvas.clientWidth, 0.5), lerp(0, canvas.clientHeight, 0.5));
            ctx.stroke();
        }
    }

    onkeydown(event) {
        // pass
    }    

    onkeyup(event) {
        switch(event.key) {
            case " ":
                if(Game.state == State.INTRO) {
                    Game.state = State.INIT;
                }
                else {
                    Game.state = State.INTRO;
                }
            break;
        }
    }       
}


