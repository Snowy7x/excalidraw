import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef } from "react";
import { renderStaticScene } from "../../renderer/renderScene";
import { isShallowEqual } from "../../utils";
import { isRenderThrottlingEnabled } from "../../reactUtils";
const StaticCanvas = (props) => {
    const wrapperRef = useRef(null);
    const isComponentMounted = useRef(false);
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) {
            return;
        }
        const canvas = props.canvas;
        if (!isComponentMounted.current) {
            isComponentMounted.current = true;
            wrapper.replaceChildren(canvas);
            canvas.classList.add("excalidraw__canvas", "static");
        }
        const widthString = `${props.appState.width}px`;
        const heightString = `${props.appState.height}px`;
        if (canvas.style.width !== widthString) {
            canvas.style.width = widthString;
        }
        if (canvas.style.height !== heightString) {
            canvas.style.height = heightString;
        }
        const scaledWidth = props.appState.width * props.scale;
        const scaledHeight = props.appState.height * props.scale;
        // setting width/height resets the canvas even if dimensions not changed,
        // which would cause flicker when we skip frame (due to throttling)
        if (canvas.width !== scaledWidth) {
            canvas.width = scaledWidth;
        }
        if (canvas.height !== scaledHeight) {
            canvas.height = scaledHeight;
        }
        renderStaticScene({
            canvas,
            rc: props.rc,
            scale: props.scale,
            elements: props.elements,
            visibleElements: props.visibleElements,
            appState: props.appState,
            renderConfig: props.renderConfig,
        }, isRenderThrottlingEnabled());
    });
    return _jsx("div", { className: "excalidraw__canvas-wrapper", ref: wrapperRef });
};
const getRelevantAppStateProps = (appState) => ({
    zoom: appState.zoom,
    scrollX: appState.scrollX,
    scrollY: appState.scrollY,
    width: appState.width,
    height: appState.height,
    viewModeEnabled: appState.viewModeEnabled,
    offsetLeft: appState.offsetLeft,
    offsetTop: appState.offsetTop,
    theme: appState.theme,
    pendingImageElementId: appState.pendingImageElementId,
    shouldCacheIgnoreZoom: appState.shouldCacheIgnoreZoom,
    viewBackgroundColor: appState.viewBackgroundColor,
    exportScale: appState.exportScale,
    selectedElementsAreBeingDragged: appState.selectedElementsAreBeingDragged,
    gridSize: appState.gridSize,
    frameRendering: appState.frameRendering,
    selectedElementIds: appState.selectedElementIds,
    frameToHighlight: appState.frameToHighlight,
    editingGroupId: appState.editingGroupId,
});
const areEqual = (prevProps, nextProps) => {
    if (prevProps.versionNonce !== nextProps.versionNonce ||
        prevProps.scale !== nextProps.scale ||
        // we need to memoize on element arrays because they may have renewed
        // even if versionNonce didn't change (e.g. we filter elements out based
        // on appState)
        prevProps.elements !== nextProps.elements ||
        prevProps.visibleElements !== nextProps.visibleElements) {
        return false;
    }
    return (isShallowEqual(
    // asserting AppState because we're being passed the whole AppState
    // but resolve to only the StaticCanvas-relevant props
    getRelevantAppStateProps(prevProps.appState), getRelevantAppStateProps(nextProps.appState)) && isShallowEqual(prevProps.renderConfig, nextProps.renderConfig));
};
export default React.memo(StaticCanvas, areEqual);
