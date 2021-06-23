import Menu from './Menu'
import layout from './layout'
import figureHelper from '../core/figure'
import score from './score'
import state from '../shared/store/state'
import remover from '../core/remover'

class Game {
    constructor() {
        this.finished = false;
        // this.rand = Math.random()
    }

    start() {
        this.reset()
        Menu.hide();
        layout.init();
        figureHelper.drawFigures()
    }

    lose() {
        this.finished = true;
        score.updateMaxScore();
        setTimeout(() => {
            Menu.show()
        }, 700)

    }

    reset() {
        score.reset()
        state.reset();
        remover.reset();
        figureHelper.reset();
        this.finished = false;
    }
}

const game = new Game()
export default game