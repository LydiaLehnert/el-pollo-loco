class Chick extends Chicken {
    x = 500 + Math.random() * 2000;
    scaleFactorX = 0.8;
    y = 378;
    scaleFactorY = 0.8;
    width = 40; 
    height = 35;
    speed = 0.15  + Math.random() * 0.25;
    offset = {
        top: 3,
        left: 5,
        right: 5,
        bottom: 3
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMG_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
    }
}