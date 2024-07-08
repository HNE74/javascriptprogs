class Sounds {

    static explosion = new Audio("res/explosion.wav");

    static MAX_MISSLES = 3;
    static missleCnt = 0;

    static MAX_POLYOIDHITS = 3;
    static polyoidhitCnt = 0;

    static bufferSize = 4096;
    static audioContext = null;
    static thrustNoise = null;
    static thrustGain = null;

    constructor() {
        Sounds.missles = [];
        for(let i=0; i<Sounds.MAX_MISSLES; i++) {
            Sounds.missles.push(new Audio("res/missle.wav"));
        }

        Sounds.polyoidhits = []
        for(let i=0; i<Sounds.MAX_POLYOIDHITS; i++) {
            Sounds.polyoidhits.push(new Audio("res/polyoidhit.wav"));
        }  

        Sounds.ufo = new Audio("res/ufo.wav")
        
        this.createNoise();  
    }

    /**
     * Noise creation see:
     * https://github.com/zacharydenton/noise.js
     */
    createNoise() {
        Sounds.audioContext = new (window.webkitAudioContext || window.AudioContext)();
        Sounds.thrustNoise = (function() {
            var lastOut = 0.0;
            var node = Sounds.audioContext.createScriptProcessor(Sounds.bufferSize, 1, 1);
            node.onaudioprocess = function(e) {
                var output = e.outputBuffer.getChannelData(0);
                for (var i = 0; i < Sounds.bufferSize; i++) {
                    var white = Math.random() * 2 - 1;
                    output[i] = (lastOut + (0.02 * white)) / 1.02;
                    lastOut = output[i];
                    output[i] *= 3.5; // (roughly) compensate for gain
                }
            }
            return node;
        })();

        Sounds.thrustGain = Sounds.audioContext.createGain(); 
        Sounds.thrustGain.gain.value = 0.0;
        Sounds.thrustNoise.connect(Sounds.thrustGain);       
        Sounds.thrustGain.connect(Sounds.audioContext.destination);     
    }

    static toggleThrust(toggle = true) {
        if(!toggle) {
            Sounds.thrustGain.gain.value = 0.0;
        }
        else {
            Sounds.thrustGain.gain.value = 1.0;
        }
    }

    static playMissle() {
        Sounds.missles[Sounds.missleCnt].play();
        Sounds.missleCnt += 1;
        if(Sounds.missleCnt > Sounds.MAX_MISSLES-1) {
            Sounds.missleCnt = 0;
        }
    }

    static playExplosion() {
        Sounds.explosion.play();
    }

    static playPolyoidhit() {
        Sounds.polyoidhits[Sounds.polyoidhitCnt].play();
        Sounds.polyoidhitCnt += 1;
        if(Sounds.polyoidhitCnt > Sounds.MAX_POLYOIDHITS-1) {
            Sounds.polyoidhitCnt = 0;
        }
    }

    static playUfo() {
        Sounds.ufo.play();
    }


}