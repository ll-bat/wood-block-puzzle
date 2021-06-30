/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Helper/relax/BoxOnboardCrasher.js":
/*!***********************************************!*\
  !*** ./src/Helper/relax/BoxOnboardCrasher.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _core_animation_BlockCrashAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/animation/BlockCrashAnimation */ "./src/core/animation/BlockCrashAnimation.js");




class BoxOnboardCrasher {
    constructor() {
        this.reset();
    }

    reset() {
        this.boxesOnRow = [];
        this.boxesOnColumn = [];

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; i++) {
            this.boxesOnRow.push(0);
        }

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; i++) {
            this.boxesOnColumn.push(0);
        }
    }

    update({ x, y }) {
        this.boxesOnRow[x]++;
        this.boxesOnColumn[y]++;
    }

    checkBlocksToCrash() {
        let crashBlocks = false;

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; i++) {
            if (this.boxesOnRow[i] === _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow) {
                crashBlocks = true;
            }
        }

        for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; j++) {
            if (this.boxesOnColumn[j] === _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn) {
                crashBlocks = true;
            }
        }

        if (crashBlocks) {
            this.crashBlocks();
        }
    }

    crashBlocks() {
        const rowIndexesToCrash = [];
        const columnIndexesToCrash = [];
        this.boxesOnRow.forEach((numberOfBlocks, rowIndex) => {
            if (numberOfBlocks === _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow) {
                rowIndexesToCrash.push(rowIndex);
            }
        });

        this.boxesOnColumn.forEach((numberOfBlocks, columnIndex) => {
            if (numberOfBlocks === _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn) {
                columnIndexesToCrash.push(columnIndex);
            }
        });

        // console.log('Crashing');
        // console.log(rowIndexesToCrash);
        // console.log(columnIndexesToCrash);

        rowIndexesToCrash.forEach(rowIndex => {
            for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn; j++) {
                const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(rowIndex, j);
                box.style({ background: _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxDefaultColor });
                _core_animation_BlockCrashAnimation__WEBPACK_IMPORTED_MODULE_2__.default.animateCrash(box);
                box.setBusy(false);
            }

            this.boxesOnRow[rowIndex] = 0;
            for (let j = 0; j< _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; j++) {
                this.boxesOnColumn[j]--;
            }
        });

        columnIndexesToCrash.forEach(columnIndex => {
            for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; i++) {
                const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(i, columnIndex);
                box.style({ background: _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxDefaultColor });
                _core_animation_BlockCrashAnimation__WEBPACK_IMPORTED_MODULE_2__.default.animateCrash(box);
                box.setBusy(false);
            }

            this.boxesOnColumn[columnIndex] = 0;
            for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn; i++) {
                if (this.boxesOnRow[i] > 0) {
                    this.boxesOnRow[i]--;
                }
            }
        });
    }
}

const $boxOnboardCrasher = new BoxOnboardCrasher();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($boxOnboardCrasher);

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/drawer/Layout */ "./src/core/drawer/Layout.js");
/* harmony import */ var _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./negotiators/DomNegotiator */ "./src/negotiators/DomNegotiator.js");
/* harmony import */ var _core_drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/drawer/concrete/relax/RandomFiguresDrawer */ "./src/core/drawer/concrete/relax/RandomFiguresDrawer.js");
/* harmony import */ var _core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/events/FigureMover */ "./src/core/events/FigureMover.js");
/* harmony import */ var _core_events_next_handler_FigureOnBoardMatcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/events/next_handler/FigureOnBoardMatcher */ "./src/core/events/next_handler/FigureOnBoardMatcher.js");
/* harmony import */ var _core_events_next_handler_relax_MouseUpHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/events/next_handler/relax/MouseUpHandler */ "./src/core/events/next_handler/relax/MouseUpHandler.js");
/* harmony import */ var _core_events_next_handler_relax_RandomFigureEventHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/events/next_handler/relax/RandomFigureEventHelper */ "./src/core/events/next_handler/relax/RandomFigureEventHelper.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _core_events_Events__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/events/Events */ "./src/core/events/Events.js");
/* harmony import */ var _core_events_next_handler_relax_BoxUpdateHandler__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core/events/next_handler/relax/BoxUpdateHandler */ "./src/core/events/next_handler/relax/BoxUpdateHandler.js");
/* harmony import */ var _core_events_next_handler_relax_AfterRandomFigurePutOnBoardHandler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler */ "./src/core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler.js");
/* harmony import */ var _core_events_next_handler_relax_RandomFigureOnBoardChecker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./core/events/next_handler/relax/RandomFigureOnBoardChecker */ "./src/core/events/next_handler/relax/RandomFigureOnBoardChecker.js");
/* harmony import */ var _core_middlewares_RandomFigureClickerMiddleWare__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./core/middlewares/RandomFigureClickerMiddleWare */ "./src/core/middlewares/RandomFigureClickerMiddleWare.js");
/* harmony import */ var _core_events_next_handler_relax_GameStateChecker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/events/next_handler/relax/GameStateChecker */ "./src/core/events/next_handler/relax/GameStateChecker.js");















_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.setup(new _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default('#content'));
_core_drawer_Layout__WEBPACK_IMPORTED_MODULE_0__.default.draw();

_core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__.default.registerHandler('mousemove', _core_events_next_handler_FigureOnBoardMatcher__WEBPACK_IMPORTED_MODULE_4__.default);
_core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__.default.registerHandler('mouseup', _core_events_next_handler_relax_MouseUpHandler__WEBPACK_IMPORTED_MODULE_5__.default);
_core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__.default.registerHandler('mouseup', _core_events_next_handler_relax_RandomFigureOnBoardChecker__WEBPACK_IMPORTED_MODULE_11__.default);
_core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__.default.addMiddleware(_core_middlewares_RandomFigureClickerMiddleWare__WEBPACK_IMPORTED_MODULE_12__.default);
_core_events_FigureMover__WEBPACK_IMPORTED_MODULE_3__.default.afterClick(_core_events_next_handler_relax_GameStateChecker__WEBPACK_IMPORTED_MODULE_13__.default);
// $figureMover.registerHandler(EVENTS.BEFORE_FIGURE_CLICK, $randomFigureClicker, false);

