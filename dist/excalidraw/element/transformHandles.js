import { getElementAbsoluteCoords } from "./bounds";
import { rotate } from "../math";
import { isTextElement } from ".";
import { isFrameLikeElement, isLinearElement } from "./typeChecks";
import { DEFAULT_SPACING } from "../renderer/renderScene";
const transformHandleSizes = {
    mouse: 8,
    pen: 16,
    touch: 28,
};
const ROTATION_RESIZE_HANDLE_GAP = 16;
export const OMIT_SIDES_FOR_MULTIPLE_ELEMENTS = {
    e: true,
    s: true,
    n: true,
    w: true,
};
export const OMIT_SIDES_FOR_FRAME = {
    e: true,
    s: true,
    n: true,
    w: true,
    rotation: true,
};
const OMIT_SIDES_FOR_TEXT_ELEMENT = {
    e: true,
    s: true,
    n: true,
    w: true,
};
const OMIT_SIDES_FOR_LINE_SLASH = {
    e: true,
    s: true,
    n: true,
    w: true,
    nw: true,
    se: true,
};
const OMIT_SIDES_FOR_LINE_BACKSLASH = {
    e: true,
    s: true,
    n: true,
    w: true,
};
const generateTransformHandle = (x, y, width, height, cx, cy, angle) => {
    const [xx, yy] = rotate(x + width / 2, y + height / 2, cx, cy, angle);
    return [xx - width / 2, yy - height / 2, width, height];
};
export const getTransformHandlesFromCoords = ([x1, y1, x2, y2, cx, cy], angle, zoom, pointerType, omitSides = {}, margin = 4) => {
    const size = transformHandleSizes[pointerType];
    const handleWidth = size / zoom.value;
    const handleHeight = size / zoom.value;
    const handleMarginX = size / zoom.value;
    const handleMarginY = size / zoom.value;
    const width = x2 - x1;
    const height = y2 - y1;
    const dashedLineMargin = margin / zoom.value;
    const centeringOffset = (size - DEFAULT_SPACING * 2) / (2 * zoom.value);
    const transformHandles = {
        nw: omitSides.nw
            ? undefined
            : generateTransformHandle(x1 - dashedLineMargin - handleMarginX + centeringOffset, y1 - dashedLineMargin - handleMarginY + centeringOffset, handleWidth, handleHeight, cx, cy, angle),
        ne: omitSides.ne
            ? undefined
            : generateTransformHandle(x2 + dashedLineMargin - centeringOffset, y1 - dashedLineMargin - handleMarginY + centeringOffset, handleWidth, handleHeight, cx, cy, angle),
        sw: omitSides.sw
            ? undefined
            : generateTransformHandle(x1 - dashedLineMargin - handleMarginX + centeringOffset, y2 + dashedLineMargin - centeringOffset, handleWidth, handleHeight, cx, cy, angle),
        se: omitSides.se
            ? undefined
            : generateTransformHandle(x2 + dashedLineMargin - centeringOffset, y2 + dashedLineMargin - centeringOffset, handleWidth, handleHeight, cx, cy, angle),
        rotation: omitSides.rotation
            ? undefined
            : generateTransformHandle(x1 + width / 2 - handleWidth / 2, y1 -
                dashedLineMargin -
                handleMarginY +
                centeringOffset -
                ROTATION_RESIZE_HANDLE_GAP / zoom.value, handleWidth, handleHeight, cx, cy, angle),
    };
    // We only want to show height handles (all cardinal directions)  above a certain size
    // Note: we render using "mouse" size so we should also use "mouse" size for this check
    const minimumSizeForEightHandles = (5 * transformHandleSizes.mouse) / zoom.value;
    if (Math.abs(width) > minimumSizeForEightHandles) {
        if (!omitSides.n) {
            transformHandles.n = generateTransformHandle(x1 + width / 2 - handleWidth / 2, y1 - dashedLineMargin - handleMarginY + centeringOffset, handleWidth, handleHeight, cx, cy, angle);
        }
        if (!omitSides.s) {
            transformHandles.s = generateTransformHandle(x1 + width / 2 - handleWidth / 2, y2 + dashedLineMargin - centeringOffset, handleWidth, handleHeight, cx, cy, angle);
        }
    }
    if (Math.abs(height) > minimumSizeForEightHandles) {
        if (!omitSides.w) {
            transformHandles.w = generateTransformHandle(x1 - dashedLineMargin - handleMarginX + centeringOffset, y1 + height / 2 - handleHeight / 2, handleWidth, handleHeight, cx, cy, angle);
        }
        if (!omitSides.e) {
            transformHandles.e = generateTransformHandle(x2 + dashedLineMargin - centeringOffset, y1 + height / 2 - handleHeight / 2, handleWidth, handleHeight, cx, cy, angle);
        }
    }
    return transformHandles;
};
export const getTransformHandles = (element, zoom, pointerType = "mouse") => {
    // so that when locked element is selected (especially when you toggle lock
    // via keyboard) the locked element is visually distinct, indicating
    // you can't move/resize
    if (element.locked) {
        return {};
    }
    let omitSides = {};
    if (element.type === "freedraw" || isLinearElement(element)) {
        if (element.points.length === 2) {
            // only check the last point because starting point is always (0,0)
            const [, p1] = element.points;
            if (p1[0] === 0 || p1[1] === 0) {
                omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
            }
            else if (p1[0] > 0 && p1[1] < 0) {
                omitSides = OMIT_SIDES_FOR_LINE_SLASH;
            }
            else if (p1[0] > 0 && p1[1] > 0) {
                omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
            }
            else if (p1[0] < 0 && p1[1] > 0) {
                omitSides = OMIT_SIDES_FOR_LINE_SLASH;
            }
            else if (p1[0] < 0 && p1[1] < 0) {
                omitSides = OMIT_SIDES_FOR_LINE_BACKSLASH;
            }
        }
    }
    else if (isTextElement(element)) {
        omitSides = OMIT_SIDES_FOR_TEXT_ELEMENT;
    }
    else if (isFrameLikeElement(element)) {
        omitSides = {
            rotation: true,
        };
    }
    const dashedLineMargin = isLinearElement(element)
        ? DEFAULT_SPACING + 8
        : DEFAULT_SPACING;
    return getTransformHandlesFromCoords(getElementAbsoluteCoords(element, true), element.angle, zoom, pointerType, omitSides, dashedLineMargin);
};
export const shouldShowBoundingBox = (elements, appState) => {
    if (appState.editingLinearElement) {
        return false;
    }
    if (elements.length > 1) {
        return true;
    }
    const element = elements[0];
    if (!isLinearElement(element)) {
        return true;
    }
    return element.points.length > 2;
};
