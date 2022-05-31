import NextHandler from "../../../abstract/NextHandler";
import STATE from "../../../../shared/store/leaves/State";
import $figures from "../../../drawer/figures/Figures";
import Calculator from "../../../math/Calculator";
import $boxes from "../../../../shared/store/Boxes";

class RandomFigureOnBoardChecker extends NextHandler {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        const randomFigures = STATE.relax.getFigures();
        /**
         * @type {RandomFigure[]}
         */
        for (const randomFigure of randomFigures) {
            const figureName = randomFigure.getFigureName();
            const figure = $figures.getFigure(figureName);
            const isPlaceOnBoardForDrawingThisRandomFigure = Calculator.isMatrixMatchForAny($boxes.toMatrix(), figure.toMatrix());
            if (!isPlaceOnBoardForDrawingThisRandomFigure) {
                randomFigure.lock();
            } else {
                randomFigure.unlock();
            }
        }
    }
}

const $randomFigureOnBoardChecker = new RandomFigureOnBoardChecker();
export default $randomFigureOnBoardChecker;