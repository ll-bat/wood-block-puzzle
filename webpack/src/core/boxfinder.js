import { figureOffsetX, figureOffsetY, boxWidth, boxHeight, offsetX, offsetY } from '../shared/constants'
import state from '../shared/store/state'
import painter from './painter'
import finder from './finder'
import CONFIG from '../shared/store/config'

class BoxFinder {
    findAndDraw(e) {
        let { x, y } = CONFIG.coords(e);

        x = x + figureOffsetX;
        y = y + figureOffsetY;

        state.status = "finding";
        let sbox = this.bestBox({ x, y })
        if (sbox === -1) {
            painter.clearTmpFigure()
        }
        state.status = "found";
    }

    bestBox({ x, y }) {
        let errorX = boxWidth / 2;
        let errorY = 10;

        if (x < offsetX - errorX) {
            console.log("X < 0");
            painter.clearTmpFigure();
            return -1;
        }

        if (y < offsetY - errorY) {
            console.log("Y < 0");
            painter.clearTmpFigure();
            return -1;
        }


        while (true) {
            if (finder.isDone()) {
                state.boxCoords = { x: finder.x, y: finder.y }
                painter.drawTmpFigure({ x: finder.x, y: finder.y }, state.figure)
                finder.reset()
                break;
            }
            let coords = finder.getCoords();
            let [x1, y1] = [coords.x, coords.y]
            let typeX = null,
                typeY = null;

            if (x - errorX < x1) typeX = '-1';
            if (x >= x1 - errorX) typeX = '1';
            if (y - errorY < y1) typeY = '-1';
            if (y >= y1 - errorY) typeY = '1';

            finder.update(typeX, typeY);
        }
    }
}

const boxfinder = new BoxFinder()
export default boxfinder;