import Box from "./leaves/Box";

class Boxes {
    /**
     * @type {[]}
     * @var _boxes
     */
    constructor() {
        this.reset();
    }

    addRow() {
        this._boxes.push([]);
    }

    addAt($i, { x, y }) {
        this._boxes[$i].push(
            new Box({ x, y })
        );
    }

    get(i, j) {
        return this._boxes[i][j];
    }

    reset() {
        this._boxes = []
    }
}

const $boxes = new Boxes()
export default $boxes;