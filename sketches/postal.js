const anchoMargen = 35;
const colorSobre = '#071e5c';
const colorFondo = '#ecd9c9';
const FRAME_RATE = 30
let tecleado;
let tecladoBounceTime = 0;
let teclado;
// const globalUri = 'https://script.google.com/macros/s/AKfycbwd7zmOST4O4o6pWhqWQQjIqwWfS_B_qzvL2THuiB-tlgFwNz9_cbEgFqHBQ0CJv9bJ/exec';
const globalUri = 'https://script.google.com/macros/s/AKfycbylesmMMCM6DdBC0Lm5fI-fyIKhxOcBFihNwSMfOiQ5k5Gv3zYM9-2ZUPxezpT2vcq1Hg/exec';
const widthCanvas = 1024;
const heightCanvas = 768;
// const widthCanvas = 1920;
// const heightCanvas = 1080;
let segundosCambio = 60;
let preguntas = [
    "¿Cómo imaginas el futuro que te gustaría habitar?",
    "En el juego de los grandes intereses del capital, la Amazonía es un territorio que hay que despojar, y sus pueblos, cuerpos que hay que exterminar."
]

let respuestas = [
    "Podemos pensarnos desde un pasado y un futuro que se articulen de manera no lineal.",
    "Indisociabilidad del cuerpo-territorio, ríos, bosques, inmensidad, vasos comunicantes, saberes, cuerpos, colores, lenguas, textiles, arte, música, sacralidad, sensibilidad, rituales, violencias históricas y a escala, crisis civilizatoria, proyecto necropolítico, eficiencia, despojo."
]
let instrucciones = 'Escribe con el teclado';
preguntas.length
let askIndex = askNumber;
let counterIndex = 0;
let textArray = respuestas[askIndex];
let estampilla, pez, animation;
let imagenes = []

function preload() {
    animation = loadImage('./../assets/oraculo/valores.gif')
    estampilla = loadImage('./../assets/imaginar/patas.png')
    imagenes.push(estampilla);
    pez = loadImage('./../assets/tecnoextractivismo/phone.png')
    martillo = loadImage('./../assets/tecnoextractivismo/martillo.png')
    let prob = random();
    imagenes.push(prob > 0.5 ? martillo : pez);
}

function setup() {
    createCanvas(widthCanvas, heightCanvas);  
    // createCanvas(1920, 1080);
    frameRate(FRAME_RATE);
    
    // Reloj del cambio global
    // setInterval(() =>{    
    //     askIndex ++;
    //     if(askIndex > preguntas.length - 1) askIndex = 0;
    //     textArray = respuestas[askIndex]
    // }, (segundosCambio + 1) * 1000)x
    teclado = new Teclado(respuestas[askIndex], respuestas[askIndex]);
    teclado.setColor(colorSobre);
    teclado.setSendData();
    setInterval(() =>{    
        counterIndex ++;
        if(counterIndex == segundosCambio + 1) counterIndex = 0;
    }, 1000)
}

function draw() {    
  background(colorFondo);
  if(teclado.loadingResponse) {
    push();
    imageMode(CENTER);
    image(animation,widthCanvas/2, heightCanvas/2, animation.width * 0.4, animation.height * 0.4);
    pop();
  } else {
        drawSeilWaves(12,1,colorSobre);
        drawSeil(width * 0.2, height * 0.20, 120, colorSobre, colorFondo);
    
        drawMargin(anchoMargen, colorSobre, 'black')
        drawWaves(5, 1, colorSobre);
        drawLines(10, 1, colorSobre);
        drawText(preguntas[askIndex], respuestas[askIndex], colorSobre);
    
        push();
        translate(width - imagenes[askIndex].width * 0.41, height * 0.15)
        image(imagenes[askIndex],0,0, imagenes[askIndex].width * 0.27, imagenes[askIndex].height * 0.27); 
        pop();
    }
  

//   if(keyIsPressed) {
//     if(keyCode == 8 && tecleado && textArray !== respuestas[askIndex]) 
//       textArray = textArray.slice(0, -1);
//       if (textArray.length == 0) {
//         tecleado = false;
//         textArray = respuestas[askIndex]
//       } 
//   }
}

