export default class AbstractRandomBoardStyle {
    constructor() {
        this.i = 0 
        this.lastIndex = this.getNumberOfRandomFigures() 
    }

    getNumberOfRandomFigures() {
        throw new Error('implement in child class')
    }

    /** @return {Board} */
    getNextRandomBoard() {
        if (this.i >= this.lastIndex) {
            return null;
        }

        return this.drawRandomBoard(this.i++);
    }

    isFinished() {
        return this.i < this.lastIndex;
    }

    /** @return {Board} */
    drawRandomBoard(i) { 
        throw new Error('implement in child class')
    }

    static create() {
        return new this() 
    }

}