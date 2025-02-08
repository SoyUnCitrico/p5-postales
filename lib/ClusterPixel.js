class ClusterPixel {
    constructor(jsonData, colores) {
        this.jsonData = jsonData;
        this.particles = [];
        this.respuestas = this.getRespuestasFromJSON();
        this.selectRandomPhrase();
        this.aguaColores = colores
        this.length = 0;
    }

    getRespuestasFromJSON() {
        if (this.jsonData && this.jsonData.respuestas && Array.isArray(this.jsonData.respuestas)) {
            return this.jsonData.respuestas;
        }
        return [];
    }

    selectRandomPhrase() {
        if (this.respuestas.length > 0) {
            let randomIndex = Math.floor(Math.random() * this.respuestas.length);
            let phrase = this.respuestas[randomIndex]; // Seleccionar una frase al azar
            this.length = this.respuestas[randomIndex].length;
            // Si la frase es mayor a 50 caracteres, insertar un salto de línea después del carácter 40
            if (this.length > 25) {
                let index = 25;
                while (index < phrase.length && phrase[index] !== " ") {
                    index++; // Buscar el siguiente espacio después del carácter 40
                }
                this.phrase = phrase.substring(0, index) + "\n" + phrase.substring(index + 1);
            } else {
                this.phrase = phrase;
            }

            this.numParticles = this.phrase.length; // Contar caracteres, incluyendo espacios y saltos de línea
            this.createParticles();
        } else {
            console.warn("No se encontraron frases en el JSON.");
        }
    }

    createParticles() {
        this.particles = [];
        let particleSize = 30; // Tamaño de cada partícula (letra)
        let totalLines = this.phrase.split("\n").length; // Contar líneas
        let totalPhraseWidth = 25 * particleSize; // Ancho total de la frase en una línea
        let startX;
        if(this.length > 25) {
            // console.log(totalPhraseWidth)
            startX = (width/2 - (totalPhraseWidth * 0.6));
        } else  {
            startX = (width - totalPhraseWidth)/  2; // Punto inicial para centrar en X
        }

        let startY = height * 0.015; // Posición inicial en Y
        let currentX = startX;
        let currentY = startY;

        for (let i = 0; i < this.phrase.length; i++) {
            let char = this.phrase[i];

            // Si es un salto de línea, reiniciar X y bajar en Y
            if (char === "\n") {
                currentX = startX;
                currentY -= particleSize * 1.5; // Mover a la siguiente línea
                continue;
            }

            let position = createVector(currentX, -currentY);
            let velocity = createVector(0, random(1.58, 1.62)); // Velocidad de caída
            let colorSelected;
            if(this.aguaColores === undefined || this.aguaColores === null) {
                colorSelected = "#33A1C9"
            } else {
                colorSelected = this.aguaColores[Math.round(random(0, this.aguaColores.length -1 ))];
            }
            let p = new PixelAtom(position, particleSize, particleSize, colorSelected, velocity);
            p.setLetter(char); // Asignar la letra a la partícula
            this.particles.push(p);

            currentX += particleSize; // Moverse a la derecha para la siguiente letra
        }
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.actualizar();
            p.drawLetter(); // Dibujar la letra en la partícula

            // Si la partícula llega al fondo, se elimina
            if (p.position.y > height) {
                this.particles.splice(i, 1);
            }
        }

        // Si todas las partículas desaparecen, crear un nuevo grupo con una nueva frase
        if (this.particles.length === 0) {
            this.selectRandomPhrase();
        }
    }
}

