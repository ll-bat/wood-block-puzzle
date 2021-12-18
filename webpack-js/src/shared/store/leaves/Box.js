import FUNC from "../../../general/Custom";

export default class Box {
    constructor({x, y}) {
        /**
         * @types int
         */
        this.x = x;
        this.y = y;

        /**
         *
         * @type {HTMLElement}
         */
        this.referenceDiv = null;

        this.data = {};
    }

    isBusy() {
        if (this.data.busy) {
            return 1;
        }
        return 0;
    }

    setBusy($state = true, $color = false) {
        this.data.busy = $state;
        if ($color) {
            this.style({
                background: $state ? "#92522e" : "rgb(30, 30, 30)"
            })
        }
    }

    toggleBusy($color = false) {
        this.setBusy(!this.isBusy(), $color)
    }

    /**
     * @param $div {HTMLElement}
     */
    setReferenceDiv($div) {
        this.referenceDiv = $div;
    }

    /**
     * @return {HTMLElement}
     */
    getReferenceDiv() {
        return this.referenceDiv;
    }

    /**
     * @return {HTMLElement}
     */
    getDiv() {
        return this.getReferenceDiv()
    }

    /**
     * @param $style {Object}
     */
    style($style) {
        FUNC.setStyle(this.getReferenceDiv(), $style);
        // console.log('got into style')
    }

    getCoordinateX() {
        return this.x;
    }

    getCoordinateY() {
        return this.y;
    }

    reset() {
    }
}

