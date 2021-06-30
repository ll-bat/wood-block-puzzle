import ErrorHandler from "../abstract/ErrorHandler";
import EventHandler from "../abstract/EventHandler";

export default class Middleware extends EventHandler {

    constructor() {
        super();
        this.middlewares = [];
    }

    /**
     * @param $middleware {Middleware}
     * @param $multiple {Boolean}
     */
    addMiddleware($middleware, $multiple = true) {
        if (!($middleware instanceof Middleware)) {
            this.log($middleware);
            this.error('$middleware is not an instance of Middleware::class');
        }

        if ($multiple) {
            this.middlewares.push($middleware);
        } else {
            this.middlewares = [$middleware];
        }
    }

    passesMiddlewares($params = {}) {
        /**
         * @type {Middleware}
         */
        for (let middleware of this.middlewares) {
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