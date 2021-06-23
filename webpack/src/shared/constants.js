import CONFIG from './store/config'

export const dom = document;
export const width = CONFIG.getScreenWidth() * .9;
export const height = CONFIG.getScreenHeight();
export const offsetY = height * 0.1 + 20;
export const boxesOnRow = 8;
export const boxesOnColumn = 8;
export const figureOffsetX = -70
export const figureOffsetY = -200
export const boxColor = 'rgba(153, 93, 93)';
export const blockCrashColor = 'rgb(151, 96, 96)';

let offsetX1 = 0;
let boxHeight1 = (height * .7) / boxesOnColumn;
let boxWidth1 = (width - offsetX1) / boxesOnRow
boxWidth1 = boxHeight1 = Math.min(boxWidth1, boxHeight1);

let rightOffsetX = offsetX1 + boxesOnRow * boxWidth1
rightOffsetX = width - rightOffsetX;
offsetX1 = (offsetX1 + rightOffsetX) / 2 + 20;

export const boxHeight = boxHeight1
export const boxWidth = boxWidth1
export const offsetX = offsetX1