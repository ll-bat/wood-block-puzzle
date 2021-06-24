import FUNC from "../../general/Custom";
import CONSTANTS from "../../general/Constants";
import $figures from "../drawer/figures/Figures";
import $tmpFigureHelper from "../../shared/store/tmp/TmpFigureHelper";

class FigureMover {
    constructor() {
    }

    /**
     * @param $nextHandler {NextHandler}
     */
    setup($nextHandler) {
        this._nextHandler = $nextHandler;
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     */
    register({ figure, divElement }) {
        let temporaryElement = null;
        let moveHandler = null;

        FUNC.attach(divElement, 'mousedown', e => {
            const moverFigure = this.createMoverFigure();
            const figureDiv = $figures.draw(figure, 1.05);
            moverFigure.append(figureDiv);
            FUNC.setStyle(moverFigure, {
                left: this.getLeftPx(e.pageX) + 'px',
                top: this.getTopPx(e.pageY) + 'px'
            });
            moveHandler = this.getMouseMoveHandler(figure, moverFigure);
            FUNC.attach(
                CONSTANTS.dom, 'mousemove', moveHandler
            )
            FUNC.setStyle(divElement, {
                opacity: .4
            });

            temporaryElement = moverFigure;
        });

        FUNC.attach(CONSTANTS.dom, 'mouseup', e => {
            if (!temporaryElement)
                return;

            FUNC.detach(
                CONSTANTS.dom, 'mousemove', moveHandler
            );
            temporaryElement.remove();
            $tmpFigureHelper.clearHtml();
            FUNC.setStyle(divElement, {
                opacity: 1
            })
        });
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     */
    getMouseMoveHandler(figure, divElement) {
        return e => {
            const { pageX, pageY } = e;
            FUNC.setStyle(divElement, {
                left: this.getLeftPx(pageX) + 'px',
                top: this.getTopPx(pageY) + 'px'
            });

            this._nextHandler.next(e, figure);
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
