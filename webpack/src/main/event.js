import { $, attach, detach, setStyle } from '../shared/custom'
import { dom, boxWidth, boxHeight, boxColor, figureOffsetX, figureOffsetY } from '../shared/constants'
import CONFIG from '../shared/store/config'
import state from '../shared/store/state'
import boxfinder from '../core/boxfinder'
import game from './game'
import figureHelper from '../core/figure'
import painter from '../core/painter'

export default class Event {
    static register(box, figure, type) {
        let mousePressed = null;

        function update(ev) {
            moveFigure(ev)
            boxfinder.findAndDraw(ev)
        }

        function moveFigure(e) {
            let { x, y } = CONFIG.coords(e);
            x = x + figureOffsetX + 'px';
            y = y + figureOffsetY + 'px';

            setStyle($("figure"), {
                left: x,
                top: y,
            })
        }

        function clickEvent(e) {
            e.preventDefault();

            if (!state.isDrawable[type] || game.finished) return;
            mousePressed = true;

            state.set({
                figure,
                boxDiv: box,
                type,
                boxCoords: null
            })

            figureHelper.draw(figure, boxWidth * .96, boxHeight * .96, $("figure"), {
                background: boxColor,
                border: '2px solid grey',
                borderRadius: '3px',
            })
            setStyle(box, {
                opacity: .3,
            })
            update(e)
        }

        function endEvent(e) {
            if (!state.isDrawable[type] || game.finished) return;
            setStyle(box, {
                opacity: "1"
            })
            $("figure").innerHTML = ""
            if (mousePressed) {
                painter.tryToDraw();
                mousePressed = false;
            }
        }

        attach(box, CONFIG.get('click'), (e) => {
            clickEvent(e);
            attach(dom, CONFIG.get("move"), update)
            attach(dom, CONFIG.get("end"), end)
        })

        function end(ev) {
            endEvent(ev);
            detach(dom, CONFIG.get("move"), update)
            detach(dom, CONFIG.get("end"), end)
        }
    }
}