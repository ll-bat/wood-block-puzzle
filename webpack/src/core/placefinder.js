import { boxesOnRow, boxesOnColumn } from '../shared/constants'
import { setStyle } from '../shared/custom'
import painter from './painter'
import state from '../shared/store/state'
import game from '../main/game'

class PlaceFinder {
    constructor() {
        this.RUN_SLOW = 'runSlow';
        this.type = null;
        this.found = false;
    }

    check(figureType, figure, divElement) {
        this.type = figureType;
        this.run(this.RUN_SLOW, { figure, divElement })
    }

    checkAll(figures) {
        this.found = false;
        figures.forEach(figure => {
            this.check(figure.type, figure.figure, figure.div)
        })
        if (!this.found) {
            game.lose();
        }
    }

    run(TYPE, { figure, divElement }) {
        const can = this.runSlow(figure)
        this.update(can, divElement)
    }

    runSlow(figure) {
        let found = false;
        for (let i = 0; i < boxesOnRow && !found; i++) {
            for (let j = 0; j < boxesOnColumn && !found; j++) {
                let can = this.tryToFit({ i, j }, figure)
                if (can) found = true;
            }
        }
        return found;
    }

    tryToFit({ i, j }, figure) {
        return painter.canBeDrawn({ x: i, y: j }, figure)
    }

    update(status, div) {
        state.isDrawable[this.type] = status;
        if (!status) {
            setStyle(div, {
                opacity: '.3'
            })
        } else {
            this.found = true;
            setStyle(div, {
                opacity: '1'
            })
        }
    }

}

const placeFinder = new PlaceFinder();
export default placeFinder