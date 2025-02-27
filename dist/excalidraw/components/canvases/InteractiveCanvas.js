import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useRef } from "react";
import { renderInteractiveScene } from "../../renderer/renderScene";
import { isShallowEqual, sceneCoordsToViewportCoords } from "../../utils";
import { CURSOR_TYPE } from "../../constants";
import { t } from "../../i18n";
import { isRenderThrottlingEnabled } from "../../reactUtils";
const InteractiveCanvas = (props) => {
    const isComponentMounted = useRef(false);
    useEffect(() => {
        if (!isComponentMounted.current) {
            isComponentMounted.current = true;
            return;
        }
        const cursorButton = {};
        const pointerViewportCoords = {};
        const remoteSelectedElementIds = {};
        const pointerUsernames = {};
        const pointerUserStates = {};
        props.appState.collaborators.forEach((user, socketId) => {
            if (user.selectedElementIds) {
                for (const id of Object.keys(user.selectedElementIds)) {
                    if (!(id in remoteSelectedElementIds)) {
                        remoteSelectedElementIds[id] = [];
                    }
                    remoteSelectedElementIds[id].push(socketId);
                }
            }
            if (!user.pointer) {
                return;
            }
            if (user.username) {
                pointerUsernames[socketId] = user.username;
            }
            if (user.userState) {
                pointerUserStates[socketId] = user.userState;
            }
            pointerViewportCoords[socketId] = sceneCoordsToViewportCoords({
                sceneX: user.pointer.x,
                sceneY: user.pointer.y,
            }, props.appState);
            cursorButton[socketId] = user.button;
        });
        const selectionColor = (props.containerRef?.current &&
            getComputedStyle(props.containerRef.current).getPropertyValue("--color-selection")) ||
            "#6965db";
        renderInteractiveScene({
            canvas: props.canvas,
            elements: props.elements,
            visibleElements: props.visibleElements,
            selectedElements: props.selectedElements,
            scale: window.devicePixelRatio,
            appState: props.appState,
            renderConfig: {
                remotePointerViewportCoords: pointerViewportCoords,
                remotePointerButton: cursorButton,
                remoteSelectedElementIds,
                remotePointerUsernames: pointerUsernames,
                remotePointerUserStates: pointerUserStates,
                selectionColor,
                renderScrollbars: false,
            },
            callback: props.renderInteractiveSceneCallback,
        }, isRenderThrottlingEnabled());
    });
    return (_jsx("canvas", { className: "excalidraw__canvas interactive", style: {
            width: props.appState.width,
            height: props.appState.height,
            cursor: props.appState.viewModeEnabled
                ? CURSOR_TYPE.GRAB
                : CURSOR_TYPE.AUTO,
        }, width: props.appState.width * props.scale, height: props.appState.height * props.scale, ref: props.handleCanvasRef, onContextMenu: props.onContextMenu, onPointerMove: props.onPointerMove, onPointerUp: props.onPointerUp, onPointerCancel: props.onPointerCancel, onTouchMove: props.onTouchMove, onPointerDown: props.onPointerDown, onDoubleClick: props.appState.viewModeEnabled ? undefined : props.onDoubleClick, children: t("labels.drawingCanvas") }));
};
const getRelevantAppStateProps = (appState) => ({
    zoom: appState.zoom,
    scrollX: appState.scrollX,
    scrollY: appState.scrollY,
    width: appState.width,
    height: appState.height,
    viewModeEnabled: appState.viewModeEnabled,
    editingGroupId: appState.editingGroupId,
    editingLinearElement: appState.editingLinearElement,
    selectedElementIds: appState.selectedElementIds,
    frameToHighlight: appState.frameToHighlight,
    offsetLeft: appState.offsetLeft,
    offsetTop: appState.offsetTop,
    theme: appState.theme,
    pendingImageElementId: appState.pendingImageElementId,
    selectionElement: appState.selectionElement,
    selectedGroupIds: appState.selectedGroupIds,
    selectedLinearElement: appState.selectedLinearElement,
    multiElement: appState.multiElement,
    isBindingEnabled: appState.isBindingEnabled,
    suggestedBindings: appState.suggestedBindings,
    isRotating: appState.isRotating,
    elementsToHighlight: appState.elementsToHighlight,
    collaborators: appState.collaborators,
    activeEmbeddable: appState.activeEmbeddable,
    snapLines: appState.snapLines,
    zenModeEnabled: appState.zenModeEnabled,
});
const areEqual = (prevProps, nextProps) => {
    // This could be further optimised if needed, as we don't have to render interactive canvas on each scene mutation
    if (prevProps.selectionNonce !== nextProps.selectionNonce ||
        prevProps.versionNonce !== nextProps.versionNonce ||
        prevProps.scale !== nextProps.scale ||
        // we need to memoize on element arrays because they may have renewed
        // even if versionNonce didn't change (e.g. we filter elements out based
        // on appState)
        prevProps.elements !== nextProps.elements ||
        prevProps.visibleElements !== nextProps.visibleElements ||
        prevProps.selectedElements !== nextProps.selectedElements) {
        return false;
    }
    // Comparing the interactive appState for changes in case of some edge cases
    return isShallowEqual(
    // asserting AppState because we're being passed the whole AppState
    // but resolve to only the InteractiveCanvas-relevant props
    getRelevantAppStateProps(prevProps.appState), getRelevantAppStateProps(nextProps.appState));
};
export default React.memo(InteractiveCanvas, areEqual);
