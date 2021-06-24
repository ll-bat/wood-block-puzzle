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

    /**
     * @param i
     * @param j
     * @return {Box}
     */
    get(i, j) {
        return this._boxes[i][j];
    }

    getBoxes() {
        return this._boxes;
    }

    toString() {
        let result = "";
        this.getBoxes().forEach(row => {
            /**
             * @type {Box}
             */
            row.forEach(block => {
                result += block.isBusy().toString();
            })
        });
        return result;
    }

    /**
     * @param $string {String}
     */
    inverse($string) {
        let result = "";
        for (let c of $string) {
            if (c === '0') {
                result += '1';
            } else {
                result += '0';
            }
        }

        return result;
    }

    reset() {
        this._boxes = []
    }
}

const $boxes = new Boxes()
export default $boxes;