class Teclado {
    constructor(textArray = '', instruction = '') {
        this.pressedFirstTime = false;
        this.textArray = textArray;
        this.instruction = instruction;
    }

    selectKey(codeKey = '', keyP = '') {  
        switch(codeKey) {    
            case 8: //backspace
            case 46: //delete
                if(this.pressedFirstTime == false) this.textArray = '';
                this.textArray = this.textArray.slice(0, -1);
                break;
            case 9: //tab
                this.textArray += "\t";
                break;
            case 13: //enter
                this.textArray += "\n";
                break;
            case 0: //dead
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
            case 219: //dead
            case 225: //alt graph
                break;
            default:
                // console.log(key)
                if(!this.pressedFirstTime) {
                    this.pressedFirstTime = true;
                  this.textArray = '';
                }
                this.textArray += (keyP);
                if (this.debug) console.log(this.textArray)
        }          
        
    }

    pressed() {
        if(this.keyCode == 8 && this.pressedFirstTime && this.textArray !== this.instructioninstruction) 
            this.textArray = this.textArray.slice(0, -1);
            if (this.textArray.length == 0) {
              this.pressedFirstTime = false;
              this.textArray = instruction
            } 
    }

    isPressedFirstTime() {
        return this.pressedFirstTime
    }
}