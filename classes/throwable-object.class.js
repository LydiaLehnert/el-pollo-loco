class ThrowableObject extends MovableObject {
    interval = null;
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
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.interval = setInterval(() => {
            // TODO Make sure that discard() is called when bottle hits floor or is not in view anymore
            this.x += 7;
            this.animate();
        }, 25);
    }

    animate() {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
    }

    discard() {
        if(this.interval) {
            clearInterval(this.interval);
        }
    }
}