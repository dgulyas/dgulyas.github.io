class GameState{
    m_coins = 0
    
    m_numO = [1,1,1,1,1,1,1,1,1,1,1]
    m_totalO = 11 //number of O's. Sum of all ints in m_numO
    m_oLevel = 11 //The number of first level O's they bought
    m_nextOCost = 1

    m_numLines = [0]
    m_totalLines = 0
    m_lineLevel = 0
    m_nextLineCost = 1

    m_numForMerge = 3

    //This tracks how far into the cycle it is.
    //One cycle is how long it takes for each O to reach the
    //end.
    m_timeElapsed
    constructor(){
    }

    //The buy fucntions don't use the same code because they might
    //eventully use different cost functions instead of *1.5
    buyO(){
        if(this.m_coins < this.m_nextOCost){
            return
        }
        this.m_coins -= this.m_nextOCost
        this.m_numO[0] += 1
        this.m_totalO += 1

        this.m_nextOCost = Math.floor((this.m_totalO + 1) * 1.5)
    }

    buyLine(){
        if(this.m_coins < this.m_nextLineCost){
            return
        }
        this.m_coins -= this.m_nextLineCost
        this.m_numLines[0] += 1
        this.m_totalLines += 1

        this.m_nextLineCost = Math.floor((this.m_totalLines + 1)* 1.5)
    }

    mergeO(){
        this.merge(this.m_numO)
        this.m_totalO = this.m_numO.reduce((partialSum, a) => partialSum + a, 0);
    }

    mergeLine(){
        this.merge(this.m_numLines)
        this.m_totalLines = this.m_numLines.reduce((partialSum, a) => partialSum + a, 0);
    }

    //Finds the highest index of an array location that's
    //greater or equal to the merge threshold.
    //Minuses merge threshold from that location and adds
    //1 to the index above it.
    //Essentially merges several things at one level into
    //one thing at the next highest level
    merge(array){
        let mergeLevel = this.getMergeLevel(array)
        if(mergeLevel == null){
            return
        }
        array[mergeLevel] -= this.m_numForMerge
        if(array[mergeLevel + 1] == undefined){
            array.push(0)
        }
        array[mergeLevel + 1] += 1
    }

    getMergeLevel(array){
        for(let i = array.length -1; i >= 0; i--){
            if(array[i] >= this.m_numForMerge){
                return i
            }
        }
        return null
    }

    tick(){

    }


}