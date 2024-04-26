class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    
    drawFrame(ctx) {
        if (this instanceof Character
            || this instanceof Chicken 
            || this instanceof Chick
            || this instanceof Endboss
            || this instanceof Coin 
            || this instanceof Bottle 
            || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    isColliding(drawableObject) {
        return this.x + this.width > drawableObject.x &&
            this.y + this.height > drawableObject.y &&
            this.x < drawableObject.x + drawableObject.width &&
            this.y < drawableObject.y + drawableObject.height;
    }
}