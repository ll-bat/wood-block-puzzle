
const STATE = {
    shared: {
        blockIndex: { x: null, y: null },
        drawable: null,
        setDrawable($state) {
            this.drawable = $state;
        },
        isDrawable() {
            return this.drawable;
        },
        setBlockIndexes({ x, y }) {
            this.blockIndex = { x, y }
        },
        getBlockIndexes() {
            return this.blockIndex;
        },
        resetDrawable() {
            this.blockIndex = { x: null, y: null }
            this.setDrawable(null);
        }
    },
    relax: {
        randomFigures: [],
        /**
         * @param figure {String} such as `TYPE_1`
         * @param divElement {HTMLElement}
         */
        addRandomFigure({ figure, divElement}) {
            this.randomFigures.push({ figure, divElement });
        },
        getFigures() {
            return this.randomFigures;
        },
        removeFigure(figure) {

        },
        clear() {
            this.randomFigures = [];
        }
    }
}

export default STATE;