_core_drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_2__.default.setup(new _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default('#figures'));
_core_events_next_handler_relax_RandomFigureEventHelper__WEBPACK_IMPORTED_MODULE_6__.default.drawRandomFiguresAndRegisterEvents();

_shared_store_Boxes__WEBPACK_IMPORTED_MODULE_7__.default.registerHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_8__.default.BOX_UPDATE, _core_events_next_handler_relax_BoxUpdateHandler__WEBPACK_IMPORTED_MODULE_9__.default);
_shared_store_Boxes__WEBPACK_IMPORTED_MODULE_7__.default.registerHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_8__.default.BOARD_CHANGE, _core_events_next_handler_relax_AfterRandomFigurePutOnBoardHandler__WEBPACK_IMPORTED_MODULE_10__.default);

/***/ }),

/***/ "./src/core/abstract/Configurable.js":
/*!*******************************************!*\
  !*** ./src/core/abstract/Configurable.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Configurable
/* harmony export */ });
/* harmony import */ var _ErrorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ErrorHandler */ "./src/core/abstract/ErrorHandler.js");


class Configurable extends _ErrorHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    /**
     * @param params {Object} list of `key => value` pairs representing configuration of the current class
     */
    configure(params) {
        for (let a in params) {
            this[a] = params[a];
        }
    }
}

/***/ }),

/***/ "./src/core/abstract/DomNegotiatorAbstract.js":
/*!****************************************************!*\
  !*** ./src/core/abstract/DomNegotiatorAbstract.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DomNegotiatorAbstract
/* harmony export */ });
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");


class DomNegotiatorAbstract {

}

/***/ }),

/***/ "./src/core/abstract/ErrorHandler.js":
/*!*******************************************!*\
  !*** ./src/core/abstract/ErrorHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ ErrorHandler
/* harmony export */ });

class ErrorHandler {
    log(...messages) {
        console.log(...messages);
    }

    error(message) {
        throw new DOMException(message);
    }
}

/***/ }),

/***/ "./src/core/abstract/EventHandler.js":
/*!*******************************************!*\
  !*** ./src/core/abstract/EventHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ EventHandler
/* harmony export */ });
/* harmony import */ var _MultipleNextHandlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MultipleNextHandlers */ "./src/core/abstract/MultipleNextHandlers.js");
/* harmony import */ var _NextHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _events_DefaultEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/DefaultEvents */ "./src/core/events/DefaultEvents.js");




class EventHandler extends _events_DefaultEvents__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor() {
        super();
        this._handlers = {}
    }
    /**
     * @param $mouseEvent {String}
     * @param $nextHandler {NextHandler}
     * @param $multiple {Boolean}
     */
    registerHandler($mouseEvent, $nextHandler, $multiple = true) {
        if (!($nextHandler instanceof _NextHandler__WEBPACK_IMPORTED_MODULE_1__.default)) {
            throw new DOMException($nextHandler + ' should be an instance of NextHandler::class')
        }

        let thisHandlers;
        if ($multiple) {
            thisHandlers = this._handlers[$mouseEvent];
            if (!thisHandlers) {
                thisHandlers = [];
            }

            thisHandlers.push($nextHandler);
        } else {
            thisHandlers = $nextHandler;
        }

        this._handlers[$mouseEvent] = thisHandlers;
    }

    /**
     * @param $mouseEvent
     * @param $multiple {Boolean}
     * @return {NextHandler}
     */
    getHandler($mouseEvent, $multiple = true) {
        if (this.hasHandler($mouseEvent)) {
            const handlers = this._handlers[$mouseEvent];
            if ($multiple) {
                return new _MultipleNextHandlers__WEBPACK_IMPORTED_MODULE_0__.default(handlers);
            } else {
                if (!(handlers instanceof _NextHandler__WEBPACK_IMPORTED_MODULE_1__.default)) {
                    throw new DOMException('There are more than 1 or 0 event handlers for event ' + $mouseEvent);
                }

                return handlers;
            }
        }
        throw new DOMException($mouseEvent + ' handler has not been registered');
    }

    hasHandler($mouseEvent) {
        return this._handlers[$mouseEvent] != null;
    }
}

/***/ }),

/***/ "./src/core/abstract/MultipleNextHandlers.js":
/*!***************************************************!*\
  !*** ./src/core/abstract/MultipleNextHandlers.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ MultipleNextHandlers
/* harmony export */ });
/* harmony import */ var _NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NextHandler */ "./src/core/abstract/NextHandler.js");


class MultipleNextHandlers extends _NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(handlers) {
        super();
        /**
         * @type {NextHandler[]}
         */
        this.handlers = handlers;
    }

    /**
     * @param e
     * @param figure
     * @param extraData
     */
    next(e, figure, extraData = {}) {
        for (const handler of this.handlers) {
            handler.next(e, figure, extraData);
        }
    }
}

/***/ }),

/***/ "./src/core/abstract/NextHandler.js":
/*!******************************************!*\
  !*** ./src/core/abstract/NextHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ NextHandler
/* harmony export */ });
/* harmony import */ var _Configurable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Configurable */ "./src/core/abstract/Configurable.js");


class NextHandler extends _Configurable__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super();
    }

    next(e, figure, extraData = {}) {}
}

/***/ }),

/***/ "./src/core/abstract/Styler.js":
/*!*************************************!*\
  !*** ./src/core/abstract/Styler.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Styler
/* harmony export */ });
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _ErrorHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ErrorHandler */ "./src/core/abstract/ErrorHandler.js");



class Styler extends _ErrorHandler__WEBPACK_IMPORTED_MODULE_1__.default {
    style($style) {
        const divElement = this.getDivElement();
        if (!divElement) {
            this.log(divElement);
            this.error('Setting style on null');
        }

        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, $style);
    }

    getDivElement() {}
}

/***/ }),

