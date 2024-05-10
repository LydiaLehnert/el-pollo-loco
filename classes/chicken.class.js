class Chicken extends MovableObject {
    x = 400 + Math.random() * 2000;
    scaleFactorX = 0.9;
    y = 360;
    scaleFactorY = 0.9;
    width = 80;
    height = 60;
    speed = 0.1 + Math.random() * 0.25;
    offset = {
        top: 5,
        left: 3,
        right: 3,
        bottom: 5
    };
    SOUND_IF_HIT = new Audio('audio/chicken.mp3');
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMG_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        this.chickenWalkingInterval = setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.chickenAnimationInterval = setStoppableInterval(() => {
            if (this.isDead()) {
                clearInterval(this.chickenWalkingInterval)
                this.loadImage(this.IMG_DEAD);
                playAudio(this.SOUND_IF_HIT);
                clearInterval(this.chickenAnimationInterval);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}