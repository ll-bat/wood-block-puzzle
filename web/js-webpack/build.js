/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/drawer/Layout */ "./src/core/drawer/Layout.js");
/* harmony import */ var _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./negotiators/DomNegotiator */ "./src/negotiators/DomNegotiator.js");
/* harmony import */ var _core_drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/drawer/concrete/relax/RandomFiguresDrawer */ "./src/core/drawer/concrete/relax/RandomFiguresDrawer.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _core_events_FigureMover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/events/FigureMover */ "./src/core/events/FigureMover.js");






_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.setup(
    new _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default('#content'));

_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.draw();

_core_drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_2__.default.setup(
    new _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default('#figures'));

_core_drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_2__.default.draw();

const randomFigures = _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_3__.default.relax.getFigures();
randomFigures.forEach(figureObj => {
    _core_events_FigureMover__WEBPACK_IMPORTED_MODULE_4__.default.register(figureObj);
});

/***/ }),

/***/ "./src/core/drawer/Layout.js":
/*!***********************************!*\
  !*** ./src/core/drawer/Layout.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");




class Layout {
    /**
     * @type {DomNegotiator}
     * @var _domNegotiator
     */

    constructor() {
        this._domNegotiator = null;
    }

    /**
     * @param layoutNegotiator {DomNegotiator}
     */
    setup(layoutNegotiator) {
        this._domNegotiator = layoutNegotiator;
    }

    draw() {
        this.initBoxes()
        this.drawLayout();
        this.customizeBoardSize();
    }

    customizeBoardSize($height = null) {
        if (!$height) {
            $height = (_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxHeight + 3) * _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxesOnColumn;
            $height += _general_Custom__WEBPACK_IMPORTED_MODULE_2__.default.$('#site-navbar').offsetHeight;
            $height += 30;
            if ($height > _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.height) {
                $height = _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.height - 100;
            }

            _general_Custom__WEBPACK_IMPORTED_MODULE_2__.default.setStyle(this._domNegotiator.getElement(), {
                height: $height + 'px'
            });
        } else {
            console.log('all done');
        }
    }

    initBoxes() {
        _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__.default.reset()

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxesOnColumn; i++) {
            _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__.default.addRow();

            for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxesOnRow; j++) {
                let x = j * (_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxWidth + 1) + _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.offsetX
                let y = i * (_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxHeight + 1) +_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.offsetY

                _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__.default.addAt(i, { x, y });
            }
        }
    }

    drawLayout() {
        this._domNegotiator.clearHtml();

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxesOnColumn; i++) {
            for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxesOnRow; j++) {
                const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__.default.get(i,j);
                this.drawOneBlock(box)
            }
        }
    }

    /**
     * @param box {Box}
     */
    drawOneBlock(box) {
        let el = _general_Custom__WEBPACK_IMPORTED_MODULE_2__.default.elt('div', "box", null, {
            position: 'absolute',
            width: (_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxWidth) + "px",
            height: (_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxHeight) + "px",
            left: box.getCoordinateX() + 'px',
            top: box.getCoordinateY() + 'px',
            background: '#1E1E1E', //rgba(0,0,0,.02)
            border: '2px solid black' //1px solid rgba(0,0,0,.051)
        })

        el.onmousedown = (e) => e.preventDefault()

        this._domNegotiator.append(el)
        box.setReferenceDiv(el);
    }
}

const $layout = new Layout();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($layout);

/***/ }),

/***/ "./src/core/drawer/concrete/relax/RandomFiguresDrawer.js":
/*!***************************************************************!*\
  !*** ./src/core/drawer/concrete/relax/RandomFiguresDrawer.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _figures_leaves_AllFigures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../figures/leaves/AllFigures */ "./src/core/drawer/figures/leaves/AllFigures.js");
/* harmony import */ var _figures_Figures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");




class RandomFiguresDrawer {
    constructor() {
    }

    /**
     * @param domNegotiator {DomNegotiator}
     */
    setup(domNegotiator) {
        this._domNegotiator = domNegotiator;
    }


