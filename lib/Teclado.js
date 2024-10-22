class Teclado {
    constructor(textArray = '', instruction = '') {

        this.pressedFirstTime = false;
        this.textArray = textArray;
        this.textOriginalArray = textArray;
        this.instruction = instruction;
        this.debug = false;
        this.withBorder = false;
        this.withRect = false;
        this.textColor = '#000000';
        this.instructionColor = 'rgba(0,0,0,0.42)';
        this.weightBorder = 1;
        this.borderColor = '#ff0000';
        this.colorRect = 'green';
        this.loadingResponse = false;
        this.isSending = false;

        this.withSound  = false;
        this.typedSound = null;
        this.bell = null;
        this.returnSound = null;
    }

    async selectKey(codeKey = '', keyP = '', postalNumber = 1) {          
        if (this.debug) {
            console.log("");
            console.log("Code: ", codeKey);
            console.log("Key: ", keyP);
            // console.log("Code: ", this.textArray);
            console.log("Length: ", this.textArray.length)
            console.log("First Time: ", this.pressedFirstTime);
        }

        
        if(this.withSound) {
            if(codeKey === 13) {        
                if(this.returnSound !== null) {
                    this.returnSound.play();
                } else {
                    this.bell.play()
                }
            }   else {
                let v = Math.random() * 0.17 + 0.52;
                this.typedSound.setVolume(v);        
                this.typedSound.play();
            }
        }
        

        switch(codeKey) {    
            case 8: //backspace
            case 46: //delete
                // if(this.textArray.length === 1) {
                //     this.pressedFirstTime = false;
                //     break;
                // }
                if(this.textArray.length === 0) {
                    this.pressedFirstTime = false;
                    this.textArray = this.instruction;
                    this.bell.play();
                    break;
                }
                if(this.textArray === this.instruction) {
                    this.textArray = ''
                    break
                }
                this.textArray = this.textArray.slice(0, -1);
                break;
            case 9: //tab
                this.textArray += "\t";
                break;
            case 13: //enter
                this.textArray += "\n";
                if(this.textArray === this.instruction + '\n') {            
                    this.setText(this.instruction);
                }                 
                if(
                    this.isSending 
                    && this.textArray !== this.textOriginalArray  
                    && this.textArray !== this.textOriginalArray + '\n' 
                    && this.textArray !== this.instruction
                    && this.textArray !== this.instruction + '\n'
                    && this.textArray.length !== undefined
                    && this.textArray.length > 1
                )  {
                    // console.log(this.textArray.length)            
                    // console.error(this.textArray)
                    try {
                        await this.sendData(globalUri, postalNumber, this.textArray);                        
                    }               
                    catch(error) {
                        console.error(error);
                    }
                }     
                break;
            case 0: //dead´                  
            case 186:          
                if(this.pressedFirstTime === false) {                    
                    this.pressedFirstTime = true;
                    this.textArray = ""
                }
                this.textArray += "´"
                break;
            case 16: //shift
            case 17: //control
            case 18: //ALT
            case 20: //capslock
            case 27: //esc
            case 33: //pageup
            case 34: //pagedown
            case 35: //end
            case 36: //home
            case 37: //arrows
            case 38: //
            case 39: //
            case 40: //
            case 91: //
            case 92: //
            case 93: //
            case 45: //
            case 112: // F1
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
            case 173:
            case 174:
            case 175:                
            case 176:       
            case 191: //
            case 222: //
            case 225: //alt graph
            case 253:
            case 254:
            case 255:
                break;
            default:
                // console.log(key)
                if(this.pressedFirstTime === false) {                    
                    this.pressedFirstTime = true;
                    this.textArray = '';
                }
                this.textArray += (keyP);                
                break;
        }          
        
    }

    pressed() {
        console.log(keyCode)
        if(keyCode == 8 && this.pressedFirstTime && this.textArray !== this.instructioninstruction) 
            this.textArray = this.textArray.slice(0, -1);
            if (this.textArray.length == 0) {
              this.pressedFirstTime = false;
            //   this.textArray = instruction
              this.textArray = '';
            } 
    }

    isPressedFirstTime() {
        return this.pressedFirstTime
    }

    drawText(
        x = 0,
        y = 0,
        wS = null,
        hS = null,
        textoOriginal = this.textArray
    ) {        
        let textoDib = textoOriginal;
        // let textoDib = textoOriginal.slice(0, textoOriginal.length );        
        push();                                
        if((wS && hS) != null) {            
            if(this.withRect) {
                noStroke();
                fill(this.colorRect);
                rect(x, y, wS, hS);
            }            
            if(this.withBorder) {
                strokeWeight(this.weightBorder);
                stroke(this.borderColor);
            }
            if(!this.pressedFirstTime) {
                fill(this.instructionColor);
            } else {
                fill(this.textColor);
            }
            text(textoDib, x, y, wS, hS);
        } else {            
            if(this.withBorder) {
                strokeWeight(this.weightBorder);
                stroke(this.borderColor);
            }
            if(!this.pressedFirstTime) {
                fill(this.instructionColor);
            } else {
                fill(this.textColor);
            }
            text(textoDib, x, y);
        }
        
        pop();
    }

    drawLoading(textLoadingColor = 'red', backgroundColor = 0, texto = 'Enviando informacion...') {
        push();
        background(color(backgroundColor));
        textSize(40);
        fill(color(textLoadingColor));
        text(textLoadingColor, widthCanvas /2, heightCanvas / 2),
        pop();
    }

    getText() {
        return this.textArray;
    }
    setText(texto = '') {
        if(texto !== null && texto !== undefined && texto !== '\n') {
            this.textArray = texto;
        }
    }

    setDebug() {
        this.debug = !this.debug;
        
        console.log("DEBUG MODE: ", this.debug);
        console.log("Primera vez: ", this.pressedFirstTime);
        console.log("");    
        console.log("Color: ", this.textColor);
        console.log("");
        console.log("Rectangulo: ", this.withRect);
        console.log("Rect color: ", this.colorRect);
        console.log("");
        console.log("Borde: ", this.withBorder);
        console.log("Border Weight: ", this.weightBorder);
        console.log("Border color: ", this.borderColor);      
        console.log("");        
        console.log("Texto: ", this.textArray);
        console.log("Original: ", this.textOriginalArray);
        console.log("Instruccion: ", this.instruction);
    }

    setColor(c) {
        this.textColor = color(c);
    }

    setColorInstruction(c) {
        this.instructionColor = color(c);
    }
    setBorder() {
        this.withBorder = !this.withBorder;
    }

    setRect() {
        this.withRect = !this.withRect;
    }

    setBorderSize(w) {
        this.weightBorder = w;
    }

    setBorderColor(c) {
        this.borderColor = color(c);
    }

    setSendData() {
        this.isSending = !this.isSending;
    }

    setSound(typed = null, bell = null, returnSound = null, isSound = true) {
        this.withSound = isSound;
        if(isSound && typed !== null && bell !== null) {
            this.bell = bell;
            this.typedSound = typed;
            if(returnSound !== null) {
                this.returnSound = returnSound
            }       
        }
    }
    addLetterSpacing(input, amount, spacer) {
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

    async sendData (urlString = '', number = 12345, datos = '') {
        this.loadingResponse = true;
        const url = urlString; // Replace with your actual URL
        const data = {
            tiempo: new Date().toISOString(),
            postal: number,
            data: datos,
        }
        const respuesta = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
            'Accept': '*/*'
          },
          body: JSON.stringify(data)
        });        
        if (respuesta.ok) {
            this.setText(this.textOriginalArray);
            const responseData = await respuesta.json();
            console.log('Data sent successfully:', responseData);
            this.loadingResponse = false;
            this.pressedFirstTime = false;
            return true;
         } else {
            this.setText('');
            console.error('Error sending data:', respuesta.status, respuesta.statusText);   
            this.loadingResponse = false;
            return false;
        }
        
      }
      
}