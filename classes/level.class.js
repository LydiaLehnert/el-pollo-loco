class Level {
    enemies;
    endboss;
    clouds;
    bottles;
    coins;2
    backgroundObjects;
    level_end_x = 2200; 

    /**
     * Constructs a new instance of the game environment
     */
    constructor(enemies, endboss, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}