class Controls {

    static keySubscriber = null;

    constructor() {
        this.#addKeyboardListeners();
    }

    static setKeyboardSubscriber(subscriber) {
        Controls.keySubscriber = subscriber;
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            Sounds.audioContext.resume();
            Controls.keySubscriber.onkeydown(event);
        }

        document.onkeyup = (event) => {
            Controls.keySubscriber.onkeyup(event);
        }        
    }    
}