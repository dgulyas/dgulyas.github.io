const m_canvas = document.querySelector('canvas');
const m_sideLength = 100
m_canvas.width = m_sideLength * 2
m_canvas.height = m_sideLength * 2
const m_context = m_canvas.getContext('2d')

//first value answers if it's in the top row
//second value answers if it's in the left column
//todo: use these keys instead of current ones
//Also change getParent to not need key? Maybe set default key, use static?
const childKeys = {
	1: [false, false],
	2: [false, true],
	3: [true, false],
	4: [true, true]
}

const goHigherButton = document.getElementById('goHigherButton');
goHigherButton.addEventListener("click", e => {
	handleGoHigherClick(e)
});

const levelNumText = document.getElementById("levelNumText");
const clickedNumText = document.getElementById("clickedNumText");
let numClicked = 0

m_canvas.addEventListener("mousedown", function (e) {
	handleClick(e)
}, false);

m_canvas.addEventListener("touchstart", function (e) {
	handleClick(e)
}, false);

function handleClick(e){
	left = e.clientX < m_sideLength ? 0 : 1
	_top = e.clientY < m_sideLength ? 0 : 1
	childKey = left + "," + _top
	
	if(currentTile.level <= 1){
		if(currentTile.children[childKey].data['clicked'] != true){
			currentTile.children[childKey].data['clicked'] = true
			incrementClickedNumText()

			//if all squares are clicked, set parent to clicked
		}
	}else{
		currentTile = currentTile.getChild(childKey)

	}
	draw(m_context, currentTile)
}

 function handleGoHigherClick(e){
	currentTile = currentTile.getParent()
	draw(m_context, currentTile)
 }

function draw(context){
	//todo: This is bad, maybe have dict of child keys pointing to the point the rect starts at?
	drawTile(context, currentTile.getChild("0,0"), 0, 0)
	drawTile(context, currentTile.getChild("0,1"), 0, m_sideLength)
	drawTile(context, currentTile.getChild("1,0"), m_sideLength, 0)
	drawTile(context, currentTile.getChild("1,1"), m_sideLength, m_sideLength)
	drawBorder(context)
	setLevelNumText(currentTile.level)
}

function drawTile(context, tile, x, y){
	//setColor(context, tile.data["clicked"])
	if(tile.data["clicked"]){
		context.fillStyle = "Green"
	}else{
		context.fillStyle = "Red"
	}
	context.fillRect(x, y, m_sideLength, m_sideLength)

	context.font = '12px serif';
	context.strokeText(tile.level, x + 10, y + 20)
}

function drawBorder(context){
	lWidth = 4
	prevLineWidth = context.lineWidth
	context.lineWidth = lWidth

	context.fillStyle = "Black"
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength*2 -lWidth, m_sideLength*2 -lWidth)
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength*2 -lWidth, m_sideLength -lWidth)
	context.strokeRect(lWidth/2, lWidth/2, m_sideLength -lWidth, m_sideLength*2 -lWidth)

	context.lineWidth = prevLineWidth
}

function setLevelNumText(newLevel){
	levelNumText.innerHTML = "Current Level: " + newLevel
}

function incrementClickedNumText(){
	setClickedNumText(numClicked + 1)
}

function setClickedNumText(newLevel){
	numClicked = newLevel
	clickedNumText.innerHTML = "Num Clicked: " + numClicked
}

let currentTile = new Tile(1, null, null)
draw(m_context, currentTile)
setLevelNumText(4)
setClickedNumText(0)

//Add delay to how long it takes to click a tile??