class Coin extends DrawableObject {
    width = 150;
    height = 150;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 2000;
        this.y = 310 - Math.random() * 240;
    }

}