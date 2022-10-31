import CONSTANTS from "../../../general/Constants"

export default class Board {
    constructor() {
        this.boxes = []
        this.init()
    }

    init() {
        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            const boxes = []
            for (let j = 0; j < CONSTANTS.boxesOnColumn; j++) {
                boxes.push(0)
            }
            this.boxes.push(boxes)
        }
    }

    get(i, j) {
        return this.boxes[i][j]
    }

    set(i, j) {
        this.boxes[i][j] = 1;
    }

    unset(i, j) {
        this.boxes[i][j] = 0;
    }

    /**
     * @returns {number[][]}
     */
    getLayout() {
        return this.boxes
    }

}

