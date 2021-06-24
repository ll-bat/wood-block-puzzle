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

    /**
     * @param $div {HTMLElement}
     */
    setReferenceDiv($div) {
        this.referenceDiv = $div;
    }

    getReferenceDiv() {
        return this.referenceDiv;
    }

    getCoordinateX() {
        return this.x;
    }

    getCoordinateY() {
        return this.y;
    }


}

