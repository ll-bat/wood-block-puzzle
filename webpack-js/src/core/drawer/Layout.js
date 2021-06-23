import $boxes from "../../shared/store/Boxes";
import CONSTANTS from "../../general/Constants";
import FUNC from "../../general/Custom";

class Layout {
    /**
     * @type {DomNegotiator}
     * @var _domNegotiator
     */

    constructor() {
        this._domNegotiator = null;
    }

    /**
     * @param layoutNegotiator {DomNegotiator}
     */
    setup(layoutNegotiator) {
        this._domNegotiator = layoutNegotiator;
    }

    draw() {
        this.initBoxes()
        this.drawLayout();
        this.customizeBoardSize();
    }

    customizeBoardSize($height = null) {
        if (!$height) {
            $height = (CONSTANTS.boxHeight + 3) * CONSTANTS.boxesOnColumn;
            $height += FUNC.$('#site-navbar').offsetHeight;
            $height += 30;
            if ($height > CONSTANTS.height) {
                $height = CONSTANTS.height - 100;
            }

            FUNC.setStyle(this._domNegotiator.getElement(), {
                height: $height + 'px'
            });
        } else {
            console.log('all done');
        }
    }

    initBoxes() {
        $boxes.reset()

        for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
            $boxes.addRow();

            for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
                let x = j * (CONSTANTS.boxWidth + 1) + CONSTANTS.offsetX
                let y = i * (CONSTANTS.boxHeight + 1) +CONSTANTS.offsetY

                $boxes.addAt(i, { x, y });
            }
        }
    }

    drawLayout() {
        this._domNegotiator.clearHtml();

        for (let i = 0; i < CONSTANTS.boxesOnColumn; i++) {
            for (let j = 0; j < CONSTANTS.boxesOnRow; j++) {
                const box = $boxes.get(i,j);
                this.drawOneBlock(box)
            }
        }
    }

    /**
     * @param box {Box}
     */
    drawOneBlock(box) {
        let el = FUNC.elt('div', "box", null, {
            position: 'absolute',
            width: (CONSTANTS.boxWidth) + "px",
            height: (CONSTANTS.boxHeight) + "px",
            left: box.getCoordinateX() + 'px',
            top: box.getCoordinateY() + 'px',
            background: '#1E1E1E', //rgba(0,0,0,.02)
            border: '2px solid black' //1px solid rgba(0,0,0,.051)
        })

        el.onmousedown = (e) => e.preventDefault()

        this._domNegotiator.append(el)
        box.setReferenceDiv(el);
    }
}

const $layout = new Layout();
export default $layout;