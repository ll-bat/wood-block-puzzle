import MultipleNextHandlers from "./MultipleNextHandlers";
import NextHandler from "./NextHandler";

export default class EventHandler {
    constructor() {
        this._handlers = {}
    }
    /**
     * @param $mouseEvent {String}
     * @param $nextHandler {NextHandler}
     * @param $multiple {Boolean}
     */
    registerHandler($mouseEvent, $nextHandler, $multiple = true) {
        if (!($nextHandler instanceof NextHandler)) {
            throw new DOMException($nextHandler + ' should be an instance of NextHandler::class')
        }

        let thisHandlers;
        if ($multiple) {
            thisHandlers = this._handlers[$mouseEvent];
            if (!thisHandlers) {
                thisHandlers = [];
            }

            thisHandlers.push($nextHandler);
        } else {
            thisHandlers = $nextHandler;
        }

        this._handlers[$mouseEvent] = thisHandlers;
    }

    /**
     * @param $mouseEvent
     * @param $multiple {Boolean}
     * @return {NextHandler}
     */
    getHandler($mouseEvent, $multiple = true) {
        if (this.hasHandler($mouseEvent)) {
            const handlers = this._handlers[$mouseEvent];
            if ($multiple) {
                return new MultipleNextHandlers(handlers);
            } else {
                if (!(handlers instanceof NextHandler)) {
                    throw new DOMException('There are more than 1 or 0 event handlers for event ' + $mouseEvent);
                }

                return handlers;
            }
        }
        throw new DOMException($mouseEvent + ' handler has not been registered');
    }

    hasHandler($mouseEvent) {
        return this._handlers[$mouseEvent] != null;
    }

    triggerNextHandler($eventType, $multiple = false, ...$params) {
        if (this.hasHandler($eventType)) {
            return this.getHandler($eventType, $multiple).next({}, null, ...$params);
        } else {
            return true;
        }
    }
}