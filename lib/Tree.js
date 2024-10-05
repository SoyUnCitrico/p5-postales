
class Tree {
    constructor(
        numHojas = 100,
        branchMax = 100,
        branchMin = 10,
        atractorSize = 10,
    ) {
        this.leaves = [];
        this.branches = [];
        this.totalLeafs = numHojas;
        this.infoBranches = [];
        this.maxDistance = branchMax;
        this.minDistance = branchMin;
        this.atractorSize = atractorSize;

        for( let i = 0; i < this.totalLeafs; i++) {
            // let nuevaHoja = new Leaf(random(width/3, width*2/3), (random(height/3, height*2/3) ), this.atractorSize);

            // let nuevaHoja = new Leaf(random(width/3, width*2/3), (random(height/3, height*2/3) + height/5 ), this.atractorSize);
            
            // dependiendo de donde se coloquen los puntos es hacia donde se van a extender las ramas
            let nuevaHoja = new Leaf(random(width/3, width*2/3), (random(height/3, height*2/3) ), this.atractorSize);
            this.leaves.push(nuevaHoja);
        }

        let pos = createVector(width/2, height);
        let dir = createVector(0, -1);
        let root = new Branch(null, pos, dir, this.minDistance)
        this.branches.push(root);
        let found = false;
        let current = root;

        while(!found) {
            for(let j = 0; j < this.leaves.length; j++) {
                let d = p5.Vector.dist(current.pos, this.leaves[j].pos)
                if(d < this.maxDistance) {
                    found = true;
                }
            }

            if(!found) {
                let branch = current.next();
                current = branch;
                this.branches.push(current);
            }
        }

        
    }

    show() {
        for(let i = 0; i < this.leaves.length; i++) {
            this.leaves[i].show();
        }
        
        for(let i = 0; i < this.branches.length; i++) {
            this.branches[i].show();
        }
    }

    grow() {
        // console.log("GROWING");
        // let infoBranches = [];
        for(let i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];
            let record = this.maxDistance;
            let closestBranch = null;

            for (let j = 0; j < this.branches.length; j++) {
                let branch = this.branches[j];
                let d = p5.Vector.dist(leaf.pos, branch.pos);
                if(d < this.minDistance) {
                    leaf.reached = true;
                    closestBranch = null;
                    // push();
                    // strokeWeight(6);
                    // stroke(255,0,255)
                    // point(leaf.pos.x, leaf.pos.y);
                    // pop();
                    break;
                } else if(d < record) {
                    closestBranch = branch;
                    record = d;
                    // push();
                    // strokeWeight(6);
                    // stroke(255,255, 0);
                    // point(closestBranch.pos.x, closestBranch.pos.y);
                    // pop();        
                }
                // delay(10);
            }

            // crea una nueva rama en otra direccion

            if(closestBranch != null) {
                // console.log(closestBranch)
                let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;

                // if(closestBranch.pos.mag() < 1) {                    
                //     push();
                //     strokeWeight(6);
                //     stroke(255,0,0);
                //     point(closestBranch.pos.x, closestBranch.pos.y);
                //     pop();        
                // }
            }
        }

        for(let k = this.leaves.length - 1; k >= 0;  k--) {
            if(this.leaves[k].reached) {
                this.leaves.splice(k,1);
            }
        }
        
        for(let m = this.branches.length - 1; m >= 0 ; m--) {          
            let branch = this.branches[m];
            
           

            if(branch.count > 0 ) {
                // let newPos = p5.Vector(branch.pos, branch.dir);
                // let newBranch = new Branch(branch, newPos, branch.dir.copy());
                // this.branches.push(newBranch);

                // let branchInfo = {
                //     count: branch.count,
                //     index: m                
                // }
    
                // this.infoBranches.push(branchInfo);

                branch.dir.div(branch.count + 1);
                this.branches.push(branch.next());
                branch.reset();                    
            }
            branch.reset();
        }
       
        
    }

    debug() {
        console.log("HOJAS: ", this.leaves)
        console.log("RAMAS: ", this.branches)
        console.log("INFO RAMAS: ", this.infoBranches)
    }

    checkLeavesLength() {    
        return this.leaves.length;
    }
} 