import Box from "./leaves/Box";
import Calculator from "../../core/math/Calculator";
import EventHandler from "../../core/abstract/EventHandler";
import EVENTS from "../../core/events/Events";

class Boxes extends EventHandler {
    /**
     * @type {[]}
     * @var _boxes
     */
    constructor() {
        super();
        this.init();
        this.reset();
    }

    init() {
        this._boxes = [];
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

    toMatrix() {
        const result = [];
        this._boxes.forEach(row => {
            result.push([]);
            const curIndex = result.length - 1;
            /**
             * @type {Box}
             */
            row.forEach(box => {
                result[curIndex].push(box.isBusy());
            })
        });

        return result;
    }

    /**
     * @param $childMatrix {Array[]}
     * @param x {Number}
     * @param y {Number}
     * @param extraData {{
     *     colorBox,
     *     color,
     * }}
     */
    updateMatrix($childMatrix, { x, y }, extraData = {}) {
        $childMatrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (Calculator.isset($childMatrix, i, j)) {
                    const box = this.get(x + i, y + j);
                    box.setBusy();

                    if (this.hasHandler(EVENTS.BOX_UPDATE)) {
                        this.getHandler(EVENTS.BOX_UPDATE).next({}, null, { x: x + i, y: y + j })
                    }
                }
            })
        });

        if (this.hasHandler(EVENTS.BOARD_CHANGE)) {
            this.getHandler(EVENTS.BOARD_CHANGE).next({}, null);
        }
    }

    reset() {
        /**
         * @type {Box[]}
         */
        for (let boxes of this._boxes) {
            for (let box of boxes) {
                box.reset();
            }
        }

        this._boxes = []
    }
}

const $boxes = new Boxes()
export default $boxes;