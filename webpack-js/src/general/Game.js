import Relax from "./game_types/Relax";
import GameStarter from "../core/abstract/GameStarter";
import {GAME_TYPE_BUILD_UP, GAME_TYPE_RELAX} from "./game_types/Constants";

class Game {
    init(type) {
        /**
         * @type {String}
         */
        this.type = type;
        /**
         * @type {GameStarter}
         */
        this.gamer = null;
    }

    /**
     * @return {GameStarter}
     */
    getMode() {
        return this.gamer
    }

    start() {
        const mode = this.type
        const isDefined = this[mode] !== undefined
        if (!isDefined) {
            throw new DOMException('no such type: ' + this.type)
        }

        this[mode].call(this)
    }

    [GAME_TYPE_RELAX]() {
        const relax = new Relax();
        relax.start();
        this.gamer = relax;
    }

    [GAME_TYPE_BUILD_UP]() {
        alert("game type build up ")
    }

    restart() {
        this.gamer.restart();
    }
}

const $game = new Game();
export default $game;
