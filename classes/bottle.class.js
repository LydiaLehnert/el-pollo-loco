class Bottle extends DrawableObject {
    scaleFactorX = 0.4;
    scaleFactorY = 0.7;
    width = 60;
    height = 60; 
    offset = {
        top: 10,
        left: 25,
        right: 35,
        bottom: 15
    };

    

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        this.x = 400 + Math.random() * 1800;
        this.y = 390 - Math.random() * 30;
    }
}