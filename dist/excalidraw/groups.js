import { getSelectedElements } from "./scene";
import { getBoundTextElement } from "./element/textElement";
import { makeNextSelectedElementIds } from "./scene/selection";
export const selectGroup = (groupId, appState, elements) => {
    const elementsInGroup = elements.reduce((acc, element) => {
        if (element.groupIds.includes(groupId)) {
            acc[element.id] = true;
        }
        return acc;
    }, {});
    if (Object.keys(elementsInGroup).length < 2) {
        if (appState.selectedGroupIds[groupId] ||
            appState.editingGroupId === groupId) {
            return {
                selectedElementIds: appState.selectedElementIds,
                selectedGroupIds: { ...appState.selectedGroupIds, [groupId]: false },
                editingGroupId: null,
            };
        }
        return appState;
    }
    return {
        editingGroupId: appState.editingGroupId,
        selectedGroupIds: { ...appState.selectedGroupIds, [groupId]: true },
        selectedElementIds: {
            ...appState.selectedElementIds,
            ...elementsInGroup,
        },
    };
};
export const selectGroupsForSelectedElements = (function () {
    let lastSelectedElements = null;
    let lastElements = null;
    let lastReturnValue = null;
    const _selectGroups = (selectedElements, elements, appState, prevAppState) => {
        if (lastReturnValue !== undefined &&
            elements === lastElements &&
            selectedElements === lastSelectedElements &&
            appState.editingGroupId === lastReturnValue?.editingGroupId) {
            return lastReturnValue;
        }
        const selectedGroupIds = {};
        // Gather all the groups withing selected elements
        for (const selectedElement of selectedElements) {
            let groupIds = selectedElement.groupIds;
            if (appState.editingGroupId) {
                // handle the case where a group is nested within a group
                const indexOfEditingGroup = groupIds.indexOf(appState.editingGroupId);
                if (indexOfEditingGroup > -1) {
                    groupIds = groupIds.slice(0, indexOfEditingGroup);
                }
            }
            if (groupIds.length > 0) {
                const lastSelectedGroup = groupIds[groupIds.length - 1];
                selectedGroupIds[lastSelectedGroup] = true;
            }
        }
        // Gather all the elements within selected groups
        const groupElementsIndex = {};
        const selectedElementIdsInGroups = elements.reduce((acc, element) => {
            const groupId = element.groupIds.find((id) => selectedGroupIds[id]);
            if (groupId) {
                acc[element.id] = true;
                // Populate the index
                if (!Array.isArray(groupElementsIndex[groupId])) {
                    groupElementsIndex[groupId] = [element.id];
                }
                else {
                    groupElementsIndex[groupId].push(element.id);
                }
            }
            return acc;
        }, {});
        for (const groupId of Object.keys(groupElementsIndex)) {
            // If there is one element in the group, and the group is selected or it's being edited, it's not a group
            if (groupElementsIndex[groupId].length < 2) {
                if (selectedGroupIds[groupId]) {
                    selectedGroupIds[groupId] = false;
                }
            }
        }
        lastElements = elements;
        lastSelectedElements = selectedElements;
        lastReturnValue = {
            editingGroupId: appState.editingGroupId,
            selectedGroupIds,
            selectedElementIds: makeNextSelectedElementIds({
                ...appState.selectedElementIds,
                ...selectedElementIdsInGroups,
            }, prevAppState),
        };
        return lastReturnValue;
    };
    /**
     * When you select an element, you often want to actually select the whole group it's in, unless
     * you're currently editing that group.
     */
    const selectGroupsForSelectedElements = (appState, elements, prevAppState, 
    /**
     * supply null in cases where you don't have access to App instance and
     * you don't care about optimizing selectElements retrieval
     */
    app) => {
        const selectedElements = app
            ? app.scene.getSelectedElements({
                selectedElementIds: appState.selectedElementIds,
                // supplying elements explicitly in case we're passed non-state elements
                elements,
            })
            : getSelectedElements(elements, appState);
        if (!selectedElements.length) {
            return {
                selectedGroupIds: {},
                editingGroupId: null,
                selectedElementIds: makeNextSelectedElementIds(appState.selectedElementIds, prevAppState),
            };
        }
        return _selectGroups(selectedElements, elements, appState, prevAppState);
    };
    selectGroupsForSelectedElements.clearCache = () => {
        lastElements = null;
        lastSelectedElements = null;
        lastReturnValue = null;
    };
    return selectGroupsForSelectedElements;
})();
/**
 * If the element's group is selected, don't render an individual
 * selection border around it.
 */
