import ErrorHandler from "../abstract/ErrorHandler";
import NextHandler from "../abstract/NextHandler";
import EVENTS from "./Events";
import Configurable from "../abstract/Configurable";

export default class DefaultEvents extends Configurable {
    constructor(props) {
        super();
        this.beforeClickHandlers = [];
        this.afterClickHandlers = [];
    }

    /**
     * @param $nextHandler {NextHandler|Boolean}
     * @param $payload {Object}
     */
    beforeClick($nextHandler = false, $payload = {}) {
        if (!$nextHandler) {
            this.triggerNextHandlers(EVENTS.BEFORE_MOUSE_DOWN, $payload);
        } else {
            if (!($nextHandler instanceof NextHandler)) {
                this.log($nextHandler);
                this.error('$nextHandler is not an instance of NextHandler::class');
            } else {
                this.beforeClickHandlers.push($nextHandler);
            }
        }
    }

    /**
     * @param $nextHandler {NextHandler|Boolean}
     * @param $payload {Object}
     */
    afterClick($nextHandler = false, $payload = {}) {
        if (!$nextHandler) {
            this.triggerNextHandlers(EVENTS.AFTER_MOUSE_UP,$payload);
        } else {
            if (!($nextHandler instanceof NextHandler)) {
                this.log($nextHandler);
                this.error('$nextHandler is not an instance of NextHandler::class');
            } else {
                this.afterClickHandlers.push($nextHandler);
            }
        }
    }

    triggerNextHandlers($type, $payload) {
        const nextHandlers = $type === EVENTS.BEFORE_MOUSE_DOWN
            ? this.beforeClickHandlers
            : this.afterClickHandlers;

        /**
         * @type {NextHandler}
         */
        for (let nextHandler of nextHandlers) {
            nextHandler.next($payload);
        }
    }
}