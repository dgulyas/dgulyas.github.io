class Screen {

    m_canvas = null
    m_sideLength = null
    m_context = null
    m_state = null

    m_logBox = null
    m_buyOBtn = null
    m_mergeOBtn = null
    m_buyLineBtn = null
    m_mergeLineBtn = null

    m_colors = ["#F94144", "#F3722C", "#F68425", "#F9AF37", "#F9C74F", "#C5C35E", "#90BE6D", "#6AB47C", "#43AA8B", "#4D908E", "#577590"]

    constructor(state){
        this.m_state = state
        this.setUpCanvas()
        this.loadElementsAndListeners(this.m_state) //why does this have to be passed in??

        window.setInterval(this.draw.bind(this), 1000)
    }

    setUpCanvas(){
        this.m_sideLength =  400
        this.m_canvas = document.querySelector('canvas');
        this.m_canvas.width = this.m_sideLength
        this.m_canvas.height = this.m_sideLength
        this.m_context = this.m_canvas.getContext('2d')
    }

    loadElementsAndListeners(state){
        this.m_logBox = document.getElementById("log")

        this.m_buyOBtn = document.getElementById('buyOBtn');
        this.m_buyOBtn.addEventListener("click", e => {
            state.buyO()
        })

        this.m_mergeOBtn = document.getElementById('mergeOBtn');
        this.m_mergeOBtn.addEventListener("click", function() {
            state.mergeO()
        })

        this.m_buyLineBtn = document.getElementById('buyLineBtn');
        this.m_buyLineBtn.addEventListener("click", function() {
            state.buyLine()
        })

        this.m_mergeLineBtn = document.getElementById('mergeLineBtn');
        this.m_mergeLineBtn.addEventListener("click", function() {
            state.mergeLine()
        })
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
    
    clearLog(){
        this.m_logBox.value = ""
    }

    draw(){
        this.clearLog()
        this.logMessage("Coins: " + this.m_state.m_coins)
        this.logMessage("O (level " + this.m_state.m_totalO + "): " + this.m_state.m_numO)
        this.logMessage("| (level " + this.m_state.m_totalLines + "): " + this.m_state.m_numLines)

        //origin is top left

        this.m_context.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height)

        let circleRadius = 6

        let minY = 0 + circleRadius
        let maxY = this.m_sideLength - circleRadius - 10
        let totalY = maxY - minY

        let numProcessed = 0
        for(let i = 0; i < this.m_state.m_numO.length; i++){
            for(let j = 0; j < this.m_state.m_numO[i]; j++){
                
                let a = (this.m_state.m_totalO - 1)
                let b = (totalY/a)
                let c = numProcessed * b
                let y = Math.round(c) + minY + 5

                this.drawCircle(40, y, circleRadius, this.m_colors[i])
                numProcessed += 1
            }
        }
        // this.drawCircle(30, 60, circleRadius, "Green")
        


    }

    drawCircle(x, y, radius, color){
        this.m_context.beginPath()
        this.m_context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.m_context.fillStyle = color
        this.m_context.fill() //fills in whole circle
        // this.m_context.stroke() //draws an outline
    }

}