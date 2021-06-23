import Figure from "./leaves/Figure";
import AllFigures from "./leaves/AllFigures";
import $figureDrawer from "./FigureDrawer";

class Figures {
    /**
     * @type {Array}
     * @var allFigures
     */

    constructor() {
        this.allFigures = [];
        /**
         * TYPE_1: new Figure(pattern),
         * TYPE_2: new Figure(pattern),
         * ...
         */
        for (let figure in AllFigures) {
            const pattern = AllFigures[figure].figure;
            this[figure] = new Figure(figure, pattern);

            this.allFigures.push({
                name: figure,
                figure: pattern
            });
        }
    }

    /**
     * @param type {string}
     * @param scaleK
     */
    draw(type, scaleK = 3) {
        if (this.hasFigure(type)) {
            const figureObj = this.getFigure(type);
            return $figureDrawer.draw(figureObj, scaleK);
        } else {
            throw new DOMException(`${type} figure does not exist`);
        }
    }

    hasFigure(type) {
        return this[type] !== null;
    }

    /**
     * @param type {string}
     * @return {Figure}
     */
    getFigure(type) {
        return this[type];
    }
}

const $figures = new Figures();
export default $figures;

