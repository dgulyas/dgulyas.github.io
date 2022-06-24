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

const m_goHigherButton = document.getElementById('goHigherButton');
m_goHigherButton.addEventListener("click", e => {
	handleGoHigherClick(e)
});

const m_clickedNumText = document.getElementById("clickedNumText");
let m_numClicked = 0

m_canvas.addEventListener("mousedown", function (e) {
	handleClick(e)
}, false);

m_canvas.addEventListener("touchstart", function (e) {
	handleClick(e)
}, false);

function handleClick(e){
	//computing the tileNum is complicated.
	//it's similar to how a 2 digit binary number works.
	tileNum = 1
	tileNum += e.clientY >= m_sideLength ? 1 : 0
	tileNum += e.clientX >= m_sideLength ? 2 : 0

	if(m_currentTile.level <= 1){
		if(m_currentTile.children[tileNum].data['clicked'] != true){
			m_currentTile.children[tileNum].data['clicked'] = true
			incrementClickedNumText()

			//if all squares are clicked, set parent to clicked
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

function draw(context){
	for (const [key, value] of Object.entries(m_tileLocations)){
		drawTile(context, key)	
	}
	drawBorder(context)
}

function drawTile(context, tileNum){
	tile = m_currentTile.getChild(tileNum)
	//todo: tile color could be stored in tile data?
	if(tile.data["clicked"]){
		context.fillStyle = "Green"
	}else{
		context.fillStyle = "Red"
	}

	x = m_tileLocations[tileNum][0]
	y = m_tileLocations[tileNum][1]
	context.fillRect(x, y, m_sideLength, m_sideLength)

	context.font = '12px serif';
	context.strokeText("Level " + tile.level, x + 10, y + 20)
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

let m_currentTile = new Tile(1, null, null)
draw(m_context, m_currentTile)

//Add delay to how long it takes to click a tile??