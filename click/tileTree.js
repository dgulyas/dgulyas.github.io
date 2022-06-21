class Tree {

    //lag is an issue at level 13
    constructor(level){
        this.head = new Tile(level)
    }

    setNewHead(){
        console.log("setting new head")
        let newHead = new Tile(this.head.level + 1, null, this.head)
        this.head = newHead
    }

    /*
    populateChildren(tile){
        console.log("popChild, level:" + tile.level)
        if(tile.level <= 1){
            return
        }

        if(tile.children[1] == null){
            tile.children[1] = new Tile(tile.level - 1)
            this.populateChildren(tile.children[1])
        }
        if(tile.children[2] == null){
            tile.children[2] = new Tile(tile.level - 1)
            this.populateChildren(tile.children[2])
        }
        if(tile.children[3] == null){
            tile.children[3] = new Tile(tile.level - 1)
            this.populateChildren(tile.children[3])
        }
        if(tile.children[4] == null){
            tile.children[4] = new Tile(tile.level - 1)
            this.populateChildren(tile.children[4])
        }
    }
    */
}



class Tile {

    //If an existing tree is going to be a child,
    //This creates an extra child tree.
    constructor(level, parent = null, firstChild = null){
        this.clicked = false
        this.type = 'normal' //todo: replace with some kind of enum/string->int dict
        this.children = null
        if(level > 1){
            this.children = {}
            firstChild != null ? this.children[1] = firstChild :
                this.children[1] = new Tile(level - 1, this)
            this.children[2] = new Tile(level - 1, this)
            this.children[3] = new Tile(level - 1, this)
            this.children[4] = new Tile(level - 1, this)
        }
        this.parent = parent
        this.level = level
    }




}