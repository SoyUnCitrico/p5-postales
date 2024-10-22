const widthCanvas = 1024;
const heightCanvas = 768;


let img, human, milpa;
let angle = 0;
let angleAumento = 0.005;
let angleHuman = 0;
let angleHumanAumento = 0.0045;
let DEBUG = false;
let tecleado = false;
let teclasFlag = false;
let teclasTime = Date.now();
let ahorita = teclasTime;

const numOriginalPeces = 10;
const numStars = 1000;
let lastChar = '.'
let numPeces = numOriginalPeces;
let peces = [];
let stars = [];
let colorStars = '#bfc195';
let colorText = '#bfc195a0';
let colorPatas = '#b1005e';
let colorFondo = '#21202429';
let colorFondo2 = '#232325';
let colorBack = colorFondo2;
let patasPixel;
let timerSpace = 7000;  //timer del efecto despues de teclear

let shadowPeces, shadowPatas;
let textoInfo = "Manifiesto por algoritmias hackfeministas\n(Liliana Zaragoza y Akhmatova, 2018)";
let textEspaciado = addLetterSpacing(textoInfo,1)
let textTyped = textEspaciado;
let initSpeed = 5;
let endSpeed = 40;


function preload() {
    patas = loadImage('../assets/imaginar/patas.png');
    pez = loadImage('../assets/imaginar/pez.png');
}

function randomPeces(numPeces) {
    peces = []
    for(let i = 0; i < numPeces; i++) {
        // let xI = random(width * 0.285, ((width * 0.285) + width * 0.457));
        // let yI = random(height * 0.64, ((height * 0.64) + height * 0.28));
        let xI = random(0,  width);
        let yI = random(0, height);
        // let newVector = createVector(xI, yI);
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
    shadowPez = makeShadow(pez, 8, "#6d6e62", 0.8); 
    shadowPatas = makeShadow(patas, 20, "#66674f", 0.6);   
    
    angleMode(RADIANS);
    imageMode(CENTER);
    rectMode(CENTER);

    randomPeces(numPeces);
    for (var i = 0; i < numStars; i++) {
      stars[i] = new Star(colorStars, initSpeed);
    }
    patasPixel = new PixelAtom(createVector(20,20))
    let prob = random();
    patasPixel.setVelocity(createVector(prob > 0.5 ? 1 : -1,random(1)))
    // setInterval(() => {
    // }, 60000)

    textFont('Courier New');
    
}

function draw() {
    if(teclasFlag) {
      background(colorFondo);  
    } else {
      background(colorFondo2);  
    }    

    // ESTRELLAS
    for (let i = 0; i < stars.length; i++) {      
      stars[i].update();
      stars[i].showChar(lastChar);
    }

    patasPixel.pasearImage('REVERSE_XY', shadowPatas, patas.width * 0.75, patas.height * 0.75, false) 
    patasPixel.pasearImage('REVERSE_XY', patas, patas.width * 0.75, patas.height * 0.75, false) 
    if(peces.length > 0) {
        for(let i = 0; i < numPeces; i++) {
            peces[i].pasearImage('REVERSE_XY', shadowPez, 140, 200)            
            peces[i].pasearImage('REVERSE_XY', pez, 140, 200);
        }
    }

    // LETRAS DEL CENTRO 
    push();
    textAlign(CENTER)
    textStyle(BOLD)
    textSize(25);
    stroke(colorPatas);
    fill(colorPatas);
    text(textTyped, width/2, height * 0.7, 800,350); 
    pop();
    textSize(16);
    textAlign(LEFT);

    // TIMER EFECTO DELAY
    ahorita = Date.now();
    if(teclasFlag == true && (ahorita - teclasTime) > timerSpace) {
      teclasFlag = false;
      teclasTime = ahorita;
      
    }
    // console.log("TECLAS FLAG ", teclasFlag)

    if(keyIsPressed) {
     
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

function addLetterSpacing(input, amount, spacer) {
  // 'spacer' character to use
  // (can be passed in as an optional argument, or it
  // will use the unicode 'hair space' one by default)
  spacerCharacter = '\u200A' || spacer;
  // split the string into a list of characters
  let characters = input.split('');
  // create a series of spacers using the
  // repeat() function
  spacerCharacter = spacerCharacter.repeat(amount);
  // use join() to combine characters with the spacer
  // and send back as a string
  return characters.join(spacerCharacter);
}


function keyPressed() {
  switch(keyCode) {
      case 67: //letra c
          textTyped += (key);
          if(!tecleado) {
              tecleado = true;
          }
          break;
      case 82: //tecla r
          textTyped += (key);
          if(!tecleado) {
              tecleado = true;
          }
          break;
      case 8: //backspace
      case 46: //delete
          if(tecleado == false && teclasFlag == false) {
            textTyped = textEspaciado;
            // console.log("!AQUI")
            break;
          }
          if(textTyped.length <= 0) textTyped = textEspaciado;
          if(textTyped == textEspaciado && tecleado == true) {
            textTyped = ''
            break;
          }
          textTyped = textTyped.slice(0, -1);
          break;
      case 9: //tab
          textTyped += "\t";
          break;
      case 13: //enter
          textTyped += "\n";
          break;
      case 32: //space
      ahorita = Date.now();
          teclasFlag = true;
          lastChar = '.'
          if(!tecleado) {
              tecleado = true;
              textTyped = '';
          }
          textTyped += (key);
          break;
      case 0: //dead
      case 16: //shift
      case 17: //control
      case 18: //ALT
      case 20: //capslock
      case 27: //esc
      case 33: //pageup
      case 34: //pagedown
      case 35: //end
      case 36: //home
      case 37: //arrows
      case 38: //
      case 39: //
      case 40: //
      case 112: // F1
      case 113:
      case 114:
      case 115:
      case 116:
      case 117:
      case 118:
      case 119:
      case 120:
      case 121:
      case 122:
      case 123:
      case 219: //dead
      case 225: //alt graph
          break;
      default:
          ahorita = Date.now();
          teclasFlag = true;
          lastChar = key
          if(!tecleado) {
              tecleado = true;
              textTyped = '';
          }
          textTyped += (key);
          // console.log(textTyped)
          if(DEBUG) console.log(keyCode); 
  }
}