import CONSTANTS from "../../general/Constants";
import $boxes from "../../shared/store/Boxes";
import {offsetY} from "../../../../webpack/src/shared/constants";

class FigurePlaceFinder {
    constructor() {
    }
    /**
     * @param x
     * @param y
     * @param figure {String} such as TYPE_1, TYPE_2
     * @return {{x, y} | null}
     * @description This method should find a block from (64 blocks) where we can put the `figure` (to start drawing from)
     */
    find({ x, y }, figure) {
        x += CONSTANTS.figureOffsetX;
        y += CONSTANTS.figureOffsetY;

        const boxIndexes = this.goFindBox({ x, y });
        if (boxIndexes instanceof Object) {
            return boxIndexes
        }

        return null;
    }

    goFindBox({ x,  y }) {
        let errorX = CONSTANTS.boxWidth / 2;
        let errorY = CONSTANTS.boxHeight / 2;

        // figure is left of board
        if (x < CONSTANTS.offsetX - errorX) {
            return -1;
        }

        // figure is up of board
        if (y < offsetY - errorY) {
            return -1;
        }

        let colX = CONSTANTS.boxesOnRow - 1, colY = CONSTANTS.boxesOnColumn - 1;
        for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
            const box = $boxes.get(0, j);
            const boxCoordinateX = box.getCoordinateX();
            if (boxCoordinateX + errorX * 1.5 >= x) {
                colY = j;
                break;
            }
        }

        for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
            const box = $boxes.get(i, colX);
            const boxCoordinateY = box.getCoordinateY();
            if (boxCoordinateY + errorY * 1.5 >= y) {
                colX = i;
                break;
            }
        }

        const rightLimit = $boxes.get(0,CONSTANTS.boxesOnRow - 1).getCoordinateX() + CONSTANTS.boxWidth;
        const bottomLimit = $boxes.get(CONSTANTS.boxesOnRow - 1, 0).getCoordinateY() + CONSTANTS.boxHeight;

        if (x - rightLimit > -CONSTANTS.boxWidth / 3) {
            return -1;
        }

        if (y - bottomLimit > -CONSTANTS.boxHeight / 3) {
            return -1;
        }

        return {
            x: colX, y: colY
        }
    }
}

const $figurePlaceFinder = new FigurePlaceFinder();
export default $figurePlaceFinder;