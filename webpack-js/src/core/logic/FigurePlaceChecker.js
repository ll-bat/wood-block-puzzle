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
        let $board = $boxes.inverse($boxes.toString());
        $board += '0'.repeat(3 * CONSTANTS.boxesOnRow);
        const $figure = $figures.getFigure(figure);
        return Calculator.matchesIntToStringPatternFrom($board, $figure.toInt(), { x, y }, $figure.getCategory());
    }
}

const $figurePlaceChecker = new FigurePlaceChecker();
export default $figurePlaceChecker;