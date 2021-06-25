import FUNC from "../../../general/Custom";

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
        cachedFigures: [],
        /**
         * @param figure {String} such as `TYPE_1`
         * @param divElement {HTMLElement}
         * @param index {Number}
         */
        addRandomFigure({ figure, divElement, index }) {
            this.randomFigures.push({ figure, divElement, index });
        },
        getFigures() {
            return this.randomFigures;
        },
        removeRandomFigure(figure, index) {
            const thisFigure = this.randomFigures.find(f => f.index === index);
            FUNC.setStyle(thisFigure.divElement, { visibility: "hidden"})
            const figureIndex = this.randomFigures.findIndex(f => f.index === index);
            this.randomFigures.splice(figureIndex, 1);
            this.cachedFigures.push(thisFigure);
        },
        isAllFiguresDrawn() {
            return this.randomFigures.length === 0;
        },
        clear() {
            this.cachedFigures.forEach(figure => {
                figure.divElement.remove();
            });

            this.cachedFigures = [];
            this.randomFigures = [];
        }
    }
}

export default STATE;