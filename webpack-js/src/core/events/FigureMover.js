import FUNC from "../../general/Custom";
import CONSTANTS from "../../general/Constants";
import $figures from "../drawer/figures/Figures";
import $tmpFigureHelper from "../../shared/store/tmp/TmpFigureHelper";
import STATE from "../../shared/store/leaves/State";
import BeforeEvent from "../abstract/BeforeEvent";

class FigureMover extends BeforeEvent {
    constructor() {
        super();
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     * @param index {Number}
     * @description all these params are coming from `STATE.relax.getFigures()[index]`
     */
    register({ figure, divElement, index }) {
        let temporaryElement = null;
        let moveHandler = null;

        const mousedownHandler = e => {
            const ok = this.triggerBeforeClick({ figure, divElement, index });
            if (!ok) {
                return false;
            }

            const moverFigure = this.createMoverFigure();
            const figureDiv = $figures.draw(figure, 1.05);

            moverFigure.append(figureDiv);
            moveHandler = this.getMouseMoveHandler(figure, moverFigure);

            FUNC.setStyle(moverFigure, {
                left: this.getLeftPx(e.pageX) + 'px',
                top: this.getTopPx(e.pageY) + 'px'
            });
            FUNC.setStyle(divElement, { opacity: .4 });

            FUNC.attach(CONSTANTS.dom, 'mousemove', moveHandler)
            FUNC.attach(CONSTANTS.dom, 'mouseup', mouseUpHandler);

            temporaryElement = moverFigure;
        };

        const mouseUpHandler = e => {
            if (!temporaryElement)
                return;

            FUNC.detach(CONSTANTS.dom, 'mousemove', moveHandler);
            temporaryElement.remove();
            $tmpFigureHelper.clearHtml();
            FUNC.setStyle(divElement, { opacity: 1 })
            FUNC.setStyle(divElement, { opacity: 1 });

            this.getHandler('mouseup').next(e, figure, { index });
            STATE.shared.resetDrawable();
            // important
            FUNC.detach(CONSTANTS.dom, 'mouseup', mouseUpHandler);
        };

        FUNC.attach(divElement, 'mousedown', mousedownHandler);
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     * @return {NextHandler}
     */
    getMouseMoveHandler(figure, divElement) {
        return e => {
            const { pageX, pageY } = e;
            FUNC.setStyle(divElement, {
                left: this.getLeftPx(pageX) + 'px',
                top: this.getTopPx(pageY) + 'px'
            });

            this.getHandler('mousemove').next(e, figure);
        }
    }

    getLeftPx($left) {
        return $left + CONSTANTS.figureOffsetX
    }

    getTopPx($top) {
        return $top + CONSTANTS.figureOffsetY
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
