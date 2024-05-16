class ThrowableObject extends MovableObject {
    isShattered = false;
    throwInterval = null;
    animationInterval = null;
    SOUND_THROW = new Audio('assets/audio/throw-bottle.mp3');

    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    /**
    * Creates a new instance of ThrowableObject and loads necessary images
    */
    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.moveByX = (world.character.direction === "right") ? +7 : -7;
        this.throwObject();
    }

    /**
     *  Initiates the throwing action for the object
     *  Sets vertical speed, applies gravity, plays the throw sound, determines the direction of the throw, and initiates animation
     */
    throwObject() {
        this.speedY = 25;
        this.applyGravity();
        playAudio(this.SOUND_THROW);
        this.animateBottleRotation();

        this.throwInterval = setStoppableInterval(() => {
            if (this.isFallenOnGround()) {
                this.shatterBottle();
            } else {
                this.x += this.moveByX;
            }
        }, 1000 / 60);
    }

    /**
     * Checks if throwableObject is fallen on ground
     * @returns true if y-coordinate is greater than 390 (the lowest point on the Y-coordinate bottles are placed)
     */
    isFallenOnGround() {
        return this.y > 390;
    }

    /**
     * Stops the rotation animation of the bottle, plays the splash animation, sets the vertical velocity to zero and removes the bottle
     * from the canvas after 500ms
     */ 
    shatterBottle() {
        this.isShattered = true;
        this.stopRotationAnimation();
        this.stopThrowInterval();
        this.speedY = 0;
        this.animationInterval = setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        }, 1000 / 60);
    }

    /**
     * * Initiates animation by playing the rotation animation for the object
     */
    animateBottleRotation() {
        this.animationInterval = setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 1000 / 60);
    }

    /**
     * Stops the animation interval if it is running
     */
    stopRotationAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }

    /**
     * Stops the throw interval if it is running
     */
    stopThrowInterval() {
        if (this.throwInterval) {
            clearInterval(this.throwInterval);
        }
        setTimeout(() => {
            clearInterval(this.animationInterval);
            this.discarded = true;

        }, 2000);
    }
}