    draw($figuresCount = 3) {
        this.ensureProperties();

        _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_2__.default.relax.clear();

        const keys = Object.keys(_figures_leaves_AllFigures__WEBPACK_IMPORTED_MODULE_0__.default);
        const figuresLength = keys.length;

        for (let i = 0; i < $figuresCount; i++) {
            const randomNumber = this.getRandomNumber(figuresLength);
            const figure = keys[randomNumber];
            const divElement = _figures_Figures__WEBPACK_IMPORTED_MODULE_1__.default.draw(figure);
            _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_2__.default.relax.addRandomFigure({ figure, divElement });
            this._domNegotiator.append(divElement);
        }
    }

    getRandomNumber($lessThan = 1e9, $moreThan = 0) {
        const diff = $lessThan - $moreThan;
        let randNumber = Math.floor(Math.random() * diff);
        if (randNumber === diff) {
            randNumber--;
        }

        randNumber += $moreThan;
        return randNumber;
    }

    ensureProperties() {
        const isOk = this._domNegotiator != null;
        if (!isOk) {
            throw new DOMException('Please specify the DomNegotiator for RandomFigureDrawer');
        }
    }

}

const $randomFigureDrawer = new RandomFiguresDrawer();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($randomFigureDrawer);

/***/ }),

/***/ "./src/core/drawer/figures/FigureDrawer.js":
/*!*************************************************!*\
  !*** ./src/core/drawer/figures/FigureDrawer.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _leaves_Figure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./leaves/Figure */ "./src/core/drawer/figures/leaves/Figure.js");





class FigureDrawer {
    /**
     * @param figureObjOrPattern {Figure|Array}
     * @param scaleK
     */
    draw(figureObjOrPattern, scaleK = 3) {
        if (figureObjOrPattern instanceof _leaves_Figure__WEBPACK_IMPORTED_MODULE_2__.default) {
            figureObjOrPattern = figureObjOrPattern.pattern;
        }

        let boxDiv = _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.elt("div", "box", null, {
            position: "relative",
            userSelect: 'none',
        });

        const bw = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxWidth / scaleK;
        const bh = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxHeight / scaleK;

        this.drawFigureWithDetails(figureObjOrPattern, bw, bh, boxDiv);
        return boxDiv;
    }

    /**
     *
     * @param pattern {Array} the figure pattern
     * @param bw width of the one block
     * @param bh height of the one block
     * @param parentDiv {HTMLDivElement} parent div where each blocked should be appended
     * @param style {Object} extra style for each block
     */
    drawFigureWithDetails(pattern, bw, bh, parentDiv, style = {}) {
        pattern.forEach((r, i) => {
            r.forEach((c, j) => {
                if (pattern[i][j] !== ".") {
                    let l = j * (bw + 3);
                    let t = i * (bh + 3);

                    let el = _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.elt("div", null, null, {
                        top: t + "px",
                        left: l + "px",
                        width: bw + "px",
                        height: bh + "px",
                        background: _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxColor,
                        position: "absolute",
                    })

                    _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.setStyle(el, style)
                    parentDiv.append(el);
                }
            })
        })
    }
}

const $figureDrawer = new FigureDrawer();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figureDrawer);

/***/ }),

/***/ "./src/core/drawer/figures/Figures.js":
/*!********************************************!*\
  !*** ./src/core/drawer/figures/Figures.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _leaves_Figure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leaves/Figure */ "./src/core/drawer/figures/leaves/Figure.js");
/* harmony import */ var _leaves_AllFigures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leaves/AllFigures */ "./src/core/drawer/figures/leaves/AllFigures.js");
/* harmony import */ var _FigureDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FigureDrawer */ "./src/core/drawer/figures/FigureDrawer.js");




class Figures {
    /**
     * @type {Array}
     * @var allFigures
     */

