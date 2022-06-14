class sandbox {

	constructor(canvas){
		this.c = canvas.getContext('2d')
		this.tileSize = 4
		this.sandWidth = Math.floor(canvas.width / this.tileSize)
		this.sandHeight = Math.floor(canvas.height / this.tileSize)
		this.sand = Array(this.sandWidth).fill(null).map(() => Array(this.sandHeight))
		this.initSand(this.sand)
		this.tilesToRedraw = new Set()
	}

	initSand(sand, initialHeight = 125){
		for(let x = 0; x < sand.length; x++){
			for(let y = 0; y < sand[x].length; y++){
				this.sand[x][y] = initialHeight
			}
		}
	}

	drawAll(){
		for(let x = 0; x < this.sandWidth; x++){
			for(let y = 0; y < this.sandHeight; y++){
				this.drawRect(x, y)
			}
		}
	}

	drawChanged(){
		this.tilesToRedraw.forEach( e => {
			this.drawRect(e[0], e[1])
		})
		this.tilesToRedraw.clear()
	}

	drawRect(x, y){
		let v = this.sand[x][y]
		this.c.fillStyle = 'rgb(' + v + ',' + v + ',' + v + ')';
		this.c.fillRect(x*this.tileSize, y*this.tileSize, this.tileSize, this.tileSize)
	}

	setHeight(x, y, newHeight){
		if(x >= 0 && x < this.sand.length){
			if(y >= 0 && y < this.sand[x].length){
				this.sand[x][y] = newHeight
				this.tilesToRedraw.add([x,y])
			}
		}
	}

	//adds a delta to the height of the cell
	addToHeight(x, y, delta){
		if(x >= 0 && x < this.sand.length){
			if(y >= 0 && y < this.sand[x].length){
				let newHeight = this.sand[x][y] + delta
				if(newHeight < 0){ newHeight = 0 }
				this.sand[x][y] = newHeight
				this.tilesToRedraw.add([x,y])
			}
		}
	}
}