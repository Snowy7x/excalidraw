import { distance2d, rotate, isPathALoop, getGridPoint, rotatePoint, centerPoint, getControlPointsForBezierCurve, getBezierXY, getBezierCurveLength, mapIntervalToBezierT, arePointsEqual, } from "../math";
import { getElementAbsoluteCoords, getLockedLinearCursorAlignSize } from ".";
import { getCurvePathOps, getElementPointsCoords, getMinMaxXYFromCurvePathOps, } from "./bounds";
import { mutateElement } from "./mutateElement";
import Scene from "../scene/Scene";
import { bindOrUnbindLinearElement, getHoveredElementForBinding, isBindingEnabled, } from "./binding";
import { tupleToCoors } from "../utils";
import { isBindingElement } from "./typeChecks";
import { KEYS, shouldRotateWithDiscreteAngle } from "../keys";
import { getBoundTextElement, handleBindTextResize } from "./textElement";
import { DRAGGING_THRESHOLD } from "../constants";
import { ShapeCache } from "../scene/ShapeCache";
const editorMidPointsCache = { version: null, points: [], zoom: null };
export class LinearElementEditor {
    elementId;
    /** indices */
    selectedPointsIndices;
    pointerDownState;
    /** whether you're dragging a point */
    isDragging;
    lastUncommittedPoint;
    pointerOffset;
    startBindingElement;
    endBindingElement;
    hoverPointIndex;
    segmentMidPointHoveredCoords;
    constructor(element, scene) {
        this.elementId = element.id;
        Scene.mapElementToScene(this.elementId, scene);
        LinearElementEditor.normalizePoints(element);
        this.selectedPointsIndices = null;
        this.lastUncommittedPoint = null;
        this.isDragging = false;
        this.pointerOffset = { x: 0, y: 0 };
        this.startBindingElement = "keep";
        this.endBindingElement = "keep";
        this.pointerDownState = {
            prevSelectedPointsIndices: null,
            lastClickedPoint: -1,
            origin: null,
            segmentMidpoint: {
                value: null,
                index: null,
                added: false,
            },
        };
        this.hoverPointIndex = -1;
        this.segmentMidPointHoveredCoords = null;
    }
    // ---------------------------------------------------------------------------
    // static methods
    // ---------------------------------------------------------------------------
    static POINT_HANDLE_SIZE = 10;
    /**
     * @param id the `elementId` from the instance of this class (so that we can
     *  statically guarantee this method returns an ExcalidrawLinearElement)
     */
    static getElement(id) {
        const element = Scene.getScene(id)?.getNonDeletedElement(id);
        if (element) {
            return element;
        }
        return null;
    }
    static handleBoxSelection(event, appState, setState) {
        if (!appState.editingLinearElement ||
            appState.draggingElement?.type !== "selection") {
            return false;
        }
        const { editingLinearElement } = appState;
        const { selectedPointsIndices, elementId } = editingLinearElement;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return false;
        }
        const [selectionX1, selectionY1, selectionX2, selectionY2] = getElementAbsoluteCoords(appState.draggingElement);
        const pointsSceneCoords = LinearElementEditor.getPointsGlobalCoordinates(element);
        const nextSelectedPoints = pointsSceneCoords.reduce((acc, point, index) => {
            if ((point[0] >= selectionX1 &&
                point[0] <= selectionX2 &&
                point[1] >= selectionY1 &&
                point[1] <= selectionY2) ||
                (event.shiftKey && selectedPointsIndices?.includes(index))) {
                acc.push(index);
            }
            return acc;
        }, []);
        setState({
            editingLinearElement: {
                ...editingLinearElement,
                selectedPointsIndices: nextSelectedPoints.length
                    ? nextSelectedPoints
                    : null,
            },
        });
    }
    /** @returns whether point was dragged */
    static handlePointDragging(event, appState, scenePointerX, scenePointerY, maybeSuggestBinding, linearElementEditor) {
        if (!linearElementEditor) {
            return false;
        }
        const { selectedPointsIndices, elementId } = linearElementEditor;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return false;
        }
        // point that's being dragged (out of all selected points)
        const draggingPoint = element.points[linearElementEditor.pointerDownState.lastClickedPoint];
        if (selectedPointsIndices && draggingPoint) {
            if (shouldRotateWithDiscreteAngle(event) &&
                selectedPointsIndices.length === 1 &&
                element.points.length > 1) {
                const selectedIndex = selectedPointsIndices[0];
                const referencePoint = element.points[selectedIndex === 0 ? 1 : selectedIndex - 1];
                const [width, height] = LinearElementEditor._getShiftLockedDelta(element, referencePoint, [scenePointerX, scenePointerY], event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize);
                LinearElementEditor.movePoints(element, [
                    {
                        index: selectedIndex,
                        point: [width + referencePoint[0], height + referencePoint[1]],
                        isDragging: selectedIndex ===
                            linearElementEditor.pointerDownState.lastClickedPoint,
                    },
                ]);
            }
            else {
                const newDraggingPointPosition = LinearElementEditor.createPointAt(element, scenePointerX - linearElementEditor.pointerOffset.x, scenePointerY - linearElementEditor.pointerOffset.y, event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize);
                const deltaX = newDraggingPointPosition[0] - draggingPoint[0];
                const deltaY = newDraggingPointPosition[1] - draggingPoint[1];
                LinearElementEditor.movePoints(element, selectedPointsIndices.map((pointIndex) => {
                    const newPointPosition = pointIndex ===
                        linearElementEditor.pointerDownState.lastClickedPoint
                        ? LinearElementEditor.createPointAt(element, scenePointerX - linearElementEditor.pointerOffset.x, scenePointerY - linearElementEditor.pointerOffset.y, event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize)
                        : [
                            element.points[pointIndex][0] + deltaX,
                            element.points[pointIndex][1] + deltaY,
                        ];
                    return {
                        index: pointIndex,
                        point: newPointPosition,
                        isDragging: pointIndex ===
                            linearElementEditor.pointerDownState.lastClickedPoint,
                    };
                }));
            }
            const boundTextElement = getBoundTextElement(element);
            if (boundTextElement) {
                handleBindTextResize(element, false);
            }
            // suggest bindings for first and last point if selected
            if (isBindingElement(element, false)) {
                const coords = [];
                const firstSelectedIndex = selectedPointsIndices[0];
                if (firstSelectedIndex === 0) {
                    coords.push(tupleToCoors(LinearElementEditor.getPointGlobalCoordinates(element, element.points[0])));
                }
                const lastSelectedIndex = selectedPointsIndices[selectedPointsIndices.length - 1];
                if (lastSelectedIndex === element.points.length - 1) {
                    coords.push(tupleToCoors(LinearElementEditor.getPointGlobalCoordinates(element, element.points[lastSelectedIndex])));
                }
                if (coords.length) {
                    maybeSuggestBinding(element, coords);
                }
            }
            return true;
        }
        return false;
    }
    static handlePointerUp(event, editingLinearElement, appState) {
        const { elementId, selectedPointsIndices, isDragging, pointerDownState } = editingLinearElement;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return editingLinearElement;
        }
        const bindings = {};
        if (isDragging && selectedPointsIndices) {
            for (const selectedPoint of selectedPointsIndices) {
                if (selectedPoint === 0 ||
                    selectedPoint === element.points.length - 1) {
                    if (isPathALoop(element.points, appState.zoom.value)) {
                        LinearElementEditor.movePoints(element, [
                            {
                                index: selectedPoint,
                                point: selectedPoint === 0
                                    ? element.points[element.points.length - 1]
                                    : element.points[0],
                            },
                        ]);
                    }
                    const bindingElement = isBindingEnabled(appState)
                        ? getHoveredElementForBinding(tupleToCoors(LinearElementEditor.getPointAtIndexGlobalCoordinates(element, selectedPoint)), Scene.getScene(element))
                        : null;
                    bindings[selectedPoint === 0 ? "startBindingElement" : "endBindingElement"] = bindingElement;
                }
            }
        }
        return {
            ...editingLinearElement,
            ...bindings,
            // if clicking without previously dragging a point(s), and not holding
            // shift, deselect all points except the one clicked. If holding shift,
            // toggle the point.
            selectedPointsIndices: isDragging || event.shiftKey
                ? !isDragging &&
                    event.shiftKey &&
                    pointerDownState.prevSelectedPointsIndices?.includes(pointerDownState.lastClickedPoint)
                    ? selectedPointsIndices &&
                        selectedPointsIndices.filter((pointIndex) => pointIndex !== pointerDownState.lastClickedPoint)
                    : selectedPointsIndices
                : selectedPointsIndices?.includes(pointerDownState.lastClickedPoint)
                    ? [pointerDownState.lastClickedPoint]
                    : selectedPointsIndices,
            isDragging: false,
            pointerOffset: { x: 0, y: 0 },
        };
    }
    static getEditorMidPoints = (element, appState) => {
        const boundText = getBoundTextElement(element);
        // Since its not needed outside editor unless 2 pointer lines or bound text
        if (!appState.editingLinearElement &&
            element.points.length > 2 &&
            !boundText) {
            return [];
        }
        if (editorMidPointsCache.version === element.version &&
            editorMidPointsCache.zoom === appState.zoom.value) {
            return editorMidPointsCache.points;
        }
        LinearElementEditor.updateEditorMidPointsCache(element, appState);
        return editorMidPointsCache.points;
    };
    static updateEditorMidPointsCache = (element, appState) => {
        const points = LinearElementEditor.getPointsGlobalCoordinates(element);
        let index = 0;
        const midpoints = [];
        while (index < points.length - 1) {
            if (LinearElementEditor.isSegmentTooShort(element, element.points[index], element.points[index + 1], appState.zoom)) {
                midpoints.push(null);
                index++;
                continue;
            }
            const segmentMidPoint = LinearElementEditor.getSegmentMidPoint(element, points[index], points[index + 1], index + 1);
            midpoints.push(segmentMidPoint);
            index++;
        }
        editorMidPointsCache.points = midpoints;
        editorMidPointsCache.version = element.version;
        editorMidPointsCache.zoom = appState.zoom.value;
    };
    static getSegmentMidpointHitCoords = (linearElementEditor, scenePointer, appState) => {
        const { elementId } = linearElementEditor;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return null;
        }
        const clickedPointIndex = LinearElementEditor.getPointIndexUnderCursor(element, appState.zoom, scenePointer.x, scenePointer.y);
        if (clickedPointIndex >= 0) {
            return null;
        }
        const points = LinearElementEditor.getPointsGlobalCoordinates(element);
        if (points.length >= 3 && !appState.editingLinearElement) {
            return null;
        }
        const threshold = LinearElementEditor.POINT_HANDLE_SIZE / appState.zoom.value;
        const existingSegmentMidpointHitCoords = linearElementEditor.segmentMidPointHoveredCoords;
        if (existingSegmentMidpointHitCoords) {
            const distance = distance2d(existingSegmentMidpointHitCoords[0], existingSegmentMidpointHitCoords[1], scenePointer.x, scenePointer.y);
            if (distance <= threshold) {
                return existingSegmentMidpointHitCoords;
            }
        }
        let index = 0;
        const midPoints = LinearElementEditor.getEditorMidPoints(element, appState);
        while (index < midPoints.length) {
            if (midPoints[index] !== null) {
                const distance = distance2d(midPoints[index][0], midPoints[index][1], scenePointer.x, scenePointer.y);
                if (distance <= threshold) {
                    return midPoints[index];
                }
            }
            index++;
        }
        return null;
    };
    static isSegmentTooShort(element, startPoint, endPoint, zoom) {
        let distance = distance2d(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
        if (element.points.length > 2 && element.roundness) {
            distance = getBezierCurveLength(element, endPoint);
        }
        return distance * zoom.value < LinearElementEditor.POINT_HANDLE_SIZE * 4;
    }
    static getSegmentMidPoint(element, startPoint, endPoint, endPointIndex) {
        let segmentMidPoint = centerPoint(startPoint, endPoint);
        if (element.points.length > 2 && element.roundness) {
            const controlPoints = getControlPointsForBezierCurve(element, element.points[endPointIndex]);
            if (controlPoints) {
                const t = mapIntervalToBezierT(element, element.points[endPointIndex], 0.5);
                const [tx, ty] = getBezierXY(controlPoints[0], controlPoints[1], controlPoints[2], controlPoints[3], t);
                segmentMidPoint = LinearElementEditor.getPointGlobalCoordinates(element, [tx, ty]);
            }
        }
        return segmentMidPoint;
    }
    static getSegmentMidPointIndex(linearElementEditor, appState, midPoint) {
        const element = LinearElementEditor.getElement(linearElementEditor.elementId);
        if (!element) {
            return -1;
        }
        const midPoints = LinearElementEditor.getEditorMidPoints(element, appState);
        let index = 0;
        while (index < midPoints.length) {
            if (LinearElementEditor.arePointsEqual(midPoint, midPoints[index])) {
                return index + 1;
            }
            index++;
        }
        return -1;
    }
    static handlePointerDown(event, appState, history, scenePointer, linearElementEditor) {
        const ret = {
            didAddPoint: false,
            hitElement: null,
            linearElementEditor: null,
        };
        if (!linearElementEditor) {
            return ret;
        }
        const { elementId } = linearElementEditor;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return ret;
        }
        const segmentMidpoint = LinearElementEditor.getSegmentMidpointHitCoords(linearElementEditor, scenePointer, appState);
        let segmentMidpointIndex = null;
        if (segmentMidpoint) {
            segmentMidpointIndex = LinearElementEditor.getSegmentMidPointIndex(linearElementEditor, appState, segmentMidpoint);
        }
        if (event.altKey && appState.editingLinearElement) {
            if (linearElementEditor.lastUncommittedPoint == null) {
                mutateElement(element, {
                    points: [
                        ...element.points,
                        LinearElementEditor.createPointAt(element, scenePointer.x, scenePointer.y, event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize),
                    ],
                });
                ret.didAddPoint = true;
            }
            history.resumeRecording();
            ret.linearElementEditor = {
                ...linearElementEditor,
                pointerDownState: {
                    prevSelectedPointsIndices: linearElementEditor.selectedPointsIndices,
                    lastClickedPoint: -1,
                    origin: { x: scenePointer.x, y: scenePointer.y },
                    segmentMidpoint: {
                        value: segmentMidpoint,
                        index: segmentMidpointIndex,
                        added: false,
                    },
                },
                selectedPointsIndices: [element.points.length - 1],
                lastUncommittedPoint: null,
                endBindingElement: getHoveredElementForBinding(scenePointer, Scene.getScene(element)),
            };
            ret.didAddPoint = true;
            return ret;
        }
        const clickedPointIndex = LinearElementEditor.getPointIndexUnderCursor(element, appState.zoom, scenePointer.x, scenePointer.y);
        // if we clicked on a point, set the element as hitElement otherwise
        // it would get deselected if the point is outside the hitbox area
        if (clickedPointIndex >= 0 || segmentMidpoint) {
            ret.hitElement = element;
        }
        else {
            // You might be wandering why we are storing the binding elements on
            // LinearElementEditor and passing them in, instead of calculating them
            // from the end points of the `linearElement` - this is to allow disabling
            // binding (which needs to happen at the point the user finishes moving
            // the point).
            const { startBindingElement, endBindingElement } = linearElementEditor;
            if (isBindingEnabled(appState) && isBindingElement(element)) {
                bindOrUnbindLinearElement(element, startBindingElement, endBindingElement);
            }
        }
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const targetPoint = clickedPointIndex > -1 &&
            rotate(element.x + element.points[clickedPointIndex][0], element.y + element.points[clickedPointIndex][1], cx, cy, element.angle);
        const nextSelectedPointsIndices = clickedPointIndex > -1 || event.shiftKey
            ? event.shiftKey ||
                linearElementEditor.selectedPointsIndices?.includes(clickedPointIndex)
                ? normalizeSelectedPoints([
                    ...(linearElementEditor.selectedPointsIndices || []),
                    clickedPointIndex,
                ])
                : [clickedPointIndex]
            : null;
        ret.linearElementEditor = {
            ...linearElementEditor,
            pointerDownState: {
                prevSelectedPointsIndices: linearElementEditor.selectedPointsIndices,
                lastClickedPoint: clickedPointIndex,
                origin: { x: scenePointer.x, y: scenePointer.y },
                segmentMidpoint: {
                    value: segmentMidpoint,
                    index: segmentMidpointIndex,
                    added: false,
                },
            },
            selectedPointsIndices: nextSelectedPointsIndices,
            pointerOffset: targetPoint
                ? {
                    x: scenePointer.x - targetPoint[0],
                    y: scenePointer.y - targetPoint[1],
                }
                : { x: 0, y: 0 },
        };
        return ret;
    }
    static arePointsEqual(point1, point2) {
        if (!point1 && !point2) {
            return true;
        }
        if (!point1 || !point2) {
            return false;
        }
        return arePointsEqual(point1, point2);
    }
    static handlePointerMove(event, scenePointerX, scenePointerY, appState) {
        if (!appState.editingLinearElement) {
            return null;
        }
        const { elementId, lastUncommittedPoint } = appState.editingLinearElement;
        const element = LinearElementEditor.getElement(elementId);
        if (!element) {
            return appState.editingLinearElement;
        }
        const { points } = element;
        const lastPoint = points[points.length - 1];
        if (!event.altKey) {
            if (lastPoint === lastUncommittedPoint) {
                LinearElementEditor.deletePoints(element, [points.length - 1]);
            }
            return {
                ...appState.editingLinearElement,
                lastUncommittedPoint: null,
            };
        }
        let newPoint;
        if (shouldRotateWithDiscreteAngle(event) && points.length >= 2) {
            const lastCommittedPoint = points[points.length - 2];
            const [width, height] = LinearElementEditor._getShiftLockedDelta(element, lastCommittedPoint, [scenePointerX, scenePointerY], event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize);
            newPoint = [
                width + lastCommittedPoint[0],
                height + lastCommittedPoint[1],
            ];
        }
        else {
            newPoint = LinearElementEditor.createPointAt(element, scenePointerX - appState.editingLinearElement.pointerOffset.x, scenePointerY - appState.editingLinearElement.pointerOffset.y, event[KEYS.CTRL_OR_CMD] ? null : appState.gridSize);
        }
        if (lastPoint === lastUncommittedPoint) {
            LinearElementEditor.movePoints(element, [
                {
                    index: element.points.length - 1,
                    point: newPoint,
                },
            ]);
        }
        else {
            LinearElementEditor.addPoints(element, appState, [{ point: newPoint }]);
        }
        return {
            ...appState.editingLinearElement,
            lastUncommittedPoint: element.points[element.points.length - 1],
        };
    }
    /** scene coords */
    static getPointGlobalCoordinates(element, point) {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        let { x, y } = element;
        [x, y] = rotate(x + point[0], y + point[1], cx, cy, element.angle);
        return [x, y];
    }
    /** scene coords */
    static getPointsGlobalCoordinates(element) {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        return element.points.map((point) => {
            let { x, y } = element;
            [x, y] = rotate(x + point[0], y + point[1], cx, cy, element.angle);
            return [x, y];
        });
    }
    static getPointAtIndexGlobalCoordinates(element, indexMaybeFromEnd) {
        const index = indexMaybeFromEnd < 0
            ? element.points.length + indexMaybeFromEnd
            : indexMaybeFromEnd;
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const point = element.points[index];
        const { x, y } = element;
        return point
            ? rotate(x + point[0], y + point[1], cx, cy, element.angle)
            : rotate(x, y, cx, cy, element.angle);
    }
    static pointFromAbsoluteCoords(element, absoluteCoords) {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const [x, y] = rotate(absoluteCoords[0], absoluteCoords[1], cx, cy, -element.angle);
        return [x - element.x, y - element.y];
    }
    static getPointIndexUnderCursor(element, zoom, x, y) {
        const pointHandles = LinearElementEditor.getPointsGlobalCoordinates(element);
        let idx = pointHandles.length;
        // loop from right to left because points on the right are rendered over
        // points on the left, thus should take precedence when clicking, if they
        // overlap
        while (--idx > -1) {
            const point = pointHandles[idx];
            if (distance2d(x, y, point[0], point[1]) * zoom.value <
                // +1px to account for outline stroke
                LinearElementEditor.POINT_HANDLE_SIZE + 1) {
                return idx;
            }
        }
        return -1;
    }
    static createPointAt(element, scenePointerX, scenePointerY, gridSize) {
        const pointerOnGrid = getGridPoint(scenePointerX, scenePointerY, gridSize);
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const [rotatedX, rotatedY] = rotate(pointerOnGrid[0], pointerOnGrid[1], cx, cy, -element.angle);
        return [rotatedX - element.x, rotatedY - element.y];
    }
    /**
     * Normalizes line points so that the start point is at [0,0]. This is
     * expected in various parts of the codebase. Also returns new x/y to account
     * for the potential normalization.
     */
    static getNormalizedPoints(element) {
        const { points } = element;
        const offsetX = points[0][0];
        const offsetY = points[0][1];
        return {
            points: points.map((point, _idx) => {
                return [point[0] - offsetX, point[1] - offsetY];
            }),
            x: element.x + offsetX,
            y: element.y + offsetY,
        };
    }
    // element-mutating methods
    // ---------------------------------------------------------------------------
    static normalizePoints(element) {
        mutateElement(element, LinearElementEditor.getNormalizedPoints(element));
    }
    static duplicateSelectedPoints(appState) {
        if (!appState.editingLinearElement) {
            return false;
        }
        const { selectedPointsIndices, elementId } = appState.editingLinearElement;
        const element = LinearElementEditor.getElement(elementId);
        if (!element || selectedPointsIndices === null) {
            return false;
        }
        const { points } = element;
        const nextSelectedIndices = [];
        let pointAddedToEnd = false;
        let indexCursor = -1;
        const nextPoints = points.reduce((acc, point, index) => {
            ++indexCursor;
            acc.push(point);
            const isSelected = selectedPointsIndices.includes(index);
            if (isSelected) {
                const nextPoint = points[index + 1];
                if (!nextPoint) {
                    pointAddedToEnd = true;
                }
                acc.push(nextPoint
                    ? [(point[0] + nextPoint[0]) / 2, (point[1] + nextPoint[1]) / 2]
                    : [point[0], point[1]]);
                nextSelectedIndices.push(indexCursor + 1);
                ++indexCursor;
            }
            return acc;
        }, []);
        mutateElement(element, { points: nextPoints });
        // temp hack to ensure the line doesn't move when adding point to the end,
        // potentially expanding the bounding box
        if (pointAddedToEnd) {
            const lastPoint = element.points[element.points.length - 1];
            LinearElementEditor.movePoints(element, [
                {
                    index: element.points.length - 1,
                    point: [lastPoint[0] + 30, lastPoint[1] + 30],
                },
            ]);
        }
        return {
            appState: {
                ...appState,
                editingLinearElement: {
                    ...appState.editingLinearElement,
                    selectedPointsIndices: nextSelectedIndices,
                },
            },
        };
    }
    static deletePoints(element, pointIndices) {
        let offsetX = 0;
        let offsetY = 0;
        const isDeletingOriginPoint = pointIndices.includes(0);
        // if deleting first point, make the next to be [0,0] and recalculate
        // positions of the rest with respect to it
        if (isDeletingOriginPoint) {
            const firstNonDeletedPoint = element.points.find((point, idx) => {
                return !pointIndices.includes(idx);
            });
            if (firstNonDeletedPoint) {
                offsetX = firstNonDeletedPoint[0];
                offsetY = firstNonDeletedPoint[1];
            }
        }
        const nextPoints = element.points.reduce((acc, point, idx) => {
            if (!pointIndices.includes(idx)) {
                acc.push(!acc.length ? [0, 0] : [point[0] - offsetX, point[1] - offsetY]);
            }
            return acc;
        }, []);
        LinearElementEditor._updatePoints(element, nextPoints, offsetX, offsetY);
    }
    static addPoints(element, appState, targetPoints) {
        const offsetX = 0;
        const offsetY = 0;
        const nextPoints = [...element.points, ...targetPoints.map((x) => x.point)];
        LinearElementEditor._updatePoints(element, nextPoints, offsetX, offsetY);
    }
    static movePoints(element, targetPoints, otherUpdates) {
        const { points } = element;
        // in case we're moving start point, instead of modifying its position
        // which would break the invariant of it being at [0,0], we move
        // all the other points in the opposite direction by delta to
        // offset it. We do the same with actual element.x/y position, so
        // this hacks are completely transparent to the user.
        let offsetX = 0;
        let offsetY = 0;
        const selectedOriginPoint = targetPoints.find(({ index }) => index === 0);
        if (selectedOriginPoint) {
            offsetX =
                selectedOriginPoint.point[0] + points[selectedOriginPoint.index][0];
            offsetY =
                selectedOriginPoint.point[1] + points[selectedOriginPoint.index][1];
        }
        const nextPoints = points.map((point, idx) => {
            const selectedPointData = targetPoints.find((p) => p.index === idx);
            if (selectedPointData) {
                if (selectedOriginPoint) {
                    return point;
                }
                const deltaX = selectedPointData.point[0] - points[selectedPointData.index][0];
                const deltaY = selectedPointData.point[1] - points[selectedPointData.index][1];
                return [point[0] + deltaX, point[1] + deltaY];
            }
            return offsetX || offsetY
                ? [point[0] - offsetX, point[1] - offsetY]
                : point;
        });
        LinearElementEditor._updatePoints(element, nextPoints, offsetX, offsetY, otherUpdates);
    }
    static shouldAddMidpoint(linearElementEditor, pointerCoords, appState) {
        const element = LinearElementEditor.getElement(linearElementEditor.elementId);
        if (!element) {
            return false;
        }
        const { segmentMidpoint } = linearElementEditor.pointerDownState;
        if (segmentMidpoint.added ||
            segmentMidpoint.value === null ||
            segmentMidpoint.index === null ||
            linearElementEditor.pointerDownState.origin === null) {
            return false;
        }
        const origin = linearElementEditor.pointerDownState.origin;
        const dist = distance2d(origin.x, origin.y, pointerCoords.x, pointerCoords.y);
        if (!appState.editingLinearElement &&
            dist < DRAGGING_THRESHOLD / appState.zoom.value) {
            return false;
        }
        return true;
    }
    static addMidpoint(linearElementEditor, pointerCoords, appState, snapToGrid) {
        const element = LinearElementEditor.getElement(linearElementEditor.elementId);
        if (!element) {
            return;
        }
        const { segmentMidpoint } = linearElementEditor.pointerDownState;
        const ret = {
            pointerDownState: linearElementEditor.pointerDownState,
            selectedPointsIndices: linearElementEditor.selectedPointsIndices,
        };
        const midpoint = LinearElementEditor.createPointAt(element, pointerCoords.x, pointerCoords.y, snapToGrid ? appState.gridSize : null);
        const points = [
            ...element.points.slice(0, segmentMidpoint.index),
            midpoint,
            ...element.points.slice(segmentMidpoint.index),
        ];
        mutateElement(element, {
            points,
        });
        ret.pointerDownState = {
            ...linearElementEditor.pointerDownState,
            segmentMidpoint: {
                ...linearElementEditor.pointerDownState.segmentMidpoint,
                added: true,
            },
            lastClickedPoint: segmentMidpoint.index,
        };
        ret.selectedPointsIndices = [segmentMidpoint.index];
        return ret;
    }
    static _updatePoints(element, nextPoints, offsetX, offsetY, otherUpdates) {
        const nextCoords = getElementPointsCoords(element, nextPoints);
        const prevCoords = getElementPointsCoords(element, element.points);
        const nextCenterX = (nextCoords[0] + nextCoords[2]) / 2;
        const nextCenterY = (nextCoords[1] + nextCoords[3]) / 2;
        const prevCenterX = (prevCoords[0] + prevCoords[2]) / 2;
        const prevCenterY = (prevCoords[1] + prevCoords[3]) / 2;
        const dX = prevCenterX - nextCenterX;
        const dY = prevCenterY - nextCenterY;
        const rotated = rotate(offsetX, offsetY, dX, dY, element.angle);
        mutateElement(element, {
            ...otherUpdates,
            points: nextPoints,
            x: element.x + rotated[0],
            y: element.y + rotated[1],
        });
    }
    static _getShiftLockedDelta(element, referencePoint, scenePointer, gridSize) {
        const referencePointCoords = LinearElementEditor.getPointGlobalCoordinates(element, referencePoint);
        const [gridX, gridY] = getGridPoint(scenePointer[0], scenePointer[1], gridSize);
        const { width, height } = getLockedLinearCursorAlignSize(referencePointCoords[0], referencePointCoords[1], gridX, gridY);
        return rotatePoint([width, height], [0, 0], -element.angle);
    }
    static getBoundTextElementPosition = (element, boundTextElement) => {
        const points = LinearElementEditor.getPointsGlobalCoordinates(element);
        if (points.length < 2) {
            mutateElement(boundTextElement, { isDeleted: true });
        }
        let x = 0;
        let y = 0;
        if (element.points.length % 2 === 1) {
            const index = Math.floor(element.points.length / 2);
            const midPoint = LinearElementEditor.getPointGlobalCoordinates(element, element.points[index]);
            x = midPoint[0] - boundTextElement.width / 2;
            y = midPoint[1] - boundTextElement.height / 2;
        }
        else {
            const index = element.points.length / 2 - 1;
            let midSegmentMidpoint = editorMidPointsCache.points[index];
            if (element.points.length === 2) {
                midSegmentMidpoint = centerPoint(points[0], points[1]);
            }
            if (!midSegmentMidpoint ||
                editorMidPointsCache.version !== element.version) {
                midSegmentMidpoint = LinearElementEditor.getSegmentMidPoint(element, points[index], points[index + 1], index + 1);
            }
            x = midSegmentMidpoint[0] - boundTextElement.width / 2;
            y = midSegmentMidpoint[1] - boundTextElement.height / 2;
        }
        return { x, y };
    };
    static getMinMaxXYWithBoundText = (element, elementBounds, boundTextElement) => {
        let [x1, y1, x2, y2] = elementBounds;
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        const { x: boundTextX1, y: boundTextY1 } = LinearElementEditor.getBoundTextElementPosition(element, boundTextElement);
        const boundTextX2 = boundTextX1 + boundTextElement.width;
        const boundTextY2 = boundTextY1 + boundTextElement.height;
        const topLeftRotatedPoint = rotatePoint([x1, y1], [cx, cy], element.angle);
        const topRightRotatedPoint = rotatePoint([x2, y1], [cx, cy], element.angle);
        const counterRotateBoundTextTopLeft = rotatePoint([boundTextX1, boundTextY1], [cx, cy], -element.angle);
        const counterRotateBoundTextTopRight = rotatePoint([boundTextX2, boundTextY1], [cx, cy], -element.angle);
        const counterRotateBoundTextBottomLeft = rotatePoint([boundTextX1, boundTextY2], [cx, cy], -element.angle);
        const counterRotateBoundTextBottomRight = rotatePoint([boundTextX2, boundTextY2], [cx, cy], -element.angle);
        if (topLeftRotatedPoint[0] < topRightRotatedPoint[0] &&
            topLeftRotatedPoint[1] >= topRightRotatedPoint[1]) {
            x1 = Math.min(x1, counterRotateBoundTextBottomLeft[0]);
            x2 = Math.max(x2, Math.max(counterRotateBoundTextTopRight[0], counterRotateBoundTextBottomRight[0]));
            y1 = Math.min(y1, counterRotateBoundTextTopLeft[1]);
            y2 = Math.max(y2, counterRotateBoundTextBottomRight[1]);
        }
        else if (topLeftRotatedPoint[0] >= topRightRotatedPoint[0] &&
            topLeftRotatedPoint[1] > topRightRotatedPoint[1]) {
            x1 = Math.min(x1, counterRotateBoundTextBottomRight[0]);
            x2 = Math.max(x2, Math.max(counterRotateBoundTextTopLeft[0], counterRotateBoundTextTopRight[0]));
            y1 = Math.min(y1, counterRotateBoundTextBottomLeft[1]);
            y2 = Math.max(y2, counterRotateBoundTextTopRight[1]);
        }
        else if (topLeftRotatedPoint[0] >= topRightRotatedPoint[0]) {
            x1 = Math.min(x1, counterRotateBoundTextTopRight[0]);
            x2 = Math.max(x2, counterRotateBoundTextBottomLeft[0]);
            y1 = Math.min(y1, counterRotateBoundTextBottomRight[1]);
            y2 = Math.max(y2, counterRotateBoundTextTopLeft[1]);
        }
        else if (topLeftRotatedPoint[1] <= topRightRotatedPoint[1]) {
            x1 = Math.min(x1, Math.min(counterRotateBoundTextTopRight[0], counterRotateBoundTextTopLeft[0]));
            x2 = Math.max(x2, counterRotateBoundTextBottomRight[0]);
            y1 = Math.min(y1, counterRotateBoundTextTopRight[1]);
            y2 = Math.max(y2, counterRotateBoundTextBottomLeft[1]);
        }
        return [x1, y1, x2, y2, cx, cy];
    };
    static getElementAbsoluteCoords = (element, includeBoundText = false) => {
        let coords;
        let x1;
        let y1;
        let x2;
        let y2;
        if (element.points.length < 2 || !ShapeCache.get(element)) {
            // XXX this is just a poor estimate and not very useful
            const { minX, minY, maxX, maxY } = element.points.reduce((limits, [x, y]) => {
                limits.minY = Math.min(limits.minY, y);
                limits.minX = Math.min(limits.minX, x);
                limits.maxX = Math.max(limits.maxX, x);
                limits.maxY = Math.max(limits.maxY, y);
                return limits;
            }, { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
            x1 = minX + element.x;
            y1 = minY + element.y;
            x2 = maxX + element.x;
            y2 = maxY + element.y;
        }
        else {
            const shape = ShapeCache.generateElementShape(element, null);
            // first element is always the curve
            const ops = getCurvePathOps(shape[0]);
            const [minX, minY, maxX, maxY] = getMinMaxXYFromCurvePathOps(ops);
            x1 = minX + element.x;
            y1 = minY + element.y;
            x2 = maxX + element.x;
            y2 = maxY + element.y;
        }
        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;
        coords = [x1, y1, x2, y2, cx, cy];
        if (!includeBoundText) {
            return coords;
        }
        const boundTextElement = getBoundTextElement(element);
        if (boundTextElement) {
            coords = LinearElementEditor.getMinMaxXYWithBoundText(element, [x1, y1, x2, y2], boundTextElement);
        }
        return coords;
    };
}
const normalizeSelectedPoints = (points) => {
    let nextPoints = [
        ...new Set(points.filter((p) => p !== null && p !== -1)),
    ];
    nextPoints = nextPoints.sort((a, b) => a - b);
    return nextPoints.length ? nextPoints : null;
};
