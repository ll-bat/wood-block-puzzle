import CONSTANTS from "../../general/Constants";

class BoxOnboardCrasher {
    constructor() {
        this.reset();
    }

    reset() {
        this.boxesOnRow = [];
        this.boxesOnColumn = [];

        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            this.boxesOnRow.push(0);
        }

        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            this.boxesOnColumn.push(0);
        }
    }

    update({ x, y }) {
        this.boxesOnRow[x]++;
        this.boxesOnColumn[y]++;

        let $break = false;
        if (this.boxesOnRow[x] === CONSTANTS.boxesOnRow) {
            $break = true;
        }

        if (this.boxesOnColumn[y] === CONSTANTS.boxesOnColumn) {
            $break = true;
        }
    }
}

const $boxOnboardCrasher = new BoxOnboardCrasher();
export default $boxOnboardCrasher;