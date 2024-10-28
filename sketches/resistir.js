const widthCanvas = 1024;
const heightCanvas = 768;

const Y_AXIS = 1;
const X_AXIS = 2;
const DEBUG = false;
// const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';
let angle = 0;
let angleAumento = 0.005;

let factorImage = 0.315;
let teclado;
let colorFondo = '#ecd9c9';
let colorText= '#503695';
let colorResp= '#db2cb8';
let colorRespPlace= '#9536858e';
let tecleado;
let tecladoBounceTime = 0;

let colorMargin= '#4a3487';
let colorBack = colorFondo;
let fuente1, fuente2, bell, typed1, returnSound;
let info = 'El oráculo de tecnologías\ntransfeministas\n(2020)';
let info2 = '¿Cómo resistir a sistemas que monitorean, vigilan, prescriben y dictaminan nuestro paso por la vida digital y por el mundo?'
let instrucciones = 'Escribe con el teclado y presiona ENTER para guardar tu mensaje';

function preload() {    
  resImg = loadImage('https://soyuncitrico.github.io/p5-postales/assets/oraculo/valores.gif');
  typed1 = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/typing.mp3');
  bell = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/bell.mp3');
  returnSound = loadSound('https://soyuncitrico.github.io/p5-postales/assets/sounds/return.mp3');
}

function setup() {
    let cnv = createCanvas(widthCanvas, heightCanvas);
    cnv.parent("canvasContainer") 
    teclado = new Teclado(instrucciones, instrucciones)
    teclado.setSound(typed1,bell, returnSound);
    teclado.setSendData(globalUri);
    teclado.setColor(colorResp);
    textFont('Courier New');
    textSize(17);
    textLeading(31);
    textStyle(NORMAL);
    textAlign(LEFT);

    angleMode(RADIANS);
    imageMode(CENTER);
    rectMode(CENTER);
    tecleado = false;
    // setInterval(() => {
    // }, 60000)
    
}

function draw() {
    background(colorBack);   
    if(teclado.loadingResponse) {
      push();    
      imageMode(CENTER);
      image(resImg,widthCanvas/2, heightCanvas/2, resImg.width * 0.4, resImg.height * 0.4);
      fill(colorResp);
      textSize(60);      
      textStyle(BOLD);
      textAlign(CENTER);  
      text("*** ENVIANDO DATOS ***",widthCanvas/2, heightCanvas/2);
      pop();
    } else {
      image(resImg,width * 0.27, height/2, resImg.width * (factorImage + 0.0675), resImg.height * (factorImage));   
      // resistir.position(300,0);
      push();
      stroke(colorText);
      fill(colorText);
      textSize(26);
      textAlign(CENTER);  
      text(info, width * 0.73, height * 0.13);      
      textSize(18);
      textLeading(22);    
      text(info2, width * 0.73, height * 0.36, width * 0.42, height * 0.2);
      pop();
  
      drawMargin(35, colorMargin, 'black');
      drawLines(10, 1, colorMargin, false);
      push();
      if(tecleado) {        
        stroke(colorResp);
        teclado.setColor(colorResp)
        
      } else {        
        stroke(colorRespPlace);
        teclado.setColor(colorRespPlace)
      }      
      teclado.drawText(width * 0.72, height * 0.66, width * 0.34, 370);
      pop();
  

    }


}

function keyPressed() {  
  if(!tecleado) {
    tecleado = true;
  }
  teclado.selectKey(keyCode, key, 6);
}



