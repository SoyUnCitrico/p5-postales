let cnv;
const widthCanvas = 1024;
const heightCanvas = 768;
const timeChange = 7500;
let amazonas, america;
let inputText = "Entre los repertorios de lucha, el principal desafío es abrazar la indisociabilidad de la defensa de los cuerpos-territorios y la disputa por las infraestructuras tecnológicas y de producción de conocimiento.\t****************************************************************************** "

var fontSizeMax = 80;
var fontSizeNoise = Math.random() * 1000000;
var noiseStep = 10000;
let fontS  = 40;
var spacing = fontS; // line height
var kerning = 3; // between letters
var fontSizeStatic = false;
var static = false;
let imageOpacity = 0;
let n, fontComputer, fontPixel;
let imageOpacityLimit = 80;
let imageOpacityStep = 1;
let startedAnimation = false;
let pixels = [];
let timeFlag;
let teclado;
let bell, typed1, returnSound;

function preload() {
    amazonas = loadImage("https://soyuncitrico.github.io/p5-postales/assets/mapas/amazonas.jpg");
    // fontComputer = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/retro.ttf")
    // fontPixel = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/pixel-7.ttf")
    // fontPixel = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/mom_type.ttf")
    fontPixel = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/1942.ttf")
    // fontPixel = loadFont("https://soyuncitrico.github.io/p5-postales/assets/fonts/remington_Type.ttf")
    typed1 = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/typing.mp3');
    bell = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/bell.mp3');
    returnSound = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/return.mp3');
}

function setup() {
    cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer");
    imageMode(CENTER);
    teclado = new Teclado();
    teclado.setSound(typed1, bell);
    textFont(fontPixel);
    textAlign(LEFT, CENTER);
    
    let savedData = getItem('pixels');
    if (savedData === null) {        
        pixels = setPixels(amazonas);
      } else {          
        for (let pixel of savedData) {            
            pixels.push(new PixelAtom(
                position=createVector(pixel.originalPosition.x, pixel.originalPosition.y),
                w=pixel.w,
                h=pixel.h,
                skin=color(`rgba(${pixel.skin.levels[0]},${pixel.skin.levels[1]},${pixel.skin.levels[2]},${pixel.skin.levels[3]})`),
                velocity=createVector(pixel.velocity.x,pixel.velocity.y),
                accel=createVector(pixel.accel.x,pixel.accel.y),
                maxForce=pixel.maxForce,
                maxSpeed=pixel.maxSpeed,
                wanderTetha=pixel.wanderTetha,
                id=pixel.id,
                life=pixel.life,
                damage=pixel.damage,
                isSquare=pixel.isSquare,
                isLive=pixel.isLive,
                originalPosition=pixel.originalPosition,
                letter=pixel.letter
            ));
        }
      }        
    // console.log(pixels) 
    background(0);
    // image(amazonas,widthCanvas/2,heightCanvas/2);
    
    // setInterval(() => {
    //     console.log("Changing")
    //     static = !static;
    //     if(static == true) {
    //         imageOpacity = 0;
    //         for(let i = 0; i < pixels.length -1; i++) {
    //             pixels[i].setMaxSpeed(8)
    //         }
               
    //     }
    //     if(static == false) {
    //         imageOpacity = imageOpacityLimit;
    //         for(let i = 0; i < pixels.length -1; i++) {
    //             pixels[i].setMaxSpeed(2)
    //             pixels[i].setVelocity (createVector(
    //                 random(-1,1),
    //                 random(-1,1))
    //             )
    //             pixels[i].setAccel(createVector(0,0))        
    //         }
    //     }
    //     startedAnimation = false;
    // }, timeChange);
    timeFlag = millis();
}

function draw() {    
    // if(!startedAnimation)   {background(0);}
    background(0);
    push();
    tint(155, imageOpacity);
    image(amazonas,widthCanvas/2,heightCanvas/2, widthCanvas, heightCanvas);
    pop()
    if(millis() - timeFlag > timeChange) {
        setMovement();
    }    
    for(let p = 0; p < pixels.length - 1; p++ ) {
        if(!static) {
            pixels[p].pasearLetter('OTHERSIDE');
        } else {
            pixels[p].arrivarOriginLetter();
        }
    }

    if(startedAnimation && (imageOpacity < imageOpacityLimit && static))  {
        imageOpacity += imageOpacityStep;
    } else if(!startedAnimation && (imageOpacity > 0 && !static))  {
        imageOpacity -= (imageOpacityStep * 2);        
    }
}

function setPixels(image) {
    let x = 0;
    let y = fontS;
    let counter = 0;
    let pixelsImage = []
    let stored = []
    while (y < heightCanvas) {
        // translate position (display) to position (image)
        image.loadPixels();
        // get current color
        let imgX = round(map(x, 0, widthCanvas, 0, image.width));
        let imgY = round(map(y, 0, heightCanvas, 0, image.height));
        let c = color(image.get(imgX, imgY));
        let greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

        let letter = inputText.charAt(counter);        
        let letterWidth = textWidth(letter) + kerning;
        n = (noise(fontSizeNoise) * (fontS * 0.75));
        
        let newPixel = new PixelAtom(
            position = createVector(x, y - (fontS * 0.35)),    
            w = fontS + n,
            h = fontS + n,
            skin = c,
            velocity = createVector(
                random(-1,1) * 2.5,
                random(-1,1) * 2.5),
            accel = createVector(0,0),
            maxForce = 0.5,
            maxSpeed = 2,
            wanderTetha = 0,
            id = null,    
            life = 100,
            damage = 0.1,    
            isSquare = false,
            isLive = false,
            originalPosition = createVector(x, y - (fontS * 0.35)),
            letter = letter              
        );
        stored.push({
            position : createVector(x, y - (fontS * 0.35)),    
            w : fontS + n,
            h : fontS + n,
            skin : c,
            velocity : createVector(
                random(-1,1) * 2.5,
                random(-1,1) * 2.5),
            accel : createVector(0,0),                    
            maxForce : 0.5,
            maxSpeed : 2,
            wanderTetha : 0,
            id : null,    
            life : 100,
            damage : 0.1,    
            isSquare : false,
            isLive : false,
            originalPosition : createVector(x, y - (fontS * 0.35)),
            letter: letter
        })
        x += (letterWidth + n);
        // x += (fontS + n);
        fontSizeNoise += noiseStep;
        // console.log(fontSizeNoise);
        newPixel.setGreyscale(greyscale);
        // newPixel.setLetter(letter);
        pixelsImage.push(newPixel);        
        // linebreaks
        if (x + letterWidth >= width) {
            x = 0;
            y += spacing;
        }
        counter++;
        if (counter >= inputText.length) {        
            counter = 0;
        }
    }
    storeItem('pixels', stored);
    return pixelsImage;
}

function setMovement() {
    static = false
    startedAnimation = false; 
    // imageOpacity = imageOpacityLimit;
    for(let i = 0; i < pixels.length -1; i++) {
        pixels[i].setMaxSpeed(3)
        // pixels[i].setVelocity (createVector(
        //     random(-1,1),
        //     random(-1,1))
        // )
        // pixels[i].setAccel(createVector(0,0))        
    }    
}

function keyPressed() {
    teclado.selectKey(keyCode, key, 7);
    timeFlag = millis();    
    // imageOpacity = 0;
    if(static === false) {
        startedAnimation = true;
        for(let i = 0; i < pixels.length -1; i++) {
            pixels[i].setMaxSpeed(9)
        }    
    }
    static = true;    
                             
}