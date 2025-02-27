import { isIframeElement } from "../element/typeChecks";
export const hasBackground = (type) => type === "rectangle" ||
    type === "iframe" ||
    type === "embeddable" ||
    type === "ellipse" ||
    type === "diamond" ||
    type === "line" ||
    type === "freedraw";
export const hasStrokeColor = (type) => type !== "image" && type !== "frame" && type !== "magicframe";
export const hasStrokeWidth = (type) => type === "rectangle" ||
    type === "iframe" ||
    type === "embeddable" ||
    type === "ellipse" ||
    type === "diamond" ||
    type === "freedraw" ||
    type === "arrow" ||
    type === "line";
export const hasStrokeStyle = (type) => type === "rectangle" ||
    type === "iframe" ||
    type === "embeddable" ||
    type === "ellipse" ||
    type === "diamond" ||
    type === "arrow" ||
    type === "line";
export const canChangeRoundness = (type) => type === "rectangle" ||
    type === "iframe" ||
    type === "embeddable" ||
    type === "arrow" ||
    type === "line" ||
    type === "diamond";
export const canHaveArrowheads = (type) => type === "arrow";
export const getElementAtPosition = (elements, isAtPositionFn) => {
    let hitElement = null;
    // We need to to hit testing from front (end of the array) to back (beginning of the array)
    // because array is ordered from lower z-index to highest and we want element z-index
    // with higher z-index
    for (let index = elements.length - 1; index >= 0; --index) {
        const element = elements[index];
        if (element.isDeleted) {
            continue;
        }
        if (isAtPositionFn(element)) {
            hitElement = element;
            break;
        }
    }
    return hitElement;
};
export const getElementsAtPosition = (elements, isAtPositionFn) => {
    const iframeLikes = [];
    // The parameter elements comes ordered from lower z-index to higher.
    // We want to preserve that order on the returned array.
    // Exception being embeddables which should be on top of everything else in
    // terms of hit testing.
    const elsAtPos = elements.filter((element) => {
        const hit = !element.isDeleted && isAtPositionFn(element);
        if (hit) {
            if (isIframeElement(element)) {
                iframeLikes.push(element);
                return false;
            }
            return true;
        }
        return false;
    });
    return elsAtPos.concat(iframeLikes);
};
