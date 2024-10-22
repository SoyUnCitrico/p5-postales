

let canvasElement = document.getElementById("canvasContainer");
// canvasElement.style.margin = '10px';
// canvasElement.style.border = '5px solid red';
canvasElement.style.width = '1920px';
canvasElement.style.height = '1080px';

canvasElement.style.position = 'absolute';
canvasElement.style.overflow = 'hidden';
canvasElement.style.zIndex = 20;
canvasElement.style.boxShadow = '0px 0px 8px 0px rgba(0, 0, 0, 0.34)'

let initAngle = 0;
let actualAngle = 0;
const stepAngle = 0.5;
const direccion = -1;
const limitAngle = 360

const gridSize = 100;
const circleSize = 100;
let cols, rows;
let canvas;
let curves;

function make2DArray(rows, cols) {
    let arr = new Array(rows);
    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(cols);
    }

    return arr;
}

function setup () {
    canvas = createCanvas(1920,1080);
    canvas.parent("canvasContainer");
    canvas.style('position', 'absolute');
    canvas.style('z-index', '2');
    background(0, 150);
    angleMode(DEGREES)
    smooth();
    cols = floor(width / gridSize) - 1;
    rows = floor(height / gridSize) - 1;
    curves = make2DArray(rows,cols);

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          curves[j][i] = new Curve();
        }
      }
    //   console.log(curves[i])
}

function draw () {
    background(0, 150);

    for(let ix = 0; ix < cols - 1; ix ++) {
    // for(let ix = 0; ix < 1; ix ++) {        
        let xC = ((gridSize - circleSize)) + gridSize + (ix * gridSize) + (gridSize / 2) ;
        let yC = gridSize / 2;

        let setVector = doCircle(xC, yC, circleSize / 2, ix);


        for (let j = 0; j < rows; j++) {
            curves[j][ix].setX(setVector.x);
        }
    }

    for(let iy = 0; iy < rows; iy ++) {
    // for(let iy = 0; iy < 1; iy ++) {        
        let yC = ((gridSize - circleSize)) + gridSize + (iy * gridSize) + (gridSize / 2) ;
        let xC = gridSize / 2;

        let setVector = doCircle(xC, yC, circleSize / 2, iy, true);


        for (let i = 0; i < cols; i++) {
            curves[iy][i].setY(setVector.y);
        }
        
    }

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          curves[j][i].addPoint();
          curves[j][i].show();
        }
    }

    actualAngle += (stepAngle * direccion)
    if (actualAngle < - limitAngle) {
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < cols; i++) {
            curves[j][i].reset();
            }
        }
        // saveFrame("lissajous#####.png");
        actualAngle = 0;
    }
    
}

function doCircle(
    centerX = width/2, 
    centerY = height/2, 
    radius = 20, 
    index = 0,
    isVertical = false,
    colorExt = color(20,50,180), 
    colorDir = color(0,175,0), 
    colorLine = color(125,25,0)
) {
        const x = (sin(actualAngle * (index + 1)) * radius) + centerX
        const y = (cos(actualAngle * (index + 1)) * radius) + centerY        
        push();
        noFill();

        strokeWeight(1);
        stroke(200,50);
        if(isVertical) {
            line(0, y, width, y);
        } else {
            line(x, 0, x , height);
        }

        stroke(colorLine);
        line(centerX,centerY,x,y);

        stroke(colorExt);
        circle(centerX, centerY, radius * 2)
        
        stroke(colorDir);        
        strokeWeight(3);        
        point(x,y);


        pop();    
        return(createVector(x,y));
}

