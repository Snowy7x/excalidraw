import { jsx as _jsx } from "react/jsx-runtime";
import { moveOneLeft, moveOneRight, moveAllLeft, moveAllRight, } from "../zindex";
import { KEYS, CODES } from "../keys";
import { t } from "../i18n";
import { getShortcutKey } from "../utils";
import { register } from "./register";
import { BringForwardIcon, BringToFrontIcon, SendBackwardIcon, SendToBackIcon, } from "../components/icons";
import { isDarwin } from "../constants";
export const actionSendBackward = register({
    name: "sendBackward",
    trackEvent: { category: "element" },
    perform: (elements, appState) => {
        return {
            elements: moveOneLeft(elements, appState),
            appState,
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.sendBackward",
    keyPriority: 40,
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] &&
        !event.shiftKey &&
        event.code === CODES.BRACKET_LEFT,
    PanelComponent: ({ updateData, appState }) => (_jsx("button", { type: "button", className: "zIndexButton", onClick: () => updateData(null), title: `${t("labels.sendBackward")} — ${getShortcutKey("CtrlOrCmd+[")}`, children: SendBackwardIcon })),
});
export const actionBringForward = register({
    name: "bringForward",
    trackEvent: { category: "element" },
    perform: (elements, appState) => {
        return {
            elements: moveOneRight(elements, appState),
            appState,
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.bringForward",
    keyPriority: 40,
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] &&
        !event.shiftKey &&
        event.code === CODES.BRACKET_RIGHT,
    PanelComponent: ({ updateData, appState }) => (_jsx("button", { type: "button", className: "zIndexButton", onClick: () => updateData(null), title: `${t("labels.bringForward")} — ${getShortcutKey("CtrlOrCmd+]")}`, children: BringForwardIcon })),
});
export const actionSendToBack = register({
    name: "sendToBack",
    trackEvent: { category: "element" },
    perform: (elements, appState) => {
        return {
            elements: moveAllLeft(elements, appState),
            appState,
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.sendToBack",
    keyTest: (event) => isDarwin
        ? event[KEYS.CTRL_OR_CMD] &&
            event.altKey &&
            event.code === CODES.BRACKET_LEFT
        : event[KEYS.CTRL_OR_CMD] &&
            event.shiftKey &&
            event.code === CODES.BRACKET_LEFT,
    PanelComponent: ({ updateData, appState }) => (_jsx("button", { type: "button", className: "zIndexButton", onClick: () => updateData(null), title: `${t("labels.sendToBack")} — ${isDarwin
            ? getShortcutKey("CtrlOrCmd+Alt+[")
            : getShortcutKey("CtrlOrCmd+Shift+[")}`, children: SendToBackIcon })),
});
export const actionBringToFront = register({
    name: "bringToFront",
    trackEvent: { category: "element" },
    perform: (elements, appState) => {
        return {
            elements: moveAllRight(elements, appState),
            appState,
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.bringToFront",
    keyTest: (event) => isDarwin
        ? event[KEYS.CTRL_OR_CMD] &&
            event.altKey &&
            event.code === CODES.BRACKET_RIGHT
        : event[KEYS.CTRL_OR_CMD] &&
            event.shiftKey &&
            event.code === CODES.BRACKET_RIGHT,
    PanelComponent: ({ updateData, appState }) => (_jsx("button", { type: "button", className: "zIndexButton", onClick: (event) => updateData(null), title: `${t("labels.bringToFront")} — ${isDarwin
            ? getShortcutKey("CtrlOrCmd+Alt+]")
            : getShortcutKey("CtrlOrCmd+Shift+]")}`, children: BringToFrontIcon })),
});
