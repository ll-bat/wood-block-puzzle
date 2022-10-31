import configuration from "./configuration"

export class RandomBoard {
    constructor() {
        this.boards = [];
        this.randomBoardDrawer = null;
    }

    createRandomBoardInstance() {
        const randomBoardDrawerClass = configuration.randomBoardDrawerClass
        this.randomBoardDrawer = randomBoardDrawerClass.create()
    }

    getRandomBoardInstance() {
        if (!this.randomBoardDrawer) {
            this.createRandomBoardInstance();
        }
        
        return this.randomBoardDrawer;
    }

    /**
     *
     * @returns {Board}
     */
    getBoard() {
        return this.getRandomBoardInstance().getNextRandomBoard()
    }
}