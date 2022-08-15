class Gems {
    //This tracks a pile of gems, which will be used for currency.
    //Everytime a tile is clicked, a gem of that level is gained.
    
    //Used as a hash map, where the int key points to the number
    //of gems of that level.
    m_gems = new Object()

    addGem(gemLevel){
        return this.changeGemCount(gemLevel, 1)
    }

    changeGemCount(gemLevel, delta){
        if(!Number.isInteger(gemLevel) || !Number.isInteger(delta)){
            return false
        }

        if(this.m_gems[gemLevel] == null){
            this.m_gems[gemLevel] = 0
        }

        //It's not possible to have negative gems.
        if(this.m_gems[gemLevel] + delta < 0){
            return false
        }

        this.m_gems[gemLevel] += delta

        return true
    }

    removeGems(gemLevel, amount){
        return this.changeGemCount(gemLevel, amount * -1)
    }

}