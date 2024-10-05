const widthCanvas = 1024;
const heightCanvas = 768;
let pixy;

let noiseStep = 5;
let noiseValue = 0;

function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer")
    pixy = new PixelAtom(
        createVector(widthCanvas/2, heightCanvas/2),
        10,10, '#952fd0', 
        createVector(0,0),
        createVector(0,0),
        0.5,4,0,
        null,100,0.1,true,false
    )
    pixy.setVelocity(createVector(random(-1,1), random(-1,1)))
}

function draw() {
    background(10)
    let aumento = noise(noiseValue) * 100;
    let mouseVector = createVector(mouseX, mouseY);
    // pixy.seguirTarget(mouseVector, 'OTHERSIDE');   
    // pixy.arrivarTarget(mouseVector,20, 'OTHERSIDE'); 
    pixy.pasear('OTHERSIDE'); 
    // pixy.drawWander(pixy.position,);
    // pixy.temblar(aumento, 100/2,  "REVERSE_XY");
    noiseValue += noiseStep;
}