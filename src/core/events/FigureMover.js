import FUNC from "../../general/Custom";
import CONSTANTS from "../../general/Constants";
import $figures from "../drawer/figures/Figures";
import $tmpFigureHelper from "../../shared/store/tmp/TmpFigureHelper";
import STATE from "../../shared/store/leaves/State";
import Component from "../components/Component";
import EVENTS from "./Events";
import { applyOceanDepth } from '../../puzzle/oceanDepth';
import sound from '../../puzzle/sound';

class FigureMover extends Component {
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
            if (divElement.disabled || temporaryElement || (e.pointerType === 'mouse' && e.button !== 0)) return;
            e.preventDefault();
            STATE.shared.resetDrawable();
            if (!this.passesMiddlewares(EVENTS.BEFORE_MOUSE_DOWN, { figure, divElement, index })) {
                return false;
            }

            this.beforeClick(false, { e, figure, divElement, index });
            sound.play('pickup');

            const moverFigure = this.createMoverFigure();
            const pattern = $figures.getFigure(figure).pattern;
            const width = Math.max(...pattern.map(row => row.length)) * (CONSTANTS.boxWidth + 1);
            const height = pattern.length * (CONSTANTS.boxHeight + 1);
            pattern.forEach((row, r) => row.forEach((cell, c) => {
                if (cell === '.') return;
                moverFigure.append(FUNC.elt('span', 'challenge-drag-cell', null, {
                    left: `${c * (CONSTANTS.boxWidth + 1)}px`,
                    top: `${r * (CONSTANTS.boxHeight + 1)}px`,
                    width: `${CONSTANTS.boxWidth}px`, height: `${CONSTANTS.boxHeight}px`,
                }));
            }));

            moveHandler = e => {
                const { pageX, pageY } = e;
                const left = pageX - width / 2;
                const top = pageY - height - 22;
                const anchorRow = Math.round((top - CONSTANTS.offsetY) / (CONSTANTS.boxHeight + 1));
                moverFigure.querySelectorAll('.challenge-drag-cell').forEach(cell => {
                    const rowOffset = Math.round(parseFloat(cell.style.top) / (CONSTANTS.boxHeight + 1));
                    applyOceanDepth(cell, anchorRow + rowOffset, CONSTANTS.boxesOnColumn);
                });
                FUNC.setStyle(moverFigure, {
                    left: left + 'px',
                    top: top + 'px'
                });

                this.getHandler('mousemove').next({
                    pageX: left - CONSTANTS.figureOffsetX,
                    pageY: top - CONSTANTS.figureOffsetY,
                }, figure);
                moverFigure.classList.toggle('challenge-drag-ghost-valid', !!STATE.shared.isDrawable());
                moverFigure.classList.toggle('challenge-drag-ghost-invalid', !STATE.shared.isDrawable());
            };

            FUNC.setStyle(moverFigure, {
                left: `${e.pageX - width / 2}px`,
                top: `${e.pageY - height - 22}px`
            });
            FUNC.setStyle(divElement, { opacity: .4 });

            FUNC.attach(CONSTANTS.dom, 'pointermove', moveHandler)
            FUNC.attach(CONSTANTS.dom, 'pointerup', mouseUpHandler);
            FUNC.attach(CONSTANTS.dom, 'pointercancel', mouseUpHandler);

            temporaryElement = moverFigure;
        };

        const mouseUpHandler = e => {
            if (!temporaryElement)
                return;

            FUNC.detach(CONSTANTS.dom, 'pointermove', moveHandler);
            temporaryElement.remove();
            temporaryElement = null;
            $tmpFigureHelper.clearHtml();
            divElement.style.removeProperty('opacity');

            if (e.type !== 'pointercancel') this.getHandler('mouseup').next(e, figure, { index });
            document.querySelectorAll('.challenge-drop-preview-valid, .challenge-drop-preview-invalid')
                .forEach(cell => cell.classList.remove('challenge-drop-preview-valid', 'challenge-drop-preview-invalid'));

            // Reset block indexes which were found
            STATE.shared.resetDrawable();

            this.afterClick(false, { e, figure, divElement, index });

            // important
            FUNC.detach(CONSTANTS.dom, 'pointerup', mouseUpHandler);
            FUNC.detach(CONSTANTS.dom, 'pointercancel', mouseUpHandler);
        };

        FUNC.attach(divElement, 'pointerdown', mousedownHandler);
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
            elem = FUNC.elt('div', 'challenge-drag-ghost position-absolute', 'mover-figure');
            CONSTANTS.dom.body.append(elem);
        }

        return elem;
    }
}

const $figureMover = new FigureMover();
export default $figureMover;
