class Bottle extends DrawableObject {
    width = 60;
    height = 60; 
    offset = {
        top: 10,
        left: 25,
        right: 10,
        bottom: 7
    };
/**
 *  Creates an instance of Bottle and places it at a random coordinate
 */
    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'); 
        this.x = 400 + Math.random() * 1800;
        this.y = 390 - Math.random() * 30;
    }
}