class Regletas {
    constructor(
        colorRegla = null
    ) {
        this.width = width;
        this.height = height;
        this.stroke = 2;
        this.color = colorRegla === null ? color(200,0,0, 180) : colorRegla;
    }

    halfVertical() {
        push();
        strokeWeight(this.stroke);
        stroke(this.color);
        line(this.width / 2, 0, this.width / 2, this.height);
        pop();
    }

    halfHorizontal() {
        push();
        strokeWeight(this.stroke);
        stroke(this.color);
        line(0, this.height / 2, this.width, this.height / 2);
        pop();    
    }

    diagonal(isUpDown) {
        push();
        strokeWeight(this.stroke);
        stroke(this.color);
        if(isUpDown) {

            line(0,0,width,height);
        } else {
            line(width, 0, 0, height);
        }
        pop();
    }

    half(isHorizontal) {
        push();
        strokeWeight(this.stroke);
        stroke(this.color);
        if(isHorizontal) {
            line(0, this.height / 2, this.width, this.height / 2);  
        } else {

            line(this.width / 2, 0, this.width / 2, this.height);
        }
        pop();    
    }

    thirds() {
        push();
        strokeWeight(this.stroke);
        stroke(this.color);

        line(this.width / 3, 0, this.width / 3, this.height);
        line(this.width * 2 / 3, 0, this.width * 2 / 3, this.height);
        line(0, this.height / 3, this.width, this.height / 3);
        line(0, this.height * 2 / 3, this.width, this.height * 2 / 3);
        pop();
    }
    cross() {
        this.half(true);
        this.half(false);
    }

    crossDiagonal() {
        this.diagonal(true);true
        this.diagonal(false);
    }
}