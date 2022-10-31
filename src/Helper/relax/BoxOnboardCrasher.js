import CONSTANTS from "../../general/Constants";
import $boxes from "../../shared/store/Boxes";
import $blockCrashAnimation from "../../core/animation/BlockCrashAnimation";

class BoxOnboardCrasher {
    constructor() {
        this.reset();
        this.shouldAnimateCrashing = true;
    }

    setAnimateCrashing(state) {
        this.shouldAnimateCrashing = state;
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
    }

    resetValues(){
        this.boxesOnRow = this.boxesOnRow.map(e => 0);
        this.boxesOnColumn = this.boxesOnColumn.map(e => 0)
    }

    setValues(){
        for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
            for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
                if ($boxes.get(i, j).isBusy()) {
                    this.boxesOnRow[i]++;
                    this.boxesOnColumn[j]++;
                }
            }
        }
    }

    checkBlocksToCrash() {
        this.resetValues();
        this.setValues();


        let crashBlocks = false;

        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            if (this.boxesOnRow[i] === CONSTANTS.boxesOnRow) {
                crashBlocks = true;
            }
        }

        for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
            if (this.boxesOnColumn[j] === CONSTANTS.boxesOnColumn) {
                crashBlocks = true;
            }
        }

        if (crashBlocks) {
            this.crashBlocks();
        }
    }

    crashBlocks() {
        console.log(this.shouldAnimateCrashing)
        const rowIndexesToCrash = [];
        const columnIndexesToCrash = [];
        this.boxesOnRow.forEach((numberOfBlocks, rowIndex) => {
            if (numberOfBlocks === CONSTANTS.boxesOnRow) {
                rowIndexesToCrash.push(rowIndex);
            }
        });

        this.boxesOnColumn.forEach((numberOfBlocks, columnIndex) => {
            if (numberOfBlocks === CONSTANTS.boxesOnColumn) {
                columnIndexesToCrash.push(columnIndex);
            }
        });

        // console.log('Crashing');
        // console.log(rowIndexesToCrash);
        // console.log(columnIndexesToCrash);

        rowIndexesToCrash.forEach(rowIndex => {
            for (let j = 0; j < CONSTANTS.boxesOnColumn; j++) {
                const box = $boxes.get(rowIndex, j);
                box.style({ background: CONSTANTS.boxDefaultColor });
                box.setBusy(false);
                if (this.shouldAnimateCrashing) {
                    $blockCrashAnimation.animateCrash(box);
                }
            }

            this.boxesOnRow[rowIndex] = 0;
            for (let j = 0; j< CONSTANTS.boxesOnRow; j++) {
                this.boxesOnColumn[j]--;
            }
        });

        columnIndexesToCrash.forEach(columnIndex => {
            for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
                const box = $boxes.get(i, columnIndex);
                box.style({ background: CONSTANTS.boxDefaultColor });
                box.setBusy(false);
                if (this.shouldAnimateCrashing) {
                    $blockCrashAnimation.animateCrash(box);
                }
            }

            this.boxesOnColumn[columnIndex] = 0;
            for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
                if (this.boxesOnRow[i] > 0) {
                    this.boxesOnRow[i]--;
                }
            }
        });
    }
}

const $boxOnboardCrasher = new BoxOnboardCrasher();
export default $boxOnboardCrasher;