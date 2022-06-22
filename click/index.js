const canvas = document.querySelector('canvas');
const sideLength = 100
canvas.width = sideLength * 2
canvas.height = sideLength * 2
const contxt = canvas.getContext('2d')


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
	currentTile.children[childKey].data['clicked'] = true

	draw(contxt, currentTile)
}

function draw(context, tile){
	setColor(context, tile.getChild("0,0").data["clicked"])
	context.fillRect(0, 0, sideLength, sideLength)

	setColor(context, tile.getChild("0,1").data["clicked"])
	context.fillRect(0, sideLength, sideLength, sideLength)

	setColor(context, tile.getChild("1,0").data["clicked"])
	context.fillRect(sideLength, 0, sideLength, sideLength)

	setColor(context, tile.getChild("1,1").data["clicked"])
	context.fillRect(sideLength, sideLength, sideLength, sideLength)
}

function setColor(context, clicked){
	if(clicked){
		context.fillStyle = "Green"
	}else{
		context.fillStyle = "Black"
	}
}

let currentTile = new Tile(1, null, null)
draw(contxt, currentTile)