import NextHandler from "../../../abstract/NextHandler";
import $figures from "../../../drawer/figures/Figures";
import STATE from "../../../../shared/store/leaves/State";

class RandomFigureClicker extends NextHandler {
    constructor(props) {
        super(props);
    }

    /**
     * @param e
     * @param figure
     * @param extraData {{
     *     figure,  divElement,  index
     * }}
     * @return {boolean}
     */
    next(e, figure, extraData = {}) {
        const figureIndex = extraData.index;
        const randomFigure = STATE.relax.getRandomFigure(figureIndex);
        return !randomFigure.isLocked();
    }
}

const $randomFigureClicker = new RandomFigureClicker();
export default $randomFigureClicker;