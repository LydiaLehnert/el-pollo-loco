let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let i = 1;
let audioElements = [];

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

function restartGame() {
    let endscreenImage = document.getElementById('endscreen_img');
    let restartButton = document.getElementById('restart_button');
    let endscreenTextWon = document.getElementById('endscreen_text_won');
    let endscreenTextLost = document.getElementById('endscreen_text_lost')

    endscreenImage.remove();
    restartButton.remove();
    if (endscreenTextWon) {
        endscreenTextWon.remove();
    } else if (endscreenTextLost) {
        endscreenTextLost.remove();
    }

    init();
}


function endGame(outcomeOfGame) {
    let canvasContainer = document.getElementById('canvas_container');

    intervalIds.forEach(clearInterval);
    world.character.walking_sound.pause();
    canvasContainer.innerHTML += `
            <img id = "endscreen_img" class = "endscreen-img" src ="img/9_intro_outro_screens/background/endscreen.png"></img>           
            `;

    if (outcomeOfGame === "won") {
        canvasContainer.innerHTML += `
            <img id = "endscreen_text_won" class="endscreen-text" src = "img/9_intro_outro_screens/game_over/game over.png">
        `;

    } else if (outcomeOfGame === "lost") {
        canvasContainer.innerHTML += `
        <img id = "endscreen_text_lost"class="endscreen-text" src = "img/9_intro_outro_screens/game_over/you lost.png">
    `;
    }

    setTimeout(() => {
        canvasContainer.innerHTML += `
        <button onclick = "restartGame()" id = "restart_button" class = "restart-button"> Play again </button>        
        `
    }, 2000);



}