    constructor() {
        this.allFigures = [];
        /**
         * TYPE_1: new Figure(pattern),
         * TYPE_2: new Figure(pattern),
         * ...
         */
        for (let figure in _leaves_AllFigures__WEBPACK_IMPORTED_MODULE_1__.default) {
            const pattern = _leaves_AllFigures__WEBPACK_IMPORTED_MODULE_1__.default[figure].figure;
            this[figure] = new _leaves_Figure__WEBPACK_IMPORTED_MODULE_0__.default(figure, pattern);

            this.allFigures.push({
                name: figure,
                figure: pattern
            });
        }
    }

    /**
     * @param type {string}
     * @param scaleK
     */
    draw(type, scaleK = 3) {
        if (this.hasFigure(type)) {
            const figureObj = this.getFigure(type);
            return _FigureDrawer__WEBPACK_IMPORTED_MODULE_2__.default.draw(figureObj, scaleK);
        } else {
            throw new DOMException(`${type} figure does not exist`);
        }
    }

    hasFigure(type) {
        return this[type] !== null;
    }

    /**
     * @param type {string}
     * @return {Figure}
     */
    getFigure(type) {
        return this[type];
    }
}

const $figures = new Figures();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figures);



/***/ }),

/***/ "./src/core/drawer/figures/leaves/AllFigures.js":
/*!******************************************************!*\
  !*** ./src/core/drawer/figures/leaves/AllFigures.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const AllFigures = {
    TYPE_1: {
        figure: `
               ###
               #
               #
             `,
        name: 'TYPE_1'
    },

    TYPE_2: {
        figure: `
               ##
               ##
             `,
        name: 'TYPE_2'
    },

    TYPE_3: {
        figure: `
               ##
               #
             `,
        name: 'TYPE_3'
    },

    TYPE_4: {
        figure: `
               ###
             `,
        name: 'TYPE_4'
    },

    TYPE_5: {
        figure: `
               #
               #
               #
             `,
        name: 'TYPE_5'
    },

    TYPE_6: {
        figure: `
               ###
               ###
               ###
             `,
        name: 'TYPE_6'
    },

    TYPE_7: {
        figure: `
               #####
             `,
        name: 'TYPE_7'
    },

    TYPE_8: {
        figure: `
               ####
             `,
        name: 'TYPE_8'
    },

    TYPE_9: {
        figure: `
               #
               #
               #
               #
             `,
        name: 'TYPE_9'
    },

    TYPE_11: {
        figure: `
              .#
              ##
             `,
        name: 'TYPE_11'
    },

    TYPE_12: {
        figure: `
            # 
            #
           `,
        name: 'TYPE_12'
    },

    TYPE_13: {
        figure: `
          ##          
         `,
        name: 'TYPE_13'
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AllFigures);

/***/ }),

/***/ "./src/core/drawer/figures/leaves/Figure.js":
/*!**************************************************!*\
  !*** ./src/core/drawer/figures/leaves/Figure.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Figure
/* harmony export */ });

class Figure {
    /**
     * @param name {string}
     * @param pattern {string}
     */
    constructor(name, pattern) {
        this.name = name;

        this.pattern = pattern.split("\n")
            .map(c => c.trim())
            .filter(c => c)
            .map(c => c.split(""))
    }

}

/***/ }),

/***/ "./src/core/events/FigureMover.js":
/*!****************************************!*\
  !*** ./src/core/events/FigureMover.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _drawer_figures_FigureDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../drawer/figures/FigureDrawer */ "./src/core/drawer/figures/FigureDrawer.js");
/* harmony import */ var _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");





class FigureMover {
    constructor() {
    }
    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     */
    register({ figure, divElement }) {
        let temporaryElement = null;

        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(divElement, 'mousedown', e => {
            const moverFigure = this.createMoverFigure();

            const figureDiv = _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_3__.default.draw(figure, 1.05);
            moverFigure.append(figureDiv);

            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(moverFigure, {
                left: this.getLeftPx(e.pageX) + 'px',
                top: this.getTopPx(e.pageY) + 'px'
            });

            this.attachMoveEvents(moverFigure);
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, {
                opacity: .4
            });

            temporaryElement = moverFigure;
        });

        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mouseup', e => {
            if (!temporaryElement)
                return;

