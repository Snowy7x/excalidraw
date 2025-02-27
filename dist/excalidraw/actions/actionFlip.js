import { register } from "./register";
import { getSelectedElements } from "../scene";
import { getNonDeletedElements } from "../element";
import { resizeMultipleElements } from "../element/resizeElements";
import { arrayToMap } from "../utils";
import { CODES, KEYS } from "../keys";
import { getCommonBoundingBox } from "../element/bounds";
import { bindOrUnbindSelectedElements, isBindingEnabled, unbindLinearElements, } from "../element/binding";
import { updateFrameMembershipOfSelectedElements } from "../frame";
export const actionFlipHorizontal = register({
    name: "flipHorizontal",
    trackEvent: { category: "element" },
    perform: (elements, appState, _, app) => {
        return {
            elements: updateFrameMembershipOfSelectedElements(flipSelectedElements(elements, appState, "horizontal"), appState, app),
            appState,
            commitToHistory: true,
        };
    },
    keyTest: (event) => event.shiftKey && event.code === CODES.H,
    contextItemLabel: "labels.flipHorizontal",
});
export const actionFlipVertical = register({
    name: "flipVertical",
    trackEvent: { category: "element" },
    perform: (elements, appState, _, app) => {
        return {
            elements: updateFrameMembershipOfSelectedElements(flipSelectedElements(elements, appState, "vertical"), appState, app),
            appState,
            commitToHistory: true,
        };
    },
    keyTest: (event) => event.shiftKey && event.code === CODES.V && !event[KEYS.CTRL_OR_CMD],
    contextItemLabel: "labels.flipVertical",
});
const flipSelectedElements = (elements, appState, flipDirection) => {
    const selectedElements = getSelectedElements(getNonDeletedElements(elements), appState, {
        includeBoundTextElement: true,
        includeElementsInFrames: true,
    });
    const updatedElements = flipElements(selectedElements, appState, flipDirection);
    const updatedElementsMap = arrayToMap(updatedElements);
    return elements.map((element) => updatedElementsMap.get(element.id) || element);
};
const flipElements = (elements, appState, flipDirection) => {
    const { minX, minY, maxX, maxY } = getCommonBoundingBox(elements);
    resizeMultipleElements({ originalElements: arrayToMap(elements) }, elements, "nw", true, flipDirection === "horizontal" ? maxX : minX, flipDirection === "horizontal" ? minY : maxY);
    (isBindingEnabled(appState)
        ? bindOrUnbindSelectedElements
        : unbindLinearElements)(elements);
    return elements;
};
