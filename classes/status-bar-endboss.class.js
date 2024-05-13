class StatusBarEndboss extends StatusBar {
    x = 460;
    y = 10;
    percentage = 100;
    IMAGES = [
        'assets/img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /**
     * Creates a new instance of statur-bar-bottles, loads necessary images and sets percentage to zero
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
    }
}