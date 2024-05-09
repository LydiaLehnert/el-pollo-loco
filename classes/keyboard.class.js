class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;


    constructor() {
        this.bindButtonTouchEvents();
    }

    bindButtonTouchEvents() {
        document.getElementById('button_left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.LEFT = true;
    }); 

    document.getElementById('button_left').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.LEFT = false;
    }); 

    document.getElementById('button_right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.RIGHT = true;
    }); 

    document.getElementById('button_right').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.RIGHT = false;
    }); 

    document.getElementById('button_jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.SPACE = true;
    }); 

    document.getElementById('button_jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.SPACE = false;
    }); 

     document.getElementById('button_throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.D = true;
    }); 

    document.getElementById('button_throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        this.D = false;
    }); 


    }




}