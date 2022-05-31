import $boxes from "../../shared/store/Boxes";
import $figures from "../drawer/figures/Figures";
import Calculator from "../math/Calculator";
import CONSTANTS from "../../general/Constants";

class FigurePlaceChecker {
    constructor() {
    }

    /**
     * @param x block index >= 0 AND < boxesOnRow
     * @param y block index >= 0 AND < boxesOnColumn
     * @param figure {String} such as TYPE_1, TYPE_2
     */
    isDrawable({ x, y }, figure) {
        const boardAsMatrix = $boxes.toMatrix();
        const figureAsMatrix = $figures.getFigure(figure).toMatrix();
        return Calculator.isMatrixMatch(boardAsMatrix, figureAsMatrix, { x, y });
    }
}

const $figurePlaceChecker = new FigurePlaceChecker();
export default $figurePlaceChecker;