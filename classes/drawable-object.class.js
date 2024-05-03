class DrawableObject {
    x = 120;
    scaleFactorX = 1;
    y = 280;
    scaleFactorY = 1;
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

    drawBigFrameForAllClasses(ctx) {
        if (this instanceof Character
            || this instanceof Chicken
            || this instanceof Chick
            || this instanceof Endboss
            || this instanceof Coin
            || this instanceof Bottle
            || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'transparent';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawIndividualFrameForClass(ctx) {
        if (this instanceof Character
            || this instanceof Chicken
            || this instanceof Chick
            || this instanceof Endboss
            || this instanceof Coin
            || this instanceof Bottle
            || this instanceof ThrowableObject) {
        
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'transparent';
            // ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,(this.x + this.width - this.offset.right) - 
            (this.x + this.offset.left),(this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
    }
   
    isColliding(drawableObject) {
        return (
            this.x + this.width - this.offset.right > drawableObject.x + drawableObject.offset.left &&
            this.y + this.height - this.offset.bottom > drawableObject.y + drawableObject.offset.top &&
            this.x + this.offset.left < drawableObject.x + drawableObject.width - drawableObject.offset.right &&
            this.y + this.offset.top < drawableObject.y + drawableObject.height - drawableObject.offset.bottom);
    }
}