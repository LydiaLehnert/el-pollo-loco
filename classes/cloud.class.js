class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;
    speed = 0.15;

/**
 * Creates an instance of Cloud and places it at a random coordinate
 */
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2700;
        this.animate();
    }

/**
 * Initiates an animation by periodically invoking the moveLeft function
 */
    animate() {
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    }
}



