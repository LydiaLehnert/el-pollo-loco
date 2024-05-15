class Chicken extends MovableObject {
    x = 400 + Math.random() * 2000;
    y = 360;
    width = 80;
    height = 60;
    speed = 0.1 + Math.random() * 0.25;
    offset = {
        top: 5,
        left: 3,
        right: 3,
        bottom: 5
    };
    SOUND_IF_HIT = new Audio('assets/audio/chicken.mp3');
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMG_DEAD = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /**
     * Creates a new instance of Chicken and loads necessary images
     */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    /**
     * Calls function moveLeft (at an interval of 1000/60ms) and plays death animation and the audio 'is hit' when the chicken is dead,
     *  and stops the walking interval; else plays animation 'images walking' (at an interval of 200ms)
     */
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
                setTimeout(() => {
                    this.discarded = true;
                }, 2000);

            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }
}