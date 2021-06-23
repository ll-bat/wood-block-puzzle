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



const $domNegotiator = new _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default('#content');
_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.setup($domNegotiator);
_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.draw();

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