/***/ "./src/core/animation/BlockCrashAnimation.js":
/*!***************************************************!*\
  !*** ./src/core/animation/BlockCrashAnimation.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");



class BlockCrashAnimation {
    async animateCrash({ x, y }) {
        await this.run(
            this.draw({ x, y }), { x, y }
        )
    }

    draw({ x, y }) {
        let el = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.elt('div', null, null, {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxWidth + 'px',
            height: _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxHeight + 'px',
            background: _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.blockCrashColor,
            border: '2px inset black',
        })

        _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom.body.append(el)
        return el
    }

    async run(el, boxCoordinates) {
        await this.parabolicCurve(el, boxCoordinates)
    }

    async parabolicCurve(el, { x, y }) {
        const steps = 55
        const clockWise = Math.random() > .5 ? 1 : -1
        const endX = 20
        const xPerStep = (endX / steps)
        let currentStep = steps
        let currentX = 0
        let currentY = calcY(currentX)
        let currentOpacity = 1
        let currentScale = 1
        const addX = 100 * clockWise;
        const addY = Math.random() * 100;
        let posX = 0;
        let posY = 0;
        const perStep = 1 / steps
        let degree = 0;
        const degPerStep = 6 * clockWise;

        while (currentStep--) {
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(el, {
                left: currentX + posX + x + 'px',
                top: currentY + posY + y + 'px',
                transform: `
                    scale(${currentScale}) 
                    rotate(${degree}deg)
                   `,
                opacity: currentOpacity
            })
            currentX += clockWise * xPerStep * (Math.sin(currentStep / steps) * 1.6 + .2)
            currentY = calcY(currentX)
            currentOpacity -= perStep
            currentScale -= perStep / 2
            posX = addX * Math.cos(currentStep / steps)
            posY = addY * Math.cos(currentStep / steps)
            degree += degPerStep * Math.cos(currentStep / steps)
            await this.wait(10)
        }

        function calcY(x) {
            return 1.46 * x * x + 10
        }

        el.remove()
    }

    async withTransform(el) {
        const steps = 150
        const clockWise = Math.random() > .5 ? 1 : -1
        const startDegree = -90 + clockWise * 85
        const endDegree = startDegree + clockWise * (Math.random() * 30 + 20)
        const degreePerStep = clockWise * (Math.abs(endDegree - startDegree) / steps)
        const distPerStep = 1.5
        const perStep = 1 / steps
        let currentDegree = startDegree;
        let currentDist = distPerStep
        let currentStep = steps
        let currentOpacity = 1
        let currentScale = 1

        while (currentStep--) {
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(el, {
                transform: `
                       rotate(${currentDegree}deg)
                       translateX(${currentDist}px)
                       scale(${currentScale})
                    `,
                opacity: currentOpacity
            })
            currentDegree += degreePerStep
            currentDist += distPerStep * Math.sin(currentStep / steps) * 2
            currentOpacity -= perStep
            currentScale -= perStep / 2
            await this.wait(2)
        }

        el.remove()
    }

    wait(time) {
        return new Promise((res) => {
            setTimeout(() => {
                res()
            }, time)
        })
    }
}

const $blockCrashAnimation = new BlockCrashAnimation()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($blockCrashAnimation);

/***/ }),

/***/ "./src/core/components/Component.js":
/*!******************************************!*\
  !*** ./src/core/components/Component.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Component
/* harmony export */ });
/* harmony import */ var _middlewares_Middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../middlewares/Middleware */ "./src/core/middlewares/Middleware.js");


class Component extends _middlewares_Middleware__WEBPACK_IMPORTED_MODULE_0__.default {

}

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
            background: _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.boxDefaultColor, //rgba(0,0,0,.02)
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

        const keys = Object.keys(_figures_leaves_AllFigures__WEBPACK_IMPORTED_MODULE_0__.default);
        const figuresLength = keys.length;

        for (let i = 0; i < $figuresCount; i++) {
            const randomNumber = this.getRandomNumber(figuresLength);
            const figure = keys[randomNumber];
            const divElement = _figures_Figures__WEBPACK_IMPORTED_MODULE_1__.default.draw(figure);
            _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_2__.default.relax.addRandomFigure({ figure, divElement, index: i });
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
     * @param $style {object}
     */
    draw(figureObjOrPattern, scaleK = 3, $style = {}) {
        if (figureObjOrPattern instanceof _leaves_Figure__WEBPACK_IMPORTED_MODULE_2__.default) {
            figureObjOrPattern = figureObjOrPattern.pattern;
        }

        let boxDiv = _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.elt("div", "box", null, {
            position: "relative",
            userSelect: 'none',
        });

        const bw = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxWidth / scaleK;
        const bh = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxHeight / scaleK;

        this.drawFigureWithDetails(figureObjOrPattern, bw, bh, boxDiv, $style);
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
     * @param $style {object}
     */
    draw(type, scaleK = 3, $style = {}) {
        if (this.hasFigure(type)) {
            const figureObj = this.getFigure(type);
            return _FigureDrawer__WEBPACK_IMPORTED_MODULE_2__.default.draw(figureObj, scaleK, $style);
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
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../general/Custom */ "./src/general/Custom.js");



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

        this.matrix = this.pattern.map(row => {
            return row.map(cell => {
                return cell === '.'
                    ? 0
                    : 1
            })
        });
    }

    isset(i, j) {
        return this.pattern[i] && this.pattern[i][j] && this.pattern[i][j] !== '.';
    }

    toString() {
        throw new DOMException('Figure toString() method is not implemented');
    }

    toMatrix() {
        return this.matrix;
    }

    toInt() {
        const rowCount = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow;
        let result = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < rowCount; j++) {
                if (this.isset(i, j)) {
                    result += _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.power(i * rowCount + j);
                }
            }
        }

        return result;
    }

    /**
     * returns max number blocks on X-axis
     */
    getCategory() {
       let result = 0;
       this.pattern.forEach(arr => result = Math.max(result, arr.length));
       return result;
    }
}

/***/ }),

/***/ "./src/core/events/DefaultEvents.js":
/*!******************************************!*\
  !*** ./src/core/events/DefaultEvents.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ DefaultEvents
/* harmony export */ });
/* harmony import */ var _abstract_ErrorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract/ErrorHandler */ "./src/core/abstract/ErrorHandler.js");
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Events */ "./src/core/events/Events.js");




