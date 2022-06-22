class Tree {

    //lag is an issue at level 13
    constructor(level){
        this.root = new Tile(level, null, null)
    }

    getRoot(){
        while(this.root.parent != null){
            this.root = this.root.parent
        }
        return this.root
    }

}

class Tile {

    static id = 0

    constructor(level, parent, firstChild){
        this.id = Tile.id++
        this.parent = parent
        this.level = level
        
        this.children = {}
        if(firstChild != null){
            this.children[1] = firstChild
        }

        this.data = {}
    }

    getChild(childKey){
        if(this.children[childKey] == undefined){
            this.children[childKey] = new Tile(this.level - 1, this, null)
        }
        return this.children[childKey]
    }
    
    getParent(){
        if(this.parent == null){
            let newHead = new Tile(this.level + 1, null, this)
            this.parent = newHead
        }
        return this.parent
    }

}