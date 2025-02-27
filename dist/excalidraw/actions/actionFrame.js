import { getNonDeletedElements } from "../element";
import { removeAllElementsFromFrame } from "../frame";
import { getFrameChildren } from "../frame";
import { KEYS } from "../keys";
import { updateActiveTool } from "../utils";
import { setCursorForShape } from "../cursor";
import { register } from "./register";
import { isFrameLikeElement } from "../element/typeChecks";
const isSingleFrameSelected = (appState, app) => {
    const selectedElements = app.scene.getSelectedElements(appState);
    return (selectedElements.length === 1 && isFrameLikeElement(selectedElements[0]));
};
export const actionSelectAllElementsInFrame = register({
    name: "selectAllElementsInFrame",
    trackEvent: { category: "canvas" },
    perform: (elements, appState, _, app) => {
        const selectedElement = app.scene.getSelectedElements(appState).at(0) || null;
        if (isFrameLikeElement(selectedElement)) {
            const elementsInFrame = getFrameChildren(getNonDeletedElements(elements), selectedElement.id).filter((element) => !(element.type === "text" && element.containerId));
            return {
                elements,
                appState: {
                    ...appState,
                    selectedElementIds: elementsInFrame.reduce((acc, element) => {
                        acc[element.id] = true;
                        return acc;
                    }, {}),
                },
                commitToHistory: false,
            };
        }
        return {
            elements,
            appState,
            commitToHistory: false,
        };
    },
    contextItemLabel: "labels.selectAllElementsInFrame",
    predicate: (elements, appState, _, app) => isSingleFrameSelected(appState, app),
});
export const actionRemoveAllElementsFromFrame = register({
    name: "removeAllElementsFromFrame",
    trackEvent: { category: "history" },
    perform: (elements, appState, _, app) => {
        const selectedElement = app.scene.getSelectedElements(appState).at(0) || null;
        if (isFrameLikeElement(selectedElement)) {
            return {
                elements: removeAllElementsFromFrame(elements, selectedElement, appState),
                appState: {
                    ...appState,
                    selectedElementIds: {
                        [selectedElement.id]: true,
                    },
                },
                commitToHistory: true,
            };
        }
        return {
            elements,
            appState,
            commitToHistory: false,
        };
    },
    contextItemLabel: "labels.removeAllElementsFromFrame",
    predicate: (elements, appState, _, app) => isSingleFrameSelected(appState, app),
});
export const actionupdateFrameRendering = register({
    name: "updateFrameRendering",
    viewMode: true,
    trackEvent: { category: "canvas" },
    perform: (elements, appState) => {
        return {
            elements,
            appState: {
                ...appState,
                frameRendering: {
                    ...appState.frameRendering,
                    enabled: !appState.frameRendering.enabled,
                },
            },
            commitToHistory: false,
        };
    },
    contextItemLabel: "labels.updateFrameRendering",
    checked: (appState) => appState.frameRendering.enabled,
});
export const actionSetFrameAsActiveTool = register({
    name: "setFrameAsActiveTool",
    trackEvent: { category: "toolbar" },
    perform: (elements, appState, _, app) => {
        const nextActiveTool = updateActiveTool(appState, {
            type: "frame",
        });
        setCursorForShape(app.interactiveCanvas, {
            ...appState,
            activeTool: nextActiveTool,
        });
        return {
            elements,
            appState: {
                ...appState,
                activeTool: updateActiveTool(appState, {
                    type: "frame",
                }),
            },
            commitToHistory: false,
        };
    },
    keyTest: (event) => !event[KEYS.CTRL_OR_CMD] &&
        !event.shiftKey &&
        !event.altKey &&
        event.key.toLocaleLowerCase() === KEYS.F,
});