            temporaryElement.remove();
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, {
                opacity: 1
            })
        });
    }

    /**
     * @param divElement {HTMLElement}
     */
    getMouseMoveHandler(divElement) {
        return e => {
            const { pageX, pageY } = e;
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, {
                left: this.getLeftPx(pageX) + 'px',
                top: this.getTopPx(pageY) + 'px'
            })
        }
    }

    /**
     * @param divElement {HTMLElement}
     */
    attachMoveEvents(divElement) {
        const handler = this.getMouseMoveHandler(divElement);

        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(
            _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mousemove', handler
        )
    }

    getLeftPx($left) {
        return $left - 30;
    }

    getTopPx($top) {
        return $top - 60
    }

    createMoverFigure() {
        let elem = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.$('#mover-figure');
        if (!elem) {
            elem = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.elt('div', 'position-absolute', 'mover-figure');
            _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom.body.append(elem);
        }

        return elem;
    }
}

const $figureMover = new FigureMover();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figureMover);


/***/ }),

/***/ "./src/general/Android.js":
/*!********************************!*\
  !*** ./src/general/Android.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const userAgent = navigator.userAgent.toLowerCase();
const Android = userAgent.indexOf("android") > -1;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Android);

/***/ }),

/***/ "./src/general/Constants.js":
/*!**********************************!*\
  !*** ./src/general/Constants.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_store_Config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/store/Config */ "./src/shared/store/Config.js");


const CONSTANTS = {
    dom: document,
    width: _shared_store_Config__WEBPACK_IMPORTED_MODULE_0__.default.getScreenWidth() * .9,
    height: _shared_store_Config__WEBPACK_IMPORTED_MODULE_0__.default.getScreenHeight(),
    offsetY: _shared_store_Config__WEBPACK_IMPORTED_MODULE_0__.default.getScreenHeight() * 0.1 + 20,
    boxesOnRow: 8,
    boxesOnColumn: 8,
    figureOffsetX: -70,
    figureOffsetY: -200,
    boxColor: 'rgba(153, 93, 93)',
    blockCrashColor: 'rgb(151, 96, 96)',
    boxHeight: null,
    boxWidth: null,
    offsetX: null,
};


let offsetVar = 0;
let boxHeightVar = (CONSTANTS.height * .7) / CONSTANTS.boxesOnColumn;
let boxWidthVar = (CONSTANTS.width - offsetVar) / CONSTANTS.boxesOnRow;
boxWidthVar = boxHeightVar = Math.min(boxWidthVar, boxHeightVar);

let rightOffsetX = offsetVar + CONSTANTS.boxesOnRow * boxWidthVar
rightOffsetX = CONSTANTS.width - rightOffsetX;
offsetVar = (offsetVar + rightOffsetX) / 2 + 20;

CONSTANTS.boxHeight = boxHeightVar;
CONSTANTS.boxWidth = boxWidthVar;
CONSTANTS.offsetX = offsetVar;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CONSTANTS);


/***/ }),

/***/ "./src/general/Custom.js":
/*!*******************************!*\
  !*** ./src/general/Custom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants */ "./src/general/Constants.js");


const FUNC = {
    $(id) {
        return _Constants__WEBPACK_IMPORTED_MODULE_0__.default.dom.querySelector(id);
    },

    dd(text) {
        $('dd').innerText = text;
    },

    vv(text) {
        $('vv').innerText = text;
    },

    attach($object, $event, $handler) {
        $object.addEventListener($event, $handler);
    },

    detach($object, $event, $handler) {
        $object.removeEventListener($event, $handler)
    },

    /**
     * @param divElement {HTMLElement}
     * @param className {string}
     */
    addClass(divElement, className) {
        divElement.classList.add(className)
    },

    /**
     * @param divElement {HTMLElement}
     * @param className {string}
     */
    removeClass(divElement, className) {
        divElement.classList.remove(className)
    },

    setStyle($element, $style) {
        for (let a in $style) {
            $element.style[a] = $style[a]
        }
    },

    elt($element, $classes, $id, $style) {
        let elm = _Constants__WEBPACK_IMPORTED_MODULE_0__.default.dom.createElement($element);
        if ($classes) elm.className = $classes;
        if ($id) elm.setAttribute('id', $id);
        if ($style) this.setStyle(elm, $style)
        return elm
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FUNC);

/***/ }),

