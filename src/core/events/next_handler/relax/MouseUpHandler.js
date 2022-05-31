import NextHandler from "../../../abstract/NextHandler";
import STATE from "../../../../shared/store/leaves/State";
import $boxes from "../../../../shared/store/Boxes";
import $figures from "../../../drawer/figures/Figures";
import $randomFigureDrawer from "../../../drawer/concrete/relax/RandomFiguresDrawer";
import RandomFigureEventHelper from "./RandomFigureEventHelper";

class MouseUpHandler extends NextHandler {
    /**
     * @param e {Event}
     * @param figure {String}
     * @param index {Number}
     * @return {boolean}
     */
    next(e, figure, { index } ) {
        if (!STATE.shared.isDrawable()) {
            return false;
        }

        const { x, y } = STATE.shared.getBlockIndexes();

        if (x === null || y === null) {
            this.log('Error:');
            this.log('x: ', x, 'y: ', y);
            this.error('x or y in MouseUpHandler next() method is not in right format')
        } else {
            const matrix = $figures.getFigure(figure).toMatrix();
            $boxes.updateMatrix(matrix, { x, y }, { colorBox: true })
            STATE.relax.removeRandomFigure(figure, index);
            if (STATE.relax.isAllFiguresDrawn()) {
                RandomFigureEventHelper.drawRandomFiguresAndRegisterEvents();
            }
        }
    }
}

const $mouseUpHandler = new MouseUpHandler();
export default $mouseUpHandler;