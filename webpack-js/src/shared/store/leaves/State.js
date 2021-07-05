import FUNC from "../../../general/Custom";
import RandomFigure from "../../../leaves/RandomFigure";

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
        /**
         * @type {RandomFigure[]}
         */
        randomFigures: [],
        /**
         * @type {RandomFigure[]}
         */
        cachedFigures: [],
        /**
         * @param figure {String} such as `TYPE_1`
         * @param divElement {HTMLElement}
         * @param index {Number}
         */
        addRandomFigure({ figure, divElement, index }) {
            this.randomFigures.push(new RandomFigure({ figure, divElement, index }));
        },
        getFigures() {
            return this.randomFigures;
        },
        /**
         * @param index
         * @return {RandomFigure}
         */
        getRandomFigure(index) {
            return this.getFigures().find(figure => figure.index === index);
        },
        removeRandomFigure(figure, index) {
            /**
             * @type {RandomFigure}
             */
            const thisFigure = this.randomFigures.find(f => f.index === index);
            FUNC.setStyle(thisFigure.getDivElement(), { visibility: "hidden"})
            const figureIndex = this.randomFigures.findIndex(f => f.index === index);
            this.randomFigures.splice(figureIndex, 1);
            this.cachedFigures.push(thisFigure);
        },
        isAllFiguresDrawn() {
            return this.randomFigures.length === 0;
        },
        clear() {
            this.cachedFigures.forEach(figure => {
                figure.getDivElement().remove();
            });

            this.cachedFigures = [];
            this.randomFigures = [];
        },
        reset() {
            this.clear();
        }
    }
}

export default STATE;