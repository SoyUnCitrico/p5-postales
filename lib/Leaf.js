class Leaf {
    constructor(
        x = random(width), 
        y = random(height),
        size = 25
    ) {
        this.pos = createVector(x, y);
        this.size = size;
        this.reached = false;
    }
     show() {
        fill(0,255,0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size)
     }
    
}