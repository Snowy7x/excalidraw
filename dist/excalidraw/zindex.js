import { bumpVersion } from "./element/mutateElement";
import { isFrameLikeElement } from "./element/typeChecks";
import { getElementsInGroup } from "./groups";
import { getSelectedElements } from "./scene";
import Scene from "./scene/Scene";
import { arrayToMap, findIndex, findLastIndex } from "./utils";
const isOfTargetFrame = (element, frameId) => {
    return element.frameId === frameId || element.id === frameId;
};
/**
 * Returns indices of elements to move based on selected elements.
 * Includes contiguous deleted elements that are between two selected elements,
 *  e.g.: [0 (selected), 1 (deleted), 2 (deleted), 3 (selected)]
 *
 * Specified elements (elementsToBeMoved) take precedence over
 * appState.selectedElementsIds
 */
const getIndicesToMove = (elements, appState, elementsToBeMoved) => {
    let selectedIndices = [];
    let deletedIndices = [];
    let includeDeletedIndex = null;
    let index = -1;
    const selectedElementIds = arrayToMap(elementsToBeMoved
        ? elementsToBeMoved
        : getSelectedElements(elements, appState, {
            includeBoundTextElement: true,
            includeElementsInFrames: true,
        }));
    while (++index < elements.length) {
        const element = elements[index];
        if (selectedElementIds.get(element.id)) {
            if (deletedIndices.length) {
                selectedIndices = selectedIndices.concat(deletedIndices);
                deletedIndices = [];
            }
            selectedIndices.push(index);
            includeDeletedIndex = index + 1;
        }
        else if (element.isDeleted && includeDeletedIndex === index) {
            includeDeletedIndex = index + 1;
            deletedIndices.push(index);
        }
        else {
            deletedIndices = [];
        }
    }
    return selectedIndices;
};
const toContiguousGroups = (array) => {
    let cursor = 0;
    return array.reduce((acc, value, index) => {
        if (index > 0 && array[index - 1] !== value - 1) {
            cursor = ++cursor;
        }
        (acc[cursor] || (acc[cursor] = [])).push(value);
        return acc;
    }, []);
};
/**
 * @returns index of target element, consindering tightly-bound elements
 * (currently non-linear elements bound to a container) as a one unit.
 * If no binding present, returns `undefined`.
 */
const getTargetIndexAccountingForBinding = (nextElement, elements, direction) => {
    if ("containerId" in nextElement && nextElement.containerId) {
        if (direction === "left") {
            const containerElement = Scene.getScene(nextElement).getElement(nextElement.containerId);
            if (containerElement) {
                return elements.indexOf(containerElement);
            }
        }
        else {
            return elements.indexOf(nextElement);
        }
    }
    else {
        const boundElementId = nextElement.boundElements?.find((binding) => binding.type !== "arrow")?.id;
        if (boundElementId) {
            if (direction === "left") {
                return elements.indexOf(nextElement);
            }
            const boundTextElement = Scene.getScene(nextElement).getElement(boundElementId);
            if (boundTextElement) {
                return elements.indexOf(boundTextElement);
            }
        }
    }
};
const getContiguousFrameRangeElements = (allElements, frameId) => {
    let rangeStart = -1;
    let rangeEnd = -1;
    allElements.forEach((element, index) => {
        if (isOfTargetFrame(element, frameId)) {
            if (rangeStart === -1) {
                rangeStart = index;
            }
            rangeEnd = index;
        }
    });
    if (rangeStart === -1) {
        return [];
    }
    return allElements.slice(rangeStart, rangeEnd + 1);
};
/**
 * Returns next candidate index that's available to be moved to. Currently that
 *  is a non-deleted element, and not inside a group (unless we're editing it).
 */
