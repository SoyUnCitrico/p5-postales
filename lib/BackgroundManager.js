class BackgroundManager {
    constructor(imagePaths) {
        this.imagePaths = imagePaths;
        this.images = [];
        this.currentImage = null;
        this.lastChangeTime = 0;
        this.interval = 10000; // 30 segundos
        this.preloadImages();
    }

    preloadImages() {
        for (let path of this.imagePaths) {
            let img = loadImage(path);
            this.images.push(img);
        }
        this.changeImage(); // Selecciona la primera imagen al inicio
    }

    changeImage() {
        if (this.images.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.images.length);
            this.currentImage = this.images[randomIndex];
        }
    }

    update() {
        // Cambia la imagen cada 30 segundos
        if (millis() - this.lastChangeTime > this.interval) {
            this.changeImage();
            this.lastChangeTime = millis();
        }
    }
    
    drawBackground() {
        if (this.currentImage) {
            push();            
            translate(width/2, height/2)
            rectMode(CENTER);
            noStroke();
            fill(238,238,228)
            rect(0,0,  widthCanvas * 0.82, heightCanvas * 0.82);
            image(this.currentImage, 0, 0, widthCanvas * 0.8, heightCanvas * 0.8);
            // filter(POSTERIZE, 8); //CARICATURA
            // filter(BLUR, 1); //BORROSO
            filter(ERODE); //BORROSO
            pop();
        }
    }
}