import FUNC from "../../../general/Custom";

export default class Box {
    constructor({ x, y }) {
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

    setBusy($state = true) {
        this.data.busy = $state;
    }

    /**
     * @param $div {HTMLElement}
     */
    setReferenceDiv($div) {
        this.referenceDiv = $div;
    }

    getReferenceDiv() {
        return this.referenceDiv;
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


}

