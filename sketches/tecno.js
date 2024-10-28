const widthCanvas = 1024;
const heightCanvas = 768;

const Y_AXIS = 1;
const X_AXIS = 2;

const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
// const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';

let img, img2, martillo, phone;
let angle = 0;
let originalAngle = angle;
let limitAngle = 0.45;
// let angleAumento = 0.0045;
let angleAumento = 0.025;
let anglePhoneInit = 0;
let anglePhone = anglePhoneInit;
let anglePhoneAumento = 0.05;

let instrucciones = '¿Cómo resistir a sistemas que monitorean, vigilan, prescriben y dictaminan nuestro paso por la vida digital y por el mundo? ';

let phoneOpacity = 220;
let phoneOpacityStep = -4;
let phoneOpacityLimit = 0;

let shadowPhone, shadowMartillo;
let fuente1, fuente2;
let bell, typed1, returnSound;
let teclado;

function preload() {
    img = loadImage('https://soyuncitrico.github.io/p5-postales/assets/tecnoextractivismo/rpi.png');
    // img = loadImage('../assets/tecnoextractivismo/rpi.png');
    martillo = loadImage('https://soyuncitrico.github.io/p5-postales/assets/tecnoextractivismo/hammer.png');
    // martillo = loadImage('../assets/tecnoextractivismo/hammer.png');
    phone = loadImage('https://soyuncitrico.github.io/p5-postales/assets/tecnoextractivismo/phone.png');
    fuente1 = loadFont('https://soyuncitrico.github.io/p5-postales/assets/fonts/remington_Type.ttf');
    fuente2 = loadFont('https://soyuncitrico.github.io/p5-postales/assets/fonts/mom_type.ttf');
    typed1 = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/typing.mp3');
    bell = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/bell.mp3');
}


function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer");
    shadowPhone = makeShadow(phone, 2, "#3e3a33", 0.8);
    shadowMartillo = makeShadow(martillo, 2, "#3a362f", 0.95);

    teclado = new Teclado('Presiona ENTER para enviar tu mensaje', 'Presiona ENTER para enviar tu mensaje');
    teclado.setSendData(globalUri);
    teclado.setSound(typed1,bell);
    teclado.setColorInstruction('#3b6921');
    
    textFont(fuente1);
    imageMode(CENTER);
}

function draw() {
    if(!teclado.loadingResponse) {
        // FONDO
        background('#f1f5ed');
        // MARTILLO
        push();
        translate(widthCanvas * 0.579, heightCanvas * 0.22);
        rotate(angle);    
        image(martillo, 0, 0, martillo.width * 0.85, martillo.height * 0.85);
        pop();

        /// RPI
        push();
        image(img, widthCanvas * 0.75, heightCanvas * 0.53, img.width * 0.85, img.height * 0.85) 
        pop();

        // TEXTO TYPED
        push();
        textSize(20);
        textAlign(CENTER)
        // stroke(0)
        text(instrucciones, widthCanvas * 0.035, heightCanvas * 0.08, widthCanvas * 0.29, heightCanvas * 0.3)
        textSize(32);
        // textWrap(CHAR);
       //  textAlign(LEFT);
        // fill()
        teclado.drawText(widthCanvas * 0.06, heightCanvas * 0.5, widthCanvas * 0.5, heightCanvas * 0.5);
        pop();
        
        // TELEFONO
        push();
        tint(255, phoneOpacity);
        translate(width * 0.33, height * 0.61);
        rotate(anglePhone);
        // image(shadowPhone,0,0, phone.width * 0.85, phone.height * 0.85);
        image(phone ,0 ,0, phone.width * 0.85, phone.height * 0.85)
        pop();phoneOpacityStep

         

    } else {
        background('#f9f9ec');
        push();
        textAlign(CENTER);
        fill('blue');
        textSize(40);
        text("***Guardando Respuesta***", widthCanvas * 0.5, heightCanvas * 0.5);
        pop();
    }

    if(keyIsPressed) {
        angle += angleAumento
        anglePhone += anglePhoneAumento    
    }  
    if(angle >= (limitAngle/2) || angle <= ( -limitAngle)) {
        angleAumento= angleAumento * (-1);
    // if(anglePhone >= (PI / 64) || anglePhone <= ( - PI / 64)) {
    //     anglePhoneAumento = anglePhoneAumento * (-1);   
    // }
    }
}

function keyPressed() {
    teclado.selectKey(keyCode,key, 3);
    if(phoneOpacity > phoneOpacityLimit) {
        phoneOpacity+=phoneOpacityStep;
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

