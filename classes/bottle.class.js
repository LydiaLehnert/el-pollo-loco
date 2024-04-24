class Bottle extends DrawableObject {
    width = 60;
    height = 60; 
    collectedBottles = 0; 

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        this.x = 400 + Math.random() * 1800;
        this.y = 390 - Math.random() * 30;
    }
}