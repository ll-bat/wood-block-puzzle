import CONSTANTS from "./Constants";

const FUNC = {
    $(selector) {
        return CONSTANTS.dom.querySelector(selector);
    },

    dd(text) {
        $('dd').innerText = text;
    },

    vv(text) {
        $('vv').innerText = text;
    },

    attach($object, $event, $handler) {
        $object.addEventListener($event, $handler);
    },

    detach($object, $event, $handler) {
        $object.removeEventListener($event, $handler)
    },

    /**
     * @param divElement {HTMLElement}
     * @param className {string}
     */
    addClass(divElement, className) {
        divElement.classList.add(className)
    },

    /**
     * @param divElement {HTMLElement}
     * @param className {string}
     */
    removeClass(divElement, className) {
        divElement.classList.remove(className)
    },

    setStyle($element, $style) {
        for (let a in $style) {
            $element.style[a] = $style[a]
        }
    },

    elt($element, $classes, $id, $style) {
        let elm = CONSTANTS.dom.createElement($element);
        if ($classes) elm.className = $classes;
        if ($id) elm.setAttribute('id', $id);
        if ($style) this.setStyle(elm, $style)
        return elm
    }
}

const $limit = 50;
let power = 2;
const powers = [1];
for (let i = 1; i <= $limit; i++) {
    powers.push(power);
    power *= 2;
}

FUNC.power = num => {
    if (num <= $limit)
        return powers[num];
    throw new DOMException('num can"t be more than ' + $limit);
}

export default FUNC;