import { isDarwin } from "../constants";
import { t } from "../i18n";
import { getShortcutKey } from "../utils";
const shortcutMap = {
    toggleTheme: [getShortcutKey("Shift+Alt+D")],
    saveScene: [getShortcutKey("CtrlOrCmd+S")],
    loadScene: [getShortcutKey("CtrlOrCmd+O")],
    clearCanvas: [getShortcutKey("CtrlOrCmd+Delete")],
    imageExport: [getShortcutKey("CtrlOrCmd+Shift+E")],
    cut: [getShortcutKey("CtrlOrCmd+X")],
    copy: [getShortcutKey("CtrlOrCmd+C")],
    paste: [getShortcutKey("CtrlOrCmd+V")],
    copyStyles: [getShortcutKey("CtrlOrCmd+Alt+C")],
    pasteStyles: [getShortcutKey("CtrlOrCmd+Alt+V")],
    selectAll: [getShortcutKey("CtrlOrCmd+A")],
    deleteSelectedElements: [getShortcutKey("Delete")],
    duplicateSelection: [
        getShortcutKey("CtrlOrCmd+D"),
        getShortcutKey(`Alt+${t("helpDialog.drag")}`),
    ],
    sendBackward: [getShortcutKey("CtrlOrCmd+[")],
    bringForward: [getShortcutKey("CtrlOrCmd+]")],
    sendToBack: [
        isDarwin
            ? getShortcutKey("CtrlOrCmd+Alt+[")
            : getShortcutKey("CtrlOrCmd+Shift+["),
    ],
    bringToFront: [
        isDarwin
            ? getShortcutKey("CtrlOrCmd+Alt+]")
            : getShortcutKey("CtrlOrCmd+Shift+]"),
    ],
    copyAsPng: [getShortcutKey("Shift+Alt+C")],
    copyAsSvg: [],
    group: [getShortcutKey("CtrlOrCmd+G")],
    ungroup: [getShortcutKey("CtrlOrCmd+Shift+G")],
    gridMode: [getShortcutKey("CtrlOrCmd+'")],
    zenMode: [getShortcutKey("Alt+Z")],
    objectsSnapMode: [getShortcutKey("Alt+S")],
    stats: [getShortcutKey("Alt+/")],
    addToLibrary: [],
    flipHorizontal: [getShortcutKey("Shift+H")],
    flipVertical: [getShortcutKey("Shift+V")],
    viewMode: [getShortcutKey("Alt+R")],
    hyperlink: [getShortcutKey("CtrlOrCmd+K")],
    toggleElementLock: [getShortcutKey("CtrlOrCmd+Shift+L")],
};
export const getShortcutFromShortcutName = (name) => {
    const shortcuts = shortcutMap[name];
    // if multiple shortcuts available, take the first one
    return shortcuts && shortcuts.length > 0 ? shortcuts[0] : "";
};
