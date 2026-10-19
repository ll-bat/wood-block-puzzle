import NextHandler from "../../abstract/NextHandler";
import STATE from "../../../shared/store/leaves/State";
import $boxes from '../../../shared/store/Boxes';
import $figures from '../../drawer/figures/Figures';
import CONSTANTS from '../../../general/Constants';

class FigureOnBoardMatcher extends NextHandler {
    constructor() {
        super();
    }

    /**
     * @param e {Event}
     * @param figure {String}
     */
    next(e, figure) {
        document.querySelectorAll('.challenge-drop-preview-valid, .challenge-drop-preview-invalid')
            .forEach(cell => cell.classList.remove('challenge-drop-preview-valid', 'challenge-drop-preview-invalid'));
        STATE.shared.resetDrawable();
        const row = Math.round((e.pageY + CONSTANTS.figureOffsetY - CONSTANTS.offsetY) / (CONSTANTS.boxHeight + 1));
        const column = Math.round((e.pageX + CONSTANTS.figureOffsetX - CONSTANTS.offsetX) / (CONSTANTS.boxWidth + 1));
        const cells = [];
        $figures.getFigure(figure).pattern.forEach((values, r) => values.forEach((value, c) => {
            if (value !== '.') cells.push([row + r, column + c]);
        }));
        const legal = cells.every(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8 && !$boxes.get(r, c).isBusy());
        cells.forEach(([r, c]) => {
            if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                $boxes.get(r, c).getDiv().classList.add(legal ? 'challenge-drop-preview-valid' : 'challenge-drop-preview-invalid');
            }
        });
        if (legal) STATE.shared.setBlockIndexes({ x: row, y: column });
        STATE.shared.setDrawable(legal);
    }
}

const $figureOnBoardMatcher = new FigureOnBoardMatcher();
export default $figureOnBoardMatcher;
