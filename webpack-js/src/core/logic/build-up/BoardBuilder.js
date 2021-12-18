import Figure from "../../drawer/figures/leaves/Figure";
import CONSTANTS from "../../../general/Constants";
import $figures from "../../drawer/figures/Figures";

const FIGURE = "figure"
const X = "x"
const Y = "y"
const NTH = "nth"
const AVAILABLE_PLACES = "available_places"
const CRASH_ROWS = "crash_rows"
const CRASH_COLUMNS = "crash_columns"

class Board {
    constructor() {
        this.boxes = []
        this.init()
    }

    init() {
        for (let i = 0; i < CONSTANTS.boxesOnRow; i++) {
            const boxes = []
            for (let j = 0; j < CONSTANTS.boxesOnColumn; j++) {
                boxes.push(0)
            }
            this.boxes.push(boxes)
        }
    }

    get(i, j) {
        return this.boxes[i][j]
    }

    set(i, j) {
        this.boxes[i][j] = 1;
    }

    unset(i, j) {
        this.boxes[i][j] = 0;
    }

}

class BuildingBoard {
    constructor() {
        this._board = new Board()
        this._obj_filters = []
        this._new_filter = []
    }

    _prepareNewFilter() {
        this._new_filter = {
            [FIGURE] : null,
            [X] : null,
            [Y] : null,
            [NTH] : null,
            [AVAILABLE_PLACES] : null,
            [CRASH_ROWS] : null,
            [CRASH_COLUMNS] : null,
        }
    }

    _endNewFilter() {
        this._obj_filters.push(this._new_filter)
        this._new_filter = null;
    }

    _set(filter, val) {
        this._new_filter[filter] = val;
    }

    getBoard() {
        return this._board
    }

    _hasFilter(filter) {
        return this._new_filter[filter] !== undefined
    }

    _applyFilter(filter, param) {
        this[filter](param)
    }

    _setFilters(filters) {
        this._prepareNewFilter()
        for (let filter in filters) {
            if (this._hasFilter(filter)) {
                this._set(filter, filters[filter])
            } else {
                alert("wrong filter: " + filter)
                throw new DOMException("applying unknown filter: " + filter)
            }
        }
        this._endNewFilter()
    }

    apply(filter) {
        this._setFilters(filter)
    }

    build() {
        // TODO implement build logic
    }

    [FIGURE](figure) {
        console.log('applying figure: ', figure)
    }

    [X](x) {
        console.log('applying x: ', x)
    }

    [Y](y) {
        console.log('applying y: ', y)
    }

    [NTH](n) {
        console.log('applying nth: ', n)
    }

    [AVAILABLE_PLACES](n) {
        console.log('applying avail_places: ', n)
    }

    [CRASH_COLUMNS](columns) {
        console.log('applying crash_columns: ', columns)
    }

    [CRASH_ROWS](rows) {
        console.log('applying crash_rows: ', rows)
    }

}

class BuildByFigure {
    constructor() {
        this.figure = Figure
        this.figureX = -1
        this.figureY = -1
        this.figureShouldBeDrawnNth = -1
        this.figureAvailablePlaces = -1
        this.figureShouldCrashRows = []
        this.figureShouldCrashColumns = []
    }

    withFigure(figure) {
        // this means that board puzzle should be solved by this figure
        this.figure = figure
    }

    withFigurePosition(x, y) {
        // this means that to solve the puzzle you have to put this figure on that position [x, y]
        this.figureX = x;
        this.figureY = y;
    }

    withFigureNth(n) {
        // when to put this figure: first, second, ....nth ?
        this.figureShouldBeDrawnNth = n
    }

    withFigureAvailablePlacesInBoard(n) {
        // how many places should be there on board so that we can put this figure ?
        this.figureAvailablePlaces = n
    }

    withCrashRows(rows) {
        // Should any rows be crashed after putting this figure on the right position ?
        this.figureShouldCrashRows = rows
    }

    withCrashColumns(columns) {
        // Should any columns be crashed after putting this figure on the right position ?
        this.figureShouldCrashColumns = columns
    }

    toObject() {
        return {
            [FIGURE]: this.figure,
            [X]: this.figureX,
            [Y]: this.figureY,
            [NTH]: this.figureShouldBeDrawnNth,
            [AVAILABLE_PLACES]: this.figureAvailablePlaces,
            [CRASH_COLUMNS]: this.figureShouldCrashColumns,
            [CRASH_ROWS]: this.figureShouldCrashRows
        }
    }

}

export class BoardBuilder {
    /**
     * @param buildByFigures {BuildByFigure[]}
     */
    constructor(buildByFigures = []) {
        this.buildByFigures = buildByFigures
    }

    /**
     * @type {BuildByFigure}
     */
    buildByFigure(bbf) {
        this.buildByFigures.push(bbf)
    }

    build() {
        /**
         * We have some figures, say 2 figures
         * let these two figures be:
         * 1. '###',    '#'
         *              '#'
         *              '#'
         *
         * 2. let first figure's [x, y] be [0, 0]
         *
         * 3. let '###' be put first
         *
         * 4. let there be 5 available places for first figure to position on board
         *
         * 5. let 1 column crash after we place this figure at right position
         *
         * 6. let 0 row crash after we place this figure at right position
         *
         * find such a box-combination on board so that it's hard for user to find a solution
         *
         */
        const buildingBoard = new BuildingBoard()
        for (let buildBy of this.buildByFigures)
            buildingBoard.apply(buildBy.toObject())
        buildingBoard.build()
        return buildingBoard.getBoard()
    }
}

class Tester {
    run() {
        let buildBy, figure, boardBuilder, board;
        figure = $figures.getFigure("HORIZONTAL_THREE_DOT")
        buildBy = new BuildByFigure()
        buildBy.withFigure(figure)
        buildBy.withFigureNth(0)
        buildBy.withFigurePosition(0, 0)
        buildBy.withFigureAvailablePlacesInBoard(5)
        buildBy.withCrashColumns(1)
        buildBy.withCrashRows(0)
        boardBuilder = new BoardBuilder()
        boardBuilder.buildByFigure(buildBy)
        board = boardBuilder.build()
    }
}


export const tester = new Tester()
tester.run()