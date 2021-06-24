export default class Configurable {
    /**
     * @param params {Object} list of `key => value` pairs representing configuration of the current class
     */
    configure(params) {
        for (let a in params) {
            this[a] = params[a];
        }
    }
}