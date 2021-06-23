import { $, elt, setStyle } from '../shared/custom'
import { width, height, boxWidth, boxHeight, boxColor } from '../shared/constants'
import FIGURES from '../shared/store/figures'
import Event from '../main/event'
import state from '../shared/store/state'
import placeFinder from './placefinder'

class Figure {
    constructor() {
        this.scaleK = 3;
        this.cnt = null;
        this.reset();
    }

    removeFigure() {
        setStyle(state.boxDiv, {
            visibility: 'hidden'
        })
        if (--this.cnt === 0) {
            this.cnt = 3;
            figureHelper.drawFigures();
        }
    }

    getRandomFigures(cnt = 3) {
        let keys = Object.keys(FIGURES);
        let len = keys.length;
        let randomFigures = [];

        for (let i = 0; i < cnt; i++) {
            let ind = Math.floor(Math.random() * len);
            randomFigures.push(keys[ind]);
        }
        return randomFigures;

    }

    drawFigures() {
        $('menu').innerHTML = "";

        let randomFigures = this.getRandomFigures();
        randomFigures.forEach(figureType => {
            this.drawFigure(figureType)
        })
        placeFinder.checkAll(state.allFigures)
    }

    drawFigure(figureType) {
        let type = figureType;
        let figure = FIGURES[type].figure
        figure = figure.split("\n")
            .map(c => c.trim())
            .filter(c => c)
            .map(c => c.split(""))

        let marginLeft = width / 6.4 + 'px';
        let box = elt("box", null, null, {
            position: "relative",
            marginLeft: marginLeft,
            marginRight: marginLeft
        })

        const bw = boxWidth / this.scaleK;
        const bh = boxHeight / this.scaleK;

        this.draw(figure, bw, bh, box)
        Event.register(box, figure, type)

        state.allFigures.push({
            type: figureType,
            figure,
            div: box,
        })

        $("menu").append(box)
    }

    draw(figure, bw, bh, box, style = {}) {
        figure.forEach((r, i) => {
            r.forEach((c, j) => {
                if (figure[i][j] !== ".") {
                    let l = j * (bw + 3);
                    let t = i * (bh + 3);

                    let el = elt("div", null, null, {
                        top: t + "px",
                        left: l + "px",
                        width: bw + "px",
                        height: bh + "px",
                        background: boxColor,
                        position: "absolute",
                    })
                    setStyle(el, style)
                    box.append(el);
                }
            })
        })
    }

    reset() {
        this.cnt = 3;
    }
}

const figureHelper = new Figure();
export default figureHelper