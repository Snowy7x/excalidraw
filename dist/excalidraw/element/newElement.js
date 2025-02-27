import { arrayToMap, getFontString, getUpdatedTimestamp, isTestEnv, } from "../utils";
import { randomInteger, randomId } from "../random";
import { bumpVersion, newElementWith } from "./mutateElement";
import { getNewGroupIdsForDuplication } from "../groups";
import { getElementAbsoluteCoords } from ".";
import { adjustXYWithRotation } from "../math";
import { getResizedElementAbsoluteCoords } from "./bounds";
import { getContainerElement, measureText, normalizeText, wrapText, getBoundTextMaxWidth, getDefaultLineHeight, } from "./textElement";
import { DEFAULT_ELEMENT_PROPS, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, DEFAULT_TEXT_ALIGN, DEFAULT_VERTICAL_ALIGN, VERTICAL_ALIGN, } from "../constants";
const _newElementBase = (type, { x, y, strokeColor = DEFAULT_ELEMENT_PROPS.strokeColor, backgroundColor = DEFAULT_ELEMENT_PROPS.backgroundColor, fillStyle = DEFAULT_ELEMENT_PROPS.fillStyle, strokeWidth = DEFAULT_ELEMENT_PROPS.strokeWidth, strokeStyle = DEFAULT_ELEMENT_PROPS.strokeStyle, roughness = DEFAULT_ELEMENT_PROPS.roughness, opacity = DEFAULT_ELEMENT_PROPS.opacity, width = 0, height = 0, angle = 0, groupIds = [], frameId = null, roundness = null, boundElements = null, link = null, locked = DEFAULT_ELEMENT_PROPS.locked, ...rest }) => {
    // assign type to guard against excess properties
    const element = {
        id: rest.id || randomId(),
        type,
        x,
        y,
        width,
        height,
        angle,
        strokeColor,
        backgroundColor,
        fillStyle,
        strokeWidth,
        strokeStyle,
        roughness,
        opacity,
        groupIds,
        frameId,
        roundness,
        seed: rest.seed ?? randomInteger(),
        version: rest.version || 1,
        versionNonce: rest.versionNonce ?? 0,
        isDeleted: false,
        boundElements,
        updated: getUpdatedTimestamp(),
        link,
        locked,
    };
    return element;
};
export const newElement = (opts) => _newElementBase(opts.type, opts);
export const newEmbeddableElement = (opts) => {
    return _newElementBase("embeddable", opts);
};
export const newIframeElement = (opts) => {
    return {
        ..._newElementBase("iframe", opts),
    };
};
export const newFrameElement = (opts) => {
    const frameElement = newElementWith({
        ..._newElementBase("frame", opts),
        type: "frame",
        name: opts?.name || null,
    }, {});
    return frameElement;
};
export const newMagicFrameElement = (opts) => {
    const frameElement = newElementWith({
        ..._newElementBase("magicframe", opts),
        type: "magicframe",
        name: opts?.name || null,
    }, {});
    return frameElement;
};
/** computes element x/y offset based on textAlign/verticalAlign */
const getTextElementPositionOffsets = (opts, metrics) => {
    return {
        x: opts.textAlign === "center"
            ? metrics.width / 2
            : opts.textAlign === "right"
                ? metrics.width
                : 0,
        y: opts.verticalAlign === "middle" ? metrics.height / 2 : 0,
    };
};
export const newTextElement = (opts) => {
    const fontFamily = opts.fontFamily || DEFAULT_FONT_FAMILY;
    const fontSize = opts.fontSize || DEFAULT_FONT_SIZE;
    const lineHeight = opts.lineHeight || getDefaultLineHeight(fontFamily);
    const text = normalizeText(opts.text);
    const metrics = measureText(text, getFontString({ fontFamily, fontSize }), lineHeight);
    const textAlign = opts.textAlign || DEFAULT_TEXT_ALIGN;
    const verticalAlign = opts.verticalAlign || DEFAULT_VERTICAL_ALIGN;
    const offsets = getTextElementPositionOffsets({ textAlign, verticalAlign }, metrics);
    const textElement = newElementWith({
        ..._newElementBase("text", opts),
        text,
        fontSize,
        fontFamily,
        textAlign,
        verticalAlign,
        x: opts.x - offsets.x,
        y: opts.y - offsets.y,
        width: metrics.width,
        height: metrics.height,
        baseline: metrics.baseline,
        containerId: opts.containerId || null,
        originalText: text,
        lineHeight,
    }, {});
    return textElement;
};
const getAdjustedDimensions = (element, nextText) => {
    const { width: nextWidth, height: nextHeight, baseline: nextBaseline, } = measureText(nextText, getFontString(element), element.lineHeight);
    const { textAlign, verticalAlign } = element;
    let x;
    let y;
    if (textAlign === "center" &&
        verticalAlign === VERTICAL_ALIGN.MIDDLE &&
        !element.containerId) {
        const prevMetrics = measureText(element.text, getFontString(element), element.lineHeight);
        const offsets = getTextElementPositionOffsets(element, {
            width: nextWidth - prevMetrics.width,
            height: nextHeight - prevMetrics.height,
        });
        x = element.x - offsets.x;
        y = element.y - offsets.y;
    }
    else {
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(element);
        const [nextX1, nextY1, nextX2, nextY2] = getResizedElementAbsoluteCoords(element, nextWidth, nextHeight, false);
        const deltaX1 = (x1 - nextX1) / 2;
        const deltaY1 = (y1 - nextY1) / 2;
        const deltaX2 = (x2 - nextX2) / 2;
        const deltaY2 = (y2 - nextY2) / 2;
        [x, y] = adjustXYWithRotation({
            s: true,
            e: textAlign === "center" || textAlign === "left",
            w: textAlign === "center" || textAlign === "right",
        }, element.x, element.y, element.angle, deltaX1, deltaY1, deltaX2, deltaY2);
    }
    return {
        width: nextWidth,
        height: nextHeight,
        baseline: nextBaseline,
        x: Number.isFinite(x) ? x : element.x,
        y: Number.isFinite(y) ? y : element.y,
    };
};
export const refreshTextDimensions = (textElement, text = textElement.text) => {
    if (textElement.isDeleted) {
        return;
    }
    const container = getContainerElement(textElement);
    if (container) {
        text = wrapText(text, getFontString(textElement), getBoundTextMaxWidth(container));
    }
    const dimensions = getAdjustedDimensions(textElement, text);
    return { text, ...dimensions };
};
export const updateTextElement = (textElement, { text, isDeleted, originalText, }) => {
    return newElementWith(textElement, {
        originalText,
        isDeleted: isDeleted ?? textElement.isDeleted,
        ...refreshTextDimensions(textElement, originalText),
    });
};
export const newFreeDrawElement = (opts) => {
    return {
        ..._newElementBase(opts.type, opts),
        points: opts.points || [],
        pressures: [],
        simulatePressure: opts.simulatePressure,
        lastCommittedPoint: null,
    };
};
export const newLinearElement = (opts) => {
    return {
        ..._newElementBase(opts.type, opts),
        points: opts.points || [],
        lastCommittedPoint: null,
        startBinding: null,
        endBinding: null,
        startArrowhead: opts.startArrowhead || null,
        endArrowhead: opts.endArrowhead || null,
    };
};
export const newImageElement = (opts) => {
    return {
        ..._newElementBase("image", opts),
        // in the future we'll support changing stroke color for some SVG elements,
        // and `transparent` will likely mean "use original colors of the image"
        strokeColor: "transparent",
        status: opts.status ?? "pending",
        fileId: opts.fileId ?? null,
        scale: opts.scale ?? [1, 1],
    };
};
// Simplified deep clone for the purpose of cloning ExcalidrawElement.
//
// Only clones plain objects and arrays. Doesn't clone Date, RegExp, Map, Set,
// Typed arrays and other non-null objects.
//
// Adapted from https://github.com/lukeed/klona
//
// The reason for `deepCopyElement()` wrapper is type safety (only allow
// passing ExcalidrawElement as the top-level argument).
const _deepCopyElement = (val, depth = 0) => {
    // only clone non-primitives
    if (val == null || typeof val !== "object") {
        return val;
    }
    const objectType = Object.prototype.toString.call(val);
    if (objectType === "[object Object]") {
        const tmp = typeof val.constructor === "function"
            ? Object.create(Object.getPrototypeOf(val))
            : {};
        for (const key in val) {
            if (val.hasOwnProperty(key)) {
                // don't copy non-serializable objects like these caches. They'll be
                // populated when the element is rendered.
                if (depth === 0 && (key === "shape" || key === "canvas")) {
                    continue;
                }
                tmp[key] = _deepCopyElement(val[key], depth + 1);
            }
        }
        return tmp;
    }
    if (Array.isArray(val)) {
        let k = val.length;
        const arr = new Array(k);
        while (k--) {
            arr[k] = _deepCopyElement(val[k], depth + 1);
        }
        return arr;
    }
    // we're not cloning non-array & non-plain-object objects because we
    // don't support them on excalidraw elements yet. If we do, we need to make
    // sure we start cloning them, so let's warn about it.
    if (import.meta.env.DEV) {
        if (objectType !== "[object Object]" &&
            objectType !== "[object Array]" &&
            objectType.startsWith("[object ")) {
            console.warn(`_deepCloneElement: unexpected object type ${objectType}. This value will not be cloned!`);
        }
    }
    return val;
};
/**
 * Clones ExcalidrawElement data structure. Does not regenerate id, nonce, or
 * any value. The purpose is to to break object references for immutability
 * reasons, whenever we want to keep the original element, but ensure it's not
 * mutated.
 *
 * Only clones plain objects and arrays. Doesn't clone Date, RegExp, Map, Set,
 * Typed arrays and other non-null objects.
 */
