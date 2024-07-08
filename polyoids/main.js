const canvas=document.getElementById("gameCanvas");
canvas.width=800;
canvas.height=600;

const ctx = canvas.getContext("2d");
var controls = new Controls();
var spaceship = new Spaceship();
var ufo = new Ufo();
var game = new Game();
var sounds = new Sounds();
Polyoid.spawnPolyoids(10);


animate();

function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(Game.state == State.INTRO) {
        Controls.setKeyboardSubscriber(game);
    }
    if(Game.state == State.INIT) {
        spaceship = new Spaceship();
        ufo = new Ufo();
        Controls.setKeyboardSubscriber(spaceship);
        Game.score = 0;
        Game.spaceshipCnt = 3;
        Game.polyCnt = 1;
        Polyoid.spawnPolyoids(Game.polyCnt);
        Game.state = State.PLAYING;
    } else if(Game.state == State.PLAYING) {
        spaceship.checkSpaceshipHit(ufo);        
        spaceship.update();
        spaceship.draw(ctx);

        if(Polyoid.polyoids.length == 0) {
            Game.polyCnt += 1;
            Polyoid.spawnPolyoids(Game.polyCnt);
        }
    } else if(Game.state == State.SPACESHIP_HIT) {
        for(let i=0; i<3; i++) {
            Polyoid.addPolyoid(spaceship.polygon.x, spaceship.polygon.y, 0, 3, 
                spaceship.polygon.rotationAngle, 1, Math.floor(Math.random() * 360), 80);
        }
        Game.spaceshipCnt -= 1;
        Game.state = State.SPACESHIP_EXPLODING;
    } else if(Game.state == State.SPACESHIP_EXPLODING) {
        spaceship.explosionCount += 1;
        if(spaceship.explosionCount > 60) {
            if(Game.spaceshipCnt == 0) {
                Game.state = State.OVER;
            }
            else {
                Game.state = State.WAITING;
            }
        }
    } else if(Game.state == State.WAITING) {
        Game.waitCnt -= 1;
        let inDistance = Polyoid.inDistance(spaceship.polygon, 120);        
        if(inDistance.length == 0 || game.waitCnt == 0) {
            spaceship.init();
            Game.state = State.PLAYING; 
            Game.waitCnt = MAX_WAIT_CNT;          
        }
    } else if(Game.state == State.OVER) {
        if(Game.score > Game.highscore) {
            Game.highscore = Game.score;
        }
        
        if(Game.overCnt > 0) {
            Game.overCnt -= 1;
        } else {
            Controls.setKeyboardSubscriber(game);
        }
    }

    game.draw(ctx);

    Missle.update();
    Missle.draw(ctx);

    Polyoid.update();
    Polyoid.draw(ctx);

    ufo.update(spaceship);
    ufo.draw(ctx);

    Missle.checkPolyoidsHit();
    Missle.checkUfoHit(ufo);

    ctx.restore();
    requestAnimationFrame(animate);
}


