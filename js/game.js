let canvas;
let world;

let intervalIds = [];
let i = 1;
let audioElements = [];
let audioOn = true;
let gameRestarted = false;

function init() {
    let keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    let startScreen = document.getElementById('start_screen');
    let startButton = document.getElementById('start_button');

    startScreen.remove();
    startButton.remove();

    playAudio(world.SOUND_BACKGROUND);
}

function turnVolumeOff() {
    let volumeOnIconScreenview = document.getElementById('volume_on_icon');
    let volumeOffIconScreenview = document.getElementById('volume_off_icon');
    let volumeOnButtonMobileDesign = document.getElementById('volume_on_button');
    let volumeOffButtonMobileDesign = document.getElementById('volume_off_button');

    const isMobile = volumeOnIconScreenview.checkVisibility();

    if (isMobile) {
        volumeOnIconScreenview.style.zIndex = -1;
        volumeOffIconScreenview.style.zIndex = 1;
        console.log('volumeOffScreenview');
    } else {
        volumeOnButtonMobileDesign.style.zIndex = -1;
        volumeOffButtonMobileDesign.style.zIndex = 1;
        console.log('volumeOffResponsive');
    }
    audioOn = false;
    world.SOUND_BACKGROUND.pause();
}

function turnVolumeOn() {
    let volumeOnIconScreenview = document.getElementById('volume_on_icon');
    let volumeOffIconScreenview = document.getElementById('volume_off_icon');
    let volumeOnButtonMobileDesign = document.getElementById('volume_on_button');
    let volumeOffButtonMobileDesign = document.getElementById('volume_off_button');

    const isMobile = volumeOnIconScreenview.checkVisibility();

    if (isMobile) {
        volumeOffIconScreenview.style.zIndex = -1;
        volumeOnIconScreenview.style.zIndex = 1;
    } {
        volumeOffButtonMobileDesign.style.zIndex = -1;
        volumeOnButtonMobileDesign.style.zIndex = 1;
    }

    audioOn = true;
    world.SOUND_BACKGROUND.play();
}


function playAudio(audio) {
    if (audioOn === true) {
        audio.play();
    } else if (audioOn === false) {
        audio.pause();
    }
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

function restartGame() {
    gameRestarted = true;
    stopEndscreenAudio();
    removeEndscreen();
    init();
    playAudio(world.SOUND_BACKGROUND);
}

function stopEndscreenAudio() {
    world.SOUND_LOST.pause();
    world.SOUND_WON.pause();
    world.SOUND_AFTER_GAME.pause();
}

function removeEndscreen() {
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
}

function endGame(outcomeOfGame) {
    let canvasContainer = document.getElementById('canvas_container');
    intervalIds.forEach(clearInterval);
    stopGameAudio();
    const deadAnimationCharacter = world.character.playDeadAnimation();
    const deadAnimationEndboss = world.level.endboss.playDeadAnimation();
    setTimeout(() => {
        this.stopDeadAnimation(deadAnimationCharacter, deadAnimationEndboss);       
        this.showEndscreenImage(canvasContainer, outcomeOfGame);
        this.showEndscreenTextAndPlayAudio(canvasContainer, outcomeOfGame);
    }, 1000);
    setTimeout(() => {
        if (!gameRestarted) {
            playAudio(world.SOUND_AFTER_GAME);
        }
    }, 6500);
}

function stopGameAudio() {
    world.character.SOUND_WALKING.pause();
    world.level.endboss.SOUND_ENDBATTLE.pause();
}

function stopDeadAnimation(deadAnimationCharacter, deadAnimationEndboss) {
    if (deadAnimationCharacter) {
        clearInterval(deadAnimationCharacter);
    } else if (deadAnimationEndboss) {
        clearInterval(deadAnimationEndboss);
    }
}

function showEndscreenImage(canvasContainer) {
    canvasContainer.innerHTML += `
    <img id = "endscreen_img" class = "endscreen-img" src ="img/9_intro_outro_screens/game_over/endscreen.png"></img>    
    <button onclick = "restartGame()" id = "restart_button" class = "restart-button"> Play again </button>           
    `;
}

function showEndscreenTextAndPlayAudio(canvasContainer, outcomeOfGame) {
    if (outcomeOfGame === "won") {
        canvasContainer.innerHTML += `
        <img id = "endscreen_text_won" class="endscreen-text" src = "img/9_intro_outro_screens/game_over/you-won.png">
    `;
        playAudio(world.SOUND_WON);

    } else if (outcomeOfGame === "lost") {
        canvasContainer.innerHTML += `
    <img id = "endscreen_text_lost"class="endscreen-text" src = "img/9_intro_outro_screens/game_over/you lost.png">
`;
        playAudio(world.SOUND_LOST);
    }
}

