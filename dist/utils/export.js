import { exportToCanvas as _exportToCanvas, exportToSvg as _exportToSvg, } from "../excalidraw/scene/export";
import { getDefaultAppState } from "../excalidraw/appState";
import { restore } from "../excalidraw/data/restore";
import { MIME_TYPES } from "../excalidraw/constants";
import { encodePngMetadata } from "../excalidraw/data/image";
import { serializeAsJSON } from "../excalidraw/data/json";
import { copyBlobToClipboardAsPng, copyTextToSystemClipboard, copyToClipboard, } from "../excalidraw/clipboard";
export { MIME_TYPES };
export const exportToCanvas = ({ elements, appState, files, maxWidthOrHeight, getDimensions, exportPadding, exportingFrame, }) => {
    const { elements: restoredElements, appState: restoredAppState } = restore({ elements, appState }, null, null);
    const { exportBackground, viewBackgroundColor } = restoredAppState;
    return _exportToCanvas(restoredElements, {
        ...restoredAppState,
        offsetTop: 0,
        offsetLeft: 0,
        width: 0,
        height: 0,
        scrollConstraints: null,
    }, files || {}, { exportBackground, exportPadding, viewBackgroundColor, exportingFrame }, (width, height) => {
        const canvas = document.createElement("canvas");
        if (maxWidthOrHeight) {
            if (typeof getDimensions === "function") {
                console.warn("`getDimensions()` is ignored when `maxWidthOrHeight` is supplied.");
            }
            const max = Math.max(width, height);
            // if content is less then maxWidthOrHeight, fallback on supplied scale
            const scale = maxWidthOrHeight < max
                ? maxWidthOrHeight / max
                : appState?.exportScale ?? 1;
            canvas.width = width * scale;
            canvas.height = height * scale;
            return {
                canvas,
                scale,
            };
        }
        const ret = getDimensions?.(width, height) || { width, height };
        canvas.width = ret.width;
        canvas.height = ret.height;
        return {
            canvas,
            scale: ret.scale ?? 1,
        };
    });
};
export const exportToBlob = async (opts) => {
    let { mimeType = MIME_TYPES.png, quality } = opts;
    if (mimeType === MIME_TYPES.png && typeof quality === "number") {
        console.warn(`"quality" will be ignored for "${MIME_TYPES.png}" mimeType`);
    }
    // typo in MIME type (should be "jpeg")
    if (mimeType === "image/jpg") {
        mimeType = MIME_TYPES.jpg;
    }
    if (mimeType === MIME_TYPES.jpg && !opts.appState?.exportBackground) {
        console.warn(`Defaulting "exportBackground" to "true" for "${MIME_TYPES.jpg}" mimeType`);
        opts = {
            ...opts,
            appState: { ...opts.appState, exportBackground: true },
        };
    }
    const canvas = await exportToCanvas(opts);
    quality = quality ? quality : /image\/jpe?g/.test(mimeType) ? 0.92 : 0.8;
    return new Promise((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            if (!blob) {
                return reject(new Error("couldn't export to blob"));
            }
            if (blob &&
                mimeType === MIME_TYPES.png &&
                opts.appState?.exportEmbedScene) {
                blob = await encodePngMetadata({
                    blob,
                    metadata: serializeAsJSON(
                    // NOTE as long as we're using the Scene hack, we need to ensure
                    // we pass the original, uncloned elements when serializing
                    // so that we keep ids stable
                    opts.elements, opts.appState, opts.files || {}, "local"),
                });
            }
            resolve(blob);
        }, mimeType, quality);
    });
};
export const exportToSvg = async ({ elements, appState = getDefaultAppState(), files = {}, exportPadding, renderEmbeddables, exportingFrame, }) => {
    const { elements: restoredElements, appState: restoredAppState } = restore({ elements, appState }, null, null);
    const exportAppState = {
        ...restoredAppState,
        exportPadding,
    };
    return _exportToSvg(restoredElements, exportAppState, files, {
        exportingFrame,
        renderEmbeddables,
    });
};
export const exportToClipboard = async (opts) => {
    if (opts.type === "svg") {
        const svg = await exportToSvg(opts);
        await copyTextToSystemClipboard(svg.outerHTML);
    }
    else if (opts.type === "png") {
        await copyBlobToClipboardAsPng(exportToBlob(opts));
    }
    else if (opts.type === "json") {
        await copyToClipboard(opts.elements, opts.files);
    }
    else {
        throw new Error("Invalid export type");
    }
};
export * from "./bbox";
export { elementsOverlappingBBox, isElementInsideBBox, elementPartiallyOverlapsWithOrContainsBBox, } from "./withinBounds";
export { serializeAsJSON, serializeLibraryAsJSON, } from "../excalidraw/data/json";
export { loadFromBlob, loadSceneOrLibraryFromBlob, loadLibraryFromBlob, } from "../excalidraw/data/blob";
export { getFreeDrawSvgPath } from "../excalidraw/renderer/renderElement";
export { mergeLibraryItems } from "../excalidraw/data/library";
