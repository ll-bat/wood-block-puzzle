import Middleware from "./Middleware";
import STATE from "../../shared/store/leaves/State";

class RandomFigureClickerMiddleWare extends Middleware {
    canPass($params = {}) {
        const { index } = $params;
        const randomFigure = STATE.relax.getRandomFigure(index);
        return !randomFigure.isLocked();
    }
}

const $randomFigureClickerMiddleWare = new RandomFigureClickerMiddleWare();
export default $randomFigureClickerMiddleWare;