class StatusBar extends DrawableObject {
    x = 40;
    width = 200;
    height = 60;
    img; 
    percentage;

/**
 * Sets the completion percentage and updates the displayed image accordingly
 * @param {number} percentage The completion percentage to set.
 */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the image index based on the percentage completion
     * @returns the index of the image to be displayed based on the completion percentage
     */
    resolveImageIndex() {            
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
