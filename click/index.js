const canvas = document.querySelector('canvas');
const sideLength = 100
canvas.width = sideLength * 2
canvas.height = sideLength * 2
const contxt = canvas.getContext('2d')

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

canvas.addEventListener("mousedown", function (e) {
	handleClick(e)
}, false);

canvas.addEventListener("touchstart", function (e) {
	handleClick(e)
}, false);

function handleClick(e){
	left = e.clientX < sideLength ? 0 : 1
	_top = e.clientY < sideLength ? 0 : 1
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
	draw(contxt, currentTile)
}

 function handleGoHigherClick(e){
	currentTile = currentTile.getParent()
	draw(contxt, currentTile)
 }

function draw(context){
	//todo: This is bad, maybe have dict of child keys pointing to the point the rect starts at?
	drawTile(context, currentTile.getChild("0,0"), 0, 0)
	drawTile(context, currentTile.getChild("0,1"), 0, sideLength)
	drawTile(context, currentTile.getChild("1,0"), sideLength, 0)
	drawTile(context, currentTile.getChild("1,1"), sideLength, sideLength)
	
	setLevelNumText(currentTile.level)
}

function drawTile(context, tile, x, y){
	//setColor(context, tile.data["clicked"])
	if(tile.data["clicked"]){
		context.fillStyle = "Green"
	}else{
		context.fillStyle = "Red"
	}
	context.fillRect(x, y, sideLength, sideLength)

	context.font = '12px serif';
	context.strokeText(tile.level, x + 10, y + 30)
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
draw(contxt, currentTile)
setLevelNumText(4)
setClickedNumText(0)

//Add delay to how long it takes to click a tile??