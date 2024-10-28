const widthCanvas = 1024;
const heightCanvas = 768;
const timerSpace = 7000;  //timer del efecto despues de teclear
const numOriginalPeces = 10;
const numStars = 1000;
const initSpeed = 5;
const endSpeed = 20;
const textoInfo = "Manifiesto por algoritmias hackfeministas\n(Liliana Zaragoza y Akhmatova, 2018)";
const textoInfo2 = 'El futuro también es un territorio en disputa.';
const instruciones = 'Presiona ENTER para guardar tu mensaje';
// const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';

let fondo, patas, pez;
let fuente1, fuente2, bell, typed1, returnSound;
let angle = 0;
let angleAumento = 0.005;
let angleHuman = 0;
let angleHumanAumento = 0.0045;

let teclasFlag = false;
let teclasTime = Date.now();
let ahorita = teclasTime;
let teclado;


let lastChar = '.'
let numPeces = numOriginalPeces;
let peces = [];
let stars = [];
let colorStars = '#bfc19569';
let colorText = '#bfc195a0';
let colorPatas = '#b1005e';
let colorFondo = '#0f0f102e';
let colorFondo2 = '#0f0f10';
let colorBack = colorFondo2;
let patasPixel;

let shadowPeces, shadowPatas;
const infoEspaciado = addLetterSpacing(textoInfo, 2);

function preload() {
    patas = loadImage('https://soyuncitrico.github.io/p5-postales/assets/imaginar/patas.png');
    pez = loadImage('https://soyuncitrico.github.io/p5-postales/assets/imaginar/pez.png');
    // fondo = loadImage('https://soyuncitrico.github.io/p5-postales/assets/imaginar/all.jpg');
    fondo = loadImage('../assets/imaginar/all.jpg');
    // shadowPez = makeShadow(pez, 8, "#6d6e62", 0.8);
    // shadowPatas = makeShadow(patas, 20, "#66674f", 0.6);

    fuente1 = loadFont('https://soyuncitrico.github.io/p5-postales/assets/fonts/remington_Type.ttf');
    fuente2 = loadFont('https://soyuncitrico.github.io/p5-postales/assets/fonts/mom_type.ttf');
    typed1 = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/typing.mp3');
    bell = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/bell.mp3');
    returnSound = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/return.mp3');
}

function randomPeces(numPeces) {
    peces = []
    for(let i = 0; i < numPeces; i++) {
        let xI = random(0,  width);
        let yI = random(0, height);
        let prob = random();
        let newPez = new PixelAtom(createVector(xI, yI));
        newPez.setOffsetAngle(0.2);
        newPez.setVelocity(createVector(prob > 0.5 ? random(0, 1) : random(0,-1), prob > 0.5 ? random(-1,0) : random(0, 1)))
        newPez.setMaxSpeed(1)
        peces.push(newPez)
    }
}


function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer")
    shadowPez = makeShadow(pez, 5, "#bcbea6", 1);
    shadowPatas = makeShadow(patas, 10, "#cbc69c", 1);
    teclado = new Teclado(textoInfo2, instruciones);
    teclado.setColor(color(colorPatas));
    teclado.setColorInstruction(color(colorPatas));
    teclado.setSound(typed1,bell, returnSound);
    teclado.setSendData(globalUri);
    teclado.setDebug();
    textFont('Courier New');
    angleMode(RADIANS);
    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER);

    randomPeces(numPeces);
    for (var i = 0; i < numStars; i++) {
      stars[i] = new Star(colorStars, initSpeed);
    }
    patasPixel = new PixelAtom(createVector(20,20))
    let prob = random();
    patasPixel.setVelocity(createVector(prob > 0.5 ? 1 : -1,random(1)))
    
}

function draw() {
  if(!teclado.loadingResponse) {
    if(teclasFlag) {
      background(colorFondo);  
    } else {
      background(colorFondo2);  
    }    
    // LETRAS DEL CENTRO 
    push();
    textSize(24);
    textFont(fuente2);
    textStyle(NORMAL);
    noStroke();
    teclado.drawText(width/2, height * 0.5, width/2, height * 0.8);
    pop();

    push();
    stroke(colorPatas);
    textSize(20);
    textFont(fuente1);
    
    textStyle(BOLD);
    fill(colorPatas);
    noStroke();
    text(textoInfo, width/2, height * 0.9);
    pop();

    // ESTRELLAS
    push();
    textSize(14);
    textAlign(LEFT);
    for (let i = 0; i < stars.length; i++) {      
      stars[i].update();
      stars[i].showChar(lastChar);
    }
    pop();

    // PATAS
    patasPixel.pasearImage('REVERSE_XY', shadowPatas, patas.width * 0.75, patas.height * 0.75, false) 
    patasPixel.pasearImage('REVERSE_XY', patas, patas.width * 0.75, patas.height * 0.75, false) 

    // PECES
    if(peces.length > 0) {
        for(let i = 0; i < numPeces; i++) {
            peces[i].pasearImage('REVERSE_XY', shadowPez, 140, 200)            
            peces[i].pasearImage('REVERSE_XY', pez, 140, 200);
        }
    }
    
    // TIMER EFECTO DELAY
    ahorita = Date.now();
    if(teclasFlag == true && (ahorita - teclasTime) > timerSpace) {
      teclasFlag = false;
      teclasTime = ahorita;
    }
  } else {
    background('#434248');
    image(fondo, widthCanvas * 0.5, heightCanvas * 0.5);
    push();
    noStroke();
    fill(colorStars);
    textAlign(CENTER);
    textSize(40);
    text('*** Guardando Respuesta ***', widthCanvas * 0.5, heightCanvas * 0.5)
    pop();
  }
}

function makeShadow(img, sigma, shadowColor, opacity) {
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

function addLetterSpacing(input, amount, spacer) {
  spacerCharacter = '\u200A' || spacer;
  let characters = input.split('');
  spacerCharacter = spacerCharacter.repeat(amount);
  return characters.join(spacerCharacter);
}


function keyPressed() {
  if((keyCode >= 48 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111)) {
    // console.log(key);
    lastChar = key;
    teclasFlag = true;
  }
  if(keyCode === 32) {
    lastChar = '*';
    teclasFlag = true;
  }
  teclado.selectKey(keyCode, key, 5);
}