const drawMargin = (ancho, color1 = "#000", color2 = "#fff") => {
    push();
    strokeWeight(ancho);
    strokeCap(SQUARE)
    stroke(color1)
    let mitadStk = ancho / 2;
    line(0,mitadStk, width, mitadStk);
    line(0,height - mitadStk, width, height - mitadStk);
    line(mitadStk, 0, mitadStk, height);
    line(width - mitadStk, 0, width - mitadStk, height);
    
    fill(color2);
    noStroke();
    //   ellipse(ancho, 0, ancho, ancho);
    //   ellipse(ancho * 3, 0, ancho, ancho);
    let limiteAncho = width / (ancho * 2);
    for(let i = 0; i < limiteAncho; i++ ) {   
        ellipse(ancho * (2 * i + 1) - ancho, 0, ancho, ancho);
        ellipse(ancho * (2 * i + 1) - ancho, height, ancho, ancho);
    }
    let limiteAlto = height / (ancho * 2);
    for(let i = 0; i < limiteAlto; i++ ) {   
        ellipse(0, (ancho * (2 * i + 1)) + (ancho), ancho, ancho);
        ellipse(width, (ancho * (2 * i + 1)) + (ancho), ancho, ancho);
    }
    pop();

}

const drawWaves = (numberLines = 5, weightStk = 2, colorLine = 'black') => {
    for(let i = 0; i < numberLines; i++) {
        // Set the coordinates for the curve's anchor and control points.
        let startX = 0.55;
        let finalX = 0.76;
        let midX = ((finalX - startX) / 2) + startX; 

        let initY = 0.15 + (0.03 * (i + 1));
        let varY = 0.1
        
        let x1 = width * startX;
        let x2 = width * midX;
        let x3 = width * midX;
        let x4 = width * finalX;

        let y1 = height * initY;
        let y2 = height * (initY - varY);
        let y3 = height * (initY + varY);    
        let y4 = height * initY;

        push();
        strokeWeight(weightStk);
        stroke(colorLine);
        noFill();
        bezier(x1, y1, x2, y2, x3, y3, x4, y4);
        pop();
    }
    
}

const drawSeilWaves = (numberLines = 5, weightStk = 2, colorLine = 'black') => {
    for(let i = 0; i < numberLines; i++) {
        // Set the coordinates for the curve's anchor and control points.
        let startX = 0.06;
        let finalX = 0.34;
        let midX = ((finalX - startX) / 2) + startX; 

        let varYW = 0.01;
        let initY = 0.13 + (varYW * (i + 1));
        let varY = 0.097;
        
        let x1 = width * startX;
        let x2 = width * midX;
        let x3 = width * midX;
        let x4 = width * finalX;

        let y1 = height * initY;
        let y2 = height * (initY - varY);
        let y3 = height * (initY + varY);    
        let y4 = height * initY;

        push();
        strokeWeight(weightStk);
        stroke(colorLine);
        noFill();
        // rotate(PI / 8)
        // translate(60, -100)
        bezier(x1, y1, x2, y2, x3, y3, x4, y4);
        pop();
    }
    
}

const drawLines = (numberLines = 5, weightStk = 2, colorLine = 'black', withStamp = true)  => {
    push();
    strokeWeight(weightStk);
    stroke(colorLine)
    //   lineas horizontales
    let sepLine = 0.041;
    let initLineX = 0.55;
    let initLineY = 0.438;
    let endLineX = 0.9;
    for(let i = 0; i < numberLines; i++) {
        line(widthCanvas * initLineX, heightCanvas * (initLineY + (i* sepLine)), widthCanvas * endLineX, heightCanvas * (initLineY + (i* sepLine)));    
    }
    //   linea vertical
    line(widthCanvas /2, heightCanvas / 6, widthCanvas /2, heightCanvas - heightCanvas /6)
    // Cuadro estampilla
    if(withStamp) {
      rectMode(CENTER)
      noFill();
      strokeWeight(3);
      rect(widthCanvas * 0.85, heightCanvas * 0.25, heightCanvas * 0.14, widthCanvas * 0.14);
      strokeWeight(weightStk);
      rect(widthCanvas * 0.85, heightCanvas * 0.25, heightCanvas * 0.155, widthCanvas * 0.152);
    }
    pop();
}

const drawText = (texto = "", pos = createVector(0,0), wT = 300, hT = 200, colorText = 'black') => {
  push();
  // textWrap(CHAR);
  stroke(colorText);
  fill(colorText);
  textFont('Courier New');
  textSize(17);
  textLeading(31);
  textStyle(NORMAL);
  textAlign(LEFT);
  
  text(texto, pos.x, pos.y, wT, hT);
  
  pop();
}