class DefaultEvents extends _abstract_ErrorHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(props) {
        super();
        this.beforeClickHandlers = [];
        this.afterClickHandlers = [];
    }

    /**
     * @param $nextHandler {NextHandler|Boolean}
     * @param $payload {Object}
     */
    beforeClick($nextHandler = false, $payload = {}) {
        if (!$nextHandler) {
            this.triggerNextHandlers(_Events__WEBPACK_IMPORTED_MODULE_2__.default.BEFORE_MOUSE_DOWN, $payload);
        } else {
            if (!($nextHandler instanceof _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_1__.default)) {
                this.log($nextHandler);
                this.error('$nextHandler is not an instance of NextHandler::class');
            } else {
                this.beforeClickHandlers.push($nextHandler);
            }
        }
    }

    /**
     * @param $nextHandler {NextHandler|Boolean}
     * @param $payload {Object}
     */
    afterClick($nextHandler = false, $payload = {}) {
        if (!$nextHandler) {
            this.triggerNextHandlers(_Events__WEBPACK_IMPORTED_MODULE_2__.default.AFTER_MOUSE_UP,$payload);
        } else {
            if (!($nextHandler instanceof _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_1__.default)) {
                this.log($nextHandler);
                this.error('$nextHandler is not an instance of NextHandler::class');
            } else {
                this.afterClickHandlers.push($nextHandler);
            }
        }
    }

    triggerNextHandlers($type, $payload) {
        const nextHandlers = $type === _Events__WEBPACK_IMPORTED_MODULE_2__.default.BEFORE_MOUSE_DOWN
            ? this.beforeClickHandlers
            : this.afterClickHandlers;

        /**
         * @type {NextHandler}
         */
        for (let nextHandler of nextHandlers) {
            nextHandler.next($payload);
        }
    }
}

/***/ }),

/***/ "./src/core/events/Events.js":
/*!***********************************!*\
  !*** ./src/core/events/Events.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });

const EVENTS = {
    BEFORE_MOUSE_DOWN: 'before-mouse-down',
    AFTER_MOUSE_UP: 'after-mouse-up',
    MOUSE_DOWN : 'mouse-down',
    MOUSE_UP : 'mouse-up',
    MOUSE_MOVE : 'mouse-move',
    BOX_UPDATE : 'box-update',
    BOARD_CHANGE : 'board-change',
    BEFORE_FIGURE_CLICK : 'before-figure-click',
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EVENTS);

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
/* harmony import */ var _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/store/tmp/TmpFigureHelper */ "./src/shared/store/tmp/TmpFigureHelper.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _components_Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Component */ "./src/core/components/Component.js");







class FigureMover extends _components_Component__WEBPACK_IMPORTED_MODULE_5__.default {
    constructor() {
        super();
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     * @param index {Number}
     * @description all these params are coming from `STATE.relax.getFigures()[index]`
     */
    register({ figure, divElement, index }) {
        let temporaryElement = null;
        let moveHandler = null;

        const mousedownHandler = e => {
            if (!this.passesMiddlewares({ figure, divElement, index })) {
                return false;
            }

            this.beforeClick(false, { e, figure, divElement, index });

            const moverFigure = this.createMoverFigure();
            const figureDiv = _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_2__.default.draw(figure, 1.05);

            moverFigure.append(figureDiv);
            moveHandler = this.getMouseMoveHandler(figure, moverFigure);

            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(moverFigure, {
                left: this.getLeftPx(e.pageX) + 'px',
                top: this.getTopPx(e.pageY) + 'px'
            });
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, { opacity: .4 });

            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mousemove', moveHandler)
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mouseup', mouseUpHandler);

            temporaryElement = moverFigure;
        };

        const mouseUpHandler = e => {
            if (!temporaryElement)
                return;

            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.detach(_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mousemove', moveHandler);
            temporaryElement.remove();
            _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__.default.clearHtml();
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, { opacity: 1 })
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, { opacity: 1 });

            this.getHandler('mouseup').next(e, figure, { index });
            _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__.default.shared.resetDrawable();

            this.afterClick(false, { e, figure, divElement, index });

            // important
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.detach(_general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.dom, 'mouseup', mouseUpHandler);
        };

        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.attach(divElement, 'mousedown', mousedownHandler);
    }

    /**
     * @param figure {String}
     * @param divElement {HTMLElement}
     * @return {NextHandler}
     */
    getMouseMoveHandler(figure, divElement) {
        return e => {
            const { pageX, pageY } = e;
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(divElement, {
                left: this.getLeftPx(pageX) + 'px',
                top: this.getTopPx(pageY) + 'px'
            });

            this.getHandler('mousemove').next(e, figure);
        }
    }

    getLeftPx($left) {
        return $left + _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.figureOffsetX
    }

    getTopPx($top) {
        return $top + _general_Constants__WEBPACK_IMPORTED_MODULE_1__.default.figureOffsetY
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

/***/ "./src/core/events/next_handler/FigureOnBoardMatcher.js":
/*!**************************************************************!*\
  !*** ./src/core/events/next_handler/FigureOnBoardMatcher.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _logic_FigurePlaceFinder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../logic/FigurePlaceFinder */ "./src/core/logic/FigurePlaceFinder.js");
/* harmony import */ var _logic_FigurePlaceChecker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../logic/FigurePlaceChecker */ "./src/core/logic/FigurePlaceChecker.js");
/* harmony import */ var _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/store/tmp/TmpFigureHelper */ "./src/shared/store/tmp/TmpFigureHelper.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");






class FigureOnBoardMatcher extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super();
    }

    /**
     * @param e {Event}
     * @param figure {String}
     */
    next(e, figure) {
        const blockIndexes = _logic_FigurePlaceFinder__WEBPACK_IMPORTED_MODULE_1__.default.find(e, figure);
        if (blockIndexes === null) {
            _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__.default.clearHtml();
        } else {
            // console.clear();
            if (_logic_FigurePlaceChecker__WEBPACK_IMPORTED_MODULE_2__.default.isDrawable(blockIndexes, figure)) {
                _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__.default.drawTmpFigure(blockIndexes, figure);
                _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__.default.shared.setBlockIndexes(blockIndexes);
                _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__.default.shared.setDrawable(true);
            } else {
                _shared_store_tmp_TmpFigureHelper__WEBPACK_IMPORTED_MODULE_3__.default.clearHtml()
                _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_4__.default.shared.setDrawable(false);
            }
        }
    }
}

const $figureOnBoardMatcher = new FigureOnBoardMatcher();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figureOnBoardMatcher);

/***/ }),

/***/ "./src/core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler.js":
/*!**********************************************************************************!*\
  !*** ./src/core/events/next_handler/relax/AfterRandomFigurePutOnBoardHandler.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _Helper_relax_BoxOnboardCrasher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Helper/relax/BoxOnboardCrasher */ "./src/Helper/relax/BoxOnboardCrasher.js");



