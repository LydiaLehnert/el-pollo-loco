class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    discarded = false;

    /**
     * Loads an image from the specified path
     * @param {string} path the path to the image to load
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * Loads images from an array of paths and caches them
     * @param {array} array an array of paths to the images to load
     */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the image onto the canvas context at the specified position and dimensions
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    /**
     * Calculates whether two objects are colliding based on their positions and dimensions 
     * @param {object} drawableObject The other object to check for collision with
     * @returns true if object is colliding with the other object
     */
    isColliding(drawableObject) {
        return (
            this.x + this.width - this.offset.right > drawableObject.x + drawableObject.offset.left &&
            this.y + this.height - this.offset.bottom > drawableObject.y + drawableObject.offset.top &&
            this.x + this.offset.left < drawableObject.x + drawableObject.width - drawableObject.offset.right &&
            this.y + this.offset.top < drawableObject.y + drawableObject.height - drawableObject.offset.bottom);
    }
}