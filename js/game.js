let canvas;
let world;

let intervalIds = [];
let audioOn = true;
let gameRestarted = false;

/**
 * Initializes the game environment by creating a keyboard object and a world object based on a canvas element retrieved from the
 * HTML document
 */
function init() {
    let keyboard = new Keyboard();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Removes the start screen and start button elements from the HTML document and starts playing the background audio
 */
function startGame() {
    let startScreen = document.getElementById('start_screen');
    let startButton = document.getElementById('start_button');

    init();
    startScreen.remove();
    startButton.remove();
    playAudio(world.SOUND_BACKGROUND);
}

/**
 * Turns the volume off
 * Hides or shows the volume on icon/button based on the device type (screen or mobile)
 */
function turnVolumeOff() {
    let volumeOnIconScreenview = document.getElementById('volume_on_icon');
    let volumeOffIconScreenview = document.getElementById('volume_off_icon');
    let volumeOnButtonMobileDesign = document.getElementById('volume_on_button');
    let volumeOffButtonMobileDesign = document.getElementById('volume_off_button');

    const isMobile = volumeOnIconScreenview.checkVisibility();

    if (isMobile) {
        volumeOnIconScreenview.style.zIndex = -1;
        volumeOffIconScreenview.style.zIndex = 1;
    } else {
        volumeOnButtonMobileDesign.style.zIndex = -1;
        volumeOffButtonMobileDesign.style.zIndex = 1;
    }
    audioOn = false;
    world.SOUND_BACKGROUND.pause();
}

/**
 * Turns the volume on
 * Hides or shows the volume on icon/button based on the device type (screen or mobile)
 */
function turnVolumeOn() {
    let volumeOnIconScreenview = document.getElementById('volume_on_icon');
    let volumeOffIconScreenview = document.getElementById('volume_off_icon');
    let volumeOnButtonMobileDesign = document.getElementById('volume_on_button');
    let volumeOffButtonMobileDesign = document.getElementById('volume_off_button');

    const isMobile = volumeOnIconScreenview.checkVisibility();

    if (isMobile) {
        volumeOffIconScreenview.style.zIndex = -1;
        volumeOnIconScreenview.style.zIndex = 1;
    } else {
        volumeOffButtonMobileDesign.style.zIndex = -1;
        volumeOnButtonMobileDesign.style.zIndex = 1;
    }

    audioOn = true;
    world.SOUND_BACKGROUND.play();
}

/**
 * Plays or pauses the provided audio based on the global `audioOn` status
 * @param {HTMLAudioElement} audio the audio element to play or pause
 */
function playAudio(audio) {
    if (audioOn === true) {
        audio.play();
    } else if (audioOn === false) {
        audio.pause();
    }
}

/**
 * Sets up a recurring interval that calls the provided function
 * The interval can be stopped using the returned ID
 * @param {function} fn The function to be executed at each interval
 * @param {number} time he interval time in milliseconds
 * @returns the ID of the interval timer
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

/**
 *  Restarts the game by setting the gameRestarted status to true, stopping the end screen audio, removing the end screen elements,
 *  initializing the game again using the init() function, and playing the background audio of the game world
 */
function restartGame() {
    gameRestarted = true;
    stopEndscreenAudio();
    removeEndscreen();
    init();
    playAudio(world.SOUND_BACKGROUND);
    setTimeout(() => gameRestarted = false, 6500);
}

/**
 * Pauses the audio played during the end screen, including the 'lost', 'won', and 'after game' sounds
 */
function stopEndscreenAudio() {
    world.SOUND_LOST.pause();
    world.SOUND_WON.pause();
    world.SOUND_AFTER_GAME.pause();
}

/**
 *  Removes end screen elements from the HTML document, including the end screen image and restart button
 *  Additionally, it removes either the 'won' or 'lost' text elements if they exist
 */
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

/**
 * Concludes the game by stopping intervals, pausing game audio, triggering dead animations, displaying the end screen image and text
 * and playing additional audio if the game is not being restarted
 * @param {string} outcomeOfGame 'won' if game is won; else 'lost'
 */
function endGame(outcomeOfGame) {
    let canvasContainer = document.getElementById('canvas_container');
    intervalIds.forEach(clearInterval);
    intervalIds = [];
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

/**
 * pauses the character's walking audio and the endboss's endbattle audio
 */
function stopGameAudio() {
    world.character.SOUND_WALKING.pause();
    world.level.endboss.SOUND_ENDBATTLE.pause();
    world.SOUND_BACKGROUND.pause();
}

/**
 * Stops the dead animation for either the main character or the end boss
 * @param {number} deadAnimationCharacter The interval ID for the character's dead animation
 * @param {number} deadAnimationEndboss The interval ID for the endboss's dead animation
 */
function stopDeadAnimation(deadAnimationCharacter, deadAnimationEndboss) {
    if (deadAnimationCharacter) {
        clearInterval(deadAnimationCharacter);
    } else if (deadAnimationEndboss) {
        clearInterval(deadAnimationEndboss);
    }
}

/**
 * Displays the end screen image and a button to restart the game within canvasContainer
 * @param {*} canvasContainer 
 */
function showEndscreenImage(canvasContainer) {
    canvasContainer.innerHTML += `
    <img id = "endscreen_img" class = "endscreen-img" src ="assets/img/9_intro_outro_screens/game_over/endscreen.png"></img>    
    <button onclick = "restartGame()" id = "restart_button" class = "restart-button"> Play again </button>           
    `;
}
  
/**
 * Displays end screen text based on the outcome of the game and plays corresponding audio
 * @param {HTMLElement} canvasContainer The HTML element where the end screen image and button will be displayed
 * @param {*} outcomeOfGame 'won' if game is won; else 'lost'
 */
function showEndscreenTextAndPlayAudio(canvasContainer, outcomeOfGame) {
    if (outcomeOfGame === "won") {
        canvasContainer.innerHTML += `
        <img id = "endscreen_text_won" class="endscreen-text" src = "assets/img/9_intro_outro_screens/game_over/you-won.png">
    `;
        playAudio(world.SOUND_WON);

    } else if (outcomeOfGame === "lost") {
        canvasContainer.innerHTML += `
    <img id = "endscreen_text_lost"class="endscreen-text" src = "assets/img/9_intro_outro_screens/game_over/you lost.png">
`;
        playAudio(world.SOUND_LOST);
    }
}

