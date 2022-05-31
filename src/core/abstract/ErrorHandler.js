
export default class ErrorHandler {
    log(...messages) {
        console.log(...messages);
    }

    error(message) {
        throw new DOMException(message);
    }
}