export const deepCopyElement = (val) => {
    return _deepCopyElement(val);
};
/**
 * utility wrapper to generate new id. In test env it reuses the old + postfix
 * for test assertions.
 */
export const regenerateId = (
/** supply null if no previous id exists */
previousId) => {
    if (isTestEnv() && previousId) {
        let nextId = `${previousId}_copy`;
        // `window.h` may not be defined in some unit tests
        if (window.h?.app
            ?.getSceneElementsIncludingDeleted()
            .find((el) => el.id === nextId)) {
            nextId += "_copy";
        }
        return nextId;
    }
    return randomId();
};
/**
 * Duplicate an element, often used in the alt-drag operation.
 * Note that this method has gotten a bit complicated since the
 * introduction of gruoping/ungrouping elements.
 * @param editingGroupId The current group being edited. The new
 *                       element will inherit this group and its
 *                       parents.
 * @param groupIdMapForOperation A Map that maps old group IDs to
 *                               duplicated ones. If you are duplicating
 *                               multiple elements at once, share this map
 *                               amongst all of them
 * @param element Element to duplicate
 * @param overrides Any element properties to override
 */
export const duplicateElement = (editingGroupId, groupIdMapForOperation, element, overrides) => {
    let copy = deepCopyElement(element);
    copy.id = regenerateId(copy.id);
    copy.boundElements = null;
    copy.updated = getUpdatedTimestamp();
    copy.seed = randomInteger();
    copy.groupIds = getNewGroupIdsForDuplication(copy.groupIds, editingGroupId, (groupId) => {
        if (!groupIdMapForOperation.has(groupId)) {
            groupIdMapForOperation.set(groupId, regenerateId(groupId));
        }
        return groupIdMapForOperation.get(groupId);
    });
    if (overrides) {
        copy = Object.assign(copy, overrides);
    }
    return copy;
};
/**
 * Clones elements, regenerating their ids (including bindings) and group ids.
 *
 * If bindings don't exist in the elements array, they are removed. Therefore,
 * it's advised to supply the whole elements array, or sets of elements that
 * are encapsulated (such as library items), if the purpose is to retain
 * bindings to the cloned elements intact.
 *
 * NOTE by default does not randomize or regenerate anything except the id.
 */
