class MovableObject extends DrawableObject {
    speed = 0.15;
    direction = "right";
    speedY = 0;
    acceleration = 2.5;
    energy = 100;             // for testing
    lastHit = 0;

    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
        return this.y < 180;
        }
    }

    isFalling() {
        if (this.isAboveGround() && this.speedY < 0) {
            return true; 
        }
    }

    hit(x) {
        this.energy -= x;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    playDeadAnimation() {
        if (this.isDead()) {
            const animationInterval = setStoppableInterval(() => this.playAnimation(this.IMAGES_DEAD), 200);
            return animationInterval;
        } else {
            return null;
        }
    }
}