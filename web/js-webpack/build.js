/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "      .header {\n          padding: 4px;\n      }\n      \n      .content {\n          margin-top: 10px;\n      }\n      \n      .menu {\n          position: absolute;\n          display: flex;\n          bottom: 150px;\n          margin: 0 20px;\n      }\n      \n      .figure {\n          position: absolute;\n          left: 200px;\n          top: 200px;\n      }\n      \n      .tmp-figure {\n          position: absolute;\n      }\n      \n      @keyframes _fallDown {\n          0% {\n              opacity: 1;\n              visibility: visible;\n              height: 10%;\n              border-bottom-left-radius: 90%;\n              border-bottom-right-radius: 90%;\n          }\n          10% {\n              height: '10%';\n              border-bottom-right-radius: 100%;\n              border-bottom-left-radius: 100%;\n          }\n          50% {\n              height: '50%';\n              border-bottom-left-radius: 70%;\n              border-bottom-right-radius: 70%;\n          }\n          100% {\n              height: 100%;\n              border-bottom-right-radius: 0%;\n              border-bottom-left-radius: 0%;\n          }\n      }\n      \n      @keyframes _fallUp {\n          0% {\n              height: 100%;\n              border-bottom-right-radius: 0%;\n              border-bottom-left-radius: 0%;\n          }\n          50% {\n              height: '50%';\n              border-bottom-left-radius: 70%;\n              border-bottom-right-radius: 70%;\n          }\n          90% {\n              height: '10%';\n              border-bottom-right-radius: 100%;\n              border-bottom-left-radius: 100%;\n          }\n          100% {\n              opacity: 0;\n              visibility: hidden;\n              height: 0%;\n              border: none;\n              box-shadow: none;\n          }\n      }\n      \n      #backdrop {\n          width: calc(100% + 20px);\n          margin-top: -20px;\n          margin-left: -20px;\n          position: absolute;\n          background-color: #030e1d;\n      }\n      \n      .fallDown {\n          animation: _fallDown .4s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      .fallUp {\n          animation: _fallUp .4s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      body {\n          background: #293039;\n          overflow: hidden;\n      }\n      \n      .menu-buttons {\n          position: absolute;\n          width: 240;\n          top: 20%;\n          left: calc(50% - 120px);\n      }\n      \n      .menu-button {\n          width: 240px;\n          padding: 4px;\n          margin-top: 10px;\n          background-color: #52403B;\n          border-radius: 50px;\n          cursor: pointer;\n      }\n      \n      .inner-button {\n          margin: 5px;\n          width: calc(100% - 20px);\n          border-radius: 50px;\n          border: .2rem solid yellow;\n      }\n      \n      .button-background {\n          background-color: #2D221F;\n          border-radius: 50px;\n          padding: 6px;\n          text-align: left;\n          transition: all .4s ease-in;\n      }\n      \n      .circle {\n          width: 20px;\n          height: 20px;\n          border-radius: 50%;\n          background: yellow;\n          margin-left: 5px;\n          margin-right: 10px;\n      }\n      \n      .text {\n          width: 70%;\n          text-align: center;\n          font-family: 'Courier New', Courier, monospace;\n          font-weight: bold;\n          padding: 1px;\n          color: white;\n      }\n      \n      .menu-button:hover .button-background {\n          background: #110E0F;\n      }\n      \n      .d-none {\n          display: none;\n          color: #4d7a7a;\n      }\n      \n      .navbar {\n          margin: 0;\n          padding: 10px;\n          position: absolute;\n          width: 100%;\n          height: 60px;\n          top: 0;\n          left: 0;\n          background: #0E1318;\n          display: flex;\n      }\n      /* #5362F6   */\n      /*  #E485F8  */\n      \n      .my-font {\n          font-family: 'Courier New', Courier, monospace;\n          color: white;\n          font-size: 1.2rem;\n      }\n      \n      .my-font-2 {\n          font-weight: bolder;\n          color: #3a997a;\n          font-size: 1.6rem;\n          margin-top: 15px;\n          text-shadow: 1px 1px #71b1d6,\n          1.75px 1.75px #85d7f8,\n          1.5px 1.5px #85b3f8,\n          1.25px 1.25px #858df8,\n          1px 1px #85b7f8,\n          .75px .75px #E485F8,\n          .5px .5px #E485F8,\n          .25px .25px #E485F8,\n          0 0 2px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8,\n          0px 0px #E485F8,\n          0.75px 0.75px #E485F8,\n          1.5px 1.5px #E485F8,\n          0.25px 1.25px #E485F8,\n          1px 1px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8,\n          1px 1px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8;\n      }\n      \n      .score {\n          margin-left: auto;\n          margin-right: 5%;\n          display: flex;\n          font-weight: bolder;\n      }\n      \n      .best {\n          color: orange;\n          text-shadow: 2px 2px 4px #0E1318;\n      }\n      \n      @keyframes _boxCrashing1 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-150px) translateX(-60px) rotate(-90deg) scale(.7);\n          }\n          100% {\n              transform: translateY(300px) translateX(-240px) rotate(-360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-1 {\n          animation: _boxCrashing1 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing2 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-150px) translateX(60px) rotate(90deg) scale(.7);\n          }\n          100% {\n              transform: translateY(300px) translateX(240px) rotate(360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-2 {\n          animation: _boxCrashing2 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing3 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-50px) translateX(-100px) rotate(-90deg) scale(.7);\n              transform-style: preserve-3d;\n          }\n          100% {\n              transform: translateY(400px) translateX(-300px) rotate(-360deg) scale(.1);\n              transform-style: preserve-3d;\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-3 {\n          animation: _boxCrashing3 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing4 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-50px) translateX(100px) rotate(90deg) scale(.7);\n              transform-style: preserve-3d;\n          }\n          100% {\n              transform: translateY(400px) translateX(500px) rotate(360deg) scale(.1);\n              transform-style: preserve-3d;\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-4 {\n          animation: _boxCrashing4 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashingTest {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          5% {\n              transform: translateY(-15px) translateX(-6px) rotate(9deg) scale(.97)\n          }\n          10% {\n              transform: translateY(-30px) translateX(-12px) rotate(18deg) scale(.95);\n          }\n          15% {\n              transform: translateY(-45px) translateX(-18px) rotate(27deg) scale(.92)\n          }\n          20% {\n              transform: translateY(-60px) translateX(-24px) rotate(36deg) scale(.9);\n          }\n          25% {\n              transform: translateY(-75px) translateX(-30px) rotate(45deg) scale(.87)\n          }\n          30% {\n              transform: translateY(-90px) translateX(-36px) rotate(54deg) scale(.85);\n          }\n          35% {\n              transform: translateY(-105px) translateX(-42px) rotate(63deg) scale(.82);\n          }\n          40% {\n              transform: translateY(-120px) translateX(-48px) rotate(72deg) scale(.8);\n          }\n          45% {\n              transform: translateY(-135px) translateX(-54px) rotate(81deg) scale(.77);\n          }\n          50% {\n              transform: translateY(-150px) translateX(-60px) rotate(90deg) scale(.75);\n          }\n          100% {\n              transform: translateY(150px) translateX(-120px) rotate(360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-test {\n          animation: _boxCrashingTest .6s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      /* #0E1318 */\n      \n      .asf {\n          color: rgb(151, 96, 96);\n      }", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"MAAM;UACI,YAAY;MAChB;;MAEA;UACI,gBAAgB;MACpB;;MAEA;UACI,kBAAkB;UAClB,aAAa;UACb,aAAa;UACb,cAAc;MAClB;;MAEA;UACI,kBAAkB;UAClB,WAAW;UACX,UAAU;MACd;;MAEA;UACI,kBAAkB;MACtB;;MAEA;UACI;cACI,UAAU;cACV,mBAAmB;cACnB,WAAW;cACX,8BAA8B;cAC9B,+BAA+B;UACnC;UACA;cACI,aAAa;cACb,gCAAgC;cAChC,+BAA+B;UACnC;UACA;cACI,aAAa;cACb,8BAA8B;cAC9B,+BAA+B;UACnC;UACA;cACI,YAAY;cACZ,8BAA8B;cAC9B,6BAA6B;UACjC;MACJ;;MAEA;UACI;cACI,YAAY;cACZ,8BAA8B;cAC9B,6BAA6B;UACjC;UACA;cACI,aAAa;cACb,8BAA8B;cAC9B,+BAA+B;UACnC;UACA;cACI,aAAa;cACb,gCAAgC;cAChC,+BAA+B;UACnC;UACA;cACI,UAAU;cACV,kBAAkB;cAClB,UAAU;cACV,YAAY;cACZ,gBAAgB;UACpB;MACJ;;MAEA;UACI,wBAAwB;UACxB,iBAAiB;UACjB,kBAAkB;UAClB,kBAAkB;UAClB,yBAAyB;MAC7B;;MAEA;UACI,oCAAoC;UACpC,6BAA6B;MACjC;;MAEA;UACI,kCAAkC;UAClC,6BAA6B;MACjC;;MAEA;UACI,mBAAmB;UACnB,gBAAgB;MACpB;;MAEA;UACI,kBAAkB;UAClB,UAAU;UACV,QAAQ;UACR,uBAAuB;MAC3B;;MAEA;UACI,YAAY;UACZ,YAAY;UACZ,gBAAgB;UAChB,yBAAyB;UACzB,mBAAmB;UACnB,eAAe;MACnB;;MAEA;UACI,WAAW;UACX,wBAAwB;UACxB,mBAAmB;UACnB,0BAA0B;MAC9B;;MAEA;UACI,yBAAyB;UACzB,mBAAmB;UACnB,YAAY;UACZ,gBAAgB;UAChB,2BAA2B;MAC/B;;MAEA;UACI,WAAW;UACX,YAAY;UACZ,kBAAkB;UAClB,kBAAkB;UAClB,gBAAgB;UAChB,kBAAkB;MACtB;;MAEA;UACI,UAAU;UACV,kBAAkB;UAClB,8CAA8C;UAC9C,iBAAiB;UACjB,YAAY;UACZ,YAAY;MAChB;;MAEA;UACI,mBAAmB;MACvB;;MAEA;UACI,aAAa;UACb,cAAc;MAClB;;MAEA;UACI,SAAS;UACT,aAAa;UACb,kBAAkB;UAClB,WAAW;UACX,YAAY;UACZ,MAAM;UACN,OAAO;UACP,mBAAmB;UACnB,aAAa;MACjB;MACA,cAAc;MACd,cAAc;;MAEd;UACI,8CAA8C;UAC9C,YAAY;UACZ,iBAAiB;MACrB;;MAEA;UACI,mBAAmB;UACnB,cAAc;UACd,iBAAiB;UACjB,gBAAgB;UAChB;;;;;;;;;;;;;;;;;;;;;;;+BAuBqB;MACzB;;MAEA;UACI,iBAAiB;UACjB,gBAAgB;UAChB,aAAa;UACb,mBAAmB;MACvB;;MAEA;UACI,aAAa;UACb,gCAAgC;MACpC;;MAEA;UACI;cACI,uDAAuD;UAC3D;UACA;cACI,wEAAwE;UAC5E;UACA;cACI,yEAAyE;cACzE,UAAU;cACV,aAAa;UACjB;MACJ;;MAEA;UACI,yCAAyC;UACzC,6BAA6B;MACjC;;MAEA;UACI;cACI,uDAAuD;UAC3D;UACA;cACI,sEAAsE;UAC1E;UACA;cACI,uEAAuE;cACvE,UAAU;cACV,aAAa;UACjB;MACJ;;MAEA;UACI,yCAAyC;UACzC,6BAA6B;MACjC;;MAEA;UACI;cACI,uDAAuD;UAC3D;UACA;cACI,wEAAwE;cACxE,4BAA4B;UAChC;UACA;cACI,yEAAyE;cACzE,4BAA4B;cAC5B,UAAU;cACV,aAAa;UACjB;MACJ;;MAEA;UACI,yCAAyC;UACzC,6BAA6B;MACjC;;MAEA;UACI;cACI,uDAAuD;UAC3D;UACA;cACI,sEAAsE;cACtE,4BAA4B;UAChC;UACA;cACI,uEAAuE;cACvE,4BAA4B;cAC5B,UAAU;cACV,aAAa;UACjB;MACJ;;MAEA;UACI,yCAAyC;UACzC,6BAA6B;MACjC;;MAEA;UACI;cACI,uDAAuD;UAC3D;UACA;cACI;UACJ;UACA;cACI,uEAAuE;UAC3E;UACA;cACI;UACJ;UACA;cACI,sEAAsE;UAC1E;UACA;cACI;UACJ;UACA;cACI,uEAAuE;UAC3E;UACA;cACI,wEAAwE;UAC5E;UACA;cACI,uEAAuE;UAC3E;UACA;cACI,wEAAwE;UAC5E;UACA;cACI,wEAAwE;UAC5E;UACA;cACI,wEAAwE;cACxE,UAAU;cACV,aAAa;UACjB;MACJ;;MAEA;UACI,2CAA2C;UAC3C,6BAA6B;MACjC;MACA,YAAY;;MAEZ;UACI,uBAAuB;MAC3B","sourcesContent":["      .header {\n          padding: 4px;\n      }\n      \n      .content {\n          margin-top: 10px;\n      }\n      \n      .menu {\n          position: absolute;\n          display: flex;\n          bottom: 150px;\n          margin: 0 20px;\n      }\n      \n      .figure {\n          position: absolute;\n          left: 200px;\n          top: 200px;\n      }\n      \n      .tmp-figure {\n          position: absolute;\n      }\n      \n      @keyframes _fallDown {\n          0% {\n              opacity: 1;\n              visibility: visible;\n              height: 10%;\n              border-bottom-left-radius: 90%;\n              border-bottom-right-radius: 90%;\n          }\n          10% {\n              height: '10%';\n              border-bottom-right-radius: 100%;\n              border-bottom-left-radius: 100%;\n          }\n          50% {\n              height: '50%';\n              border-bottom-left-radius: 70%;\n              border-bottom-right-radius: 70%;\n          }\n          100% {\n              height: 100%;\n              border-bottom-right-radius: 0%;\n              border-bottom-left-radius: 0%;\n          }\n      }\n      \n      @keyframes _fallUp {\n          0% {\n              height: 100%;\n              border-bottom-right-radius: 0%;\n              border-bottom-left-radius: 0%;\n          }\n          50% {\n              height: '50%';\n              border-bottom-left-radius: 70%;\n              border-bottom-right-radius: 70%;\n          }\n          90% {\n              height: '10%';\n              border-bottom-right-radius: 100%;\n              border-bottom-left-radius: 100%;\n          }\n          100% {\n              opacity: 0;\n              visibility: hidden;\n              height: 0%;\n              border: none;\n              box-shadow: none;\n          }\n      }\n      \n      #backdrop {\n          width: calc(100% + 20px);\n          margin-top: -20px;\n          margin-left: -20px;\n          position: absolute;\n          background-color: #030e1d;\n      }\n      \n      .fallDown {\n          animation: _fallDown .4s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      .fallUp {\n          animation: _fallUp .4s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      body {\n          background: #293039;\n          overflow: hidden;\n      }\n      \n      .menu-buttons {\n          position: absolute;\n          width: 240;\n          top: 20%;\n          left: calc(50% - 120px);\n      }\n      \n      .menu-button {\n          width: 240px;\n          padding: 4px;\n          margin-top: 10px;\n          background-color: #52403B;\n          border-radius: 50px;\n          cursor: pointer;\n      }\n      \n      .inner-button {\n          margin: 5px;\n          width: calc(100% - 20px);\n          border-radius: 50px;\n          border: .2rem solid yellow;\n      }\n      \n      .button-background {\n          background-color: #2D221F;\n          border-radius: 50px;\n          padding: 6px;\n          text-align: left;\n          transition: all .4s ease-in;\n      }\n      \n      .circle {\n          width: 20px;\n          height: 20px;\n          border-radius: 50%;\n          background: yellow;\n          margin-left: 5px;\n          margin-right: 10px;\n      }\n      \n      .text {\n          width: 70%;\n          text-align: center;\n          font-family: 'Courier New', Courier, monospace;\n          font-weight: bold;\n          padding: 1px;\n          color: white;\n      }\n      \n      .menu-button:hover .button-background {\n          background: #110E0F;\n      }\n      \n      .d-none {\n          display: none;\n          color: #4d7a7a;\n      }\n      \n      .navbar {\n          margin: 0;\n          padding: 10px;\n          position: absolute;\n          width: 100%;\n          height: 60px;\n          top: 0;\n          left: 0;\n          background: #0E1318;\n          display: flex;\n      }\n      /* #5362F6   */\n      /*  #E485F8  */\n      \n      .my-font {\n          font-family: 'Courier New', Courier, monospace;\n          color: white;\n          font-size: 1.2rem;\n      }\n      \n      .my-font-2 {\n          font-weight: bolder;\n          color: #3a997a;\n          font-size: 1.6rem;\n          margin-top: 15px;\n          text-shadow: 1px 1px #71b1d6,\n          1.75px 1.75px #85d7f8,\n          1.5px 1.5px #85b3f8,\n          1.25px 1.25px #858df8,\n          1px 1px #85b7f8,\n          .75px .75px #E485F8,\n          .5px .5px #E485F8,\n          .25px .25px #E485F8,\n          0 0 2px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8,\n          0px 0px #E485F8,\n          0.75px 0.75px #E485F8,\n          1.5px 1.5px #E485F8,\n          0.25px 1.25px #E485F8,\n          1px 1px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8,\n          1px 1px #E485F8,\n          0.75px 0.75px #E485F8,\n          0.5px 0.5px #E485F8,\n          0.25px 0.25px #E485F8;\n      }\n      \n      .score {\n          margin-left: auto;\n          margin-right: 5%;\n          display: flex;\n          font-weight: bolder;\n      }\n      \n      .best {\n          color: orange;\n          text-shadow: 2px 2px 4px #0E1318;\n      }\n      \n      @keyframes _boxCrashing1 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-150px) translateX(-60px) rotate(-90deg) scale(.7);\n          }\n          100% {\n              transform: translateY(300px) translateX(-240px) rotate(-360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-1 {\n          animation: _boxCrashing1 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing2 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-150px) translateX(60px) rotate(90deg) scale(.7);\n          }\n          100% {\n              transform: translateY(300px) translateX(240px) rotate(360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-2 {\n          animation: _boxCrashing2 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing3 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-50px) translateX(-100px) rotate(-90deg) scale(.7);\n              transform-style: preserve-3d;\n          }\n          100% {\n              transform: translateY(400px) translateX(-300px) rotate(-360deg) scale(.1);\n              transform-style: preserve-3d;\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-3 {\n          animation: _boxCrashing3 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashing4 {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          25% {\n              transform: translateY(-50px) translateX(100px) rotate(90deg) scale(.7);\n              transform-style: preserve-3d;\n          }\n          100% {\n              transform: translateY(400px) translateX(500px) rotate(360deg) scale(.1);\n              transform-style: preserve-3d;\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-4 {\n          animation: _boxCrashing4 1.1s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      \n      @keyframes _boxCrashingTest {\n          0% {\n              transform: translateY(0px) translateX(0px) rotate(0deg);\n          }\n          5% {\n              transform: translateY(-15px) translateX(-6px) rotate(9deg) scale(.97)\n          }\n          10% {\n              transform: translateY(-30px) translateX(-12px) rotate(18deg) scale(.95);\n          }\n          15% {\n              transform: translateY(-45px) translateX(-18px) rotate(27deg) scale(.92)\n          }\n          20% {\n              transform: translateY(-60px) translateX(-24px) rotate(36deg) scale(.9);\n          }\n          25% {\n              transform: translateY(-75px) translateX(-30px) rotate(45deg) scale(.87)\n          }\n          30% {\n              transform: translateY(-90px) translateX(-36px) rotate(54deg) scale(.85);\n          }\n          35% {\n              transform: translateY(-105px) translateX(-42px) rotate(63deg) scale(.82);\n          }\n          40% {\n              transform: translateY(-120px) translateX(-48px) rotate(72deg) scale(.8);\n          }\n          45% {\n              transform: translateY(-135px) translateX(-54px) rotate(81deg) scale(.77);\n          }\n          50% {\n              transform: translateY(-150px) translateX(-60px) rotate(90deg) scale(.75);\n          }\n          100% {\n              transform: translateY(150px) translateX(-120px) rotate(360deg) scale(.1);\n              opacity: 0;\n              display: none;\n          }\n      }\n      \n      .box-crashing-test {\n          animation: _boxCrashingTest .6s ease-in-out;\n          animation-fill-mode: forwards;\n      }\n      /* #0E1318 */\n      \n      .asf {\n          color: rgb(151, 96, 96);\n      }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === 'function') {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _main_Menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main/Menu */ "./src/main/Menu.js");



_main_Menu__WEBPACK_IMPORTED_MODULE_1__.default.init()



// import remover from './core/remover';
// import { dom } from './shared/constants'

// dom.addEventListener('test', (e) => {
//     console.log(remover)
// })

/***/ }),

