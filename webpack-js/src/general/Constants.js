import CONFIG from "../shared/store/Config";

const CONSTANTS = {
    dom: document,
    width: CONFIG.getScreenWidth() * .9,
    height: CONFIG.getScreenHeight(),
    offsetY: CONFIG.getScreenHeight() * 0.1 + 20,
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

export default CONSTANTS;
