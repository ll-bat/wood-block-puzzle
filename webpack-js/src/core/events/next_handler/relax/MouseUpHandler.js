import NextHandler from "../../../abstract/NextHandler";
import STATE from "../../../../shared/store/leaves/State";

class MouseUpHandler extends NextHandler {
    next(e, figure) {
        const { x, y } = STATE.shared.getBlockIndexes();

        if (x === null || y === null) {
            this.log('Error:');
            this.log('x: ', x, 'y: ', y);
            this.error('x or y in MouseUpHandler next() method is not in right format')
        } else {

        }
    }
}

const $mouseUpHandler = new MouseUpHandler();
export default $mouseUpHandler;