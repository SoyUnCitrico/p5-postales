const widthCanvas = 1024;
const heightCanvas = 768;

const Y_AXIS = 1;
const X_AXIS = 2;
// const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';
let img, human, milpa, col;
let angle = 0;
let angleAumento = 0.005;
let angleHuman = 0;
let angleHumanAumento = 0.031;
let DEBUG = false;
let isFlipped = false;
let teclado;
let fuente1, fuente2, bell, typed1, returnSound;
const numOriginalMilpas = 12;
let milpas = [];
// let xI;
// let yI;
let humanPosition;
let shadow, shadowMilpa;
let textEnter = `- Presiona ENTER para guardar tu mensaje -`
let textRef = '" ...el colonialismo como estructura de poder continúa, porque invade el universo mental de un pueblo... "';
let textRef2 = '¿Qué crees que este pasando aquí?'
let textoInfo = "Felipe Guamán Poma de\nAyala, Nueva Crónica\ny Buen Gobierno,\n México: Siglo XXI, 1980.";

function preload() {
    img = loadImage('../assets/colonizar/back.png');
    human = loadImage('../assets/colonizar/human.png');
    milpa = loadImage('../assets/colonizar/milpa.png');
    col = loadImage('../assets/colonizar/colonia.jpeg');
    fuente1 = loadFont('../assets/fonts/remington_type.ttf');
    fuente2 = loadFont('../assets/fonts/mom_type.ttf');
    typed1 = loadSound('../assets/sounds/typing.mp3');
    bell = loadSound('../assets/sounds/bell.mp3');
    returnSound = loadSound('../assets/sounds/return.mp3');
}

function randomMilpas(numMilpas) {
    milpas = []
    angleHuman = 0.05;
    for(let i = 0; i < numMilpas; i++) {    
        let xI = random(width * 0.2, ((width * 0.2) + width * 0.44));
        let yI = random(height * 0.64, ((height * 0.64) + height * 0.28));
        let newVector = createVector(xI, yI);
        milpas.push(newVector)
    }
    // console.log(milpas)ccccc
}

function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer")
    shadow = makeShadow(human, 6, "#3e3a33", 0.8); 
    shadowMilpa = makeShadow(milpa, 4, "#3a362f", 0.95);   
    teclado = new Teclado('Durante la cosecha del maiz...', 'Durante la cosecha del maiz...');
    if(DEBUG) { teclado.setDebug()}
    teclado.setSound(typed1,bell, returnSound);
    teclado.setSendData();
    imageMode(CENTER)
    randomMilpas();
    resetSketch();

    // setInterval(() => {
    //     resetSketch();        
    // }, 60000)
}
function resetSketch(numMilpasSketch = numOriginalMilpas) {
    const xHP = width * 0.85
    const yHP = height - human.height
    humanPosition = createVector(xHP, yHP)
    randomMilpas(numMilpasSketch);
    isFlipped = false;
}


