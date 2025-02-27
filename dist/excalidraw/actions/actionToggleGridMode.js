import { CODES, KEYS } from "../keys";
import { register } from "./register";
import { GRID_SIZE } from "../constants";
export const actionToggleGridMode = register({
    name: "gridMode",
    viewMode: true,
    trackEvent: {
        category: "canvas",
        predicate: (appState) => !appState.gridSize,
    },
    perform(elements, appState) {
        return {
            appState: {
                ...appState,
                gridSize: this.checked(appState) ? null : GRID_SIZE,
                objectsSnapModeEnabled: false,
            },
            commitToHistory: false,
        };
    },
    checked: (appState) => appState.gridSize !== null,
    predicate: (element, appState, props) => {
        return typeof props.gridModeEnabled === "undefined";
    },
    contextItemLabel: "labels.showGrid",
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] && event.code === CODES.QUOTE,
});
