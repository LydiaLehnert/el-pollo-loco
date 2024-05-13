class Endboss extends MovableObject {
    y = 55;
    x = 100;
    width = 250;
    height = 400;
    speed = 10;
    hadFirstContact = false;
    offset = {
        top: 75,
        left: 8,
        right: 10,
        bottom: 12
    };
    SOUND_ENDBATTLE = new Audio('audio/endbattle.mp3');
    SOUND_IF_HIT = new Audio('audio/chicken.mp3');

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates a new instance of Endboss and loads necessary images
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2700;
        this.animate();
        this.i = 0;
    }

    /**
       * Initiates animations by setting up stoppable intervals for moving and playing the endboss
       */
    animate() {
        setStoppableInterval(() => this.moveEndboss(), 300);
        setStoppableInterval(() => this.playEndboss(), 150);
    }

    /**
     * Checks if the end boss character encounters the main character for the first time
     * if true,  the 'alert' animation of the endboss is played and after it the end battle starts
     *  */
    moveEndboss() {
        if (this.encountersCharacterForTheFirstTime()) {
            if (i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
                i++;
            } else {
                this.hadFirstContact = true;
            }
        } else if (this.hadFirstContact === true) {
            this.startEndbattle();
        }
    }

    /**
     * Checks if the end boss character encounters the main character for the first time
     * @returns true if the X-coordinate of the character is greater than 2129 and endboss did not not have first contact to character
     */
    encountersCharacterForTheFirstTime() {
        return world.character.x > 2129 && !this.hadFirstContact;
    }

    /**
     * plays the walking animation and initiates leftward movement for the endboss
     * also pauses the background sound and plays the end battle sound
     */
    startEndbattle() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        world.SOUND_BACKGROUND.pause();
        playAudio(this.SOUND_ENDBATTLE);
    }

    /**
     * Plays animations and audio for the end boss character if endboss is hurt oder attacks the character
     */
    playEndboss() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            playAudio(this.SOUND_IF_HIT);
        } else if (this.isColliding(world.character) && world.character.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }
}