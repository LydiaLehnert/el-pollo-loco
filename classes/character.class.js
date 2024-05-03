class Character extends MovableObject {
    scaleFactorX = 0.6;
    y = 180;
    scaleFactorY = 0.7;
    width = 150;
    height = 250;
    speed = 10;
    world;
    SOUND_WALKING = new Audio ('audio/walking.mp3');
    SOUND_COLLECT_COIN = new Audio ('audio/collect-coin.mp3');
    SOUND_COLLECT_BOTTLE = new Audio ('audio/collect-bottle.mp3');
    SOUND_HURT = new Audio ('audio/hurt.mp3');
    SOUND_JUMP = new Audio ('audio/jump.mp3');
    SOUND_SNORING = new Audio ('audio/snoring.mp3');
    
    energy = 100;
    offset = {
        top: 100,
        left: 20,
        right: 50,
        bottom: 110
    };

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
        setStoppableInterval(() => this.playCharacter(), 200);
    }

    moveCharacter() {
        this.SOUND_WALKING.pause();
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canJump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }

    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        playAudio(this.SOUND_WALKING);
    }

    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        playAudio(this.SOUND_WALKING);
    }

    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();        
    }

    jump() {
        super.jump();
        this.speedY = 30;
        playAudio(this.SOUND_JUMP);
    }

    playCharacter() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            playAudio(this.SOUND_HURT);
        } else if (this.doesNotMove()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.isWalking) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    playDeadAnimation() {
        if(this.isDead()) {
            const animationInterval = setStoppableInterval(() =>this.playAnimation(this.IMAGES_DEAD), 200);
            return animationInterval;
        } else {
        return null;
        } 
    }

    doesNotMove() {
        return (
            !keyboard.RIGHT &&
            !keyboard.LEFT &&
            !keyboard.UP &&
            !keyboard.DOWN &&
            !keyboard.SPACE &&
            !keyboard.D
        );
    }

    isWalking() {
        this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    collectBottle() {
        world.collectedBottles += 10;
        playAudio(this.SOUND_COLLECT_BOTTLE);
    };

    collectCoin() {
        world.collectedCoins += 20;
        playAudio(this.SOUND_COLLECT_COIN);
    }

    // jumpedOnEnemy(enemy) {
    //     if (this.y + this.height > enemy.y) {            //muss zeitlich vorher passieren
    //         return (
    //             this.x + this.width > enemy.x &&
    //             this.x < enemy.x + enemy.width &&
    //             this.y < enemy.y + enemy.height);
    //     } else {
    //         return false;
    //     }
    // };

   
    

}