import MultipleNextHandlers from "./MultipleNextHandlers";
import NextHandler from "./NextHandler";

export default class EventHandler {
    constructor() {
        this._handlers = {}
    }
    /**
     * @param $mouseEvent {String}
     * @param $nextHandler {NextHandler}
     */
    registerHandler($mouseEvent, $nextHandler) {
        if (!($nextHandler instanceof NextHandler)) {
            throw new DOMException($nextHandler + ' should be an instance of NextHandler::class')
        }

        let thisHandlers = this._handlers[$mouseEvent];
        if (!thisHandlers) {
            thisHandlers = [];
        }

        thisHandlers.push($nextHandler);
        this._handlers[$mouseEvent] = thisHandlers;
    }

    /**
     * @param $mouseEvent
     * @return {NextHandler}
     */
    getHandler($mouseEvent) {
        if (this.hasHandler($mouseEvent)) {
            const handlers = this._handlers[$mouseEvent];
            return new MultipleNextHandlers(handlers);
        }
        throw new DOMException($mouseEvent + ' handler has not been registered');
    }

    hasHandler($mouseEvent) {
        return this._handlers[$mouseEvent] != null;
    }
}