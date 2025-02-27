import { jsx as _jsx } from "react/jsx-runtime";
import { KEYS } from "../keys";
import { t } from "../i18n";
import { arrayToMap, getShortcutKey } from "../utils";
import { register } from "./register";
import { UngroupIcon, GroupIcon } from "../components/icons";
import { newElementWith } from "../element/mutateElement";
import { isSomeElementSelected } from "../scene";
import { getSelectedGroupIds, selectGroup, selectGroupsForSelectedElements, getElementsInGroup, addToGroup, removeFromSelectedGroups, isElementInGroup, } from "../groups";
import { getNonDeletedElements } from "../element";
import { randomId } from "../random";
import { ToolButton } from "../components/ToolButton";
import { isBoundToContainer } from "../element/typeChecks";
import { getElementsInResizingFrame, getFrameLikeElements, groupByFrameLikes, removeElementsFromFrame, replaceAllElementsInFrame, } from "../frame";
const allElementsInSameGroup = (elements) => {
    if (elements.length >= 2) {
        const groupIds = elements[0].groupIds;
        for (const groupId of groupIds) {
            if (elements.reduce((acc, element) => acc && isElementInGroup(element, groupId), true)) {
                return true;
            }
        }
    }
    return false;
};
const enableActionGroup = (elements, appState, app) => {
    const selectedElements = app.scene.getSelectedElements({
        selectedElementIds: appState.selectedElementIds,
        includeBoundTextElement: true,
    });
    return (selectedElements.length >= 2 && !allElementsInSameGroup(selectedElements));
};
export const actionGroup = register({
    name: "group",
    trackEvent: { category: "element" },
    perform: (elements, appState, _, app) => {
        const selectedElements = app.scene.getSelectedElements({
            selectedElementIds: appState.selectedElementIds,
            includeBoundTextElement: true,
        });
        if (selectedElements.length < 2) {
            // nothing to group
            return { appState, elements, commitToHistory: false };
        }
        // if everything is already grouped into 1 group, there is nothing to do
        const selectedGroupIds = getSelectedGroupIds(appState);
        if (selectedGroupIds.length === 1) {
            const selectedGroupId = selectedGroupIds[0];
            const elementIdsInGroup = new Set(getElementsInGroup(elements, selectedGroupId).map((element) => element.id));
            const selectedElementIds = new Set(selectedElements.map((element) => element.id));
            const combinedSet = new Set([
                ...Array.from(elementIdsInGroup),
                ...Array.from(selectedElementIds),
            ]);
            if (combinedSet.size === elementIdsInGroup.size) {
                // no incremental ids in the selected ids
                return { appState, elements, commitToHistory: false };
            }
        }
        let nextElements = [...elements];
        // this includes the case where we are grouping elements inside a frame
        // and elements outside that frame
        const groupingElementsFromDifferentFrames = new Set(selectedElements.map((element) => element.frameId)).size > 1;
        // when it happens, we want to remove elements that are in the frame
        // and are going to be grouped from the frame (mouthful, I know)
        if (groupingElementsFromDifferentFrames) {
            const frameElementsMap = groupByFrameLikes(selectedElements);
            frameElementsMap.forEach((elementsInFrame, frameId) => {
                nextElements = removeElementsFromFrame(nextElements, elementsInFrame, appState);
            });
        }
        const newGroupId = randomId();
        const selectElementIds = arrayToMap(selectedElements);
        nextElements = nextElements.map((element) => {
            if (!selectElementIds.get(element.id)) {
                return element;
            }
            return newElementWith(element, {
                groupIds: addToGroup(element.groupIds, newGroupId, appState.editingGroupId),
            });
        });
        // keep the z order within the group the same, but move them
        // to the z order of the highest element in the layer stack
        const elementsInGroup = getElementsInGroup(nextElements, newGroupId);
        const lastElementInGroup = elementsInGroup[elementsInGroup.length - 1];
        const lastGroupElementIndex = nextElements.lastIndexOf(lastElementInGroup);
        const elementsAfterGroup = nextElements.slice(lastGroupElementIndex + 1);
        const elementsBeforeGroup = nextElements
            .slice(0, lastGroupElementIndex)
            .filter((updatedElement) => !isElementInGroup(updatedElement, newGroupId));
        nextElements = [
            ...elementsBeforeGroup,
            ...elementsInGroup,
            ...elementsAfterGroup,
        ];
        return {
            appState: {
                ...appState,
                ...selectGroup(newGroupId, { ...appState, selectedGroupIds: {} }, getNonDeletedElements(nextElements)),
            },
            elements: nextElements,
            commitToHistory: true,
        };
    },
    contextItemLabel: "labels.group",
    predicate: (elements, appState, _, app) => enableActionGroup(elements, appState, app),
    keyTest: (event) => !event.shiftKey && event[KEYS.CTRL_OR_CMD] && event.key === KEYS.G,
    PanelComponent: ({ elements, appState, updateData, app }) => (_jsx(ToolButton, { hidden: !enableActionGroup(elements, appState, app), type: "button", icon: _jsx(GroupIcon, { theme: appState.theme }), onClick: () => updateData(null), title: `${t("labels.group")} — ${getShortcutKey("CtrlOrCmd+G")}`, "aria-label": t("labels.group"), visible: isSomeElementSelected(getNonDeletedElements(elements), appState) })),
});
export const actionUngroup = register({
    name: "ungroup",
    trackEvent: { category: "element" },
    perform: (elements, appState, _, app) => {
        const groupIds = getSelectedGroupIds(appState);
        if (groupIds.length === 0) {
            return { appState, elements, commitToHistory: false };
        }
        let nextElements = [...elements];
        const boundTextElementIds = [];
        nextElements = nextElements.map((element) => {
            if (isBoundToContainer(element)) {
                boundTextElementIds.push(element.id);
            }
            const nextGroupIds = removeFromSelectedGroups(element.groupIds, appState.selectedGroupIds);
            if (nextGroupIds.length === element.groupIds.length) {
                return element;
            }
            return newElementWith(element, {
                groupIds: nextGroupIds,
            });
        });
        const updateAppState = selectGroupsForSelectedElements(appState, getNonDeletedElements(nextElements), appState, null);
        const selectedElements = app.scene.getSelectedElements(appState);
        const selectedElementFrameIds = new Set(selectedElements
            .filter((element) => element.frameId)
            .map((element) => element.frameId));
        const targetFrames = getFrameLikeElements(elements).filter((frame) => selectedElementFrameIds.has(frame.id));
        targetFrames.forEach((frame) => {
            if (frame) {
                nextElements = replaceAllElementsInFrame(nextElements, getElementsInResizingFrame(nextElements, frame, appState), frame, appState);
            }
        });
        // remove binded text elements from selection
        updateAppState.selectedElementIds = Object.entries(updateAppState.selectedElementIds).reduce((acc, [id, selected]) => {
            if (selected && !boundTextElementIds.includes(id)) {
                acc[id] = true;
            }
            return acc;
        }, {});
        return {
            appState: { ...appState, ...updateAppState },
            elements: nextElements,
            commitToHistory: true,
        };
    },
    keyTest: (event) => event.shiftKey &&
        event[KEYS.CTRL_OR_CMD] &&
        event.key === KEYS.G.toUpperCase(),
    contextItemLabel: "labels.ungroup",
    predicate: (elements, appState) => getSelectedGroupIds(appState).length > 0,
    PanelComponent: ({ elements, appState, updateData }) => (_jsx(ToolButton, { type: "button", hidden: getSelectedGroupIds(appState).length === 0, icon: _jsx(UngroupIcon, { theme: appState.theme }), onClick: () => updateData(null), title: `${t("labels.ungroup")} — ${getShortcutKey("CtrlOrCmd+Shift+G")}`, "aria-label": t("labels.ungroup"), visible: isSomeElementSelected(getNonDeletedElements(elements), appState) })),
});
