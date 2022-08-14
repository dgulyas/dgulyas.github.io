class Screen {

    m_canvas = null
    m_sideLength = null
    m_context = null

    m_clickedNumText = null
    m_logBox = null
    m_levelText = null
    m_goHigherButton = null

    m_tileLocations = null

    constructor(){
        this.m_sideLength = 150
        this.m_canvas = document.querySelector('canvas');
        this.m_canvas.width = this.m_sideLength * 2
        this.m_canvas.height = this.m_sideLength * 2
        this.m_context = this.m_canvas.getContext('2d')

        this.loadElementsAndListeners()
    }

     loadElementsAndListeners(){
        this.m_clickedNumText = document.getElementById("clickedNumText");
        this.m_clickedNumText.style.marginLeft = this.m_sideLength - 65
    
        this.m_logBox = document.getElementById("log")
        
        this.m_levelText = document.getElementById("levelText")
        this. m_levelText.style.marginLeft = this.m_sideLength - 35
    
        this.m_goHigherButton = document.getElementById('goHigherButton');
        this.m_goHigherButton.style.marginLeft = this.m_sideLength - 45
        

        this.m_tileLocations = {
            1: [0, 0],
            2: [0, this.m_sideLength],
            3: [this.m_sideLength, 0],
            4: [this.m_sideLength, this.m_sideLength]
        }
    }

    setTileClickListener(clickFunction){
        this.m_canvas.addEventListener("mousedown", function (e) {
            clickFunction(e.clientX, e.clientY)
        }, false);
        
        this.m_canvas.addEventListener("touchstart", function (e) {
            e.preventDefault()
            var touch = e.touches[0] || e.changedTouches[0];
            clickFunction(touch.pageX, touch.pageY)
        }, false);
    }

    setGoHigherClick(clickFunction){
        this.m_goHigherButton.addEventListener("click", e => {
            clickFunction(e) //todo: the e can be removed?
        });
    }

    logMessage(message, printTime = true){
        let timeString = ""
        if(printTime){
            timeString = new Date().toLocaleTimeString() + ": "
        }
        this.m_logBox.value = timeString + message + '\r\n'+ this.m_logBox.value
    }
    
    logMessages(messages, printTime = true){
        let timeString = ""
        if(printTime){
            timeString = new Date().toLocaleTimeString() + ": "
        }
    
        var newMessage = ""
        messages.forEach(message => {
            newMessage += '\r\n' + timeString + message
            timeString = " ".repeat(timeString.length)
        });
        this.logMessage(newMessage, false)
    }

    incrementClickedNumText(){
        this.setClickedNumText(m_numClicked + 1)
    }
    
    setClickedNumText(newNumClicked){
        this.m_numClicked = newNumClicked
        this.m_clickedNumText.innerHTML = "Num Clicked: " + m_numClicked
    }

    drawTile(tile, tileNum){
    
        if(tile.data["clicked"]){
            this.m_context.fillStyle = "Green"
        }else{
            this.m_context.fillStyle = "Red"
        }
    
        let x = this.m_tileLocations[tileNum][0]
        let y = this.m_tileLocations[tileNum][1]
        this.m_context.fillRect(x, y, this.m_sideLength, this.m_sideLength)
    
        this.m_context.fillStyle = "Black"
        this.m_context.font = '24px serif';
        this.m_context.fillText("Level", x + this.m_sideLength/2 - 28, y + 40)
        this.m_context.font = '36px serif';
        this.m_context.fillText(tile.level, x + this.m_sideLength/2 - 10, y + 75)
    }
    
    drawBorder(){
        let lWidth = 4
        let prevLineWidth = this.m_context.lineWidth
        this.m_context.lineWidth = lWidth
    
        this.m_context.fillStyle = "Black"
        this.m_context.strokeRect(lWidth/2, lWidth/2, this.m_sideLength*2 - lWidth, this.m_sideLength*2 - lWidth)
        this.m_context.strokeRect(lWidth/2, lWidth/2, this.m_sideLength*2 - lWidth, this.m_sideLength - lWidth)
        this.m_context.strokeRect(lWidth/2, lWidth/2, this.m_sideLength - lWidth, this.m_sideLength*2 - lWidth)
    
        this.m_context.lineWidth = prevLineWidth
    }

    setGoHigherButtonDisabled(disabledState){
        this.m_goHigherButton.disabled = disabledState
    }

    setLevelText(newText){
        this.m_levelText.innerText = newText
    }

    getTileNum(x, y){
        //computing the which tile was clicked is complicated.
        //it's similar to how a 2 digit binary number works.
        let tileNum = 1
        tileNum += y >= this.m_sideLength ? 1 : 0
        tileNum += x >= this.m_sideLength ? 2 : 0
        return tileNum
    }
}