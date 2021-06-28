import Android from "../../general/Android";

const CONFIG = {
    android: {
        click: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },
    ps: {
        click: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    get(type) {
        if (Android) {
            if (!this.android[type]) {
                throw new DOMException(`${type} is not defined`)
            }
            return this.android[type]
        }
        if (!this.ps[type]) {
            throw new DOMException(`${type} is not defined`)
        }
        return this.ps[type];
    },
    coords(e) {
        if (Android) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        return { x: e.clientX, y: e.clientY }
    },
    getScreenWidth() {
        if (Android) {
            let ratio = window.devicePixelRatio || 1;
            return screen.width * ratio;
        }
        return window.innerWidth;
    },
    getScreenHeight() {
        if (Android) {
            let ratio = window.devicePixelRatio || 1;
            return screen.height * ratio;
        }
        return window.innerHeight
    }
}

export default CONFIG;