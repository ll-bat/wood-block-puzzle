import AbstractRandomBoardStyle from "./AbstractRandomBoardStyle";
import Board from "./Board";

export default class RandomBoardStyle16 extends AbstractRandomBoardStyle {
    constructor() {
        super() 
        this.START_RAW = 2
        this.START_COLUMN = 2
        this.END_RAW = 5 
        this.END_COLUMN = 5
    }
    
    getNumberOfRandomFigures() {
        return 1 << 16;
    }

    getBoxesCount() {
        return (this.END_RAW - this.START_RAW + 1) * (this.END_COLUMN - this.START_COLUMN + 1)
    }

    getRawBoxesCount() {
        return (this.END_COLUMN - this.START_COLUMN + 1);
    }

    indexToMatrix(index) {
        const boxesCount = this.getBoxesCount() 

        const boxes = [];
        for (let i = 0; i < boxesCount; i++) {
            if (index & (1 << i)) {
                boxes.push(1);
            } else {
                boxes.push(0);
            }
        }

        const matrix = [];
        let raw = [];
        const boxesOnRaw = this.getRawBoxesCount();
        for (let i = 0; i < boxesCount; i++) {
            raw.push(boxes[i]);
            if (i % boxesOnRaw === boxesOnRaw - 1) {
                matrix.push(raw);
                raw = [];
            }
        }

        return matrix;
    }

    /** @return {Board} */
    drawRandomBoard(i) {
        const board = new Board();

        const matrix = this.indexToMatrix(i);
        console.log(matrix);

        for (let i = this.START_RAW; i < this.END_RAW + 1; i++) {
            for (let j = this.START_COLUMN; j < this.END_COLUMN + 1; j++) {
                if (matrix[i - this.START_RAW][j - this.START_COLUMN]) {
                    board.set(i, j);
                } else {
                    board.unset(i, j);
                }
            }
        }

        return board; 

    }
}   
