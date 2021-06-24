import DomNegotiatorAbstract from "../../../core/abstract/DomNegotiatorAbstract";
import $figureDrawer from "../../../core/drawer/figures/FigureDrawer";
import $figures from "../../../core/drawer/figures/Figures";
import DomNegotiator from "../../../negotiators/DomNegotiator";
import FUNC from "../../../general/Custom";
import $boxes from "../Boxes";

class TmpFigureHelper extends DomNegotiator {
    constructor() {
        super('#tmp-element');
    }

    drawTmpFigure({ x, y }, figure) {
        this.clearHtml();
        const divElement = $figures.draw(figure, 1.02, { opacity: .3 });
        this.append(divElement);

        const box = $boxes.get(x, y);

        FUNC.setStyle(this.getElement(), {
            position: 'absolute',
            left: box.getCoordinateX() + 'px',
            top: box.getCoordinateY() + 'px',
        });
    }
}

const $tmpFigureHelper = new TmpFigureHelper();
export default $tmpFigureHelper;