/***/ "./src/core/BlockCrashAnimation.js":
/*!*****************************************!*\
  !*** ./src/core/BlockCrashAnimation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");



class BlockCrashAnimation {
    constructor() {
        this.WITH_TRANSFORMATIONS = 'withTransform'
        this.PARABOLIC_CURVE = 'parabolicCurve'

        this.types = [
            this.WITH_TRANSFORMATIONS,
            this.PARABOLIC_CURVE
        ]
    }


    animateCrash({ x, y }) {
        this.run(
            this.draw({ x, y }), { x, y }
        )
    }

    draw({ x, y }) {
        let el = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.elt)('div', null, null, {
            position: 'absolute',
            left: x + 'px',
            top: y + 'px',
            width: _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxWidth + 'px',
            height: _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxHeight + 'px',
            background: _shared_constants__WEBPACK_IMPORTED_MODULE_1__.blockCrashColor,
            border: '2px inset black',
        })
        _shared_constants__WEBPACK_IMPORTED_MODULE_1__.dom.body.append(el)
        return el
    }

    run(el, boxCoordinates) {
        /*
         let r = Math.floor(Math.random() * this.types.length)
         let type = this.types[r]
 
         this[type](el, o) 
       */

        this.parabolicCurve(el, boxCoordinates)
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
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(el, {
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
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(el, {
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

const blockAnim = new BlockCrashAnimation()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (blockAnim);

/***/ }),

/***/ "./src/core/boxfinder.js":
/*!*******************************!*\
  !*** ./src/core/boxfinder.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./painter */ "./src/core/painter.js");
/* harmony import */ var _finder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./finder */ "./src/core/finder.js");
/* harmony import */ var _shared_store_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/config */ "./src/shared/store/config.js");






