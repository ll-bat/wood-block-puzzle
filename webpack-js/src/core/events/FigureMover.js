import FUNC from "../../general/Custom";
import CONSTANTS from "../../general/Constants";
import $figureDrawer from "../drawer/figures/FigureDrawer";
import $figures from "../drawer/figures/Figures";

class FigureMover {
    constructor() {
    }
    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     */
    register({ figure, divElement }) {
        let temporaryElement = null;

        FUNC.attach(divElement, 'mousedown', e => {
            const moverFigure = this.createMoverFigure();

            const figureDiv = $figures.draw(figure, 1.05);
            moverFigure.append(figureDiv);

            FUNC.setStyle(moverFigure, {
                left: this.getLeftPx(e.pageX) + 'px',
                top: this.getTopPx(e.pageY) + 'px'
            });

            this.attachMoveEvents(moverFigure);
            FUNC.setStyle(divElement, {
                opacity: .4
            });

            temporaryElement = moverFigure;
        });

        FUNC.attach(CONSTANTS.dom, 'mouseup', e => {
            if (!temporaryElement)
                return;

            temporaryElement.remove();
            FUNC.setStyle(divElement, {
                opacity: 1
            })
        });
    }

    /**
     * @param divElement {HTMLElement}
     */
    getMouseMoveHandler(divElement) {
        return e => {
            const { pageX, pageY } = e;
            FUNC.setStyle(divElement, {
                left: this.getLeftPx(pageX) + 'px',
                top: this.getTopPx(pageY) + 'px'
            })
        }
    }

    /**
     * @param divElement {HTMLElement}
     */
    attachMoveEvents(divElement) {
        const handler = this.getMouseMoveHandler(divElement);

        FUNC.attach(
            CONSTANTS.dom, 'mousemove', handler
        )
    }

    getLeftPx($left) {
        return $left - 30;
    }

    getTopPx($top) {
        return $top - 60
    }

    createMoverFigure() {
        let elem = FUNC.$('#mover-figure');
        if (!elem) {
            elem = FUNC.elt('div', 'position-absolute', 'mover-figure');
            CONSTANTS.dom.body.append(elem);
        }

        return elem;
    }
}

const $figureMover = new FigureMover();
export default $figureMover;
