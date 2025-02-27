import { OMIT_SIDES_FOR_MULTIPLE_ELEMENTS, getTransformHandlesFromCoords, getTransformHandles, } from "./transformHandles";
const isInsideTransformHandle = (transformHandle, x, y) => x >= transformHandle[0] &&
    x <= transformHandle[0] + transformHandle[2] &&
    y >= transformHandle[1] &&
    y <= transformHandle[1] + transformHandle[3];
export const resizeTest = (element, appState, x, y, zoom, pointerType) => {
    if (!appState.selectedElementIds[element.id]) {
        return false;
    }
    const { rotation: rotationTransformHandle, ...transformHandles } = getTransformHandles(element, zoom, pointerType);
    if (rotationTransformHandle &&
        isInsideTransformHandle(rotationTransformHandle, x, y)) {
        return "rotation";
    }
    const filter = Object.keys(transformHandles).filter((key) => {
        const transformHandle = transformHandles[key];
        if (!transformHandle) {
            return false;
        }
        return isInsideTransformHandle(transformHandle, x, y);
    });
    if (filter.length > 0) {
        return filter[0];
    }
    return false;
};
export const getElementWithTransformHandleType = (elements, appState, scenePointerX, scenePointerY, zoom, pointerType) => {
    return elements.reduce((result, element) => {
        if (result) {
            return result;
        }
        const transformHandleType = resizeTest(element, appState, scenePointerX, scenePointerY, zoom, pointerType);
        return transformHandleType ? { element, transformHandleType } : null;
    }, null);
};
export const getTransformHandleTypeFromCoords = ([x1, y1, x2, y2], scenePointerX, scenePointerY, zoom, pointerType) => {
    const transformHandles = getTransformHandlesFromCoords([x1, y1, x2, y2, (x1 + x2) / 2, (y1 + y2) / 2], 0, zoom, pointerType, OMIT_SIDES_FOR_MULTIPLE_ELEMENTS);
    const found = Object.keys(transformHandles).find((key) => {
        const transformHandle = transformHandles[key];
        return (transformHandle &&
            isInsideTransformHandle(transformHandle, scenePointerX, scenePointerY));
    });
    return (found || false);
};
const RESIZE_CURSORS = ["ns", "nesw", "ew", "nwse"];
const rotateResizeCursor = (cursor, angle) => {
    const index = RESIZE_CURSORS.indexOf(cursor);
    if (index >= 0) {
        const a = Math.round(angle / (Math.PI / 4));
        cursor = RESIZE_CURSORS[(index + a) % RESIZE_CURSORS.length];
    }
    return cursor;
};
/*
 * Returns bi-directional cursor for the element being resized
 */
export const getCursorForResizingElement = (resizingElement) => {
    const { element, transformHandleType } = resizingElement;
    const shouldSwapCursors = element && Math.sign(element.height) * Math.sign(element.width) === -1;
    let cursor = null;
    switch (transformHandleType) {
        case "n":
        case "s":
            cursor = "ns";
            break;
        case "w":
        case "e":
            cursor = "ew";
            break;
        case "nw":
        case "se":
            if (shouldSwapCursors) {
                cursor = "nesw";
            }
            else {
                cursor = "nwse";
            }
            break;
        case "ne":
        case "sw":
            if (shouldSwapCursors) {
                cursor = "nwse";
            }
            else {
                cursor = "nesw";
            }
            break;
        case "rotation":
            return "grab";
    }
    if (cursor && element) {
        cursor = rotateResizeCursor(cursor, element.angle);
    }
    return cursor ? `${cursor}-resize` : "";
};
