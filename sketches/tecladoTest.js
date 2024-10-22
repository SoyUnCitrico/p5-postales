const widthCanvas = 1024;
const heightCanvas = 768;
let cnv;
let teclado;
let animation;
const instrucciones = `Escribe el texto y presiona 'Enter' para guardarlo`;
const widthTecladoText = widthCanvas * 0.6;
const heightTecladoText = heightCanvas * 0.5;
const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
let sendingData = false;

function preload() {
    animation = loadImage('../assets/oraculo/valores.gif')
}   

function setup() {
    vnc = createCanvas(widthCanvas, heightCanvas).parent('canvasContainer');
    
    teclado = new Teclado(instrucciones);
    textFont('Courier New');  
    // textFont('Times');
    textStyle(BOLD);green
    textAlign(CENTER, CENTER);
    textSize(28);
    rectMode(CENTER);
    imageMode(CENTER);

    teclado.setSendData();
    teclado.setColor('#03091dff');

    // teclado.setBorder();
    // teclado.setBorderSize(2);
    // teclado.setBorderColor('#3077f2ff');
}

function draw() {
    background('#363fa1');
    if(teclado.getText() === '\n') teclado.setText(instrucciones);
    if(teclado.loadingResponse) {
        image(animation,widthCanvas/2, heightCanvas/2, animation.width * 0.4, animation.height * 0.4);
    } else { 
        let textTeclado = teclado.getText();
        if(textTeclado != '') {
            teclado.drawText(widthCanvas / 2, heightCanvas / 2, widthTecladoText, heightTecladoText, textTeclado);
        }
    }
}

async function keyPressed() {
    teclado.selectKey(keyCode, key);
}