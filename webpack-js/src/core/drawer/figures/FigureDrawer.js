import CONSTANTS from "../../../general/Constants";
import FUNC from "../../../general/Custom";
import Figure from "./leaves/Figure";


class FigureDrawer {
    /**
     * @param figureObjOrPattern {Figure|Array}
     * @param scaleK
     * @param $style {object}
     */
    draw(figureObjOrPattern, scaleK = 3, $style = {}) {
        if (figureObjOrPattern instanceof Figure) {
            figureObjOrPattern = figureObjOrPattern.pattern;
        }

        let boxDiv = FUNC.elt("div", "box", null, {
            position: "relative",
            userSelect: 'none',
        });

        const bw = CONSTANTS.boxWidth / scaleK;
        const bh = CONSTANTS.boxHeight / scaleK;

        this.drawFigureWithDetails(figureObjOrPattern, bw, bh, boxDiv, $style);
        return boxDiv;
    }

    /**
     *
     * @param pattern {Array} the figure pattern
     * @param bw width of the one block
     * @param bh height of the one block
     * @param parentDiv {HTMLDivElement} parent div where each blocked should be appended
     * @param style {Object} extra style for each block
     */
    drawFigureWithDetails(pattern, bw, bh, parentDiv, style = {}) {
        pattern.forEach((r, i) => {
            r.forEach((c, j) => {
                if (pattern[i][j] !== ".") {
                    let l = j * (bw + 3);
                    let t = i * (bh + 3);

                    let el = FUNC.elt("div", null, null, {
                        top: t + "px",
                        left: l + "px",
                        width: bw + "px",
                        height: bh + "px",
                        background: CONSTANTS.boxColor,
                        position: "absolute",
                    })

                    FUNC.setStyle(el, style)
                    parentDiv.append(el);
                }
            })
        })
    }
}

const $figureDrawer = new FigureDrawer();
export default $figureDrawer;