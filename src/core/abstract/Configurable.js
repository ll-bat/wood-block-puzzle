import ErrorHandler from "./ErrorHandler";

export default class Configurable extends ErrorHandler {
    /**
     * @param params {Object} list of `key => value` pairs representing configuration of the current class
     */
    configure(params) {
        for (let a in params) {
            this[a] = params[a];
        }
    }
}