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
    lastBottleThrow = new Date().getTime();
    SOUND_BACKGROUND = new Audio('assets/audio/background.mp3');
    SOUND_WON = new Audio('assets/audio/won-game.mp3');
    SOUND_LOST = new Audio('assets/audio/lost-game.mp3');
    SOUND_AFTER_GAME = new Audio('assets/audio/after-game.mp3');

    /**
     *  Constructs a new instance of World
     * @param {HTMLCanvasElement} canvas The canvas element for rendering
     * @param {object} keyboard The keyboard object for input
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world property of the character object to the current instance of the world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Runs the game loop, checking for various game events and collisions
    */
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

    /**
     * Checks for collisions between the character and the endboss or the enemies, updating character's energy and statusbar to display 
     * the energy accordingly
     */
    checkCollisions() {
        if (this.character.isColliding(this.level.endboss)) {
            this.character.hit(0.6);
            this.statusBarEnergy.setPercentage(this.character.energy);
        }

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.jumpedOnEnemy(enemy) && !enemy.isDead()) {
                this.character.hit(0.3);
                this.statusBarEnergy.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks if the character can throw objects and if conditions are met it creates a new throwable object based on the 
     * character's direction 
     * resets the 'D' key, records the timestamp of the character's last action and the last time a bottle was
     * thrown 
     */
    checkThrowableObjects() {
        let bottle;
        if (this.bottleCanBeThrown()) {
            if (this.character.direction === "right") {
                bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            } else {
                bottle = new ThrowableObject(this.character.x, this.character.y + 100);
            }
            this.updatethrowableObjectsAndBottles(bottle);
            this.keyboard.D = false;
            this.character.lastAction = new Date();
            this.lastBottleThrow = new Date().getTime();
        }
    }

    /**
     * to be able to throw objects, the following conditions must be met: the "D" key is pressed, there is enough time elapsed since 
     * the last bottle throw and at least one bottle is collected
     * @returns true if object can be thrown
     */
    bottleCanBeThrown() {
        return this.keyboard.D && this.isEnoughTimeBetweenTheLastThrow() && this.collectedBottles > 0;
    }

    /**
     * Checks if enough time has elapsed since the last bottle throw
     * @returns true if more than 1500ms have elapsed since the last throw
     */
    isEnoughTimeBetweenTheLastThrow() {
        return new Date().getTime() > this.lastBottleThrow + 1500;
    }

    /**
     * Adds the throwable object the list of throwable objects in the game, decreases number of collected bottles and
     * updates statusbar
     * @param {MovableObject} bottle 
     */
    updatethrowableObjectsAndBottles(bottle) {
        this.throwableObjects.push(bottle);
        this.collectedBottles -= 10;
        this.statusBarBottles.setPercentage(this.collectedBottles);
    }

    /**
     * Checks if throwable objects hit enemies or the endboss
    * in case of collision: stops the throwable object's interval, deals damage to the enemy or the end boss,
    * and updates the respective status bars
     */
    checkBottleHitsEnemies() {
        this.throwableObjects.forEach((throwableObject, indexOfThrowableObjects) => {
            if (this.level.endboss.isColliding(throwableObject)) {
                throwableObject.stopInterval();
                this.level.endboss.hit(20);
                this.throwableObjects.splice(indexOfThrowableObjects, 1);
                this.statusBarEndboss.setPercentage(this.level.endboss.energy);
            } else {
                this.level.enemies.forEach((enemy) => {
                    if (enemy.isColliding(throwableObject)) {
                        throwableObject.stopInterval();
                        enemy.hit(100);
                    }
                });
            }
        });
    }


    /**
     * Checks if the character has jumped on any enemy, and if so, deals damage to the enemy
     */
    checkJumpingOnEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpedOnEnemy(enemy)) {
                enemy.hit(100);
            }
        });
    }

    /**
     * Checks if the character is colliding with coins 
     * in case of collision the character collects the coin, removes it from the world and updates the status bar that displays
     * collected coins accordingly
     */
    checkCollectionOfCoins() {
        this.level.coins.forEach((coin, indexOfCoins) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.level.coins.splice(indexOfCoins, 1);
                this.statusBarCoins.setPercentage(this.collectedCoins);
            }
        });
    }

    /**
     * Checks if the character is colliding with bottles
     * in case of collision the character collects the bottle, removes it from the world and updates the status bar that displays
     * collected bottles accordingly
     */
    checkCollectionOfBottles() {
        this.level.bottles.forEach((bottle, indexOfBottles) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.level.bottles.splice(indexOfBottles, 1);
                this.statusBarBottles.setPercentage(this.collectedBottles);
            }
        });
    }

    /**
     * Checks if the game is over by determining if the character or the end boss is dead
     */
    checkIfGameIsOver() {
        if (this.character.isDead()) {
            endGame('lost');
        } else if (world.level.endboss.isDead()) {
            endGame('won');
        }
    }

    /**
     * Draws the game elements on the canvas, including character, landscape, collectable objects, enemies, and fixed elements
     */
    draw() {
        this.clearAndSetupCanvas();
        this.addCharacterAndLandscape();
        this.drawFixedElements();
        this.addCollectableObjectsAndEnemies();

        this.resetCanvasTranslation();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     *  Clears the canvas and sets up the canvas transformation
     */
    clearAndSetupCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     *  Adds character and landscape elements to the game map
     */
    addCharacterAndLandscape() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws fixed elements 
    //  * First translates the canvas to position the fixed elements correctly, adds statusbars for energy, coins, bottles and the endboss's
     * statusbar (in case that the first encounter with the end boss has occurred)
     * After drawing, the canvas translation is reset to its original position
     */
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

    /**
   *  Adds collectable objects and enemies to the game map
   */
    addCollectableObjectsAndEnemies() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
    }

    /**
     * Resets the canvas translation to its original position
     */
    resetCanvasTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Adds an array of objects to the game map
     * @param {Array} objects An array of objects to be added to the game map
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Draws moveable object on the canvas context and calls methods to draw big frames and individual frames to detect collisions  
     * If direction is "left", it flips the image horizontally using the flipImage() method and flips the image back to its original 
     * orientation after drawing
     * @param {MovableObject} movableObject The movable object to be added to the game map
     */
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

    /**
     * Flips the image of the movable object horizontally
     * @param {MovableObject} movableObject The movable object whose image is to be flipped
     */
    flipImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1;
    }

    /**
     * Restores the original orientation of the movable object's image after flipping
     * @param {MovableObject} movableObject The movable object whose image is to be flipped back
     */
    flipImageBack(movableObject) {
        movableObject.x = movableObject.x * -1;
        this.ctx.restore();
    }
}