class BoxFinder {
    findAndDraw(e) {
        let { x, y } = _shared_store_config__WEBPACK_IMPORTED_MODULE_4__.default.coords(e);

        x = x + _shared_constants__WEBPACK_IMPORTED_MODULE_0__.figureOffsetX;
        y = y + _shared_constants__WEBPACK_IMPORTED_MODULE_0__.figureOffsetY;

        _shared_store_state__WEBPACK_IMPORTED_MODULE_1__.default.status = "finding";
        let sbox = this.bestBox({ x, y })
        if (sbox === -1) {
            _painter__WEBPACK_IMPORTED_MODULE_2__.default.clearTmpFigure()
        }
        _shared_store_state__WEBPACK_IMPORTED_MODULE_1__.default.status = "found";
    }

    bestBox({ x, y }) {
        let errorX = _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxWidth / 2;
        let errorY = 10;

        if (x < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.offsetX - errorX) {
            console.log("X < 0");
            _painter__WEBPACK_IMPORTED_MODULE_2__.default.clearTmpFigure();
            return -1;
        }

        if (y < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.offsetY - errorY) {
            console.log("Y < 0");
            _painter__WEBPACK_IMPORTED_MODULE_2__.default.clearTmpFigure();
            return -1;
        }


        while (true) {
            if (_finder__WEBPACK_IMPORTED_MODULE_3__.default.isDone()) {
                _shared_store_state__WEBPACK_IMPORTED_MODULE_1__.default.boxCoords = { x: _finder__WEBPACK_IMPORTED_MODULE_3__.default.x, y: _finder__WEBPACK_IMPORTED_MODULE_3__.default.y }
                _painter__WEBPACK_IMPORTED_MODULE_2__.default.drawTmpFigure({ x: _finder__WEBPACK_IMPORTED_MODULE_3__.default.x, y: _finder__WEBPACK_IMPORTED_MODULE_3__.default.y }, _shared_store_state__WEBPACK_IMPORTED_MODULE_1__.default.figure)
                _finder__WEBPACK_IMPORTED_MODULE_3__.default.reset()
                break;
            }
            let coords = _finder__WEBPACK_IMPORTED_MODULE_3__.default.getCoords();
            let [x1, y1] = [coords.x, coords.y]
            let typeX = null,
                typeY = null;

            if (x - errorX < x1) typeX = '-1';
            if (x >= x1 - errorX) typeX = '1';
            if (y - errorY < y1) typeY = '-1';
            if (y >= y1 - errorY) typeY = '1';

            _finder__WEBPACK_IMPORTED_MODULE_3__.default.update(typeX, typeY);
        }
    }
}

