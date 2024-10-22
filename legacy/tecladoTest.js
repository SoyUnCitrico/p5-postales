const widthCanvas = 1024;
const heightCanvas = 768;
let cnv;
let teclado;
let fuente1;
let typed1,typed2,bell;
let animation;
const instrucciones = `Escribe el texto y presiona 'Enter' para guardarlo.`;
const widthTecladoText = widthCanvas * 0.6;
const heightTecladoText = heightCanvas * 0.5;
// const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';
let sendingData = false;

function preload() {
    soundFormats('mp3', 'ogg');
    animation = loadImage('../assets/oraculo/valores.gif');
    fuente1 = loadFont('../assets/fonts/remington_type.ttf');
    typed1 = loadSound('../assets/sounds/typing');
    bell = loadSound('../assets/sounds/bell');
}   

function setup() {
    vnc = createCanvas(widthCanvas, heightCanvas).parent('canvasContainer');
    
    teclado = new Teclado(instrucciones, instrucciones); 
    textFont('Courier New');  
    // textFont('Times');
    textStyle(BOLD);green
    textAlign(CENTER, CENTER);
    textFont(fuente1)
    textSize(28);
    rectMode(CENTER);
    imageMode(CENTER);

    teclado.setSound(typed1, bell)
    teclado.setSendData();
    teclado.setColor('#e85d04');
    // teclado.setColorInstruction('#e85d042a');
    teclado.setColorInstruction('#370617');    
    // teclado.setDebug();S
    // teclado.setBorder();
    // teclado.setBorderSize(2);
    // teclado.setBorderColor('#3077f2ff');
}

function draw() {
    background('#03071e');
    let textTeclado = teclado.getText();
    // if(textTeclado === '\n') teclado.setText(teclado.instruction);
    if(teclado.loadingResponse) {
        image(animation, widthCanvas/2, heightCanvas/2, animation.width * 0.55, animation.width * 0.65);
    } else {         
        // if(textTeclado != '') {
            teclado.drawText(widthCanvas / 2, heightCanvas / 2, widthTecladoText, heightTecladoText, textTeclado);
        // }
    }
}

async function keyPressed() {    
    teclado.selectKey(keyCode, key, 'test');
}