/***/ "./src/negotiators/DomNegotiator.js":
/*!******************************************!*\
  !*** ./src/negotiators/DomNegotiator.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DomNegotiator
/* harmony export */ });
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../general/Custom */ "./src/general/Custom.js");


class DomNegotiator {
    /**
     * @type {HTMLDivElement}
     * @var _divElement
     */

    /**
     * @param $element {HTMLElement|String}
     */
    constructor($element = null) {
        if ($element && typeof $element === 'string') {
            $element = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.$($element);
        }

        this._divElement = $element;
    }

    /**
     * @param $element {HTMLDivElement}
     */
    setElement($element) {
        this._divElement = $element;
    }

    getElement() {
        return this._divElement;
    }

    /**
     * @param $element {HTMLElement}
     */
    append($element) {
        this._divElement.append($element)
    }

    clearHtml() {
        this._divElement.innerHTML = "";
    }
}

/***/ }),

/***/ "./src/shared/store/Boxes.js":
/*!***********************************!*\
  !*** ./src/shared/store/Boxes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _leaves_Box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leaves/Box */ "./src/shared/store/leaves/Box.js");


class Boxes {
    /**
     * @type {[]}
     * @var _boxes
     */
    constructor() {
        this.reset();
    }

    addRow() {
        this._boxes.push([]);
    }

    addAt($i, { x, y }) {
        this._boxes[$i].push(
            new _leaves_Box__WEBPACK_IMPORTED_MODULE_0__.default({ x, y })
        );
    }

    get(i, j) {
        return this._boxes[i][j];
    }

    reset() {
        this._boxes = []
    }
}

const $boxes = new Boxes()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($boxes);

/***/ }),

/***/ "./src/shared/store/Config.js":
/*!************************************!*\
  !*** ./src/shared/store/Config.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Android__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Android */ "./src/general/Android.js");


const CONFIG = {
    android: {
        click: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },
    ps: {
        click: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    get(type) {
        if (_general_Android__WEBPACK_IMPORTED_MODULE_0__.default) {
            if (!this.android[type]) {
                throw new Exception(`${type} is not defined`)
            }
            return this.android[type]
        }
        if (!this.ps[type]) {
            throw new Exception(`${type} is not defined`)
        }
        return this.ps[type];
    },
    coords(e) {
        if (_general_Android__WEBPACK_IMPORTED_MODULE_0__.default) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        return { x: e.clientX, y: e.clientY }
    },
    getScreenWidth() {
        if (_general_Android__WEBPACK_IMPORTED_MODULE_0__.default) {
            let ratio = window.devicePixelRatio || 1;
            return screen.width * ratio;
        }
        return window.innerWidth;
    },
    getScreenHeight() {
        if (_general_Android__WEBPACK_IMPORTED_MODULE_0__.default) {
            let ratio = window.devicePixelRatio || 1;
            return screen.height * ratio;
        }
        return window.innerHeight
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CONFIG);

/***/ }),

/***/ "./src/shared/store/leaves/Box.js":
/*!****************************************!*\
  !*** ./src/shared/store/leaves/Box.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Box
/* harmony export */ });
class Box {
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

    /**
     * @param $div {HTMLElement}
     */
    setReferenceDiv($div) {
        this.referenceDiv = $div;
    }

    getCoordinateX() {
        return this.x;
    }

    getCoordinateY() {
        return this.y;
    }

}



/***/ }),

/***/ "./src/shared/store/leaves/State.js":
/*!******************************************!*\
  !*** ./src/shared/store/leaves/State.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });

const STATE = {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (STATE);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=build.js.map