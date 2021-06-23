import AllFigures from "../../figures/leaves/AllFigures";
import $figures from "../../figures/Figures";
import STATE from "../../../../shared/store/leaves/State";

class RandomFiguresDrawer {
    constructor() {
    }

    /**
     * @param domNegotiator {DomNegotiator}
     */
    setup(domNegotiator) {
        this._domNegotiator = domNegotiator;
    }


    draw($figuresCount = 3) {
        this.ensureProperties();

        STATE.relax.clear();

        const keys = Object.keys(AllFigures);
        const figuresLength = keys.length;

        for (let i = 0; i < $figuresCount; i++) {
            const randomNumber = this.getRandomNumber(figuresLength);
            const figure = keys[randomNumber];
            const divElement = $figures.draw(figure);
            STATE.relax.addRandomFigure({ figure, divElement });
            this._domNegotiator.append(divElement);
        }
    }

    getRandomNumber($lessThan = 1e9, $moreThan = 0) {
        const diff = $lessThan - $moreThan;
        let randNumber = Math.floor(Math.random() * diff);
        if (randNumber === diff) {
            randNumber--;
        }

        randNumber += $moreThan;
        return randNumber;
    }

    ensureProperties() {
        const isOk = this._domNegotiator != null;
        if (!isOk) {
            throw new DOMException('Please specify the DomNegotiator for RandomFigureDrawer');
        }
    }

}

const $randomFigureDrawer = new RandomFiguresDrawer();
export default $randomFigureDrawer;