const drawSeil = (x,y, diametroBase = 120, colorCircle = 'black', colorFill = 'white') => {    
    let xC = x;
    let yC = y;
    let diamBase = diametroBase;
    let diamVar = 8;
    fill(colorFill);
    stroke(colorCircle);
    strokeWeight(1);
    ellipse(xC,yC, diamBase + diamVar - 2, diamBase + diamVar - 2);
    strokeWeight(2);
    ellipse(xC,yC, diamBase, diamBase);
    strokeWeight(1);
    ellipse(xC,yC, diamBase - diamVar, diamBase - diamVar);
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

const drawLines = (numberLines = 5, weightStk = 2, colorLine = 'black') => {
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
    rectMode(CENTER)
    noFill();
    strokeWeight(3);
    rect(widthCanvas * 0.85, heightCanvas * 0.25, heightCanvas * 0.14, widthCanvas * 0.14);
    strokeWeight(weightStk);
    rect(widthCanvas * 0.85, heightCanvas * 0.25, heightCanvas * 0.155, widthCanvas * 0.152);
    pop();
}

const drawText = (pregunta = "", respuesta = "", colorText = 'black') => {
    push();
    stroke(colorText);
    fill(colorText);
    textWrap(WORD);
    textFont('Courier New');
    textSize(24);
    textLeading(36);
    textStyle(BOLD);
    textAlign(CENTER);
    let estaPregunta = addLetterSpacing(pregunta, 0); 
    //   let estaPregunta = preguntas[0]; 
    text(estaPregunta, widthCanvas * 0.08, heightCanvas * 0.4 + 16, widthCanvas * 0.35, heightCanvas * 0.8);

    // textWrap(CHAR);
    textFont('Courier New');
    textSize(17);
    textLeading(31);
    textStyle(NORMAL);
    textAlign(LEFT);
    
    // text(textArray, widthCanvas * 0.55, heightCanvas * 0.4 + 16, widthCanvas * 0.35, heightCanvas * 0.4);
    teclado.drawText(widthCanvas * 0.55, heightCanvas * 0.4 + 16, widthCanvas * 0.35, heightCanvas * 0.4);
    let contador = segundosCambio - counterIndex;
    textAlign(CENTER);
    textFont('Courier New');
    textSize(40);
    textLeading(1);
    text(contador, width * 0.152, height * 0.175, 100, 100)
    //   noFill();
    //   rect(widthCanvas * 0.55, heightCanvas * 0.4 + 16, widthCanvas * 0.35, heightCanvas * 0.4);
    pop();
}

function keyPressed() {  
    teclado.selectKey(keyCode, key, askNumber + 1);
//   switch(keyCode) {    
//       case 8: //backspace
//       case 46: //delete
//           if(tecleado == false) textArray = '';
//           textArray = textArray.slice(0, -1);
//           break;
//       case 9: //tab
//         textArray += "\t";
//         break;
//       case 13: //enter
//           textArray += "\n";
//           break;
//       case 0: //dead
//       case 16: //shift
//       case 17: //control
//       case 18: //ALT
//       case 20: //capslock
//       case 27: //esc
//       case 33: //pageup
//       case 34: //pagedown
//       case 35: //end
//       case 36: //home
//       case 37: //arrows
//       case 38: //
//       case 39: //
//       case 40: //
//       case 112: // F1
//       case 113:
//       case 114:
//       case 115:
//       case 116:
//       case 117:
//       case 118:
//       case 119:
//       case 120:
//       case 121:
//       case 122:
//       case 123:
//       case 219: //dead
//       case 225: //alt graph
//           break;
//       default:
//           // console.log(key)
//           if(!tecleado) {
//             tecleado = true;
//             textArray = '';
//           }
//           textArray += (key);
//         //   console.log(textArray)
//   }  
}

// adds spacing between letters in a string by
// inserting blank characters between each letter
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