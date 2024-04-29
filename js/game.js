let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    let startScreen = document.getElementById('start_screen');
    let startButton = document.getElementById('start_button');
    startScreen.remove();
    startButton.remove();
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen_container');
    enterFullscreen(fullscreen);
}

function enterFullscreen(fullscreen) {
    if (fullscreen.requestFullscreen) {
        fullscreen.requestFullscreen();
    } else if (fullscreen.msRequestFullscreen) {
        fullscreen.msRequestFullscreen();
    } else if (fullscreen.webkitRequestFullscreen) {
        fullscreen.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function endGame(outcomeOfGame) {
    let canvasContainer = document.getElementById('canvas_container');

    intervalIds.forEach(clearInterval);
    canvasContainer.innerHTML = `
            <img class = "endscreen-img" src ="img/9_intro_outro_screens/background/endscreen.png"></img>
            <button class = "restart-button"> Play again </button>
            
            `;

    if (outcomeOfGame === "won") {
        console.log('You won');
        canvasContainer.innerHTML += `
            <img class="endscreen-text" src = "img/9_intro_outro_screens/game_over/game over.png">
        `;

    } else if (outcomeOfGame === "lost") {
        console.log('You lost');
        canvasContainer.innerHTML += `
        <img class="endscreen-text" src = "img/9_intro_outro_screens/game_over/you lost.png">
    `;
    }

}