class AfterRandomFigurePutOnBoardHandler extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        _Helper_relax_BoxOnboardCrasher__WEBPACK_IMPORTED_MODULE_1__.default.checkBlocksToCrash();
    }

}

const $afterRandomFigurePutOnBoardHandler = new AfterRandomFigurePutOnBoardHandler();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($afterRandomFigurePutOnBoardHandler);

/***/ }),

/***/ "./src/core/events/next_handler/relax/BoxUpdateHandler.js":
/*!****************************************************************!*\
  !*** ./src/core/events/next_handler/relax/BoxUpdateHandler.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _Helper_relax_BoxOnboardCrasher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Helper/relax/BoxOnboardCrasher */ "./src/Helper/relax/BoxOnboardCrasher.js");




class BoxUpdateHandler extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        const { x, y } = extraData;
        const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(x, y);
        box.style({ background: '#92522e' });
        _Helper_relax_BoxOnboardCrasher__WEBPACK_IMPORTED_MODULE_2__.default.update({ x, y });
    }
}

const $boxUpdateHandler = new BoxUpdateHandler();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($boxUpdateHandler);

/***/ }),

/***/ "./src/core/events/next_handler/relax/GameStateChecker.js":
/*!****************************************************************!*\
  !*** ./src/core/events/next_handler/relax/GameStateChecker.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../general/Custom */ "./src/general/Custom.js");




class GameStateChecker extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    next(e, figure, extraData = {}) {
        const someUnlockedFigure = _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.getFigures()
            .find(figure => !figure.isLocked());

        if (!someUnlockedFigure) {
            setTimeout(e => {
                location.reload();
            }, 400)
        }
    }
}

const $gameStateChecker = new GameStateChecker();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($gameStateChecker);

/***/ }),

/***/ "./src/core/events/next_handler/relax/MouseUpHandler.js":
/*!**************************************************************!*\
  !*** ./src/core/events/next_handler/relax/MouseUpHandler.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../drawer/concrete/relax/RandomFiguresDrawer */ "./src/core/drawer/concrete/relax/RandomFiguresDrawer.js");
/* harmony import */ var _RandomFigureEventHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RandomFigureEventHelper */ "./src/core/events/next_handler/relax/RandomFigureEventHelper.js");







class MouseUpHandler extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    /**
     * @param e {Event}
     * @param figure {String}
     * @param index {Number}
     * @return {boolean}
     */
    next(e, figure, { index } ) {
        if (!_shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.shared.isDrawable()) {
            return false;
        }

        const { x, y } = _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.shared.getBlockIndexes();

        if (x === null || y === null) {
            this.log('Error:');
            this.log('x: ', x, 'y: ', y);
            this.error('x or y in MouseUpHandler next() method is not in right format')
        } else {
            const matrix = _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_3__.default.getFigure(figure).toMatrix();
            _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_2__.default.updateMatrix(matrix, { x, y }, { colorBox: true })
            _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.removeRandomFigure(figure, index);
            if (_shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.isAllFiguresDrawn()) {
                _RandomFigureEventHelper__WEBPACK_IMPORTED_MODULE_5__.default.drawRandomFiguresAndRegisterEvents();
            }
        }
    }
}

const $mouseUpHandler = new MouseUpHandler();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($mouseUpHandler);

/***/ }),

/***/ "./src/core/events/next_handler/relax/RandomFigureEventHelper.js":
/*!***********************************************************************!*\
  !*** ./src/core/events/next_handler/relax/RandomFigureEventHelper.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RandomFigureEventHelper
/* harmony export */ });
/* harmony import */ var _drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../drawer/concrete/relax/RandomFiguresDrawer */ "./src/core/drawer/concrete/relax/RandomFiguresDrawer.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _FigureMover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FigureMover */ "./src/core/events/FigureMover.js");




class RandomFigureEventHelper {
    static drawRandomFiguresAndRegisterEvents() {
        _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.clear();
        _drawer_concrete_relax_RandomFiguresDrawer__WEBPACK_IMPORTED_MODULE_0__.default.draw();
        _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.getFigures()
            .forEach(figureObj => _FigureMover__WEBPACK_IMPORTED_MODULE_2__.default.register(figureObj));
    }
}

/***/ }),

/***/ "./src/core/events/next_handler/relax/RandomFigureOnBoardChecker.js":
/*!**************************************************************************!*\
  !*** ./src/core/events/next_handler/relax/RandomFigureOnBoardChecker.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract/NextHandler */ "./src/core/abstract/NextHandler.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");
/* harmony import */ var _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _math_Calculator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../math/Calculator */ "./src/core/math/Calculator.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/store/Boxes */ "./src/shared/store/Boxes.js");






class RandomFigureOnBoardChecker extends _abstract_NextHandler__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(props) {
        super(props);
    }

    next(e, figure, extraData = {}) {
        const randomFigures = _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.getFigures();
        /**
         * @type {RandomFigure[]}
         */
        for (const randomFigure of randomFigures) {
            const figureName = randomFigure.getFigureName();
            const figure = _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_2__.default.getFigure(figureName);
            const isPlaceOnBoardForDrawingThisRandomFigure = _math_Calculator__WEBPACK_IMPORTED_MODULE_3__.default.isMatrixMatchForAny(_shared_store_Boxes__WEBPACK_IMPORTED_MODULE_4__.default.toMatrix(), figure.toMatrix());
            if (!isPlaceOnBoardForDrawingThisRandomFigure) {
                randomFigure.lock();
            } else {
                randomFigure.unlock();
            }
        }
    }
}

const $randomFigureOnBoardChecker = new RandomFigureOnBoardChecker();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($randomFigureOnBoardChecker);

/***/ }),

/***/ "./src/core/logic/FigurePlaceChecker.js":
/*!**********************************************!*\
  !*** ./src/core/logic/FigurePlaceChecker.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _math_Calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math/Calculator */ "./src/core/math/Calculator.js");
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");





class FigurePlaceChecker {
    constructor() {
    }

    /**
     * @param x block index >= 0 AND < boxesOnRow
     * @param y block index >= 0 AND < boxesOnColumn
     * @param figure {String} such as TYPE_1, TYPE_2
     */
    isDrawable({ x, y }, figure) {
        const boardAsMatrix = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_0__.default.toMatrix();
        const figureAsMatrix = _drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_1__.default.getFigure(figure).toMatrix();
        return _math_Calculator__WEBPACK_IMPORTED_MODULE_2__.default.isMatrixMatch(boardAsMatrix, figureAsMatrix, { x, y });
    }
}

