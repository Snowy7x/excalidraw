import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { questionCircle, saveAs } from "../components/icons";
import { ProjectName } from "../components/ProjectName";
import { ToolButton } from "../components/ToolButton";
import { Tooltip } from "../components/Tooltip";
import { DarkModeToggle } from "../components/DarkModeToggle";
import { loadFromJSON, saveAsJSON } from "../data";
import { resaveAsImageWithScene } from "../data/resave";
import { t } from "../i18n";
import { useDevice } from "../components/App";
import { KEYS } from "../keys";
import { register } from "./register";
import { CheckboxItem } from "../components/CheckboxItem";
import { getExportSize } from "../scene/export";
import { DEFAULT_EXPORT_PADDING, EXPORT_SCALES, THEME } from "../constants";
import { getSelectedElements, isSomeElementSelected } from "../scene";
import { getNonDeletedElements } from "../element";
import { isImageFileHandle } from "../data/blob";
import { nativeFileSystemSupported } from "../data/filesystem";
import "../components/ToolIcon.scss";
export const actionChangeProjectName = register({
    name: "changeProjectName",
    trackEvent: false,
    perform: (_elements, appState, value) => {
        return { appState: { ...appState, name: value }, commitToHistory: false };
    },
    PanelComponent: ({ appState, updateData, appProps, data }) => (_jsx(ProjectName, { label: t("labels.fileTitle"), value: appState.name || "Unnamed", onChange: (name) => updateData(name), isNameEditable: typeof appProps.name === "undefined" && !appState.viewModeEnabled, ignoreFocus: data?.ignoreFocus ?? false })),
});
export const actionChangeExportScale = register({
    name: "changeExportScale",
    trackEvent: { category: "export", action: "scale" },
    perform: (_elements, appState, value) => {
        return {
            appState: { ...appState, exportScale: value },
            commitToHistory: false,
        };
    },
    PanelComponent: ({ elements: allElements, appState, updateData }) => {
        const elements = getNonDeletedElements(allElements);
        const exportSelected = isSomeElementSelected(elements, appState);
        const exportedElements = exportSelected
            ? getSelectedElements(elements, appState)
            : elements;
        return (_jsx(_Fragment, { children: EXPORT_SCALES.map((s) => {
                const [width, height] = getExportSize(exportedElements, DEFAULT_EXPORT_PADDING, s);
                const scaleButtonTitle = `${t("imageExportDialog.label.scale")} ${s}x (${width}x${height})`;
                return (_jsx(ToolButton, { size: "small", type: "radio", icon: `${s}x`, name: "export-canvas-scale", title: scaleButtonTitle, "aria-label": scaleButtonTitle, id: "export-canvas-scale", checked: s === appState.exportScale, onChange: () => updateData(s) }, s));
            }) }));
    },
});
export const actionChangeExportBackground = register({
    name: "changeExportBackground",
    trackEvent: { category: "export", action: "toggleBackground" },
    perform: (_elements, appState, value) => {
        return {
            appState: { ...appState, exportBackground: value },
            commitToHistory: false,
        };
    },
    PanelComponent: ({ appState, updateData }) => (_jsx(CheckboxItem, { checked: appState.exportBackground, onChange: (checked) => updateData(checked), children: t("imageExportDialog.label.withBackground") })),
});
export const actionChangeExportEmbedScene = register({
    name: "changeExportEmbedScene",
    trackEvent: { category: "export", action: "embedScene" },
    perform: (_elements, appState, value) => {
        return {
            appState: { ...appState, exportEmbedScene: value },
            commitToHistory: false,
        };
    },
    PanelComponent: ({ appState, updateData }) => (_jsxs(CheckboxItem, { checked: appState.exportEmbedScene, onChange: (checked) => updateData(checked), children: [t("imageExportDialog.label.embedScene"), _jsx(Tooltip, { label: t("imageExportDialog.tooltip.embedScene"), long: true, children: _jsx("div", { className: "excalidraw-tooltip-icon", children: questionCircle }) })] })),
});
export const actionSaveToActiveFile = register({
    name: "saveToActiveFile",
    trackEvent: { category: "export" },
    predicate: (elements, appState, props, app) => {
        return (!!app.props.UIOptions.canvasActions.saveToActiveFile &&
            !!appState.fileHandle &&
            !appState.viewModeEnabled);
    },
    perform: async (elements, appState, value, app) => {
        const fileHandleExists = !!appState.fileHandle;
        try {
            const { fileHandle } = isImageFileHandle(appState.fileHandle)
                ? await resaveAsImageWithScene(elements, appState, app.files)
                : await saveAsJSON(elements, appState, app.files);
            return {
                commitToHistory: false,
                appState: {
                    ...appState,
                    fileHandle,
                    toast: fileHandleExists
                        ? {
                            message: fileHandle?.name
                                ? t("toast.fileSavedToFilename").replace("{filename}", `"${fileHandle.name}"`)
                                : t("toast.fileSaved"),
                        }
                        : null,
                },
            };
        }
        catch (error) {
            if (error?.name !== "AbortError") {
                console.error(error);
            }
            else {
                console.warn(error);
            }
            return { commitToHistory: false };
        }
    },
    keyTest: (event) => event.key === KEYS.S && event[KEYS.CTRL_OR_CMD] && !event.shiftKey,
});
export const actionSaveFileToDisk = register({
    name: "saveFileToDisk",
    viewMode: true,
    trackEvent: { category: "export" },
    perform: async (elements, appState, value, app) => {
        try {
            const { fileHandle } = await saveAsJSON(elements, {
                ...appState,
                fileHandle: null,
            }, app.files);
            return {
                commitToHistory: false,
                appState: {
                    ...appState,
                    openDialog: null,
                    fileHandle,
                    toast: { message: t("toast.fileSaved") },
                },
            };
        }
        catch (error) {
            if (error?.name !== "AbortError") {
                console.error(error);
            }
            else {
                console.warn(error);
            }
            return { commitToHistory: false };
        }
    },
    keyTest: (event) => event.key === KEYS.S && event.shiftKey && event[KEYS.CTRL_OR_CMD],
    PanelComponent: ({ updateData }) => (_jsx(ToolButton, { type: "button", icon: saveAs, title: t("buttons.saveAs"), "aria-label": t("buttons.saveAs"), showAriaLabel: useDevice().editor.isMobile, hidden: !nativeFileSystemSupported, onClick: () => updateData(null), "data-testid": "save-as-button" })),
});
export const actionLoadScene = register({
    name: "loadScene",
    trackEvent: { category: "export" },
    predicate: (elements, appState, props, app) => {
        return (!!app.props.UIOptions.canvasActions.loadScene && !appState.viewModeEnabled);
    },
    perform: async (elements, appState, _, app) => {
        try {
            const { elements: loadedElements, appState: loadedAppState, files, } = await loadFromJSON(appState, elements);
            return {
                elements: loadedElements,
                appState: loadedAppState,
                files,
                commitToHistory: true,
            };
        }
        catch (error) {
            if (error?.name === "AbortError") {
                console.warn(error);
                return false;
            }
            return {
                elements,
                appState: { ...appState, errorMessage: error.message },
                files: app.files,
                commitToHistory: false,
            };
        }
    },
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] && event.key === KEYS.O,
});
export const actionExportWithDarkMode = register({
    name: "exportWithDarkMode",
    trackEvent: { category: "export", action: "toggleTheme" },
    perform: (_elements, appState, value) => {
        return {
            appState: { ...appState, exportWithDarkMode: value },
            commitToHistory: false,
        };
    },
    PanelComponent: ({ appState, updateData }) => (_jsx("div", { style: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "-45px",
            marginBottom: "10px",
        }, children: _jsx(DarkModeToggle, { value: appState.exportWithDarkMode ? THEME.DARK : THEME.LIGHT, onChange: (theme) => {
                updateData(theme === THEME.DARK);
            }, title: t("imageExportDialog.label.darkMode") }) })),
});
