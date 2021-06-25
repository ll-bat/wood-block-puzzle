import NextHandler from "../../../abstract/NextHandler";
import STATE from "../../../../shared/store/leaves/State";
import $boxes from "../../../../shared/store/Boxes";
import $figures from "../../../drawer/figures/Figures";

class MouseUpHandler extends NextHandler {
    next(e, figure) {
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

        }
    }
}

const $mouseUpHandler = new MouseUpHandler();
export default $mouseUpHandler;