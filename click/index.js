const m_canvas = document.querySelector('canvas');
const m_sideLength = 150
m_canvas.width = m_sideLength * 2
m_canvas.height = m_sideLength * 2
const m_context = m_canvas.getContext('2d')

//the x,y coordinates that each tile will be drawn at.
//the index (1,2,3 or 4) can act as an id for the tile.
const m_tileLocations = {
	1: [0, 0],
	2: [0, m_sideLength],
	3: [m_sideLength, 0],
	4: [m_sideLength, m_sideLength]
}

let m_numClicked = 0
let m_highestLevel = 0
let m_clickedNumText = null
let m_logBox = null
let m_levelText = null
let m_goHigherButton = null
let m_currentTile = new Tile(1, null, null)

function loadElementsAndListeners(){
	m_clickedNumText = document.getElementById("clickedNumText");
	m_clickedNumText.style.marginLeft = m_sideLength - 65

	m_logBox = document.getElementById("log")
	
	m_levelText = document.getElementById("levelText")
	m_levelText.style.marginLeft = m_sideLength - 35

	m_goHigherButton = document.getElementById('goHigherButton');
	m_goHigherButton.style.marginLeft = m_sideLength - 45
	m_goHigherButton.addEventListener("click", e => {
		handleGoHigherClick(e)
	});

	m_canvas.addEventListener("mousedown", function (e) {
		handleClick(e.clientX, e.clientY)
	}, false);

	m_canvas.addEventListener("touchstart", function (e) {
		e.preventDefault()
		var touch = e.touches[0] || e.changedTouches[0];
		handleClick(touch.pageX, touch.pageY)
	}, false);	
}

function handleClick(x, y){
	//computing the tileNum is complicated.
	//it's similar to how a 2 digit binary number works.
	tileNum = 1
	tileNum += y >= m_sideLength ? 1 : 0
	tileNum += x >= m_sideLength ? 2 : 0

	if(m_currentTile.level <= 1){
		if(m_currentTile.children[tileNum].data['clicked'] != true){
			m_currentTile.children[tileNum].data['clicked'] = true
			incrementClickedNumText()
		}
	}else{
		m_currentTile = m_currentTile.getChild(tileNum)
	}
	draw(m_context, m_currentTile)
}

function handleGoHigherClick(e){
	m_currentTile = m_currentTile.getParent(1)
	draw(m_context, m_currentTile)
}

function setClickedIfAllChildrenClicked(tile){
	//This only applies if a tile isn't a bottom level tile
	//Bottom level tiles don't have children
	if(tile.level >= 1){
		tile.data['clicked'] = allChildrenClicked(tile)
	}
}

function allChildrenClicked(tile){
	let allChildrenClicked = true
	for (const [key, value] of Object.entries(m_tileLocations)){
		if(tile.getChild(key).data['clicked'] != true){
			allChildrenClicked = false
		}
	}
	return allChildrenClicked
}

function draw(context){
	for (const [key, value] of Object.entries(m_tileLocations)){
		drawTile(context, key)	
	}
	drawBorder(context)
	
	m_goHigherButton.disabled = m_currentTile.parent == null && !allChildrenClicked(m_currentTile)

	if(m_highestLevel < m_currentTile.level){
		m_highestLevel = m_currentTile.level
		logMessage("Reached level " + (m_highestLevel))
	}

	m_levelText.innerText = "Level " + m_currentTile.level
}

function drawTile(context, tileNum){
	tile = m_currentTile.getChild(tileNum)

	setClickedIfAllChildrenClicked(tile)

	if(tile.data["clicked"]){
		context.fillStyle = "Green"
	}else{
		context.fillStyle = "Red"
	}

	x = m_tileLocations[tileNum][0]
	y = m_tileLocations[tileNum][1]
	context.fillRect(x, y, m_sideLength, m_sideLength)

	context.fillStyle = "Black"
	context.font = '24px serif';
	context.fillText("Level", x + m_sideLength/2 - 28, y + 40)
	context.font = '36px serif';
	context.fillText(tile.level, x + m_sideLength/2 - 10, y + 75)
}

function drawBorder(context){
	lWidth = 4
	prevLineWidth = context.lineWidth
	context.lineWidth = lWidth

	context.fillStyle = "Black"
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength*2 - lWidth, m_sideLength*2 - lWidth)
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength*2 - lWidth, m_sideLength - lWidth)
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength - lWidth, m_sideLength*2 - lWidth)

	context.lineWidth = prevLineWidth
}

function incrementClickedNumText(){
	setClickedNumText(m_numClicked + 1)
}

function setClickedNumText(newLevel){
	m_numClicked = newLevel
	m_clickedNumText.innerHTML = "Num Clicked: " + m_numClicked
}

function logMessage(message, printTime = true){
	timeString = ""
	if(printTime){
		timeString = new Date().toLocaleTimeString() + ": "
	}
	m_logBox.value = timeString + message + '\r\n'+ m_logBox.value
}

function logMessages(messages, printTime = true){
	timeString = ""
	if(printTime){
		timeString = new Date().toLocaleTimeString() + ": "
	}

	newMessage = ""
	messages.forEach(message => {
		newMessage += '\r\n' + timeString + message
		timeString = " ".repeat(timeString.length)
	});
	logMessage(newMessage, false)
}

function logRules(){
	rules = [
		["Rules:"],
		["Level 0 tiles will turn green if clicked."],
		["Higher level tiles will turn green if all"],
		["tiles below them are green."]
	]
	logMessages(rules)
}


loadElementsAndListeners()
logRules()
draw(m_context, m_currentTile)

//Ideas:
//Add delay to how long it takes to click a tile??