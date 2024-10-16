let cnv;
const widthCanvas = 1024;
const heightCanvas = 768;
const timeChange = 20000;
let amazonas, america;
let inputText = "Entre los repertorios de lucha, el principal desafío es abrazar la indisociabilidad de la defensa de los cuerpos-territorios y la disputa por las infraestructuras tecnológicas y de producción de conocimiento.----------------------------------------El extractivismo es el proceso que busca maximizar el beneficio de un pequeño grupo de actores privados o públicos, individuales o colectivos, nacionales o transnacionales, a través de la captura violenta y el control privado y concentrado de los bienes comunes indispensables para la vida.----------------------------------------"

var fontSizeMax = 80;
var fontSizeNoise = Math.random() * 1000000;
var noiseStep = 10000;
let fontS  = 25;
var spacing = 25; // line height
var kerning = 3; // between letters
var fontSizeStatic = false;
var static = false;
let imageOpacity = 0;
let n, fontComputer, fontPixel;
let imageOpacityLimit = 100;
let imageOpacityStep = 0.85;
let startedAnimation = false;
let pixels = [];

function preload() {
    amazonas = loadImage("../assets/mapas/amazonas.jpg");
    // fontComputer = loadFont("../assets/fonts/retro.ttf")
    // fontPixel = loadFont("../assets/fonts/pixel-7.ttf")
    // fontPixel = loadFont("../assets/fonts/mom_type.ttf")
    fontPixel = loadFont("../assets/fonts/1942.ttf")
    // fontPixel = loadFont("../assets/fonts/remington_Type.ttf")
}

function setup() {
    cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer");
    imageMode(CENTER);

    // textFont('Times');
    textFont('Courier New');
    // textFont(fontComputer);
    textFont(fontPixel);
    // textStyle(BOLD);
    // textSize(fontS);
    textAlign(LEFT, CENTER);
    pixels = setPixels(amazonas);
    // console.log(pixels)
    background(0);
    // image(amazonas,widthCanvas/2,heightCanvas/2);
    
    setInterval(() => {
        static = !static;
        if(static == true) {
            imageOpacity = 0;
            for(let i = 0; i < pixels.length -1; i++) {
                pixels[i].setMaxSpeed(8)
            }
               
        }
        if(static == false) {
            imageOpacity = imageOpacityLimit;
            for(let i = 0; i < pixels.length -1; i++) {
                pixels[i].setMaxSpeed(2)
                pixels[i].setVelocity (createVector(
                    random(-1,1),
                    random(-1,1))
                )
                pixels[i].setAccel(createVector(0,0))        
            }
        }
        startedAnimation = false;
    }, timeChange);
}

function draw() {
    if(!startedAnimation)   {background(0);}
    if(static)  {        
        push();
        tint(55, 32, 36, imageOpacity);
        image(amazonas,widthCanvas/2,heightCanvas/2,widthCanvas,heightCanvas);
        pop()
    }
    
    // background(0);
    for(let p = 0; p < pixels.length - 1; p++ ) {
        if(!static) {
            pixels[p].pasearLetter('REVERSE_XY');
        } else {
            pixels[p].arrivarOriginLetter();
        }
    }

    if(!startedAnimation && imageOpacity < imageOpacityLimit && static)  {
        imageOpacity += imageOpacityStep;
    } else if(!startedAnimation && imageOpacity > 0 && !static)  {
        imageOpacity -= imageOpacityStep;        
    }
    // console.log(imageOpacity)
}


function setPixels(image) {
    let x = 0;
    let y = fontS;
    let counter = 0;
    let pixelsImage = []
    while (y < heightCanvas) {
        // translate position (display) to position (image)
        image.loadPixels();
        // get current color
        let imgX = round(map(x, 0, width, 0, image.width));
        let imgY = round(map(y, 0, height, 0, image.height));
        let c = color(image.get(imgX, imgY));
        let greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);

        let letter = inputText.charAt(counter);        
        let letterWidth = textWidth(letter) + kerning;
        n = (noise(fontSizeNoise) * (fontS * 0.75));
        console.log(n + fontS);
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
        );
        x += (letterWidth + n);
        // x += (fontS + n);
        fontSizeNoise += noiseStep;
        // console.log(fontSizeNoise);
        newPixel.setGreyscale(greyscale);
        newPixel.setLetter(letter);
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
    return pixelsImage;
}