const boxfinder = new BoxFinder()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boxfinder);

/***/ }),

/***/ "./src/core/figure.js":
/*!****************************!*\
  !*** ./src/core/figure.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_store_figures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/store/figures */ "./src/shared/store/figures.js");
/* harmony import */ var _main_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main/event */ "./src/main/event.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _placefinder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./placefinder */ "./src/core/placefinder.js");







class Figure {
    constructor() {
        this.scaleK = 3;
        this.cnt = null;
        this.reset();
    }

    removeFigure() {
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(_shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.boxDiv, {
            visibility: 'hidden'
        })
        if (--this.cnt === 0) {
            this.cnt = 3;
            figureHelper.drawFigures();
        }
    }

    getRandomFigures(cnt = 3) {
        let keys = Object.keys(_shared_store_figures__WEBPACK_IMPORTED_MODULE_2__.default);
        let len = keys.length;
        let randomFigures = [];

        for (let i = 0; i < cnt; i++) {
            let ind = Math.floor(Math.random() * len);
            randomFigures.push(keys[ind]);
        }
        return randomFigures;

    }

    drawFigures() {
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('menu').innerHTML = "";

        let randomFigures = this.getRandomFigures();
        randomFigures.forEach(figureType => {
            this.drawFigure(figureType)
        })
        _placefinder__WEBPACK_IMPORTED_MODULE_5__.default.checkAll(_shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.allFigures)
    }

