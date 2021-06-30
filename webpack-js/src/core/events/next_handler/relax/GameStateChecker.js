import NextHandler from "../../../abstract/NextHandler";
import STATE from "../../../../shared/store/leaves/State";

class GameStateChecker extends NextHandler {
    next(e, figure, extraData = {}) {
        const someUnlockedFigure = STATE.relax.getFigures()
            .find(figure => !figure.isLocked());

        if (!someUnlockedFigure) {
            setTimeout(e => {
                location.reload();
            }, 400)
        }
    }
}

const $gameStateChecker = new GameStateChecker();
export default $gameStateChecker;