const $figurePlaceChecker = new FigurePlaceChecker();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figurePlaceChecker);

/***/ }),

/***/ "./src/core/logic/FigurePlaceFinder.js":
/*!*********************************************!*\
  !*** ./src/core/logic/FigurePlaceFinder.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/store/Boxes */ "./src/shared/store/Boxes.js");
/* harmony import */ var _webpack_src_shared_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../webpack/src/shared/constants */ "../webpack/src/shared/constants.js");




class FigurePlaceFinder {
    constructor() {
    }
    /**
     * @param x
     * @param y
     * @param figure {String} such as TYPE_1, TYPE_2
     * @return {{x, y} | null}
     * @description This method should find a block from (64 blocks) where we can put the `figure` (to start drawing from)
     */
    find({ x, y }, figure) {
        x += _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.figureOffsetX;
        y += _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.figureOffsetY;

        const boxIndexes = this.goFindBox({ x, y });
        if (boxIndexes instanceof Object) {
            return boxIndexes
        }

        return null;
    }

    goFindBox({ x,  y }) {
        let errorX = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxWidth / 2;
        let errorY = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxHeight / 2;

        // figure is left of board
        if (x < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.offsetX - errorX) {
            return -1;
        }

        // figure is up of board
        if (y < _webpack_src_shared_constants__WEBPACK_IMPORTED_MODULE_2__.offsetY - errorY) {
            return -1;
        }

        let colX = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow - 1, colY = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn - 1;
        for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; j++) {
            const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(0, j);
            const boxCoordinateX = box.getCoordinateX();
            if (boxCoordinateX + errorX * 1.5 >= x) {
                colY = j;
                break;
            }
        }

        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn; i++) {
            const box = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(i, colX);
            const boxCoordinateY = box.getCoordinateY();
            if (boxCoordinateY + errorY * 1.5 >= y) {
                colX = i;
                break;
            }
        }

        const rightLimit = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(0,_general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow - 1).getCoordinateX() + _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxWidth;
        const bottomLimit = _shared_store_Boxes__WEBPACK_IMPORTED_MODULE_1__.default.get(_general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow - 1, 0).getCoordinateY() + _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxHeight;

        if (x - rightLimit > -_general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxWidth / 3) {
            return -1;
        }

        if (y - bottomLimit > -_general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxHeight / 3) {
            return -1;
        }

        return {
            x: colX, y: colY
        }
    }
}

const $figurePlaceFinder = new FigurePlaceFinder();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($figurePlaceFinder);

/***/ }),

/***/ "./src/core/math/Calculator.js":
/*!*************************************!*\
  !*** ./src/core/math/Calculator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Calculator
/* harmony export */ });
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../general/Constants */ "./src/general/Constants.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../general/Custom */ "./src/general/Custom.js");



class Calculator {
    /**
     *
     * @param $parentMatrix {Array[]}
     * @param $childMatrix {Array[]}
     * @param x {Number} starting x-index in `$parentMatrix`
     * @param y {Number} staring y-index in `$parentMatrix`
     */
    static isMatrixMatch($parentMatrix, $childMatrix, { x, y }) {
        let isMatch = true;
        $childMatrix.forEach((row, i) => {
            if (!isMatch) return false;
            row.forEach((cell, j) => {
                if (Calculator.isset($childMatrix, i, j)) {
                    if (Calculator.isset($parentMatrix, x + i, y + j)) {
                        isMatch = false;
                        return false;
                    }
                    if (x + i >= _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow || y + j >= _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn) {
                        isMatch = false;
                        return false;
                    }
                }
            })
        });
        return isMatch;
    }

    static isMatrixMatchForAny($parentMatrix, $childMatrix) {
        for (let i = 0; i < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow; i++) {
            for (let j = 0; j < _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnColumn; j++) {
                const ok = Calculator.isMatrixMatch($parentMatrix, $childMatrix, { x: i, y: j });
                if (ok) {
                    return true;
                }
            }
        }

        return false;
    }

    static isset($array, $i, $j) {
        if (!$array[$i]) {
            return false
        }

        if (!$array[$i][$j]) {
            return false;
        }

        return $array[$i][$j] === 1;
    }

    /**
     * @param $string {String} such as `10111101010101010`
     * @param $int {Number} such as `15, 254, 3033`
     * @param $category {Number}
     * @param $partSize {Number}
     */
    static matchesIntToStringPattern($string, $int, $category = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow,  $partSize = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow * 3) {
        return Calculator.matchesIntToStringPatternFrom($string, $int, { x: 0, y: 0 }, $category, $partSize);
    }

    /**
     *
     * @param $string {String}
     * @param $int {Number}
     * @param x {Number}
     * @param y {Number}
     * @param $category {Number}
     * @param $partSize {Number}
     */
    static matchesIntToStringPatternFrom($string, $int, { x, y }, $category,  $partSize = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow * 3) {
        const startingIndex = x * _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow + y;

        // console.log(x, y, $category);

        let number = 0;
        for (let i = startingIndex; i < $partSize; i++) {
            if ($string[i] === undefined) {
                return false;
            }

            const char = $string[i];
            if (char === '1') {
                number += _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.power(i - startingIndex);
            }
        }

        function isMatch() {
            const matches = number & $int;
            return matches === $int;
        }

        let currentCategory = x;
        const maxCategory = _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow - $category + 1;

        if ((currentCategory < maxCategory) && isMatch()) {
            return true;
        }

        const power2to3xBoxesOnRow = _general_Custom__WEBPACK_IMPORTED_MODULE_1__.default.power(_general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow * 3);
        for (let i = startingIndex + 1; i < $string.length; i++) {
            number /= 2;
            number = Math.floor(number);

            const char = $string[i];
            if (char === '1') {
                number += power2to3xBoxesOnRow;
            }

            if (currentCategory === _general_Constants__WEBPACK_IMPORTED_MODULE_0__.default.boxesOnRow - 1) {
                currentCategory = 0;
            }

            if (currentCategory++ >= maxCategory) {
                continue;
            }

            if (isMatch()) {
                return true;
            }
        }

        return false;
    }
}



/***/ }),

