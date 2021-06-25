
const STATE = {
    shared: {
        blockIndex: {
            x: null, y: null
        },
        setBlockIndexes({ x, y }) {
            this.blockIndex = { x, y }
        },
        getBlockIndexes() {
            return this.blockIndex;
        },
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
        clear() {
            this.randomFigures = [];
        }
    }
}

export default STATE;