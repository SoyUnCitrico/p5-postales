class PixelAtom {
    constructor(
        position = createVector(Math.floor(Math.random() * width), Math.floor(Math.random() * height)),
        w = 10,
        h = 10,
        skin = '#000',
        velocity = createVector(0,0),
        accel = createVector(0,0),
                
        maxForce = 0.5,
        maxSpeed = 4,
        wanderTetha = 0,
        id = null,    
        life = 100,
        damage = 0.1,    
        isSquare = true,
        isLive = false,
        originalPosition = null,
        letter = null
    ) {
        this.id = id === null ? Math.floor(Math.random() * 1000000) : id;
        this.w = w;
        this.h = h;
        this.position = position;
        this.originalPosition = originalPosition !== null ? originalPosition : position;
        this.staticPosition = originalPosition;
        this.velocity = velocity;
        this.accel = accel;

        this.life = life;
        this.damage = damage;
        this.maxForce = maxForce;
        this.maxSpeed = maxSpeed;
        
        this.wanderTetha = wanderTetha;

        this.greyscale = 255;
        this.letter = letter;
        this.skin = skin;
        this.originalSkin = this.skin;
        this.isSquare = isSquare;
        this.isLive = isLive;
        this.offsetAngle = 0;
        this.angle = 0;
        this.angleStep = 0.01;
    }

    drawPixel() {
        push();
        fill(this.skin);
        noStroke();
        if(this.isSquare) {
            rect(this.position.x,this.position.y,this.w, this.h);
        } else {
            ellipse(this.position.x,this.position.y,this.w, this.h);
        }
        pop();
    }

    drawImage(imagen, wI = 100, hI = 100, rotating = true ) {
      push();
      translate(this.position.x, this.position.y);
      
      if(rotating) {        
       rotate(this.angle - this.offsetAngle);
       this.angle =  this.angle + this.angleStep;
       if(this.angle > (PI/32) || this.angle < (-PI/16) ) {        
        this.angleStep *= -1;
       }
      }
      // image(shadowPez,0,0,120,180);
      noStroke();
      // rect(0,0,wI, hI);

      image(imagen, 0, 0, wI, hI);
      
      // noFill();
      // stroke('red');
      // strokeWeight(this.w);
      // point(0, 0);
      
      pop();
    }

    drawLetter(letter = this.letter, fontSizeStatic = false, fontSizeMin = this.w, fontSizeMax = this.w * 4) {
        push();
        translate(this.position.x, this.position.y);
        stroke(this.skin);
        strokeWeight(1);
        if (fontSizeStatic) {
            textSize(fontSizeMax);
            fill(this.skin);            
        } else {
            // greyscale to fontsize
            var fontSize = map(this.greyscale, 0, 255, fontSizeMax, fontSizeMin);
            fontSize = max(fontSize, 1);
            textSize(this.w);
            fill(this.skin);
        }
        text(letter, 0, 0);
        pop();

    }

    drawWander(position, circle, target, rad) {
        push();
        stroke(0);
        fill(255);
        ellipseMode(CENTER);
        ellipse(circle.x, circle.y, rad * 2, rad * 2);
        ellipse(target.x, target.y, 4, 4);
        line(position.x, position.y, circle.x, circle.y);
        line(circle.x, circle.y, target.x, target.y);
        pop();
      }

    /////////////// API /////////////////////////
    seguirTarget(target, typeBoundaries) {
        this.seek(target);
        this.actualizar();
        this.checkLimits(typeBoundaries);
        if (this.isLive)  {
            this.living();
        }
        this.drawPixel();
      }

    arrivarTarget(target, targetRadius, typeBoundaries) {
        this.arrive(target, targetRadius);
        this.actualizar();
        this.checkLimits(typeBoundaries);
        if (this.isLive)  {
          this.living();
        }
        this.drawPixel();
    }

    arrivarOriginLetter(target = createVector(this.originalPosition.x, this.originalPosition.y), targetRadius = 100, typeBoundaries = 'OTHERSIDE') {
        this.arrive(target, targetRadius);
        this.actualizar();
        this.checkLimits(typeBoundaries);
        if (this.isLive)  {
          this.living();
        }
        this.drawLetter();
    }

    temblar(movement, offset, typeBoundaries) {
      // let newPos = createVector(this.staticPosition.x + movement - offset, this.staticPosition.y);
        let newPos = createVector(this.position.x + movement - offset, this.position.y);
        this.setPosition(newPos);
        this.actualizar();
        this.checkLimits(typeBoundaries);
        if (this.isLive)  {
            this.living();
        }
        this.drawPixel();
        
    }

    pasearLetter(typeBoundaries) {
      this.wander();
      this.actualizar();
      this.checkLimits(typeBoundaries);
      if (this.isLive)  {
          this.living();
      }
      this.drawLetter();
    }

    pasear(typeBoundaries) {
      this.wander();
      this.actualizar();
      this.checkLimits(typeBoundaries);
      if (this.isLive)  {
          this.living();
      }
      this.drawPixel();
    }

    pasearImage(typeBoundaries, image, iW = 100, iH = 100, rotating = false) {
      this.wander();
      this.actualizar();
      this.checkLimits(typeBoundaries);
      if (this.isLive)  {
          this.living();
      }
      this.drawImage(image, iW, iH, rotating);
    }
    
    /////////////////  VIDA  /////////////////    
    living() {
        lessLife();
        mapLifeToAlpha();
    }

    lessLife() {
        this.life -= this.damage;
    }

    moreLife(health) {
        this.life += health;
    }
    isDead() {
        if (this.life < 0.0) {
        return true;
        } else {
        return false;
        }
    }

      ///////////////// TOOGLE ///////////////// 
    saveStaticPosition() {
        this.staticPosition = position.copy();
    }
  
    tooglePixelShape() {
        this.isSquare = !squarePixel;
    }
  
    // toogleDebug() {
    //     this.isDebugging = !isDebugging;
    // }

    toogleLife() {
        this.isLive = !this.isLive;
    }


    //////////////// Getters && Setters ////////////////
    setSize(wx, hy) {
        this.w = wx;
        this.h = hy;
    }

    setDamage(d) {
        this.damage = d;
    }

    setColor(c) {
        this.skin = c;
    }

    setGreyscale(greyscale) {
      this.greyscale = greyscale;
    }

    setLetter(letter) {
      this.letter = letter
    }
    setPosition(p) {
        this.position = p.copy();
    }

    setVelocity(v) {
        this.velocity = v.copy();
    }

    setAccel(v) {
      this.accel = v.copy();
  }
  
    setMaxSpeed(speedStep) {
        this.maxSpeed = speedStep;
    }

    getLife() {
        return this.life;
    } 
    setOffsetAngle(angle) {
      this.offsetAngle = angle;
    }

    ////////// utils //////////////////
    mapLifeToAlpha() {
        let a = alpha(this.originalSkin);
        let r = red(this.originalSkin);
        let g = green(this.originalSkin);
        let b = blue(this.originalSkin);
        let newAlpha = map(this.life, 0, 100, 0, a);
        setColor(color(r, g, b, newAlpha));
    }

    mapLifeToColor() {
        let r = red(this.originalSkin);
        let g = green(this.originalSkin);
        let b = blue(this.originalSkin);
    
        let newR = map(this.life, 0, 100, 0, r);
        let newG = map(this.life, 0, 100, 0, g);
        let newB = map(this.life, 0, 100, 0, b);
    
        setColor(color(newR, newG, newB));
    }

      //////////////////   MOVIMIENTO  ////////////////
    applyForce(fuerza) {
        this.accel.add(fuerza);
    }
  
    actualizar() {
        this.velocity.add(this.accel).limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.accel.mult(0);
    }

    arrive(objetivo, distance) {
        let newPos = p5.Vector.sub(objetivo, this.position);
        //The distance is the magnitude of the vector pointing from location to target.
        let d = newPos.mag();
        newPos.normalize();
        //If we are closer than 100 pixels...
        if (d < distance) {
          //...set the magnitude according to how close we are.
          let m = map(d, 0, distance, 0, this.maxSpeed);
          newPos.mult(m);
        } else {
          //Otherwise, proceed at maximum speed.
          newPos.mult(this.maxSpeed);
        }
    
        //The usual steering = desired - velocity
        let newDir = p5.Vector.sub(newPos, this.velocity).limit(this.maxForce);
        this.applyForce(newDir);
    }

    seek(objetivo) {
        let newPos = p5.Vector.sub(objetivo, this.position).normalize().mult(this.maxSpeed);
        let newDir = p5.Vector.sub(newPos, this.velocity).limit(this.maxForce);
        this.applyForce(newDir);
    }

    seekVector(target) {
        // A vector pointing from the position to the target
        let desired = p5.Vector.sub(target, this.position);  
        desired.normalize().mult(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.velocity).limit(this.maxForce);  
        return steer;
      }
    // We accumulate a new acceleration each time based on three rules
    // flock(boids) {
    //     let sep = separate(boids);   // Separation
    //     let ali = align(boids);      // Alignment
    //     let coh = cohesion(boids);   // Cohesion
    //     // Arbitrarily weight these forces
    //     sep.mult(1.5);
    //     ali.mult(1.0);
    //     coh.mult(1.0);
    //     // Add the force vectors to acceleration
    //     applyForce(sep);
    //     applyForce(ali);
    //     applyForce(coh);
    //   }
      
      wander() {
        let wanderR = 25;         // Radius for our "wander circle"
        let wanderD = 80;         // Distance for our "wander circle"
        let change = 0.3;
        this.wanderTheta += random(-change, change);     // Randomly change wander theta
    
        // Now we have to calculate the new position to steer towards on the wander circle
        let circlepos = this.velocity.copy();    // Start with velocity
        circlepos.normalize();            // Normalize to get heading
        circlepos.mult(wanderD);          // Multiply by distance
        circlepos.add(this.position);               // Make it relative to boid's position
    
        let h = this.velocity.heading();        // We need to know the heading to offset wandertheta
    
        let circleOffSet = createVector(wanderR * cos(this.wanderTheta + h), wanderR * sin(this.wanderTheta + h));
        let target = p5.Vector.add(circlepos, circleOffSet);
        this.seek(target);
        //print("\n&d is debugging?\n R: %x",id,isDebugging);
        // if (isDebugging)
        //     drawWander(this.position, circlepos, target, wanderR);
      }
      
      followField(campo) {
        let desired = campo.lookup(this.position);
        desired.mult(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce); 
        applyForce(steer);
      }
    
    
    checkLimits(typed) {        
        switch(typed.toUpperCase()) {
        case "OTHERSIDE":
          if (this.position.x > width) {
            this.position.x = 0 + this.w/2;
          }
          if (this.position.x < 0) {
            this.position.x = width - this.w/2;
          }
          if (this.position.y > height) {
            this.position.y = 0 + this.h/2;
          }
          if (this.position.y < 0) {
            this.position.y = height - h/2;
          }
          break;
        case "REVERSE_X":
          if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1;
          }
          if (this.position.y > height) {
            this.position.y = 0 + this.h/2;
          }
          if (this.position.y < 0) {
            this.position.y = height - this.h/2;
          }
          break;
        case "REVERSE_Y":
          if (this.position.x > width) {
            this.position.x = 0 + this.w/2;
          }
          if (this.position.x < 0) {
            this.position.x = width - this.w/2;
          }
          if (this.position.y > width || this.position.y < 0) {
            this.velocity.y *= -1;
          }
          break;
        case "REVERSE_XY":
          if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1;
          }
          if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1;
          }
          break;
    
        default:
          console.log("No limits\n");
          break;
        }
    }
}