    drawFigure(figureType) {
        let type = figureType;
        let figure = _shared_store_figures__WEBPACK_IMPORTED_MODULE_2__.default[type].figure
        figure = figure.split("\n")
            .map(c => c.trim())
            .filter(c => c)
            .map(c => c.split(""))

        let marginLeft = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.width / 6.4 + 'px';
        let box = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.elt)("box", null, null, {
            position: "relative",
            marginLeft: marginLeft,
            marginRight: marginLeft
        })

        const bw = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxWidth / this.scaleK;
        const bh = _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxHeight / this.scaleK;

        this.draw(figure, bw, bh, box)
        _main_event__WEBPACK_IMPORTED_MODULE_3__.default.register(box, figure, type)

        _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.allFigures.push({
            type: figureType,
            figure,
            div: box,
        })

        ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)("menu").append(box)
    }

    draw(figure, bw, bh, box, style = {}) {
        figure.forEach((r, i) => {
            r.forEach((c, j) => {
                if (figure[i][j] !== ".") {
                    let l = j * (bw + 3);
                    let t = i * (bh + 3);

                    let el = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.elt)("div", null, null, {
                        top: t + "px",
                        left: l + "px",
                        width: bw + "px",
                        height: bh + "px",
                        background: _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxColor,
                        position: "absolute",
                    })
                    ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(el, style)
                    box.append(el);
                }
            })
        })
    }

    reset() {
        this.cnt = 3;
    }
}

const figureHelper = new Figure();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (figureHelper);

/***/ }),

/***/ "./src/core/finder.js":
/*!****************************!*\
  !*** ./src/core/finder.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_store_boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/store/boxes */ "./src/shared/store/boxes.js");
 

 class Finder {
     constructor() {
         this.x = null;
         this.y = null;
         this.len = null;
         this.prevBox = null;
         this.backTrack = null;

         this.reset();
     }

     reset() {
         this.x = this.y = this.len = 4;
     }

     getNextPartition() {
         let type = this.len;

         if (type == 4) {
             return 2;
         } else if (type == 3) {
             return 1;
         } else {
             return 1;
         }
     }

     update(typeX, typeY) {
         if (this.len === 1) {
             if (typeX == 1) typeX = 0;
             if (typeY == 1) typeY = 0;
         }

         if (this.backTrack) {
             setStyle(_shared_store_boxes__WEBPACK_IMPORTED_MODULE_0__.default.array[this.x][this.y].div, {
                 background: 'rgba(200, 0, 0, .3)'
             })
         }

         let len = this.getNextPartition();

         if (typeX == '-1') {
             this.y -= len
         } else if (typeX == '1') {
             this.y += len
         }

         if (typeY == '-1') {
             this.x -= len
         } else if (typeY == '1') {
             this.x += len
         }

         this.len /= 2;
         if (this.len < 1) this.len = 0;

         // if (this.len === 0) this.matchBox();
     }

     isDone() {
         return this.len === 0;
     }

     getX() {
         return _shared_store_boxes__WEBPACK_IMPORTED_MODULE_0__.default.array[this.x][this.y].x;
     }

     getY() {
         return _shared_store_boxes__WEBPACK_IMPORTED_MODULE_0__.default.array[this.x][this.y].y;
     }

     getCoords() {
         let coords = _shared_store_boxes__WEBPACK_IMPORTED_MODULE_0__.default.array[this.x][this.y];
         return { x: coords.x, y: coords.y }
     }

     matchBox() {
         if (this.prevBox) {
             setStyle(this.prevBox, {
                 background: 'rgba(0,0,0,.02)',
             })
         }
         let div = boxesArboxes.arrayay[this.x][this.y].div;

         setStyle(div, {
             background: 'red',
         })
         this.prevBox = div;
     }

 }

 const finder = new Finder();
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (finder);

/***/ }),

/***/ "./src/core/painter.js":
/*!*****************************!*\
  !*** ./src/core/painter.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _placefinder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./placefinder */ "./src/core/placefinder.js");
