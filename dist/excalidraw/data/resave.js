import { exportCanvas, prepareElementsForExport } from ".";
import { getFileHandleType, isImageFileHandleType } from "./blob";
export const resaveAsImageWithScene = async (elements, appState, files) => {
    const { exportBackground, viewBackgroundColor, name, fileHandle } = appState;
    const fileHandleType = getFileHandleType(fileHandle);
    if (!fileHandle || !isImageFileHandleType(fileHandleType)) {
        throw new Error("fileHandle should exist and should be of type svg or png when resaving");
    }
    appState = {
        ...appState,
        exportEmbedScene: true,
    };
    const { exportedElements, exportingFrame } = prepareElementsForExport(elements, appState, false);
    await exportCanvas(fileHandleType, exportedElements, appState, files, {
        exportBackground,
        viewBackgroundColor,
        name,
        fileHandle,
        exportingFrame,
    });
    return { fileHandle };
};
