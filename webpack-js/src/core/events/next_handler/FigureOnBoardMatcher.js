import NextHandler from "../../abstract/NextHandler";
import $figurePlaceFinder from "../../logic/FigurePlaceFinder";
import $figurePlaceChecker from "../../logic/FigurePlaceChecker";
import DomNegotiator from "../../../negotiators/DomNegotiator";
import $tmpFigureHelper from "../../../shared/store/tmp/TmpFigureHelper";

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
            if ($figurePlaceChecker.isDrawable(blockIndexes, figure)) {
                $tmpFigureHelper.drawTmpFigure(blockIndexes, figure);
            } else {
                $tmpFigureHelper.clearHtml()
            }
        }
    }
}

const $figureOnBoardMatcher = new FigureOnBoardMatcher();
export default $figureOnBoardMatcher;