export const isSelectedViaGroup = (appState, element) => getSelectedGroupForElement(appState, element) != null;
export const getSelectedGroupForElement = (appState, element) => element.groupIds
    .filter((groupId) => groupId !== appState.editingGroupId)
    .find((groupId) => appState.selectedGroupIds[groupId]);
export const getSelectedGroupIds = (appState) => Object.entries(appState.selectedGroupIds)
    .filter(([groupId, isSelected]) => isSelected)
    .map(([groupId, isSelected]) => groupId);
// given a list of elements, return the the actual group ids that should be selected
// or used to update the elements
export const selectGroupsFromGivenElements = (elements, appState) => {
    let nextAppState = {
        ...appState,
        selectedGroupIds: {},
    };
    for (const element of elements) {
        let groupIds = element.groupIds;
        if (appState.editingGroupId) {
            const indexOfEditingGroup = groupIds.indexOf(appState.editingGroupId);
            if (indexOfEditingGroup > -1) {
                groupIds = groupIds.slice(0, indexOfEditingGroup);
            }
        }
        if (groupIds.length > 0) {
            const groupId = groupIds[groupIds.length - 1];
            nextAppState = {
                ...nextAppState,
                ...selectGroup(groupId, nextAppState, elements),
            };
        }
    }
    return nextAppState.selectedGroupIds;
};
export const editGroupForSelectedElement = (appState, element) => {
    return {
        ...appState,
        editingGroupId: element.groupIds.length ? element.groupIds[0] : null,
        selectedGroupIds: {},
        selectedElementIds: {
            [element.id]: true,
        },
    };
};
export const isElementInGroup = (element, groupId) => element.groupIds.includes(groupId);
export const getElementsInGroup = (elements, groupId) => elements.filter((element) => isElementInGroup(element, groupId));
export const getSelectedGroupIdForElement = (element, selectedGroupIds) => element.groupIds.find((groupId) => selectedGroupIds[groupId]);
export const getNewGroupIdsForDuplication = (groupIds, editingGroupId, mapper) => {
    const copy = [...groupIds];
    const positionOfEditingGroupId = editingGroupId
        ? groupIds.indexOf(editingGroupId)
        : -1;
    const endIndex = positionOfEditingGroupId > -1 ? positionOfEditingGroupId : groupIds.length;
    for (let index = 0; index < endIndex; index++) {
        copy[index] = mapper(copy[index]);
    }
    return copy;
};
export const addToGroup = (prevGroupIds, newGroupId, editingGroupId) => {
    // insert before the editingGroupId, or push to the end.
    const groupIds = [...prevGroupIds];
    const positionOfEditingGroupId = editingGroupId
        ? groupIds.indexOf(editingGroupId)
        : -1;
    const positionToInsert = positionOfEditingGroupId > -1 ? positionOfEditingGroupId : groupIds.length;
    groupIds.splice(positionToInsert, 0, newGroupId);
    return groupIds;
};
export const removeFromSelectedGroups = (groupIds, selectedGroupIds) => groupIds.filter((groupId) => !selectedGroupIds[groupId]);
export const getMaximumGroups = (elements) => {
    const groups = new Map();
    elements.forEach((element) => {
        const groupId = element.groupIds.length === 0
            ? element.id
            : element.groupIds[element.groupIds.length - 1];
        const currentGroupMembers = groups.get(groupId) || [];
        // Include bound text if present when grouping
        const boundTextElement = getBoundTextElement(element);
        if (boundTextElement) {
            currentGroupMembers.push(boundTextElement);
        }
        groups.set(groupId, [...currentGroupMembers, element]);
    });
    return Array.from(groups.values());
};
export const elementsAreInSameGroup = (elements) => {
    const allGroups = elements.flatMap((element) => element.groupIds);
    const groupCount = new Map();
    let maxGroup = 0;
    for (const group of allGroups) {
        groupCount.set(group, (groupCount.get(group) ?? 0) + 1);
        if (groupCount.get(group) > maxGroup) {
            maxGroup = groupCount.get(group);
        }
    }
    return maxGroup === elements.length;
};
