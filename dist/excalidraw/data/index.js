import { copyBlobToClipboardAsPng, copyTextToSystemClipboard, } from "../clipboard";
import { DEFAULT_EXPORT_PADDING, isFirefox, MIME_TYPES } from "../constants";
import { getNonDeletedElements } from "../element";
import { isFrameLikeElement } from "../element/typeChecks";
import { t } from "../i18n";
import { elementsOverlappingBBox } from "../../utils/export";
import { isSomeElementSelected, getSelectedElements } from "../scene";
import { exportToCanvas, exportToSvg } from "../scene/export";
import { cloneJSON } from "../utils";
import { canvasToBlob } from "./blob";
import { fileSave } from "./filesystem";
import { serializeAsJSON } from "./json";
export { loadFromBlob } from "./blob";
export { loadFromJSON, saveAsJSON } from "./json";
export const prepareElementsForExport = (elements, { selectedElementIds }, exportSelectionOnly) => {
    elements = getNonDeletedElements(elements);
    const isExportingSelection = exportSelectionOnly &&
        isSomeElementSelected(elements, { selectedElementIds });
    let exportingFrame = null;
    let exportedElements = isExportingSelection
        ? getSelectedElements(elements, { selectedElementIds }, {
            includeBoundTextElement: true,
        })
        : elements;
    if (isExportingSelection) {
        if (exportedElements.length === 1 &&
            isFrameLikeElement(exportedElements[0])) {
            exportingFrame = exportedElements[0];
            exportedElements = elementsOverlappingBBox({
                elements,
                bounds: exportingFrame,
                type: "overlap",
            });
        }
        else if (exportedElements.length > 1) {
            exportedElements = getSelectedElements(elements, { selectedElementIds }, {
                includeBoundTextElement: true,
                includeElementsInFrames: true,
            });
        }
    }
    return {
        exportingFrame,
        exportedElements: cloneJSON(exportedElements),
    };
};
export const exportCanvas = async (type, elements, appState, files, { exportBackground, exportPadding = DEFAULT_EXPORT_PADDING, viewBackgroundColor, name, fileHandle = null, exportingFrame = null, }) => {
    if (elements.length === 0) {
        throw new Error(t("alerts.cannotExportEmptyCanvas"));
    }
    if (type === "svg" || type === "clipboard-svg") {
        const tempSvg = await exportToSvg(elements, {
            exportBackground,
            exportWithDarkMode: appState.exportWithDarkMode,
            viewBackgroundColor,
            exportPadding,
            exportScale: appState.exportScale,
            exportEmbedScene: appState.exportEmbedScene && type === "svg",
        }, files, { exportingFrame });
        if (type === "svg") {
            return await fileSave(new Blob([tempSvg.outerHTML], { type: MIME_TYPES.svg }), {
                description: "Export to SVG",
                name,
                extension: appState.exportEmbedScene ? "excalidraw.svg" : "svg",
                fileHandle,
            });
        }
        else if (type === "clipboard-svg") {
            await copyTextToSystemClipboard(tempSvg.outerHTML);
            return;
        }
    }
    const tempCanvas = exportToCanvas(elements, appState, files, {
        exportBackground,
        viewBackgroundColor,
        exportPadding,
        exportingFrame,
    });
    if (type === "png") {
        let blob = await canvasToBlob(tempCanvas);
        if (appState.exportEmbedScene) {
            blob = await (await import("./image")).encodePngMetadata({
                blob,
                metadata: serializeAsJSON(elements, appState, files, "local"),
            });
        }
        return await fileSave(blob, {
            description: "Export to PNG",
            name,
            // FIXME reintroduce `excalidraw.png` when most people upgrade away
            // from 111.0.5563.64 (arm64), see #6349
            extension: /* appState.exportEmbedScene ? "excalidraw.png" : */ "png",
            fileHandle,
        });
    }
    else if (type === "clipboard") {
        try {
            const blob = canvasToBlob(tempCanvas);
            await copyBlobToClipboardAsPng(blob);
        }
        catch (error) {
            console.warn(error);
            if (error.name === "CANVAS_POSSIBLY_TOO_BIG") {
                throw error;
            }
            // TypeError *probably* suggests ClipboardItem not defined, which
            // people on Firefox can enable through a flag, so let's tell them.
            if (isFirefox && error.name === "TypeError") {
                throw new Error(`${t("alerts.couldNotCopyToClipboard")}\n\n${t("hints.firefox_clipboard_write")}`);
            }
            else {
                throw new Error(t("alerts.couldNotCopyToClipboard"));
            }
        }
    }
    else {
        // shouldn't happen
        throw new Error("Unsupported export type");
    }
};
