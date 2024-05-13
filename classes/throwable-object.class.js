class ThrowableObject extends MovableObject {
    interval = null;
    SOUND_THROW = new Audio('assets/audio/throw-bottle.mp3');

    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    /**
    * Creates a new instance of ThrowableObject and loads necessary images
    */
    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throwObject();
    }

    /**
     *  Initiates the throwing action for the object
     *  Sets vertical speed, applies gravity, plays the throw sound, determines the direction of the throw, and initiates animation
     */
    throwObject() {
        this.speedY = 30;
        this.applyGravity();
        playAudio(this.SOUND_THROW);
        if (world.character.direction === "right") {
            this.throwRight();
        } else { this.throwLeft() }
        this.animate();
    }

    /**
     *  Initiates the throwing action to the right
     *  Moves the object horizontally to the right at a constant speed
     */
    throwRight() {
        this.interval = setStoppableInterval(() => {
            this.x += 7;
        }, 25);
    }

    /**
     *  Initiates the throwing action to the left
     *  Moves the object horizontally to the left at a constant speed
     */
    throwLeft() {
        this.interval = setStoppableInterval(() => {
            this.x -= 7;
        }, 25);
    }

    /**
     * * Initiates animation by playing the rotation animation for the object
     */
    animate() {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }

    /**
     * Stops the interval if it is running
     */
    stopInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}