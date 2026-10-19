import Relax from "./game_types/Relax";
import GameStarter from "../core/abstract/GameStarter";
import {GAME_TYPE_BUILD_UP, GAME_TYPE_CHALLENGE, GAME_TYPE_RELAX} from "./game_types/Constants";
import BuildUp from "./game_types/BuildUp";
import Challenge from './game_types/Challenge';
import { challengeConfigurationFromLocation } from '../puzzle/challenge';

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
        const buildUp = new BuildUp()
        buildUp.start()
        this.gamer = buildUp
    }

    [GAME_TYPE_CHALLENGE]() {
        const configuration = typeof window === 'undefined'
            ? { source: null, selector: {} }
            : challengeConfigurationFromLocation(window.location, {
                source: window.WOOD_BLOCK_CHALLENGE_SOURCE,
                selector: window.WOOD_BLOCK_CHALLENGE_SELECTOR,
            });
        const challenge = new Challenge(configuration.source, configuration.selector);
        challenge.start();
        this.gamer = challenge;
    }

    restart() {
        this.gamer.restart();
    }
}

const $game = new Game();
export default $game;
