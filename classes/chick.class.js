class Chick extends Chicken {
    x = 500 + Math.random() * 2000;
    y = 378;
    width = 40;
    height = 35;
    speed = 0.3 + Math.random() * 0.25;
    offset = {
        top: 3,
        left: 5,
        right: 5,
        bottom: 3
    };
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMG_DEAD = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
 * Creates a new instance of Chick and loads necessary images
 */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
    }
}