/* harmony import */ var _shared_store_boxes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/boxes */ "./src/shared/store/boxes.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _figure__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./figure */ "./src/core/figure.js");
/* harmony import */ var _remover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./remover */ "./src/core/remover.js");
/* harmony import */ var _main_score__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../main/score */ "./src/main/score.js");
 
 
 
 
 
 
 
 

 class Painter {
     constructor() {
         this.canDraw = false;
     }

     drawTmpFigure({ x, y }, figure) {
         this.canDraw = this.canBeDrawn({ x, y }, figure);
         if (!this.canDraw) {
             this.clearTmpFigure();
             return;
         }

         let box = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.$)('tmp-figure')
         let block = _shared_store_boxes__WEBPACK_IMPORTED_MODULE_3__.default.array[x][y];
         let [x1, y1] = [block.x, block.y];

         (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.setStyle)(box, {
             left: x1 + 'px',
             top: y1 + 'px',
             opacity: .4
         })

         _figure__WEBPACK_IMPORTED_MODULE_5__.default.draw(figure, _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxWidth * .99, _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxHeight * .99, box)
     }

     clearTmpFigure() {
         (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.$)('tmp-figure').innerHTML = "";
     }

     canBeDrawn({ x, y }, figure) {
         if (x == undefined || y == undefined) {
             return false;
         }

         let lx = 0,
             ly = 0;
         let busy = false;

         figure.forEach((r, i) => {
             if (busy) return;
             r.forEach((c, j) => {
                 if (busy) return;
                 if (figure[i][j] !== '.') {
                     lx = Math.max(lx, i);
                     ly = Math.max(ly, j);
                     if (i + x < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow && j + y < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn) {
                         if (_shared_store_boxes__WEBPACK_IMPORTED_MODULE_3__.default.array[x + i][y + j].busy == 1) {
                             busy = true;
                         }
                     } else {
                         busy = true;
                     }
                 }
             })
         })

         let can = ((x + lx) < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow) && ((y + ly) < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn);
         if (busy) {
             can = false;
         }
         // this.canDraw = can;

         return can;
     }

     tryToDraw() {
         this.clearTmpFigure();
         if (_shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.boxCoords && _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.figure) {
             this.canDraw = this.canBeDrawn(_shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.boxCoords, _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.figure)
         } else {
             this.canDraw = false;
         }
         if (!this.canDraw) {
             return;
         }
         this.draw();
         _figure__WEBPACK_IMPORTED_MODULE_5__.default.removeFigure();
         this.update()
     }

     draw() {
         let figure = _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.figure;
         let { x, y } = _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.boxCoords;

         figure.forEach((r, i) => {
             r.forEach((c, j) => {
                 if (figure[i][j] !== '.') {
                     (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.setStyle)(_shared_store_boxes__WEBPACK_IMPORTED_MODULE_3__.default.array[x + i][y + j].div, {
                             background: _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxColor,
                         })
                         //  console.log("updated")
                     _remover__WEBPACK_IMPORTED_MODULE_6__.default.update({ x: x + i, y: y + j });
                 }
             })
         })
         _remover__WEBPACK_IMPORTED_MODULE_6__.default.cleanUp()
     }

     update() {
         _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.allFigures = _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.allFigures.filter(({ div }) => {
             return div !== _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.boxDiv
         })
         _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.isDrawable = {}
         _placefinder__WEBPACK_IMPORTED_MODULE_2__.default.checkAll(_shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.allFigures)
         _main_score__WEBPACK_IMPORTED_MODULE_7__.default.update()
     }
 }

 const painter = new Painter();
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (painter);

/***/ }),

/***/ "./src/core/placefinder.js":
/*!*********************************!*\
  !*** ./src/core/placefinder.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _painter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./painter */ "./src/core/painter.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _main_game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../main/game */ "./src/main/game.js");






class PlaceFinder {
    constructor() {
        this.RUN_SLOW = 'runSlow';
        this.type = null;
        this.found = false;
    }

    check(figureType, figure, divElement) {
        this.type = figureType;
        this.run(this.RUN_SLOW, { figure, divElement })
    }

    checkAll(figures) {
        this.found = false;
        figures.forEach(figure => {
            this.check(figure.type, figure.figure, figure.div)
        })
        if (!this.found) {
            _main_game__WEBPACK_IMPORTED_MODULE_4__.default.lose();
        }
    }

    run(TYPE, { figure, divElement }) {
        const can = this.runSlow(figure)
        this.update(can, divElement)
    }

    runSlow(figure) {
        let found = false;
        for (let i = 0; i < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow && !found; i++) {
            for (let j = 0; j < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn && !found; j++) {
                let can = this.tryToFit({ i, j }, figure)
                if (can) found = true;
            }
        }
        return found;
    }

    tryToFit({ i, j }, figure) {
        return _painter__WEBPACK_IMPORTED_MODULE_2__.default.canBeDrawn({ x: i, y: j }, figure)
    }

    update(status, div) {
        _shared_store_state__WEBPACK_IMPORTED_MODULE_3__.default.isDrawable[this.type] = status;
        if (!status) {
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.setStyle)(div, {
                opacity: '.3'
            })
        } else {
            this.found = true;
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.setStyle)(div, {
                opacity: '1'
            })
        }
    }

}

const placeFinder = new PlaceFinder();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (placeFinder);

/***/ }),

/***/ "./src/core/remover.js":
/*!*****************************!*\
  !*** ./src/core/remover.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/store/boxes */ "./src/shared/store/boxes.js");
/* harmony import */ var _main_score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../main/score */ "./src/main/score.js");
/* harmony import */ var _BlockCrashAnimation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BlockCrashAnimation */ "./src/core/BlockCrashAnimation.js");
 
 
 
 
 

 class Remover {
     constructor() {
         this.onRow = []
         this.onColumn = []
     }

     update({ x, y }) {
         if (this.onColumn[y]) {
             this.onColumn[y]++;
         } else {
             this.onColumn[y] = 1;
         }

         if (this.onRow[x]) {
             this.onRow[x]++;
         } else {
             this.onRow[x] = 1;
         }

         _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array[x][y].busy = true;
     }

     cleanUp() {
         let removedColumns = 0;
         let isRemoved = false;

         for (let i = 0; i < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn; i++) {
             if (this.onColumn[i] === _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn) {
                 this.remove(i, _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow, 'row');
                 removedColumns++;
                 this.onColumn[i] = 0;
                 if (!isRemoved) isRemoved = true;
             }
         }

         for (let i = 0; i < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow; i++) {
             if (this.onRow[i] === _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow) {
                 this.remove(i, _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn, 'column', (i) => {
                     if (this.onColumn[i]) {
                         this.onColumn[i]--;
                     }
                 })
                 this.onRow[i] = 0;
                 if (!isRemoved) isRemoved = true;
             } else {
                 this.onRow[i] -= removedColumns;
             }
         }

         if (isRemoved) _main_score__WEBPACK_IMPORTED_MODULE_3__.default.update(50)
             // console.log("column", this.onColumn);
             // console.log("row", this.onRow);
     }

     remove(a, b, type, fn) {
         for (let i = 0; i < b; i++) {
             let box = _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array[i][a];
             if (type === 'column') box = _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array[a][i];

             if (fn) fn(i);

             if (!box.busy) continue;
             box.busy = false;

             // setStyle(box.div, {
             //    background: blockCrashColor,
             // })

             setTimeout(() => {
                 _BlockCrashAnimation__WEBPACK_IMPORTED_MODULE_4__.default.animateCrash(box)

                 ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.setStyle)(box.div, {
                     background: '#1E1E1E',
                     border: '2px solid black'
                 })

             }, 20)
         }
     }

     reset() {
         this.onColumn = [];
         this.onRow = [];
     }

 }

 const remover = new Remover();
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (remover);

