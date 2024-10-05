const widthCanvas = 1024;
const heightCanvas = 768;

const Y_AXIS = 1;
const X_AXIS = 2;

let img, human, milpa;
let angle = 0;
let angleAumento = 0.005;
let angleHuman = 0;
let angleHumanAumento = 0.031;
let DEBUG = false;
let tecleado;
let tecladoBounceTime = 0;
let textTyped = '';

const numOriginalMilpas = 12;
let numMilpas = numOriginalMilpas;
let milpas = [];
// let xI;
// let yI;
let humanPosition;
let shadow, shadowMilpa;

let textoInfo = "Felipe Guamán Poma de\nAyala, Nueva Crónica\ny Buen Gobierno,\n México: Siglo XXI, 1980.";

function preload() {
    img = loadImage('/assets/colonizar/back.png');
    human = loadImage('/assets/colonizar/human.png');
    milpa = loadImage('/assets/colonizar/milpa.png');
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

    imageMode(CENTER)
    randomMilpas(numOriginalMilpas);
    resetSketch();

    setInterval(() => {
        // xI = random(width * 0.285, ((width * 0.285) + width * 0.457));
        // yI = random(height * 0.64, ((height * 0.64) + height * 0.3));
        resetSketch();
        
    }, 60000)

    
}
function resetSketch() {
    const xHP = width * 0.85
    const yHP = height - human.height
    humanPosition = createVector(xHP, yHP)
    randomMilpas(numOriginalMilpas);
    numMilpas = numOriginalMilpas;
}
function draw() {
    // FONDO|
    setGradient(0,0,widthCanvas,heightCanvas, color('rgba(157, 132, 109, 1)'), color('rgba(190, 168, 134, 1)'), X_AXIS)
    image(img, widthCanvas * 0.4, heightCanvas / 2, img.width * 1.5, img.height * 1.5 ) 

    // MILPAS
    if(milpas.length > 0) {
        for(let i = 0; i < numMilpas; i++) {
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
    fill('black');
    stroke('black');
    textAlign(RIGHT);
    textSize(18);
    textFont('Courier New');
    // textStyle(BOLD);
    text(textoInfo, width * 0.985, height * 0.89); 
    pop();
    
    // TEXTO TYPED
    push();
    fill('black');
    textAlign(LEFT);
    textSize(18);
    textFont('Courier New');
    textStyle(NORMAL);
    text(textTyped, width * 0.72, height * 0.1, width * 0.26, height * 0.7); 
    pop();

    if(keyIsPressed) {
        angleHuman += angleHumanAumento;
        if(keyCode == 8 && tecleado) 
            textTyped = textTyped.slice(0, -1);
        if (textTyped.length == 0) {
            tecleado = false;
            textTyped = '';
        } 
    }
    angle += angleAumento;    
    if(angle > (PI / 32) || angle < ( - PI / 32)) {
        angleAumento = angleAumento * (-1);
    }
    if(angleHuman > (PI / 64) || angleHuman < ( - PI / 10)) {
        angleHumanAumento = angleHumanAumento * (-1);
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
    switch(keyCode) {
        case 67: //letra c
            textTyped += (key);
            if(!tecleado) {
                tecleado = true;
            }
            if(milpas.length < 1) {
                randomMilpas(numOriginalMilpas);
                numMilpas = numOriginalMilpas;
            }
            humanPosition = milpas[milpas.length - 1].copy();
            numMilpas--;
            milpas.splice(-1);
            break;
        case 82: //tecla r
            textTyped += (key);
            if(!tecleado) {
                tecleado = true;
            }
            resetSketch();
            break;
        case 8: //backspace
        case 46: //delete
            if(tecleado == false) textTyped = '';
            textTyped = textTyped.slice(0, -1);
            break;
        case 9: //tab
            textTyped += "\t";
            break;
        case 13: //enter
            textTyped += "\n";
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
            // console.log(key)
            if(!tecleado) {
                tecleado = true;
                textTyped = '';
            }
            textTyped += (key);
            // console.log(textTyped)
            if(DEBUG) console.log(keyCode); 
    }
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