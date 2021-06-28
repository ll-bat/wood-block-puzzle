import Styler from "../core/abstract/Styler";

export default class RandomFigure extends Styler {
    constructor({ figure, divElement, index }) {
        super();
        this.figure = figure;
        this.divElement = divElement;
        this.index = index;
        this.locked = false;
    }

    getFigureName() {
        return this.figure;
    }

    gitFigureIndex() {
        return this.index;
    }

    getDivElement() {
        return this.divElement;
    }

    lock() {
        if (this.isLocked())
            return;

        this.locked = true;
        this.style({ opacity: .5 });
    }

    unlock() {
        if (!this.isLocked())
            return;

        this.locked = false;
        this.style({ opacity: 1 })
    }

    isLocked() {
        return this.locked === true;
    }
}