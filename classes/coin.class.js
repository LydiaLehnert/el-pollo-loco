class Coin extends DrawableObject {
    scaleFactorX = 0.28;
    scaleFactorY = 0.28;
    width = 150;
    height = 150;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 400 + Math.random() * 1800;
        this.y = 310 - Math.random() * 240;
        // this.drawIndividualFrameForClass(world.ctx);
    }
}