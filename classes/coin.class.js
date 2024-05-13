class Coin extends DrawableObject {
    width = 150;
    height = 150;
    offset = {
        top: 55,
        left: 55,
        right: 55,
        bottom: 55
    };

/**
 * Creates an instance of Coin and places it at a random coordinate
 */
    constructor() {
        super().loadImage('assets/img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 1800;
        this.y = 310 - Math.random() * 240;
    }
}