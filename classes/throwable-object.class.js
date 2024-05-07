class ThrowableObject extends MovableObject {
    interval = null;
    SOUND_THROW = new Audio('audio/throw-bottle.mp3');

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throwObject();
    }

    throwObject() {
        this.speedY = 30;
        this.applyGravity();
        playAudio(this.SOUND_THROW);
        if (world.character.direction === "right") {
            this.throwRight();
        } else { this.throwLeft() }
        this.animate();
    }

    throwRight() {
        this.interval = setStoppableInterval(() => {
            // TODO Make sure that discard() is called when bottle hits floor or is not in view anymore
            this.x += 7;
        }, 25);
    }

    throwLeft() {
        this.interval = setStoppableInterval(() => {
            // TODO Make sure that discard() is called when bottle hits floor or is not in view anymore
            this.x -= 7;

        }, 25);

    }

    animate() {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }

    discard() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}