import { dom } from './constants'

export function $(id) {
    return dom.getElementById(id)
}

export function dd(text) {
    $('dd').innerText = text
}

export function vv(text) {
    $("vv").innerText = text
}

export function attach(obj, ev, fn) {
    obj.addEventListener(ev, fn)
}

export function detach(obj, ev, fn) {
    obj.removeEventListener(ev, fn)
}

export function setStyle(el, style) {
    for (let a in style) {
        el.style[a] = style[a]
    }
}

export function elt(el, cls, id, style) {
    let elm = dom.createElement(el)
    if (cls) elm.className = cls
    if (id) elm.setAttribute('id', id)
    if (style) setStyle(elm, style)
    return elm
}