export const duplicateElements = (elements, opts) => {
    const clonedElements = [];
    const origElementsMap = arrayToMap(elements);
    // used for for migrating old ids to new ids
    const elementNewIdsMap = new Map();
    const maybeGetNewId = (id) => {
        // if we've already migrated the element id, return the new one directly
        if (elementNewIdsMap.has(id)) {
            return elementNewIdsMap.get(id);
        }
        // if we haven't migrated the element id, but an old element with the same
        // id exists, generate a new id for it and return it
        if (origElementsMap.has(id)) {
            const newId = regenerateId(id);
            elementNewIdsMap.set(id, newId);
            return newId;
        }
        // if old element doesn't exist, return null to mark it for removal
        return null;
    };
    const groupNewIdsMap = new Map();
    for (const element of elements) {
        const clonedElement = _deepCopyElement(element);
        clonedElement.id = maybeGetNewId(element.id);
        if (opts?.randomizeSeed) {
            clonedElement.seed = randomInteger();
            bumpVersion(clonedElement);
        }
        if (clonedElement.groupIds) {
            clonedElement.groupIds = clonedElement.groupIds.map((groupId) => {
                if (!groupNewIdsMap.has(groupId)) {
                    groupNewIdsMap.set(groupId, regenerateId(groupId));
                }
                return groupNewIdsMap.get(groupId);
            });
        }
        if ("containerId" in clonedElement && clonedElement.containerId) {
            const newContainerId = maybeGetNewId(clonedElement.containerId);
            clonedElement.containerId = newContainerId;
        }
        if ("boundElements" in clonedElement && clonedElement.boundElements) {
            clonedElement.boundElements = clonedElement.boundElements.reduce((acc, binding) => {
                const newBindingId = maybeGetNewId(binding.id);
                if (newBindingId) {
                    acc.push({ ...binding, id: newBindingId });
                }
                return acc;
            }, []);
        }
        if ("endBinding" in clonedElement && clonedElement.endBinding) {
            const newEndBindingId = maybeGetNewId(clonedElement.endBinding.elementId);
            clonedElement.endBinding = newEndBindingId
                ? {
                    ...clonedElement.endBinding,
                    elementId: newEndBindingId,
                }
                : null;
        }
        if ("startBinding" in clonedElement && clonedElement.startBinding) {
            const newEndBindingId = maybeGetNewId(clonedElement.startBinding.elementId);
            clonedElement.startBinding = newEndBindingId
                ? {
                    ...clonedElement.startBinding,
                    elementId: newEndBindingId,
                }
                : null;
        }
        if (clonedElement.frameId) {
            clonedElement.frameId = maybeGetNewId(clonedElement.frameId);
        }
        clonedElements.push(clonedElement);
    }
    return clonedElements;
};