/***/ "./src/core/middlewares/Middleware.js":
/*!********************************************!*\
  !*** ./src/core/middlewares/Middleware.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Middleware
/* harmony export */ });
/* harmony import */ var _abstract_ErrorHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../abstract/ErrorHandler */ "./src/core/abstract/ErrorHandler.js");
/* harmony import */ var _abstract_EventHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract/EventHandler */ "./src/core/abstract/EventHandler.js");



class Middleware extends _abstract_EventHandler__WEBPACK_IMPORTED_MODULE_1__.default {

    constructor() {
        super();
        this.middlewares = [];
    }

    /**
     * @param $middleware {Middleware}
     * @param $multiple {Boolean}
     */
    addMiddleware($middleware, $multiple = true) {
        if (!($middleware instanceof Middleware)) {
            this.log($middleware);
            this.error('$middleware is not an instance of Middleware::class');
        }

        if ($multiple) {
            this.middlewares.push($middleware);
        } else {
            this.middlewares = [$middleware];
        }
    }

    passesMiddlewares($params = {}) {
        /**
         * @type {Middleware}
         */
        for (let middleware of this.middlewares) {
            if (!middleware.canPass($params)) {
                return false;
            }
        }

        return true;
    }

    canPass($params = {}) {
        return true;
    }
}

/***/ }),

/***/ "./src/core/middlewares/RandomFigureClickerMiddleWare.js":
/*!***************************************************************!*\
  !*** ./src/core/middlewares/RandomFigureClickerMiddleWare.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Middleware__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Middleware */ "./src/core/middlewares/Middleware.js");
/* harmony import */ var _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/store/leaves/State */ "./src/shared/store/leaves/State.js");



class RandomFigureClickerMiddleWare extends _Middleware__WEBPACK_IMPORTED_MODULE_0__.default {
    canPass($params = {}) {
        const { index } = $params;
        const randomFigure = _shared_store_leaves_State__WEBPACK_IMPORTED_MODULE_1__.default.relax.getRandomFigure(index);
        return !randomFigure.isLocked();
    }
}

const $randomFigureClickerMiddleWare = new RandomFigureClickerMiddleWare();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($randomFigureClickerMiddleWare);

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
    figureOffsetX: -30,
    figureOffsetY: -60,
    boxDefaultColor: '#1E1E1E',
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

const $limit = 50;
let power = 2;
const powers = [1];
for (let i = 1; i <= $limit; i++) {
    powers.push(power);
    power *= 2;
}

FUNC.power = num => {
    if (num <= $limit)
        return powers[num];
    throw new DOMException('num can"t be more than ' + $limit);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FUNC);

/***/ }),

/***/ "./src/leaves/RandomFigure.js":
/*!************************************!*\
  !*** ./src/leaves/RandomFigure.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ RandomFigure
/* harmony export */ });
/* harmony import */ var _core_abstract_Styler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/abstract/Styler */ "./src/core/abstract/Styler.js");


class RandomFigure extends _core_abstract_Styler__WEBPACK_IMPORTED_MODULE_0__.default {
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
/* harmony import */ var _core_abstract_DomNegotiatorAbstract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/abstract/DomNegotiatorAbstract */ "./src/core/abstract/DomNegotiatorAbstract.js");
/* harmony import */ var _general_Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../general/Constants */ "./src/general/Constants.js");




class DomNegotiator extends _core_abstract_DomNegotiatorAbstract__WEBPACK_IMPORTED_MODULE_1__.default {
    /**
     * @type {HTMLDivElement}
     * @var _divElement
     */

    /**
     * @param $element {HTMLElement|String}
     */
    constructor($element = null) {
        super();

        if ($element && typeof $element === 'string') {
            $element = this.findOrCreate($element);
        }

        this.setElement($element);
    }

    findOrCreate($elementId) {
        let element = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.$($elementId);
        if (!element) {
            element = _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.elt('div', null, $elementId);
            _general_Constants__WEBPACK_IMPORTED_MODULE_2__.default.dom.body.append(element);
        }
        return element;
    }

    /**
     * @param $element {HTMLElement|String}
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
        this.getElement().append($element)
    }

    clearHtml() {
        this.getElement().innerHTML = "";
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
/* harmony import */ var _core_math_Calculator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/math/Calculator */ "./src/core/math/Calculator.js");
/* harmony import */ var _core_abstract_EventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/abstract/EventHandler */ "./src/core/abstract/EventHandler.js");
/* harmony import */ var _core_events_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/events/Events */ "./src/core/events/Events.js");





class Boxes extends _core_abstract_EventHandler__WEBPACK_IMPORTED_MODULE_2__.default {
    /**
     * @type {[]}
     * @var _boxes
     */
    constructor() {
        super();
        this.reset();
        this._cachedMatrix = this.toMatrix();
    }

    addRow() {
        this._boxes.push([]);
    }

    addAt($i, { x, y }) {
        this._boxes[$i].push(
            new _leaves_Box__WEBPACK_IMPORTED_MODULE_0__.default({ x, y })
        );
    }

    /**
     * @param i
     * @param j
     * @return {Box}
     */
    get(i, j) {
        return this._boxes[i][j];
    }

    getBoxes() {
        return this._boxes;
    }

    toString() {
        let result = "";
        this.getBoxes().forEach(row => {
            /**
             * @type {Box}
             */
            row.forEach(block => {
                result += block.isBusy().toString();
            })
        });
        return result;
    }

    toMatrix() {
        const result = [];
        this._boxes.forEach(row => {
            result.push([]);
            const curIndex = result.length - 1;
            /**
             * @type {Box}
             */
            row.forEach(box => {
                result[curIndex].push(box.isBusy());
            })
        });

        return result;
    }

