import AllFigures from "../../figures/leaves/AllFigures";
import $figures from "../../figures/Figures";
import STATE from "../../../../shared/store/leaves/State";
import Negotiator from "../../../abstract/Negotiator";
import DomNegotiator from "../../../../negotiators/DomNegotiator";

class RandomFiguresDrawer extends Negotiator {
    constructor() {
        super();
    }

    draw($figuresCount = 3, figures = []) {
        this.ensureProperties();

        const keys = Object.keys(AllFigures);
        const figuresLength = keys.length;

        for (let i = 0; i < $figuresCount; i++) {
            let figure = null;
            if (figures[i]) {
                figure = figures[i].name;
            } else {
                const randomNumber = this.getRandomNumber(figuresLength);
                figure = keys[randomNumber];
            }
            const pattern = $figures.getFigure(figure).pattern;
            const divElement = document.createElement('button');
            divElement.type = 'button';
            divElement.className = 'challenge-piece relax-piece';
            divElement.setAttribute('aria-label', `Piece ${i + 1}`);
            const preview = document.createElement('span');
            preview.className = 'challenge-shape-preview';
            preview.style.width = `${Math.max(...pattern.map(row => row.length)) * 21}px`;
            preview.style.height = `${pattern.length * 21}px`;
            pattern.forEach((row, r) => row.forEach((cell, c) => {
                if (cell === '.') return;
                const cube = document.createElement('span');
                cube.className = 'challenge-shape-cell';
                cube.style.left = `${c * 21}px`;
                cube.style.top = `${r * 21}px`;
                preview.append(cube);
            }));
            const label = document.createElement('span');
            label.className = 'challenge-piece-label';
            label.textContent = `Piece ${i + 1}`;
            divElement.append(preview, label);
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
