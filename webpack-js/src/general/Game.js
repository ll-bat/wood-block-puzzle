import Relax from "./game_types/Relax";
import GameStarter from "../core/abstract/GameStarter";

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

    relax() {
        const relax = new Relax();
        relax.start();
        this.gamer = relax;
    }

    restart() {
        this.gamer.restart();
    }
}

const $game = new Game();
export default $game;
