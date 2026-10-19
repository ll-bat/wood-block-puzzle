import { boardToMatrix, getShape } from '../core';

export function challengeBoardLayout(board) {
    return Object.freeze(boardToMatrix(board).map(row => Object.freeze([...row])));
}

export function challengeShapeView(shapeId) {
    const shape = getShape(shapeId);
    return Object.freeze({
        id: shape.id,
        width: shape.width,
        height: shape.height,
        cells: Object.freeze(shape.cells.map(cell => Object.freeze([...cell]))),
    });
}