/***/ }),

/***/ "./src/main/Menu.js":
/*!**************************!*\
  !*** ./src/main/Menu.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Menu
/* harmony export */ });
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/main/game.js");



class Menu {
    static show() {
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('backdrop').className = 'fallDown'
    }

    static hide() {
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('backdrop').className = 'fallUp'
    }

    static init() {
        ['start', 'options', 'upgrade', 'about'].forEach(button => {
            let mainDiv = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.elt)('div', 'menu-button')

            let result = `
                      <div class='inner-button'>
                         <div class='button-background'>
                            <div style='display:flex'>
                               <div class='circle'></div>
                               <span class='text'>
                                   ${button}
                               </span>
                            </div>
                         </div>
                   </div>
                   `
            mainDiv.innerHTML = result

            mainDiv.addEventListener('click', (e) => {
                _game__WEBPACK_IMPORTED_MODULE_1__.default.start()
            })

            ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('menu-buttons').append(mainDiv)
        })
    }
}

/***/ }),

/***/ "./src/main/event.js":
/*!***************************!*\
  !*** ./src/main/event.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Event
/* harmony export */ });
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_store_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/store/config */ "./src/shared/store/config.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _core_boxfinder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/boxfinder */ "./src/core/boxfinder.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game */ "./src/main/game.js");
/* harmony import */ var _core_figure__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/figure */ "./src/core/figure.js");
/* harmony import */ var _core_painter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/painter */ "./src/core/painter.js");









class Event {
    static register(box, figure, type) {
        let mousePressed = null;

        function update(ev) {
            moveFigure(ev)
            _core_boxfinder__WEBPACK_IMPORTED_MODULE_4__.default.findAndDraw(ev)
        }

        function moveFigure(e) {
            let { x, y } = _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.coords(e);
            x = x + _shared_constants__WEBPACK_IMPORTED_MODULE_1__.figureOffsetX + 'px';
            y = y + _shared_constants__WEBPACK_IMPORTED_MODULE_1__.figureOffsetY + 'px';

            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)((0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)("figure"), {
                left: x,
                top: y,
            })
        }

        function clickEvent(e) {
            e.preventDefault();

            if (!_shared_store_state__WEBPACK_IMPORTED_MODULE_3__.default.isDrawable[type] || _game__WEBPACK_IMPORTED_MODULE_5__.default.finished) return;
            mousePressed = true;

            _shared_store_state__WEBPACK_IMPORTED_MODULE_3__.default.set({
                figure,
                boxDiv: box,
                type,
                boxCoords: null
            })

            _core_figure__WEBPACK_IMPORTED_MODULE_6__.default.draw(figure, _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxWidth * .96, _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxHeight * .96, (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)("figure"), {
                background: _shared_constants__WEBPACK_IMPORTED_MODULE_1__.boxColor,
                border: '2px solid grey',
                borderRadius: '3px',
            })
            ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(box, {
                opacity: .3,
            })
            update(e)
        }

        function endEvent(e) {
            if (!_shared_store_state__WEBPACK_IMPORTED_MODULE_3__.default.isDrawable[type] || _game__WEBPACK_IMPORTED_MODULE_5__.default.finished) return;
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.setStyle)(box, {
                opacity: "1"
            })
            ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)("figure").innerHTML = ""
            if (mousePressed) {
                _core_painter__WEBPACK_IMPORTED_MODULE_7__.default.tryToDraw();
                mousePressed = false;
            }
        }

        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.attach)(box, _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.get('click'), (e) => {
            clickEvent(e);
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.attach)(_shared_constants__WEBPACK_IMPORTED_MODULE_1__.dom, _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.get("move"), update)
            ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.attach)(_shared_constants__WEBPACK_IMPORTED_MODULE_1__.dom, _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.get("end"), end)
        })

        function end(ev) {
            endEvent(ev);
            (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.detach)(_shared_constants__WEBPACK_IMPORTED_MODULE_1__.dom, _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.get("move"), update)
            ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.detach)(_shared_constants__WEBPACK_IMPORTED_MODULE_1__.dom, _shared_store_config__WEBPACK_IMPORTED_MODULE_2__.default.get("end"), end)
        }
    }
}

/***/ }),

/***/ "./src/main/game.js":
/*!**************************!*\
  !*** ./src/main/game.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Menu */ "./src/main/Menu.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout */ "./src/main/layout.js");
/* harmony import */ var _core_figure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/figure */ "./src/core/figure.js");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./score */ "./src/main/score.js");
/* harmony import */ var _shared_store_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/store/state */ "./src/shared/store/state.js");
/* harmony import */ var _core_remover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/remover */ "./src/core/remover.js");







class Game {
    constructor() {
        this.finished = false;
        // this.rand = Math.random()
    }

    start() {
        this.reset()
        _Menu__WEBPACK_IMPORTED_MODULE_0__.default.hide();
        _layout__WEBPACK_IMPORTED_MODULE_1__.default.init();
        _core_figure__WEBPACK_IMPORTED_MODULE_2__.default.drawFigures()
    }

    lose() {
        this.finished = true;
        _score__WEBPACK_IMPORTED_MODULE_3__.default.updateMaxScore();
        setTimeout(() => {
            _Menu__WEBPACK_IMPORTED_MODULE_0__.default.show()
        }, 700)

    }

    reset() {
        _score__WEBPACK_IMPORTED_MODULE_3__.default.reset()
        _shared_store_state__WEBPACK_IMPORTED_MODULE_4__.default.reset();
        _core_remover__WEBPACK_IMPORTED_MODULE_5__.default.reset();
        _core_figure__WEBPACK_IMPORTED_MODULE_2__.default.reset();
        this.finished = false;
    }
}

const game = new Game()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

/***/ }),

/***/ "./src/main/layout.js":
/*!****************************!*\
  !*** ./src/main/layout.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/constants */ "./src/shared/constants.js");
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");
/* harmony import */ var _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/store/boxes */ "./src/shared/store/boxes.js");





