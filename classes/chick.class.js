class Chick extends Chicken {
    y = 378;
    width = 40; 
    height = 35;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.1  + Math.random() * 0.25;
        this.animate();
    }
}