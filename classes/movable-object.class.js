class MovableObject extends DrawableObject {
    speed = 0.15;
    direction = "right";
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object's vertical movement
     * The object descends due to gravity if it is above the ground or has positive vertical speed
     * This function updates the object's position vertically based on its current vertical speed and acceleration
     * If the object is above the ground or moving upwards, it decreases its vertical speed over time 
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground 
     * For throwable objects, it always returns true
     * @returns true if the object's vertical position is about the y-coordinate 180 (the coordinate of the character
     * when it is on the ground)
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    /**
     * Checks if the object is falling
     * @returns true if object is above the ground and speed is less than 0
     */
    isFalling() {
        if (this.isAboveGround() && this.speedY < 0) {
            return true;
        }
    }

    /**
     *  Reduces the object's energy by the specified amount x
     *  If the resulting energy is less than 0, it sets the energy to 0 to prevent negative values
     *  Otherwise, it updates the timestamp of the last hit
     * @param {number} x the amount of energy the object loses when it is hit
     */
    hit(x) {
        this.energy -= x;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt
     * @returns true if the time that has passed since the last hit is less than one second
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * checks if the object is dead
     * @returns true if the energy of the object is equal to zero
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * plays an animation using the provided array of images
     * by applying the modulo operator, the images of the array are displayed repeatedly from the beginning to the end
     * @param {array} images an array of image paths representing the animation frames
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

/**
 * Moves the object to the right by adding its current speed to its horizontal position
 */
    moveRight() {
        this.x += this.speed;
    }
/**
 * Moves the object to the left by subtracting its current speed from its horizontal position
 */
    moveLeft() {
        this.x -= this.speed;
    }

/**
 * Sets the vertical speed of the object to 30, initiating a jump action
 */
    jump() {
        this.speedY = 30;
    }

    /**
     * plays the dead animation if the object is dead
     * It sets an interval to continuously play the dead animation
     * @returns the animation intervall if true; returns null, if false
     */
    playDeadAnimation() {
        if (this.isDead()) {
            const animationInterval = setStoppableInterval(() => this.playAnimation(this.IMAGES_DEAD), 200);
            return animationInterval;
        } else {
            return null;
        }
    }
}