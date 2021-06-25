import NextHandler from "../../abstract/NextHandler";
import $figurePlaceFinder from "../../logic/FigurePlaceFinder";
import $figurePlaceChecker from "../../logic/FigurePlaceChecker";
import $tmpFigureHelper from "../../../shared/store/tmp/TmpFigureHelper";
import STATE from "../../../shared/store/leaves/State";

class FigureOnBoardMatcher extends NextHandler {
    constructor() {
        super();
    }

    /**
     * @param e {Event}
     * @param figure {String}
     */
    next(e, figure) {
        const blockIndexes = $figurePlaceFinder.find(e, figure);
        if (blockIndexes === null) {
            $tmpFigureHelper.clearHtml();
        } else {
            console.clear();
            if ($figurePlaceChecker.isDrawable(blockIndexes, figure)) {
                $tmpFigureHelper.drawTmpFigure(blockIndexes, figure);
                STATE.shared.setBlockIndexes(blockIndexes);
            } else {
                $tmpFigureHelper.clearHtml()
            }
        }
    }
}

const $figureOnBoardMatcher = new FigureOnBoardMatcher();
export default $figureOnBoardMatcher;