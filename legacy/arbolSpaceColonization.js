let canvas;
let tree;
let regla;

// tamaño maximo de las ramas
let maxBranch = 50;
// tamaño minimo de las ramas
let minBranch = 5;
// tamaño de los atractores
let atractorSize = 5;

// w: ancho     h: alto 
let w = 1080;
let h = 1080;



function setup () {
    canvas = createCanvas(w,h)
    canvas.parent("canvasContainer");

    tree = new Tree(5000, maxBranch, minBranch, atractorSize);
    regla = new Regletas();
    // regla = new Regletas(color(255,155,0,255));
    // frameRate(5);
}

function draw() {
    background(0,255);
    // regla.cross();
    // regla.crossDiagonal();
    // regla.thirds();
    tree.show();
    tree.grow();

    // line(200, height - 200, 210, height - 200);
    // line(180, height - 200, 180, height - 190);
    // line(150, height - 200, 160, height - 190);
    // line(140, height - 200, 130, height - 190);

    if(tree.checkLeavesLength() < 25) {
        let p = createP("FINAL")
        p.elt.style.position = "absolute";

        p.elt.style.color = "red";
        p.elt.style.fontFamily = "Arial";
        p.elt.style.fontSize = "8rem";
        p.elt.style.fontWeight = "700";
        // p.elt.style.fontWeight = "700";
        

        p.elt.style.top = `${(h / 2) - (p.elt.offsetHeight / 2)}px`;
        p.elt.style.left = `${(w / 2) - (p.elt.offsetWidth / 2)}px`;
        
        // tree.debug();
        noLoop();
    }
} 