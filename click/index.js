let m_numClicked = 0
let m_highestLevel = 0
let m_currentTile = new Tile(1, null, null)
let m_screen = new Screen()
let m_gemCounts = [0,0,0,0,0,0,0,0]

function handleTileClick(x, y){
	tileNum = m_screen.getTileNum(x,y)

	if(m_currentTile.level <= 1){
		if(m_currentTile.children[tileNum].data['clicked'] != true){
			m_currentTile.children[tileNum].data['clicked'] = true
			m_gemCounts[m_currentTile.level]++
			m_screen.incrementClickedNumText()
		}
	}else{
		m_gemCounts[m_currentTile.level]++
		m_currentTile = m_currentTile.getChild(tileNum)
	}
	draw()
}

function handleGoHigherClick(e){
	m_currentTile = m_currentTile.getParent(1)
	draw()
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
	for (const [tileIndex, value] of Object.entries(m_screen.m_tileLocations)){
		if(tile.getChild(tileIndex).data['clicked'] != true){
			allChildrenClicked = false
		}
	}
	return allChildrenClicked
}

function draw(){
	for (const [tileIndex, value] of Object.entries(m_screen.m_tileLocations)){
		subTile = m_currentTile.getChild(tileIndex)
		setClickedIfAllChildrenClicked(subTile)
		m_screen.drawTile(subTile, tileIndex)
	}
	m_screen.drawBorder()
	
	m_screen.setGoHigherButtonDisabled(m_currentTile.parent == null && !allChildrenClicked(m_currentTile))

	if(m_highestLevel < m_currentTile.level){
		m_highestLevel = m_currentTile.level
		m_screen.logMessage("Reached level " + (m_highestLevel))
	}

	m_screen.setLevelText("Level " + m_currentTile.level) 
}

function logRules(){
	rules = [
		["Rules:"],
		["Level 0 tiles will turn green if clicked."],
		["Higher level tiles will turn green if all"],
		["tiles below them are green."]
	]
	m_screen.logMessages(rules)
}

function setListeners(){
	m_screen.setTileClickListener(handleTileClick)
	m_screen.setGoHigherClick(handleGoHigherClick)
}

setListeners()
logRules()
draw(m_currentTile)

//Ideas:
//Add delay to how long it takes to click a tile??