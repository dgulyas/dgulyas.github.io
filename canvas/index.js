const canvas = document.querySelector('canvas');
canvas.width = innerWidth
canvas.height = innerHeight

let mouseDown = false
canvas.addEventListener("mousemove", function (e) {
	if(mouseDown){
		handleMouseMove(e)
	}
}, false);
canvas.addEventListener("mousedown", function (e) {
	mouseDown = true
	handleMouseMove(e)
}, false);
canvas.addEventListener("mouseup", function (e) {
	mouseDown = false
}, false);
let touchDown = false
canvas.addEventListener("touchmove", function (e) {
	if(touchDown){
		handleMouseMove(e)
	}
}, false);
canvas.addEventListener("touchstart", function (e) {
	touchDown = true
	handleMouseMove(e)
}, false);
canvas.addEventListener("touchend", function (e) {
	touchDown = false
}, false);


function redrawRandTiles(box, n){
	for( let i = 0; i < n; i++){
		x = Math.floor(Math.random() * box.sandWidth)
		y = Math.floor(Math.random() * box.sandHeight)
		box.setHeight(x,y, 255-x-y)
	}
	box.drawChanged()
}

function handleMouseMoveOriginal(e){
	x = Math.floor(e.clientX / box.tileSize)
	y = Math.floor(e.clientY / box.tileSize)
	box.setHeight(x,y, 0)
	box.drawChanged()
}

const ballPrint =
[
[0,0,1,2,2,1,0,0],
[0,1,3,3,3,3,1,0],
[1,3,3,4,4,3,3,1],
[2,3,4,4,4,4,3,2],
[2,3,4,4,4,4,3,2],
[1,3,3,4,4,3,3,1],
[0,1,3,3,3,3,1,0],
[0,0,1,2,2,1,0,0]
]

function handleMouseMove(e){
	let mouseX = Math.floor(e.clientX / box.tileSize)
	let mouseY = Math.floor(e.clientY / box.tileSize)

	for(let i = 0; i < ballPrint.length; i++){
		for(let j = 0; j < ballPrint[0].length; j++){
			if(ballPrint[i][j] > 0){
				
				//This looks complicated, it's:
				//mouseX: where the mouse is
				//i: specific cell of the pattern
				//Math.floor(ballPrint.length/2): half pattern length to center pattern over mouse
				let x = mouseX+i-Math.floor(ballPrint.length/2)
				let y = mouseY+j-Math.floor(ballPrint[0].length/2)
				
				box.addToHeight(x,y, ballPrint[i][j] * -4)
			}
		}
	}
	box.drawChanged()
}

let box = new sandbox(canvas)
box.drawAll()
redrawRandTiles(box,50)
