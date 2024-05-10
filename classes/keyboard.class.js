class Keyboard {
    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;


    constructor() {
        this.bindButtonKeyEvents();
        this.bindButtonTouchEvents();
    }

    bindButtonKeyEvents() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = true;
            }

            if (event.keyCode == 37) {
                this.LEFT = true;
            }

            if (event.keyCode == 32) {
                this.SPACE = true;
            }

            if (event.keyCode == 68) {
                this.D = true;
            }
        });


        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 39) {
                this.RIGHT = false;
            }

            if (event.keyCode == 37) {
                this.LEFT = false;
            }

            if (event.keyCode == 32) {
                this.SPACE = false;
            }

            if (event.keyCode == 68) {
                this.D = false;
            }
        });
    }

    bindButtonTouchEvents() {
        let buttonLeft = document.getElementById('button_left');
        let buttonRight = document.getElementById('button_right');
        let buttonJump = document.getElementById('button_jump');
        let buttonThrow = document.getElementById('button_throw');

        buttonLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });

        buttonLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });

        buttonRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });

        buttonRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });

        buttonJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });

        buttonJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });

        buttonThrow.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });

        buttonThrow.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}