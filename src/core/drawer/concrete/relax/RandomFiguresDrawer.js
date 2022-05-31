import AllFigures from "../../figures/leaves/AllFigures";
import $figures from "../../figures/Figures";
import STATE from "../../../../shared/store/leaves/State";
import Negotiator from "../../../abstract/Negotiator";
import DomNegotiator from "../../../../negotiators/DomNegotiator";

class RandomFiguresDrawer extends Negotiator {
    constructor() {
        super();
    }

    draw($figuresCount = 3) {
        this.ensureProperties();

        const keys = Object.keys(AllFigures);
        const figuresLength = keys.length;

        for (let i = 0; i < $figuresCount; i++) {
            const randomNumber = this.getRandomNumber(figuresLength);
            const figure = keys[randomNumber];
            const divElement = $figures.draw(figure);
            STATE.relax.addRandomFigure({ figure, divElement, index: i });
            this.getNegotiator().append(divElement);
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
        const isOk = this.getNegotiator() != null;
        if (!isOk) {
            throw new DOMException('Please specify the DomNegotiator for RandomFigureDrawer');
        }
    }

    reset() {
        this.getNegotiator().clearHtml();
    }
}

const $randomFigureDrawer = new RandomFiguresDrawer();
// This is determined statically
$randomFigureDrawer.setup(new DomNegotiator('#figures'));

export default $randomFigureDrawer;