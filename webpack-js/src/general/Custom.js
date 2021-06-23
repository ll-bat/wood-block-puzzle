import CONSTANTS from "./Constants";

const FUNC = {
    $(id) {
        return CONSTANTS.dom.querySelector(id);
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

export default FUNC;