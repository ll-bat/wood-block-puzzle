class State {
    constructor() {
        this.figure = null;
        this.type = null;
        this.boxDiv = null;
        this.boxCoords = null;
        this.isDrawable = {};
        this.allFigures = []
    }

    set(obj) {
        for (let a in obj) {
            this[a] = obj[a]
        }
    }

    reset() {
        this.figure = null;
        this.type = null;
        this.boxDiv = null;
        this.boxCoords = null;
        this.isDrawable = {};
        this.allFigures = [];
    }
}

const state = new State()
export default state;