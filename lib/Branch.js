class Branch {
    constructor(
        parent, 
        pos = createVector(random(width), random(height)),
        dir = createVector(andom(width), random(height)).normalize(),
        branchSize = 10
    ) {
        this.pos = pos;
        this.dir = dir;
        this.parent = parent;
        this.originalDirection = this.dir.copy();
        this.count = 0;
        this.len = branchSize;
        this.resets = [];
    }

    next() {
        let nextDir = p5.Vector.mult(this.dir, this.len);
        let nextPos = p5.Vector.add(this.pos, nextDir);
        let nextBranch = new Branch(this, nextPos, this.dir.copy(), this.len);
        return nextBranch;
    }

    show() {
        if(this.parent !== null) {
            stroke('#4f3927');
            strokeWeight(3);
            line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y)

            // strokeWeight(5);
            // stroke(0,0,255);
            // point(this.pos.x, this.pos.y)

            // stroke(0,255,0);
            // point(this.parent.pos.x, this.parent.pos.y)
        }

        // for(let i = 0; i < this.resets.length; i ++) {
        //     strokeWeight(8);
        //     stroke('#4f3927');
        //     point(this.resets[i].x, this.resets[i].y)
        // }
    }

    reset() {

        // this.resets.push(this.dir.add(this.pos));
        this.dir = this.originalDirection.copy();
        this.count = 0;
    }
}