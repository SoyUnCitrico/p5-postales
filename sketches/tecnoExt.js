const widthCanvas = 1024;
const heightCanvas = 768;

const Y_AXIS = 1;
const X_AXIS = 2;

let img, martillo, phone;
let angle = 0.119;
let originalAngle = angle;
let limitAngle = 0.45;
// let angleAumento = 0.0045;
let angleAumento = 0.025;

let anglePhone = 0;
let anglePhoneAumento = 0.05;
let DEBUG = false;
let tecleado = false;

let phonePosition, martilloPosition;
let shadowPhone, shadowMartillo;
let textTyped = '';
let instrucciones = 'Destruye el teléfono escribiendo con el teclado';
let phoneOpacity = 255;
let phoneOpacityStep = -3;
let phoneOpacityLimit = -200;

function preload() {
    img = loadImage('/assets/tecnoextractivismo/back.png');
    martillo = loadImage('/assets/tecnoextractivismo/martillo.png');
    phone = loadImage('/assets/tecnoextractivismo/phone.png');
}

function randomMilpas(numMilpas) {
    milpas = []
    for(let i = 0; i < numMilpas; i++) {
        let xI = random(width * 0.285, ((width * 0.285) + width * 0.457));
        let yI = random(height * 0.64, ((height * 0.64) + height * 0.28));
        let newVector = createVector(xI, yI);
        milpas.push(newVector)
    }
    // console.log(milpas)ccccc
}

function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer")
    shadowPhone = makeShadow(phone, 2, "#3e3a33", 0.8); 
    shadowMartillo = makeShadow(martillo, 2, "#3a362f", 0.95);   


    textFont('Courier New');
    imageMode(CENTER)
    // randomMilpas(numOriginalMilpas);

    // setInterval(() => {
        // xI = random(width * 0.285, ((width * 0.285) + width * 0.457));
        // yI = random(height * 0.64, ((height * 0.64) + height * 0.3));
        
        // const xHP = width - human.width /2
        // const yHP = height - human.height
        // humanPosition = createVector(xHP, yHP)
        // randomMilpas(numOriginalMilpas);
        // numMilpas = numOriginalMilpas;
    // }, 60000)

    
}

function draw() {
    // FONDO
    background('#ffffff');
    image(img, widthCanvas / 2, heightCanvas / 2, img.width * 0.981, img.height * 1 ) 
            
    // MARTILLO
    push();
    translate(500, 90);
    rotate(angle);    
    image(martillo, 0, 0, martillo.width * 1, martillo.height * 1);
    if(DEBUG) {
        strokeWeight(5);
        stroke('red');
        point(0,0);
    }
    pop();

    // TEXTO TYPED
    push();
    textSize(32);
    textWrap(CHAR);
    textAlign(LEFT);
    text(textTyped, 100,360, 410, 300);
    pop();

    // TELEFONO
    push();
    tint(255, phoneOpacity);
    translate(width * 0.33, height * 0.61);
    rotate(anglePhone);
    image(shadowPhone,0,0);
    image(phone ,0 ,0)

    if(DEBUG) {
        strokeWeight(5);
        stroke('blue');
        point(0,0);            
    }
    pop();
    textSize(20);
    textAlign(CENTER)
    text(instrucciones, 30,60, 200,200)
    angle += 0.00001
    anglePhone += 0.00001
    if(keyIsPressed) {
        angle += angleAumento
        anglePhone += anglePhoneAumento
        if(keyCode == 8 && tecleado) 
            textTyped = textTyped.slice(0, -1);
        if (textTyped.length == 0) {
            tecleado = false;
            textTyped = '';
        } 
    }  

    if(angle >= (limitAngle/2) || angle <= ( -limitAngle)) 
        angleAumento= angleAumento * (-1);
    
    // if(anglePhone >= (PI / 64) || anglePhone <= ( - PI / 64)) {
    //     anglePhoneAumento = anglePhoneAumento * (-1);   
    // }
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

  function keyPressed() {
    switch(keyCode) {
        case 67: //letra c
            if(!tecleado) {
                tecleado = true;
            }
            textTyped += (key);
            break;
        case 82: //tecla r
            if(!tecleado) {
                tecleado = true;
            }
            textTyped += (key);
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
            phoneOpacity += phoneOpacityStep;
            console.log(phoneOpacity)
            if(phoneOpacity <= phoneOpacityLimit) phoneOpacity = 255;
            if(!tecleado) {
                tecleado = true;
                textTyped = '';
            }
            textTyped += (key);
            // console.log(textTyped)
            if(DEBUG) console.log(keyCode); 
    }
  }