import { jsx as _jsx } from "react/jsx-runtime";
import { KEYS } from "../keys";
import { register } from "./register";
import { duplicateElement, getNonDeletedElements } from "../element";
import { isSomeElementSelected } from "../scene";
import { ToolButton } from "../components/ToolButton";
import { t } from "../i18n";
import { arrayToMap, getShortcutKey } from "../utils";
import { LinearElementEditor } from "../element/linearElementEditor";
import { selectGroupsForSelectedElements, getSelectedGroupForElement, getElementsInGroup, } from "../groups";
import { fixBindingsAfterDuplication } from "../element/binding";
import { GRID_SIZE } from "../constants";
import { bindTextToShapeAfterDuplication, getBoundTextElement, } from "../element/textElement";
import { isBoundToContainer, isFrameLikeElement } from "../element/typeChecks";
import { normalizeElementOrder } from "../element/sortElements";
import { DuplicateIcon } from "../components/icons";
import { bindElementsToFramesAfterDuplication, getFrameChildren, } from "../frame";
import { excludeElementsInFramesFromSelection, getSelectedElements, } from "../scene/selection";
export const actionDuplicateSelection = register({
    name: "duplicateSelection",
    trackEvent: { category: "element" },
    perform: (elements, appState) => {
        // duplicate selected point(s) if editing a line
        if (appState.editingLinearElement) {
            const ret = LinearElementEditor.duplicateSelectedPoints(appState);
            if (!ret) {
                return false;
            }
            return {
                elements,
                appState: ret.appState,
                commitToHistory: true,
            };
        }
        return {
            ...duplicateElements(elements, appState),
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.duplicateSelection",
    keyTest: (event) => event[KEYS.CTRL_OR_CMD] && event.key === KEYS.D,
    PanelComponent: ({ elements, appState, updateData }) => (_jsx(ToolButton, { type: "button", icon: DuplicateIcon, title: `${t("labels.duplicateSelection")} — ${getShortcutKey("CtrlOrCmd+D")}`, "aria-label": t("labels.duplicateSelection"), onClick: () => updateData(null), visible: isSomeElementSelected(getNonDeletedElements(elements), appState) })),
});
const duplicateElements = (elements, appState) => {
    // ---------------------------------------------------------------------------
    // step (1)
    const sortedElements = normalizeElementOrder(elements);
    const groupIdMap = new Map();
    const newElements = [];
    const oldElements = [];
    const oldIdToDuplicatedId = new Map();
    const duplicateAndOffsetElement = (element) => {
        const newElement = duplicateElement(appState.editingGroupId, groupIdMap, element, {
            x: element.x + GRID_SIZE / 2,
            y: element.y + GRID_SIZE / 2,
        });
        oldIdToDuplicatedId.set(element.id, newElement.id);
        oldElements.push(element);
        newElements.push(newElement);
        return newElement;
    };
    const idsOfElementsToDuplicate = arrayToMap(getSelectedElements(sortedElements, appState, {
        includeBoundTextElement: true,
        includeElementsInFrames: true,
    }));
    // Ids of elements that have already been processed so we don't push them
    // into the array twice if we end up backtracking when retrieving
    // discontiguous group of elements (can happen due to a bug, or in edge
    // cases such as a group containing deleted elements which were not selected).
    //
    // This is not enough to prevent duplicates, so we do a second loop afterwards
    // to remove them.
    //
    // For convenience we mark even the newly created ones even though we don't
    // loop over them.
    const processedIds = new Map();
    const markAsProcessed = (elements) => {
        for (const element of elements) {
            processedIds.set(element.id, true);
        }
        return elements;
    };
    const elementsWithClones = [];
    let index = -1;
    while (++index < sortedElements.length) {
        const element = sortedElements[index];
        if (processedIds.get(element.id)) {
            continue;
        }
        const boundTextElement = getBoundTextElement(element);
        const isElementAFrameLike = isFrameLikeElement(element);
        if (idsOfElementsToDuplicate.get(element.id)) {
            // if a group or a container/bound-text or frame, duplicate atomically
            if (element.groupIds.length || boundTextElement || isElementAFrameLike) {
                const groupId = getSelectedGroupForElement(appState, element);
                if (groupId) {
                    // TODO:
                    // remove `.flatMap...`
                    // if the elements in a frame are grouped when the frame is grouped
                    const groupElements = getElementsInGroup(sortedElements, groupId).flatMap((element) => isFrameLikeElement(element)
                        ? [...getFrameChildren(elements, element.id), element]
                        : [element]);
                    elementsWithClones.push(...markAsProcessed([
                        ...groupElements,
                        ...groupElements.map((element) => duplicateAndOffsetElement(element)),
                    ]));
                    continue;
                }
                if (boundTextElement) {
                    elementsWithClones.push(...markAsProcessed([
                        element,
                        boundTextElement,
                        duplicateAndOffsetElement(element),
                        duplicateAndOffsetElement(boundTextElement),
                    ]));
                    continue;
                }
                if (isElementAFrameLike) {
                    const elementsInFrame = getFrameChildren(sortedElements, element.id);
                    elementsWithClones.push(...markAsProcessed([
                        ...elementsInFrame,
                        element,
                        ...elementsInFrame.map((e) => duplicateAndOffsetElement(e)),
                        duplicateAndOffsetElement(element),
                    ]));
                    continue;
                }
            }
            // since elements in frames have a lower z-index than the frame itself,
            // they will be looped first and if their frames are selected as well,
            // they will have been copied along with the frame atomically in the
            // above branch, so we must skip those elements here
            //
            // now, for elements do not belong any frames or elements whose frames
            // are selected (or elements that are left out from the above
            // steps for whatever reason) we (should at least) duplicate them here
            if (!element.frameId || !idsOfElementsToDuplicate.has(element.frameId)) {
                elementsWithClones.push(...markAsProcessed([element, duplicateAndOffsetElement(element)]));
            }
        }
        else {
            elementsWithClones.push(...markAsProcessed([element]));
        }
    }
    // step (2)
    // second pass to remove duplicates. We loop from the end as it's likelier
    // that the last elements are in the correct order (contiguous or otherwise).
    // Thus we need to reverse as the last step (3).
    const finalElementsReversed = [];
    const finalElementIds = new Map();
    index = elementsWithClones.length;
    while (--index >= 0) {
        const element = elementsWithClones[index];
        if (!finalElementIds.get(element.id)) {
            finalElementIds.set(element.id, true);
            finalElementsReversed.push(element);
        }
    }
    // step (3)
    const finalElements = finalElementsReversed.reverse();
    // ---------------------------------------------------------------------------
    bindTextToShapeAfterDuplication(elementsWithClones, oldElements, oldIdToDuplicatedId);
    fixBindingsAfterDuplication(elementsWithClones, oldElements, oldIdToDuplicatedId);
    bindElementsToFramesAfterDuplication(finalElements, oldElements, oldIdToDuplicatedId);
    const nextElementsToSelect = excludeElementsInFramesFromSelection(newElements);
    return {
        elements: finalElements,
        appState: {
            ...appState,
            ...selectGroupsForSelectedElements({
                editingGroupId: appState.editingGroupId,
                selectedElementIds: nextElementsToSelect.reduce((acc, element) => {
                    if (!isBoundToContainer(element)) {
                        acc[element.id] = true;
                    }
                    return acc;
                }, {}),
            }, getNonDeletedElements(finalElements), appState, null),
        },
    };
};