function draw() {
    
    if(teclado.loadingResponse) {
        background(255);
        push();
        textAlign(CENTER);
        image(col, widthCanvas /2, heightCanvas * 0.55, col.width * 1.4, col.height * 1.4)
        // fill(0,0,120);
        fill(0);
        noStroke();
        textSize(60);
        textFont(fuente1);
        text('*** Guardando respuesta ***', widthCanvas * 0.5, heightCanvas * 0.1);
        pop();
    } else {
        // FONDO
        setGradient(0,0,widthCanvas,heightCanvas, color('rgba(157, 132, 109, 1)'), color('rgba(190, 168, 134, 1)'), X_AXIS)
        image(img, widthCanvas * 0.4, heightCanvas / 2, img.width * 1.5, img.height * 1.5 ) 
    
        // MILPAS
        if(milpas.length > 0) {
            for(let i = 0; i < milpas.length; i++) {
                push();
                translate(milpas[i].x, milpas[i].y);
                rotate(angle);
                image(shadowMilpa,0,0,120,180);
                image(milpa ,0 ,0,120, 180)
                if(DEBUG) {
                    strokeWeight(5);
                    stroke('blue');
                    point(0,0);            
                }
                pop();
            }
        }
        
        // SEGADOR
        push();
        translate(humanPosition.x, humanPosition.y - human.height * 0.45);
        if(isFlipped) scale(-1, 1);
        rotate(angleHuman + 0.2);
        image(shadow ,0 ,0, human.width * 1.2, human.height * 1.2)
        image(human, 0, 0, human.width * 1.2, human.height * 1.2);
        if(DEBUG) {
            strokeWeight(5);
            stroke('red');
            point(0,0);
        }
        pop();
    
        // TEXTO INFO
        push();
        fill(50);
        stroke(50);        
        textSize(18);
        textFont('Courier New');
        textAlign(RIGHT);
        textWrap(WORD)
        text(textoInfo, widthCanvas * 0.985, heightCanvas * 0.89);

        stroke(50);
        fill(50);
        textSize(20);
        textLeading(18);
        textAlign(LEFT);
        textWrap(CHAR)
        text(textEnter, widthCanvas * 0.05, heightCanvas * 0.007, widthCanvas * 0.012, heightCanvas);
        pop();

        push();
        // TEXTO INstrucciones
        fill(0);
        noStroke();
        textAlign(CENTER);
        textSize(20);
        textFont(fuente1);
        // textStyle(BOLD);
        text(textRef, widthCanvas * 0.71, heightCanvas * 0.06, widthCanvas * 0.29, heightCanvas * 0.7);
        
        textAlign(CENTER);
        textSize(24);
        textFont(fuente1);
        textStyle(BOLD);
        text(textRef2, width * 0.71, height * 0.23, widthCanvas * 0.27, heightCanvas * 0.7);
    
        pop();
        
        // TEXTO TYPED
        push();
        fill('black');
        textAlign(LEFT);
        textSize(18);
        textFont(fuente1);
        textStyle(BOLD);
        // text(textTyped, width * 0.72, height * 0.1, width * 0.26, height * 0.7); 
        teclado.drawText(width * 0.72, height * 0.35, width * 0.26, height * 0.7)
        pop();
    
        if(keyIsPressed) {
            angleHuman += angleHumanAumento;
        }
        angle += angleAumento;    
        if(angle > (PI / 32) || angle < ( - PI / 32)) {
            angleAumento = angleAumento * (-1);
        }
        if(angleHuman > (PI / 64) || angleHuman < ( - PI / 10)) {
            angleHumanAumento = angleHumanAumento * (-1);
        }
    }
}


function makeShadow(img, sigma, shadowColor, opacity) {
    // https://editor.p5js.org/davepagurek/sketches/IJwk16Mel
    // Gaussian goes to approx. 0 at 3sigma
    // away from the mean; pad image with
    // 3sigma on all sides to give space
    const newW = img.width + 6 * sigma;
    const newH = img.height + 6 * sigma;
    const g = createGraphics(newW, newH);
    
    g.imageMode(CENTER);
    g.translate(newW/2, newH/2);
    //g.tint(0, 0, 0, );
    g.image(img, 0, 0);
    g.filter(BLUR, sigma);
    
    const shadow = g.get();
    const c = color(shadowColor);
    shadow.loadPixels();
    const numVals = 4 * shadow.width * shadow.height;
    for (let i = 0; i < numVals; i+=4) {
      shadow.pixels[i + 0] = c.levels[0];
      shadow.pixels[i + 1] = c.levels[1];
      shadow.pixels[i + 2] = c.levels[2];
      shadow.pixels[i + 3] *= opacity;
    }
    shadow.updatePixels();
    
    g.remove();
    return shadow;
  }

function keyPressed() {
    if(
        // (keyCode === 67) //letra c
        (keyCode !== 65)
        && (keyCode !== 69)
        && (keyCode !== 73)
        && (keyCode !== 79)
        && (keyCode !== 85)
        && (keyCode !== 8)
        && (keyCode !== 46)
        && (keyCode !== 13)
        && (keyCode !== 48)
        && (keyCode !== 49)
        && (keyCode !== 50)
        && (keyCode !== 51)
        && (keyCode !== 52)
        && (keyCode !== 53)
        && (keyCode !== 54)
        && (keyCode !== 55)
        && (keyCode !== 56)
        && (keyCode !== 57)
        && (keyCode !== 186)
        && (keyCode !== 219)
    ) { 
        if(milpas.length < 1) {
            randomMilpas(numOriginalMilpas);
        }
        humanPosition = milpas[milpas.length - 1].copy();
        milpas.splice(-1);                    
    }
    if(
        (keyCode === 70)
        || (keyCode === 86)
        || (keyCode === 67)
        || (keyCode === 192)
        || (keyCode === 90)
        || (keyCode === 226)
    ) {
        isFlipped = !isFlipped
    }

    if(keyCode === 87) {
        resetSketch(80);
    }

    teclado.selectKey(keyCode,key, 2);
    
}


function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }