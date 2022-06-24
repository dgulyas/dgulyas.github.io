class Tree {
    
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
    
    //if the parent doesn't exist, add the tile as a child
    //of the created parent using the defaultChildKey
    getParent(defaultChildKey = 1){
        if(this.parent == null){
            let parent = new Tile(this.level + 1, null, this)
            parent.children[defaultChildKey] = this //todo: this is bad since the tile shouldn't know about the child key format.
            this.parent = parent
            
        }
        return this.parent
    }

    toString(){
        return "clicked: " + this.data["clicked"]
    }

}