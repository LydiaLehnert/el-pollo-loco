class StatusBarCoins extends StatusBar {
    y = 55; 
    percentage = 0;
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Creates a new instance of statur-bar-bottles, loads necessary images and sets percentage to zero
     */
    constructor() {
        super(); 
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }
}