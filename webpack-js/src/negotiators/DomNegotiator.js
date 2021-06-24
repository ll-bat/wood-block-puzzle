import FUNC from "../general/Custom";
import DomNegotiatorAbstract from "../core/abstract/DomNegotiatorAbstract";
import CONSTANTS from "../general/Constants";

export default class DomNegotiator extends DomNegotiatorAbstract {
    /**
     * @type {HTMLDivElement}
     * @var _divElement
     */

    /**
     * @param $element {HTMLElement|String}
     */
    constructor($element = null) {
        super();

        if ($element && typeof $element === 'string') {
            $element = this.findOrCreate($element);
        }

        this.setElement($element);
    }

    findOrCreate($elementId) {
        let element = FUNC.$($elementId);
        if (!element) {
            element = FUNC.elt('div', null, $elementId);
            CONSTANTS.dom.body.append(element);
        }
        return element;
    }

    /**
     * @param $element {HTMLElement|String}
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
        this.getElement().append($element)
    }

    clearHtml() {
        this.getElement().innerHTML = "";
    }
}