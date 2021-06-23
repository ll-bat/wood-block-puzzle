import FUNC from "../general/Custom";

export default class DomNegotiator {
    /**
     * @type {HTMLDivElement}
     * @var _divElement
     */

    /**
     * @param $element {HTMLElement|String}
     */
    constructor($element = null) {
        if ($element && typeof $element === 'string') {
            $element = FUNC.$($element);
        }

        this._divElement = $element;
    }

    /**
     * @param $element {HTMLDivElement}
     */
    setElement($element) {
        this._divElement = $element;
    }

    getElement() {
        return this._divElement;
    }

    /**
     * @param $element {HTMLElement}
     */
    append($element) {
        this._divElement.append($element)
    }

    clearHtml() {
        this._divElement.innerHTML = "";
    }
}