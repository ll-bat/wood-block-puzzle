export default class EventHandler {
    constructor() {
        this._handlers = {}
    }
    /**
     * @param $mouseEvent {String}
     * @param $nextHandler {NextHandler}
     */
    registerHandler($mouseEvent, $nextHandler) {
        this._handlers[$mouseEvent] = $nextHandler;
    }

    /**
     * @param $mouseEvent
     * @return {NextHandler}
     */
    getHandler($mouseEvent) {
        if (this.hasHandler($mouseEvent)) {
            return this._handlers[$mouseEvent];
        }
        throw new DOMException($mouseEvent + ' handler has not been registered');
    }

    hasHandler($mouseEvent) {
        return this._handlers[$mouseEvent] != null;
    }
}