class Layout {
    init() {
        this.initBoxes()
        this.createLayout();
    }

    initBoxes() {
        _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.reset()

        for (let i = 0; i < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn; i++) {
            _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array.push([])
            for (let j = 0; j < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow; j++) {
                let x = j * (_shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxWidth + 1) + _shared_constants__WEBPACK_IMPORTED_MODULE_0__.offsetX
                let y = i * (_shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxHeight + 1) + _shared_constants__WEBPACK_IMPORTED_MODULE_0__.offsetY
                _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array[i].push({ x, y })
            }
        }
    }

    createLayout() {
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.$)("content").innerHTML = "";

        for (let i = 0; i < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnColumn; i++) {
            for (let j = 0; j < _shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxesOnRow; j++) {
                let box = _shared_store_boxes__WEBPACK_IMPORTED_MODULE_2__.default.array[i][j]
                this.createSingleBlock(box)
            }
        }
    }

    createSingleBlock(box) {
        let el = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.elt)('div', "box", null, {
            position: 'absolute',
            width: (_shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxWidth + 0) + "px",
            height: (_shared_constants__WEBPACK_IMPORTED_MODULE_0__.boxHeight + 0) + "px",
            left: box.x + 'px',
            top: box.y + 'px',
            background: '#1E1E1E', //rgba(0,0,0,.02)
            border: '2px solid black' //1px solid rgba(0,0,0,.051)
        })

        el.onmousedown = (e) => e.preventDefault()

        ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_1__.$)("content").append(el)

        box.div = el
        box.busy = 0
    }
}

const layout = new Layout()
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (layout);

/***/ }),

/***/ "./src/main/score.js":
/*!***************************!*\
  !*** ./src/main/score.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _shared_custom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/custom */ "./src/shared/custom.js");


class Score {
    constructor() {
        this.score = 0;
        this.maxScore = 0;
    }

    async update(score = 15) {
        const num = Math.floor(Math.random() * score) + 7
        const parts = Math.floor(Math.random() * 7)

        this.score += num;

        for (let i = 0; i < parts; i++) {
            await this.add(Math.floor(num / parts))
        }
    }

    add(cnt) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                let score = (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('score').innerText
                score = parseInt(score)
                score += cnt
                ;(0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('score').innerText = score.toString()
                res()
            }, 70)
        })
    }

    reset() {
        this.score = 0;
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('score').innerText = '0';
        this.maxScore = this.getMaxScore();
        (0,_shared_custom__WEBPACK_IMPORTED_MODULE_0__.$)('max-score').innerText = this.maxScore;
    }

    getMaxScore() {
        let score = !!localStorage.getItem('max-score') ? localStorage.getItem('max-score') : 0;
        return score.toString();
    }

    updateMaxScore() {
        if (this.score > this.maxScore) {
            localStorage.setItem('max-score', this.score)
        }
    }
}

const score = new Score();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (score);

/***/ }),

/***/ "./src/shared/android.js":
/*!*******************************!*\
  !*** ./src/shared/android.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const userAgent = navigator.userAgent.toLowerCase();
const Android = userAgent.indexOf("android") > -1;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Android);

/***/ }),

/***/ "./src/shared/constants.js":
/*!*********************************!*\
  !*** ./src/shared/constants.js ***!
  \*********************************/
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
/* harmony import */ var _store_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store/config */ "./src/shared/store/config.js");


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

/***/ "./src/shared/custom.js":
/*!******************************!*\
  !*** ./src/shared/custom.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => /* binding */ $,
/* harmony export */   "dd": () => /* binding */ dd,
/* harmony export */   "vv": () => /* binding */ vv,
/* harmony export */   "attach": () => /* binding */ attach,
/* harmony export */   "detach": () => /* binding */ detach,
/* harmony export */   "setStyle": () => /* binding */ setStyle,
/* harmony export */   "elt": () => /* binding */ elt
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/shared/constants.js");


function $(id) {
    return _constants__WEBPACK_IMPORTED_MODULE_0__.dom.getElementById(id)
}

function dd(text) {
    $('dd').innerText = text
}

function vv(text) {
    $("vv").innerText = text
}

function attach(obj, ev, fn) {
    obj.addEventListener(ev, fn)
}

function detach(obj, ev, fn) {
    obj.removeEventListener(ev, fn)
}

function setStyle(el, style) {
    for (let a in style) {
        el.style[a] = style[a]
    }
}

function elt(el, cls, id, style) {
    let elm = _constants__WEBPACK_IMPORTED_MODULE_0__.dom.createElement(el)
    if (cls) elm.className = cls
    if (id) elm.setAttribute('id', id)
    if (style) setStyle(elm, style)
    return elm
}

/***/ }),

/***/ "./src/shared/store/boxes.js":
/*!***********************************!*\
  !*** ./src/shared/store/boxes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
class Boxes {
    constructor() {
        this.array = []
    }

    reset() {
        this.array = []
    }
}

const boxes = new Boxes()

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boxes);

/***/ }),

/***/ "./src/shared/store/config.js":
/*!************************************!*\
  !*** ./src/shared/store/config.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _android__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../android */ "./src/shared/android.js");


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

/***/ }),

/***/ "./src/shared/store/figures.js":
/*!*************************************!*\
  !*** ./src/shared/store/figures.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const FIGURES = {
    TYPE_1: {
        figure: `
               ###
               #
               #
             `,
    },

    TYPE_2: {
        figure: `
               ##
               ##
             `,
    },

    TYPE_3: {
        figure: `
               ##
               #
             `,
    },

    TYPE_4: {
        figure: `
               ###
             `,
    },

    TYPE_5: {
        figure: `
               #
               #
               #
             `,
    },

    TYPE_6: {
        figure: `
               ###
               ###
               ###
             `,
    },

    TYPE_7: {
        figure: `
               #####
             `,
    },

    TYPE_8: {
        figure: `
               ####
             `,
    },

    TYPE_9: {
        figure: `
               #
               #
               #
               #
             `,
    },

    TYPE_11: {
        figure: `
              .#
              ##
             `
    },

    TYPE_12: {
        figure: `
            # 
            #
           `
    },

    TYPE_13: {
        figure: `
          ##          
         `
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FIGURES);

/***/ }),

/***/ "./src/shared/store/state.js":
/*!***********************************!*\
  !*** ./src/shared/store/state.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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