const getTargetIndex = (appState, elements, boundaryIndex, direction, 
/**
 * Frame id if moving frame children.
 * If whole frame (including all children) is being moved, supply `null`.
 */
containingFrame) => {
    const sourceElement = elements[boundaryIndex];
    const indexFilter = (element) => {
        if (element.isDeleted) {
            return false;
        }
        if (containingFrame) {
            return element.frameId === containingFrame;
        }
        // if we're editing group, find closest sibling irrespective of whether
        // there's a different-group element between them (for legacy reasons)
        if (appState.editingGroupId) {
            return element.groupIds.includes(appState.editingGroupId);
        }
        return true;
    };
    const candidateIndex = direction === "left"
        ? findLastIndex(elements, (el) => indexFilter(el), Math.max(0, boundaryIndex - 1))
        : findIndex(elements, (el) => indexFilter(el), boundaryIndex + 1);
    const nextElement = elements[candidateIndex];
    if (!nextElement) {
        return -1;
    }
    if (appState.editingGroupId) {
        if (
        // candidate element is a sibling in current editing group → return
        sourceElement?.groupIds.join("") === nextElement?.groupIds.join("")) {
            return (getTargetIndexAccountingForBinding(nextElement, elements, direction) ??
                candidateIndex);
        }
        else if (!nextElement?.groupIds.includes(appState.editingGroupId)) {
            // candidate element is outside current editing group → prevent
            return -1;
        }
    }
    if (!containingFrame &&
        (nextElement.frameId || isFrameLikeElement(nextElement))) {
        const frameElements = getContiguousFrameRangeElements(elements, nextElement.frameId || nextElement.id);
        return direction === "left"
            ? elements.indexOf(frameElements[0])
            : elements.indexOf(frameElements[frameElements.length - 1]);
    }
    if (!nextElement.groupIds.length) {
        return (getTargetIndexAccountingForBinding(nextElement, elements, direction) ??
            candidateIndex);
    }
    const siblingGroupId = appState.editingGroupId
        ? nextElement.groupIds[nextElement.groupIds.indexOf(appState.editingGroupId) - 1]
        : nextElement.groupIds[nextElement.groupIds.length - 1];
    const elementsInSiblingGroup = getElementsInGroup(elements, siblingGroupId);
    if (elementsInSiblingGroup.length) {
        // assumes getElementsInGroup() returned elements are sorted
        // by zIndex (ascending)
        return direction === "left"
            ? elements.indexOf(elementsInSiblingGroup[0])
            : elements.indexOf(elementsInSiblingGroup[elementsInSiblingGroup.length - 1]);
    }
    return candidateIndex;
};
const getTargetElementsMap = (elements, indices) => {
    return indices.reduce((acc, index) => {
        const element = elements[index];
        acc[element.id] = element;
        return acc;
    }, {});
};
const shiftElementsByOne = (elements, appState, direction) => {
    const indicesToMove = getIndicesToMove(elements, appState);
    const targetElementsMap = getTargetElementsMap(elements, indicesToMove);
    let groupedIndices = toContiguousGroups(indicesToMove);
    if (direction === "right") {
        groupedIndices = groupedIndices.reverse();
    }
    const selectedFrames = new Set(indicesToMove
        .filter((idx) => isFrameLikeElement(elements[idx]))
        .map((idx) => elements[idx].id));
    groupedIndices.forEach((indices, i) => {
        const leadingIndex = indices[0];
        const trailingIndex = indices[indices.length - 1];
        const boundaryIndex = direction === "left" ? leadingIndex : trailingIndex;
        const containingFrame = indices.some((idx) => {
            const el = elements[idx];
            return el.frameId && selectedFrames.has(el.frameId);
        })
            ? null
            : elements[boundaryIndex]?.frameId;
        const targetIndex = getTargetIndex(appState, elements, boundaryIndex, direction, containingFrame);
        if (targetIndex === -1 || boundaryIndex === targetIndex) {
            return;
        }
        const leadingElements = direction === "left"
            ? elements.slice(0, targetIndex)
            : elements.slice(0, leadingIndex);
        const targetElements = elements.slice(leadingIndex, trailingIndex + 1);
        const displacedElements = direction === "left"
            ? elements.slice(targetIndex, leadingIndex)
            : elements.slice(trailingIndex + 1, targetIndex + 1);
        const trailingElements = direction === "left"
            ? elements.slice(trailingIndex + 1)
            : elements.slice(targetIndex + 1);
        elements =
            direction === "left"
                ? [
                    ...leadingElements,
                    ...targetElements,
                    ...displacedElements,
                    ...trailingElements,
                ]
                : [
                    ...leadingElements,
                    ...displacedElements,
                    ...targetElements,
                    ...trailingElements,
                ];
    });
    return elements.map((element) => {
        if (targetElementsMap[element.id]) {
            return bumpVersion(element);
        }
        return element;
    });
};
const shiftElementsToEnd = (elements, appState, direction, containingFrame, elementsToBeMoved) => {
    const indicesToMove = getIndicesToMove(elements, appState, elementsToBeMoved);
    const targetElementsMap = getTargetElementsMap(elements, indicesToMove);
    const displacedElements = [];
    let leadingIndex;
    let trailingIndex;
    if (direction === "left") {
        if (containingFrame) {
            leadingIndex = findIndex(elements, (el) => isOfTargetFrame(el, containingFrame));
        }
        else if (appState.editingGroupId) {
            const groupElements = getElementsInGroup(elements, appState.editingGroupId);
            if (!groupElements.length) {
                return elements;
            }
            leadingIndex = elements.indexOf(groupElements[0]);
        }
        else {
            leadingIndex = 0;
        }
        trailingIndex = indicesToMove[indicesToMove.length - 1];
    }
    else {
        if (containingFrame) {
            trailingIndex = findLastIndex(elements, (el) => isOfTargetFrame(el, containingFrame));
        }
        else if (appState.editingGroupId) {
            const groupElements = getElementsInGroup(elements, appState.editingGroupId);
            if (!groupElements.length) {
                return elements;
            }
            trailingIndex = elements.indexOf(groupElements[groupElements.length - 1]);
        }
        else {
            trailingIndex = elements.length - 1;
        }
        leadingIndex = indicesToMove[0];
    }
    if (leadingIndex === -1) {
        leadingIndex = 0;
    }
    for (let index = leadingIndex; index < trailingIndex + 1; index++) {
        if (!indicesToMove.includes(index)) {
            displacedElements.push(elements[index]);
        }
    }
    const targetElements = Object.values(targetElementsMap).map((element) => {
        return bumpVersion(element);
    });
    const leadingElements = elements.slice(0, leadingIndex);
    const trailingElements = elements.slice(trailingIndex + 1);
    return direction === "left"
        ? [
            ...leadingElements,
            ...targetElements,
            ...displacedElements,
            ...trailingElements,
        ]
        : [
            ...leadingElements,
            ...displacedElements,
            ...targetElements,
            ...trailingElements,
        ];
};
function shiftElementsAccountingForFrames(allElements, appState, direction, shiftFunction) {
    const elementsToMove = arrayToMap(getSelectedElements(allElements, appState, {
        includeBoundTextElement: true,
        includeElementsInFrames: true,
    }));
    const frameAwareContiguousElementsToMove = { regularElements: [], frameChildren: new Map() };
    const fullySelectedFrames = new Set();
    for (const element of allElements) {
        if (elementsToMove.has(element.id) && isFrameLikeElement(element)) {
            fullySelectedFrames.add(element.id);
        }
    }
    for (const element of allElements) {
        if (elementsToMove.has(element.id)) {
            if (isFrameLikeElement(element) ||
                (element.frameId && fullySelectedFrames.has(element.frameId))) {
                frameAwareContiguousElementsToMove.regularElements.push(element);
            }
            else if (!element.frameId) {
                frameAwareContiguousElementsToMove.regularElements.push(element);
            }
            else {
                const frameChildren = frameAwareContiguousElementsToMove.frameChildren.get(element.frameId) || [];
                frameChildren.push(element);
                frameAwareContiguousElementsToMove.frameChildren.set(element.frameId, frameChildren);
            }
        }
    }
    let nextElements = allElements;
    const frameChildrenSets = Array.from(frameAwareContiguousElementsToMove.frameChildren.entries());
    for (const [frameId, children] of frameChildrenSets) {
        nextElements = shiftFunction(allElements, appState, direction, frameId, children);
    }
    return shiftFunction(nextElements, appState, direction, null, frameAwareContiguousElementsToMove.regularElements);
}
// public API
// -----------------------------------------------------------------------------
export const moveOneLeft = (allElements, appState) => {
    return shiftElementsByOne(allElements, appState, "left");
};
export const moveOneRight = (allElements, appState) => {
    return shiftElementsByOne(allElements, appState, "right");
};
export const moveAllLeft = (allElements, appState) => {
    return shiftElementsAccountingForFrames(allElements, appState, "left", shiftElementsToEnd);
};
export const moveAllRight = (allElements, appState) => {
    return shiftElementsAccountingForFrames(allElements, appState, "right", shiftElementsToEnd);
};
