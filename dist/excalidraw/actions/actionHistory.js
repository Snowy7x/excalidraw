import { jsx as _jsx } from "react/jsx-runtime";
import { UndoIcon, RedoIcon } from "../components/icons";
import { ToolButton } from "../components/ToolButton";
import { t } from "../i18n";
import { KEYS } from "../keys";
import { newElementWith } from "../element/mutateElement";
import { fixBindingsAfterDeletion } from "../element/binding";
import { arrayToMap } from "../utils";
import { isWindows } from "../constants";
const writeData = (prevElements, appState, updater) => {
    const commitToHistory = false;
    if (!appState.multiElement &&
        !appState.resizingElement &&
        !appState.editingElement &&
        !appState.draggingElement) {
        const data = updater();
        if (data === null) {
            return { commitToHistory };
        }
        const prevElementMap = arrayToMap(prevElements);
        const nextElements = data.elements;
        const nextElementMap = arrayToMap(nextElements);
        const deletedElements = prevElements.filter((prevElement) => !nextElementMap.has(prevElement.id));
        const elements = nextElements
            .map((nextElement) => newElementWith(prevElementMap.get(nextElement.id) || nextElement, nextElement))
            .concat(deletedElements.map((prevElement) => newElementWith(prevElement, { isDeleted: true })));
        fixBindingsAfterDeletion(elements, deletedElements);
        return {
            elements,
            appState: { ...appState, ...data.appState },
            commitToHistory,
            syncHistory: true,
        };
    }
    return { commitToHistory };
};
export const createUndoAction = (history) => ({
    name: "undo",
    trackEvent: { category: "history" },
    perform: (elements, appState) => writeData(elements, appState, () => history.undoOnce()),
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] &&
        event.key.toLowerCase() === KEYS.Z &&
        !event.shiftKey,
    PanelComponent: ({ updateData, data }) => (_jsx(ToolButton, { type: "button", icon: UndoIcon, "aria-label": t("buttons.undo"), onClick: updateData, size: data?.size || "medium" })),
    commitToHistory: () => false,
});
export const createRedoAction = (history) => ({
    name: "redo",
    trackEvent: { category: "history" },
    perform: (elements, appState) => writeData(elements, appState, () => history.redoOnce()),
    keyTest: (event) => (event[KEYS.CTRL_OR_CMD] &&
        event.shiftKey &&
        event.key.toLowerCase() === KEYS.Z) ||
        (isWindows && event.ctrlKey && !event.shiftKey && event.key === KEYS.Y),
    PanelComponent: ({ updateData, data }) => (_jsx(ToolButton, { type: "button", icon: RedoIcon, "aria-label": t("buttons.redo"), onClick: updateData, size: data?.size || "medium" })),
    commitToHistory: () => false,
});