    /**
     * @param $childMatrix {Array[]}
     * @param x {Number}
     * @param y {Number}
     * @param extraData {{
     *     colorBox,
     *     color,
     * }}
     */
    updateMatrix($childMatrix, { x, y }, extraData = {}) {
        $childMatrix.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (_core_math_Calculator__WEBPACK_IMPORTED_MODULE_1__.default.isset($childMatrix, i, j)) {
                    const box = this.get(x + i, y + j);
                    box.setBusy();

                    if (this.hasHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_3__.default.BOX_UPDATE)) {
                        this.getHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_3__.default.BOX_UPDATE).next({}, null, { x: x + i, y: y + j })
                    }
                }
            })
        });

        if (this.hasHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_3__.default.BOARD_CHANGE)) {
            this.getHandler(_core_events_Events__WEBPACK_IMPORTED_MODULE_3__.default.BOARD_CHANGE).next({}, null);
        }
    }

    /**
     * @param $string {String}
     */
    inverse($string) {
        let result = "";
        for (let c of $string) {
            if (c === '0') {
                result += '1';
            } else {
                result += '0';
            }
        }

        return result;
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
                throw new DOMException(`${type} is not defined`)
            }
            return this.android[type]
        }
        if (!this.ps[type]) {
            throw new DOMException(`${type} is not defined`)
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
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../general/Custom */ "./src/general/Custom.js");


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

    isBusy() {
        if (this.data.busy) {
            return 1;
        }
        return 0;
    }

    setBusy($state = true) {
        this.data.busy = $state;
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

    /**
     * @param $style {Object}
     */
    style($style) {
        _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(this.getReferenceDiv(), $style);
        // console.log('got into style')
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
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _leaves_RandomFigure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../leaves/RandomFigure */ "./src/leaves/RandomFigure.js");



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
            this.randomFigures.push(new _leaves_RandomFigure__WEBPACK_IMPORTED_MODULE_1__.default({ figure, divElement, index }));
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
            _general_Custom__WEBPACK_IMPORTED_MODULE_0__.default.setStyle(thisFigure.getDivElement(), { visibility: "hidden"})
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
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (STATE);

/***/ }),

/***/ "./src/shared/store/tmp/TmpFigureHelper.js":
/*!*************************************************!*\
  !*** ./src/shared/store/tmp/TmpFigureHelper.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _core_drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/drawer/figures/Figures */ "./src/core/drawer/figures/Figures.js");
/* harmony import */ var _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../negotiators/DomNegotiator */ "./src/negotiators/DomNegotiator.js");
/* harmony import */ var _general_Custom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../general/Custom */ "./src/general/Custom.js");
/* harmony import */ var _Boxes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Boxes */ "./src/shared/store/Boxes.js");





class TmpFigureHelper extends _negotiators_DomNegotiator__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super('#tmp-element');
    }

    drawTmpFigure({ x, y }, figure) {
        this.clearHtml();
        const divElement = _core_drawer_figures_Figures__WEBPACK_IMPORTED_MODULE_0__.default.draw(figure, 1.02, { opacity: .3 });
        this.append(divElement);

        const box = _Boxes__WEBPACK_IMPORTED_MODULE_3__.default.get(x, y);

        _general_Custom__WEBPACK_IMPORTED_MODULE_2__.default.setStyle(this.getElement(), {
            position: 'absolute',
            left: box.getCoordinateX() + 'px',
            top: box.getCoordinateY() + 'px',
        });
    }
}

const $tmpFigureHelper = new TmpFigureHelper();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ($tmpFigureHelper);

/***/ }),

/***/ "../webpack/src/shared/android.js":
/*!****************************************!*\
  !*** ../webpack/src/shared/android.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const userAgent = navigator.userAgent.toLowerCase();
const Android = userAgent.indexOf("android") > -1;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Android);

/***/ }),

/***/ "../webpack/src/shared/constants.js":
/*!******************************************!*\
  !*** ../webpack/src/shared/constants.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dom": () => /* binding */ dom,
/* harmony export */   "width": () => /* binding */ width,
/* harmony export */   "height": () => /* binding */ height,
/* harmony export */   "offsetY": () => /* binding */ offsetY,
/* harmony export */   "boxesOnRow": () => /* binding */ boxesOnRow,
/* harmony export */   "boxesOnColumn": () => /* binding */ boxesOnColumn,
/* harmony export */   "figureOffsetX": () => /* binding */ figureOffsetX,
/* harmony export */   "figureOffsetY": () => /* binding */ figureOffsetY,
/* harmony export */   "boxColor": () => /* binding */ boxColor,
/* harmony export */   "blockCrashColor": () => /* binding */ blockCrashColor,
/* harmony export */   "boxHeight": () => /* binding */ boxHeight,
/* harmony export */   "boxWidth": () => /* binding */ boxWidth,
/* harmony export */   "offsetX": () => /* binding */ offsetX
/* harmony export */ });
/* harmony import */ var _store_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store/config */ "../webpack/src/shared/store/config.js");


const dom = document;
const width = _store_config__WEBPACK_IMPORTED_MODULE_0__.default.getScreenWidth() * .9;
const height = _store_config__WEBPACK_IMPORTED_MODULE_0__.default.getScreenHeight();
const offsetY = height * 0.1 + 20;
const boxesOnRow = 8;
const boxesOnColumn = 8;
const figureOffsetX = -70
const figureOffsetY = -200
const boxColor = 'rgba(153, 93, 93)';
const blockCrashColor = 'rgb(151, 96, 96)';

let offsetX1 = 0;
let boxHeight1 = (height * .7) / boxesOnColumn;
let boxWidth1 = (width - offsetX1) / boxesOnRow
boxWidth1 = boxHeight1 = Math.min(boxWidth1, boxHeight1);

let rightOffsetX = offsetX1 + boxesOnRow * boxWidth1
rightOffsetX = width - rightOffsetX;
offsetX1 = (offsetX1 + rightOffsetX) / 2 + 20;

const boxHeight = boxHeight1
const boxWidth = boxWidth1
const offsetX = offsetX1

/***/ }),

/***/ "../webpack/src/shared/store/config.js":
/*!*********************************************!*\
  !*** ../webpack/src/shared/store/config.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _android__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../android */ "../webpack/src/shared/android.js");


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
        if (_android__WEBPACK_IMPORTED_MODULE_0__.default) {
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
        if (_android__WEBPACK_IMPORTED_MODULE_0__.default) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
        return { x: e.clientX, y: e.clientY }
    },
    getScreenWidth() {
        if (_android__WEBPACK_IMPORTED_MODULE_0__.default) {
            let ratio = window.devicePixelRatio || 1;
            return screen.width * ratio;
        }
        return window.innerWidth;
    },
    getScreenHeight() {
        if (_android__WEBPACK_IMPORTED_MODULE_0__.default) {
            let ratio = window.devicePixelRatio || 1;
            return screen.height * ratio;
        }
        return window.innerHeight
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CONFIG);

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