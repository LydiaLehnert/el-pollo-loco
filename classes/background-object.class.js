class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Constructs an object with the provided image path and horizontal position
     * @param {string} imagePath The path to the image for the object
     * @param {number} x The horizontal position of the object
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}