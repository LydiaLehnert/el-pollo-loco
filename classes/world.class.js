class World {
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarEnergy = new StatusBarEnergy();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusBarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedCoins = 0;
    collectedBottles = 0;
    SOUND_BACKGROUND = new Audio ('audio/background.mp3');
    SOUND_WON = new Audio ('audio/won-game.mp3');
    SOUND_LOST = new Audio ('audio/lost-game.mp3');
    SOUND_AFTER_GAME = new Audio ('audio/after-game.mp3');
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {
            this.checkCollisions();
            this.checkThrowableObjects();
            this.checkBottleHitsEnemies();
            this.checkJumpingOnEnemy();
            this.checkCollectionOfCoins();
            this.checkCollectionOfBottles();
            this.checkIfGameIsOver();
        }, 20);
    }

    checkCollisions() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit(0.6);
            this.statusBarEnergy.setPercentage(this.character.energy);
        }

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit(0.3);
                this.statusBarEnergy.setPercentage(this.character.energy);
            }
        });
    }

    checkThrowableObjects() {
        if (this.keyboard.D
            // && this.collectedBottles > 0
        ) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles -= 20;
            this.statusBarBottles.setPercentage(this.collectedBottles);
            this.keyboard.D = false;
            this.character.lastAction = new Date();
        }
    }

    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((throwableObject, indexOfThrowableObjects) => {
            if (this.level.endboss.isColliding(throwableObject)) {
                throwableObject.discard();
                this.level.endboss.hit(20);
                this.throwableObjects.splice(indexOfThrowableObjects, 1);
                this.statusBarEndboss.setPercentage(this.level.endboss.energy);
            } else {
                this.level.enemies.forEach((enemy) => {
                    if (enemy.isColliding(throwableObject)) {
                        throwableObject.discard();
                        enemy.hit(100);
                    }
                });
            }
        });
    }

    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpedOnEnemy(enemy)) {
                enemy.hit(100);
                //character is not hurt 
            }
        });
    }

    checkCollectionOfCoins() {
        this.level.coins.forEach((coin, indexOfCoins) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.level.coins.splice(indexOfCoins, 1);
                this.statusBarCoins.setPercentage(this.collectedCoins);
            }
        });
    }

    checkCollectionOfBottles() {
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.level.bottles.splice(indexOfBottles, 1);
                this.statusBarBottles.setPercentage(this.collectedBottles);
            }
        });
    }

    checkIfGameIsOver() {
        if (this.character.isDead()) {
            endGame('lost');
        } else if (world.level.endboss.isDead()) {
            endGame('won');
        }
    }

    draw() {
        this.clearAndSetupCanvas();
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);

        this.drawFixedElements();

        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);

        this.resetCanvasTranslation();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    clearAndSetupCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }

    resetCanvasTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }


    drawFixedElements() {
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBarEnergy);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.level.endboss.hadFirstContact) {
            this.addToMap(this.statusBarEndboss);
        }

        this.ctx.translate(this.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(movableObject) {
        if (movableObject.direction === "left") {
            this.flipImage(movableObject);
        }
        movableObject.draw(this.ctx);
        movableObject.drawBigFrameForAllClasses(this.ctx);
        movableObject.drawIndividualFrameForClass(this.ctx);

        if (movableObject.direction === "left") {
            this.flipImageBack(movableObject);
        }
    }

    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}



