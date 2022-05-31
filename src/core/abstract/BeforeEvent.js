import EventHandler from "./EventHandler";
import NextHandler from "./NextHandler";

export default class BeforeEvent extends EventHandler {
    constructor() {
        super();

        /**
         * @type {NextHandler}
         */
        this.beforeClickHandler = null;
    }

    /**
     * @param $handler {NextHandler}
     */
    onBeforeClick($handler = null) {
        this.beforeClickHandler = $handler;
    }

    /**
     * @param params {Object}
     * @return {*}
     */
    triggerBeforeClick(params = {}) {
        if (this.hasBeforeClickHandler()) {
            return this.beforeClickHandler.next({}, null, params);
        }
    }

    hasBeforeClickHandler() {
        return this.beforeClickHandler !== null;
    }
}