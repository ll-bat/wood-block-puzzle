import NextHandler from "./NextHandler";

export default class MultipleNextHandlers extends NextHandler {
    constructor(handlers) {
        super();
        /**
         * @type {NextHandler[]}
         */
        this.handlers = handlers;
    }

    /**
     * @param e
     * @param figure
     * @param extraData
     */
    next(e, figure, extraData = {}) {
        for (const handler of this.handlers) {
            handler.next(e, figure, extraData);
        }
    }
}