import ErrorHandler from "../abstract/ErrorHandler";
import EventHandler from "../abstract/EventHandler";

export default class Middleware extends EventHandler {

    constructor() {
        super();
        this.middlewares = {};
    }

    /**
     * @param $eventType {String}
     * @param $middleware {Middleware}
     * @param $multiple {Boolean}
     */
    addMiddleware($eventType, $middleware, $multiple = true) {
        if (!($middleware instanceof Middleware)) {
            this.log($middleware);
            this.error('$middleware is not an instance of Middleware::class');
        }

        if ($multiple) {
            if (!this.middlewares[$eventType]) {
                this.middlewares[$eventType] = [];
            }
            this.middlewares[$eventType].push($middleware);
        } else {
            this.middlewares[$eventType] = [$middleware];
        }
    }

    passesMiddlewares($eventType, $params = {}) {
        if (!this.middlewares[$eventType]) {
            return true;
        }

        /**
         * @type {Middleware}
         */
        for (let middleware of this.middlewares[$eventType]) {
            if (!middleware.canPass($params)) {
                return false;
            }
        }

        return true;
    }

    canPass($params = {}) {
        return true;
    }
}