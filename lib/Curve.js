class Curve {

    constructor() {
      this.path = [];
      this.current = createVector();
      this.colorPath = color(125,125,0.2);
      this.colorDirection = color(200,0,120,100);
    }
  
     setX( x) {
      this.current.x = x;
    }
  
     setY( y) {
      this.current.y = y;
    }
  
     addPoint() {
      this.path.push(this.current);
    }
    
     reset() {
      this.path = []; 
    }
  
     show() {
        push();
        stroke(this.colorPath);
        strokeWeight(1);
        noFill();

        beginShape();
        for (let v of this.path) {
            vertex(v.x, v.y);
        }
        endShape();
    
        strokeWeight(6);
        stroke(this.colorDirection);
        point(this.current.x, this.current.y);
        this.current = createVector();
        pop();
    }
  }
  