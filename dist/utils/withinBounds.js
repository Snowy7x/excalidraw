import { isArrowElement, isExcalidrawElement, isFreeDrawElement, isLinearElement, isTextElement, } from "../excalidraw/element/typeChecks";
import { isValueInRange, rotatePoint } from "../excalidraw/math";
import { getElementBounds } from "../excalidraw/element/bounds";
/** @returns vertices relative to element's top-left [0,0] position  */
const getNonLinearElementRelativePoints = (element) => {
    if (element.type === "diamond") {
        return [
            [element.width / 2, 0],
            [element.width, element.height / 2],
            [element.width / 2, element.height],
            [0, element.height / 2],
        ];
    }
    return [
        [0, 0],
        [0 + element.width, 0],
        [0 + element.width, element.height],
        [0, element.height],
    ];
};
/** @returns vertices relative to element's top-left [0,0] position  */
const getElementRelativePoints = (element) => {
    if (isLinearElement(element) || isFreeDrawElement(element)) {
        return element.points;
    }
    return getNonLinearElementRelativePoints(element);
};
const getMinMaxPoints = (points) => {
    const ret = points.reduce((limits, [x, y]) => {
        limits.minY = Math.min(limits.minY, y);
        limits.minX = Math.min(limits.minX, x);
        limits.maxX = Math.max(limits.maxX, x);
        limits.maxY = Math.max(limits.maxY, y);
        return limits;
    }, {
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity,
        cx: 0,
        cy: 0,
    });
    ret.cx = (ret.maxX + ret.minX) / 2;
    ret.cy = (ret.maxY + ret.minY) / 2;
    return ret;
};
const getRotatedBBox = (element) => {
    const points = getElementRelativePoints(element);
    const { cx, cy } = getMinMaxPoints(points);
    const centerPoint = [cx, cy];
    const rotatedPoints = points.map((point) => rotatePoint([point[0], point[1]], centerPoint, element.angle));
    const { minX, minY, maxX, maxY } = getMinMaxPoints(rotatedPoints);
    return [
        minX + element.x,
        minY + element.y,
        maxX + element.x,
        maxY + element.y,
    ];
};
export const isElementInsideBBox = (element, bbox, eitherDirection = false) => {
    const elementBBox = getRotatedBBox(element);
    const elementInsideBbox = bbox[0] <= elementBBox[0] &&
        bbox[2] >= elementBBox[2] &&
        bbox[1] <= elementBBox[1] &&
        bbox[3] >= elementBBox[3];
    if (!eitherDirection) {
        return elementInsideBbox;
    }
    if (elementInsideBbox) {
        return true;
    }
    return (elementBBox[0] <= bbox[0] &&
        elementBBox[2] >= bbox[2] &&
        elementBBox[1] <= bbox[1] &&
        elementBBox[3] >= bbox[3]);
};
export const elementPartiallyOverlapsWithOrContainsBBox = (element, bbox) => {
    const elementBBox = getRotatedBBox(element);
    return ((isValueInRange(elementBBox[0], bbox[0], bbox[2]) ||
        isValueInRange(bbox[0], elementBBox[0], elementBBox[2])) &&
        (isValueInRange(elementBBox[1], bbox[1], bbox[3]) ||
            isValueInRange(bbox[1], elementBBox[1], elementBBox[3])));
};
export const elementsOverlappingBBox = ({ elements, bounds, type, errorMargin = 0, }) => {
    if (isExcalidrawElement(bounds)) {
        bounds = getElementBounds(bounds);
    }
    const adjustedBBox = [
        bounds[0] - errorMargin,
        bounds[1] - errorMargin,
        bounds[2] + errorMargin,
        bounds[3] + errorMargin,
    ];
    const includedElementSet = new Set();
    for (const element of elements) {
        if (includedElementSet.has(element.id)) {
            continue;
        }
        const isOverlaping = type === "overlap"
            ? elementPartiallyOverlapsWithOrContainsBBox(element, adjustedBBox)
            : type === "inside"
                ? isElementInsideBBox(element, adjustedBBox)
                : isElementInsideBBox(element, adjustedBBox, true);
        if (isOverlaping) {
            includedElementSet.add(element.id);
            if (element.boundElements) {
                for (const boundElement of element.boundElements) {
                    includedElementSet.add(boundElement.id);
                }
            }
            if (isTextElement(element) && element.containerId) {
                includedElementSet.add(element.containerId);
            }
            if (isArrowElement(element)) {
                if (element.startBinding) {
                    includedElementSet.add(element.startBinding.elementId);
                }
                if (element.endBinding) {
                    includedElementSet.add(element.endBinding?.elementId);
                }
            }
        }
    }
    return elements.filter((element) => includedElementSet.has(element.id));
};
