class Character extends MovableObject {
    y = 180;
    width = 150;
    height = 250;
    speed = 10;                 // for testing: change to 2
    world;
    lastAction = new Date();
    offset = {
        top: 100,
        left: 25,
        right: 30,
        bottom: 10
    };
    SOUND_WALKING = new Audio('audio/walking.mp3');
    SOUND_COLLECT_COIN = new Audio('audio/collect-coin.mp3');
    SOUND_COLLECT_BOTTLE = new Audio('audio/collect-bottle.mp3');
    SOUND_HURT = new Audio('audio/hurt.mp3');
    SOUND_JUMP = new Audio('audio/jump.mp3');
    SOUND_SNORING = new Audio('audio/snoring.mp3');
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Creates a new instance of Character and loads necessary images
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * Initiates animations by setting up stoppable intervals for moving and playing the character
     */
    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 200);
    }

    /**
     * Calls functions to walk or jump when the respective conditions are met
     */
    moveCharacter() {
        this.SOUND_WALKING.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character is able to move right
     * @returns true if key 'right' is pressed and if the X-coordinate of the character is less than the X-coordinate defined 
     * in class Level for the end of the world
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Adds property speed to the character's X-axis, sets the property last action to the current time, sets the property direction in 
     * superclass MoveableObject to right and plays the walking sound
     */
    moveRight() {
        this.lastAction = new Date();
        super.moveRight();
        this.direction = "right";
        playAudio(this.SOUND_WALKING);
    }

    /**
     * Checks if the character is able to move right
     * @returns true if key 'left' is pressed and if the X-coordinate of the character is greater than 0
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Subtracts property speed from the character's X-axis, sets the property last action to the current time, sets the property direction in 
     * superclass MoveableObject to right and plays the walking sound
     */
    moveLeft() {
        this.lastAction = new Date();
        super.moveLeft();
        this.direction = "left";
        playAudio(this.SOUND_WALKING);
    }

    /**
     * Checks if the character is able to jump
     * @returns true if key 'space' is pressed and if character is not above ground 
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }
    /**
    * Updates the last action timestamp, triggers the character's jump animation, sets the vertical speed and plays the jump sound
     */
    jump() {
        this.lastAction = new Date();
        super.jump();
        this.speedY = 30;
        playAudio(this.SOUND_JUMP);
    }

    /**
     * Calls functions for animations and audios for hurt, londIdling, walking or isAboveGround when the respective conditions
     * are met; else the animation for idling is played 
     */
    playCharacter() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            playAudio(this.SOUND_HURT);
        } else if (this.isLongIdling()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            playAudio(this.SOUND_SNORING);
        } else if (this.isWalking()) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
    /**
     * Checks if the character has been inactive for more than 10 seconds
     * @returns true if the character's last action was more than 10 seconds ago
     */
    isLongIdling() {
        return this.lastAction.getTime() + 10000 < new Date().getTime();
    }

    /**
     * Checks if the character is walking
     * @returns true if key 'right' or key 'left' is pressed 
     *  */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    /**
     * Increases the property collectedBottles by 10 in class World and plays the audio 'collect bottle'
     */
    collectBottle() {
        world.collectedBottles += 10;
        playAudio(this.SOUND_COLLECT_BOTTLE);
    };
/**
 * Increases the property collectedCoins by 20 in class World and plays the audio 'collect coin'
 */
    collectCoin() {
        world.collectedCoins += 20;
        playAudio(this.SOUND_COLLECT_COIN);
    }

    /**
     * Checks if the character has jumped on a chicken or a chick
     * @param {*} enemy 
     * @returns true if character is above ground and falling and if he is colliding with a chicken or chick
     */
    jumpedOnEnemy(enemy) {
        return (this.isFalling() && this.isColliding(enemy)) ? true : false;
    };
}