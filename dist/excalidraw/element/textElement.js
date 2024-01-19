import { getFontString, arrayToMap, isTestEnv, normalizeEOL } from "../utils";
import { mutateElement } from "./mutateElement";
import { ARROW_LABEL_FONT_SIZE_TO_MIN_WIDTH_RATIO, ARROW_LABEL_WIDTH_FRACTION, BOUND_TEXT_PADDING, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, FONT_FAMILY, isSafari, TEXT_ALIGN, VERTICAL_ALIGN, } from "../constants";
import Scene from "../scene/Scene";
import { isTextElement } from ".";
import { isBoundToContainer, isArrowElement } from "./typeChecks";
import { LinearElementEditor } from "./linearElementEditor";
import { isTextBindableContainer } from "./typeChecks";
import { getElementAbsoluteCoords } from ".";
import { getSelectedElements } from "../scene";
import { isHittingElementNotConsideringBoundingBox } from "./collision";
import { resetOriginalContainerCache, updateOriginalContainerCache, } from "./textWysiwyg";
export const normalizeText = (text) => {
    return (normalizeEOL(text)
        // replace tabs with spaces so they render and measure correctly
        .replace(/\t/g, "        "));
};
const splitIntoLines = (text) => {
    return normalizeText(text).split("\n");
};
export const redrawTextBoundingBox = (textElement, container) => {
    let maxWidth = undefined;
    const boundTextUpdates = {
        x: textElement.x,
        y: textElement.y,
        text: textElement.text,
        width: textElement.width,
        height: textElement.height,
        baseline: textElement.baseline,
    };
    boundTextUpdates.text = textElement.text;
    if (container) {
        maxWidth = getBoundTextMaxWidth(container, textElement);
        boundTextUpdates.text = wrapText(textElement.originalText, getFontString(textElement), maxWidth);
    }
    const metrics = measureText(boundTextUpdates.text, getFontString(textElement), textElement.lineHeight);
    boundTextUpdates.width = metrics.width;
    boundTextUpdates.height = metrics.height;
    boundTextUpdates.baseline = metrics.baseline;
    if (container) {
        const maxContainerHeight = getBoundTextMaxHeight(container, textElement);
        const maxContainerWidth = getBoundTextMaxWidth(container);
        if (!isArrowElement(container) && metrics.height > maxContainerHeight) {
            const nextHeight = computeContainerDimensionForBoundText(metrics.height, container.type);
            mutateElement(container, { height: nextHeight });
            updateOriginalContainerCache(container.id, nextHeight);
        }
        if (metrics.width > maxContainerWidth) {
            const nextWidth = computeContainerDimensionForBoundText(metrics.width, container.type);
            mutateElement(container, { width: nextWidth });
        }
        const updatedTextElement = {
            ...textElement,
            ...boundTextUpdates,
        };
        const { x, y } = computeBoundTextPosition(container, updatedTextElement);
        boundTextUpdates.x = x;
        boundTextUpdates.y = y;
    }
    mutateElement(textElement, boundTextUpdates);
};
export const bindTextToShapeAfterDuplication = (sceneElements, oldElements, oldIdToDuplicatedId) => {
    const sceneElementMap = arrayToMap(sceneElements);
    oldElements.forEach((element) => {
        const newElementId = oldIdToDuplicatedId.get(element.id);
        const boundTextElementId = getBoundTextElementId(element);
        if (boundTextElementId) {
            const newTextElementId = oldIdToDuplicatedId.get(boundTextElementId);
            if (newTextElementId) {
                const newContainer = sceneElementMap.get(newElementId);
                if (newContainer) {
                    mutateElement(newContainer, {
                        boundElements: (element.boundElements || [])
                            .filter((boundElement) => boundElement.id !== newTextElementId &&
                            boundElement.id !== boundTextElementId)
                            .concat({
                            type: "text",
                            id: newTextElementId,
                        }),
                    });
                }
                const newTextElement = sceneElementMap.get(newTextElementId);
                if (newTextElement && isTextElement(newTextElement)) {
                    mutateElement(newTextElement, {
                        containerId: newContainer ? newElementId : null,
                    });
                }
            }
        }
    });
};
export const handleBindTextResize = (container, transformHandleType, shouldMaintainAspectRatio = false) => {
    const boundTextElementId = getBoundTextElementId(container);
    if (!boundTextElementId) {
        return;
    }
    resetOriginalContainerCache(container.id);
    let textElement = Scene.getScene(container).getElement(boundTextElementId);
    if (textElement && textElement.text) {
        if (!container) {
            return;
        }
        textElement = Scene.getScene(container).getElement(boundTextElementId);
        let text = textElement.text;
        let nextHeight = textElement.height;
        let nextWidth = textElement.width;
        const maxWidth = getBoundTextMaxWidth(container);
        const maxHeight = getBoundTextMaxHeight(container, textElement);
        let containerHeight = container.height;
        let nextBaseLine = textElement.baseline;
        if (shouldMaintainAspectRatio ||
            (transformHandleType !== "n" && transformHandleType !== "s")) {
            if (text) {
                text = wrapText(textElement.originalText, getFontString(textElement), maxWidth);
            }
            const metrics = measureText(text, getFontString(textElement), textElement.lineHeight);
            nextHeight = metrics.height;
            nextWidth = metrics.width;
            nextBaseLine = metrics.baseline;
        }
        // increase height in case text element height exceeds
        if (nextHeight > maxHeight) {
            containerHeight = computeContainerDimensionForBoundText(nextHeight, container.type);
            const diff = containerHeight - container.height;
            // fix the y coord when resizing from ne/nw/n
            const updatedY = !isArrowElement(container) &&
                (transformHandleType === "ne" ||
                    transformHandleType === "nw" ||
                    transformHandleType === "n")
                ? container.y - diff
                : container.y;
            mutateElement(container, {
                height: containerHeight,
                y: updatedY,
            });
        }
        mutateElement(textElement, {
            text,
            width: nextWidth,
            height: nextHeight,
            baseline: nextBaseLine,
        });
        if (!isArrowElement(container)) {
            mutateElement(textElement, computeBoundTextPosition(container, textElement));
        }
    }
};
export const computeBoundTextPosition = (container, boundTextElement) => {
    if (isArrowElement(container)) {
        return LinearElementEditor.getBoundTextElementPosition(container, boundTextElement);
    }
    const containerCoords = getContainerCoords(container);
    const maxContainerHeight = getBoundTextMaxHeight(container, boundTextElement);
    const maxContainerWidth = getBoundTextMaxWidth(container);
    let x;
    let y;
    if (boundTextElement.verticalAlign === VERTICAL_ALIGN.TOP) {
        y = containerCoords.y;
    }
    else if (boundTextElement.verticalAlign === VERTICAL_ALIGN.BOTTOM) {
        y = containerCoords.y + (maxContainerHeight - boundTextElement.height);
    }
    else {
        y =
            containerCoords.y +
                (maxContainerHeight / 2 - boundTextElement.height / 2);
    }
    if (boundTextElement.textAlign === TEXT_ALIGN.LEFT) {
        x = containerCoords.x;
    }
    else if (boundTextElement.textAlign === TEXT_ALIGN.RIGHT) {
        x = containerCoords.x + (maxContainerWidth - boundTextElement.width);
    }
    else {
        x =
            containerCoords.x + (maxContainerWidth / 2 - boundTextElement.width / 2);
    }
    return { x, y };
};
// https://github.com/grassator/canvas-text-editor/blob/master/lib/FontMetrics.js
export const measureText = (text, font, lineHeight) => {
    text = text
        .split("\n")
        // replace empty lines with single space because leading/trailing empty
        // lines would be stripped from computation
        .map((x) => x || " ")
        .join("\n");
    const fontSize = parseFloat(font);
    const height = getTextHeight(text, fontSize, lineHeight);
    const width = getTextWidth(text, font);
    const baseline = measureBaseline(text, font, lineHeight);
    return { width, height, baseline };
};
export const measureBaseline = (text, font, lineHeight, wrapInContainer) => {
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.whiteSpace = "pre";
    container.style.font = font;
    container.style.minHeight = "1em";
    if (wrapInContainer) {
        container.style.overflow = "hidden";
        container.style.wordBreak = "break-word";
        container.style.whiteSpace = "pre-wrap";
    }
    container.style.lineHeight = String(lineHeight);
    container.innerText = text;
    // Baseline is important for positioning text on canvas
    document.body.appendChild(container);
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.overflow = "hidden";
    span.style.width = "1px";
    span.style.height = "1px";
    container.appendChild(span);
    let baseline = span.offsetTop + span.offsetHeight;
    const height = container.offsetHeight;
    if (isSafari) {
        const canvasHeight = getTextHeight(text, parseFloat(font), lineHeight);
        const fontSize = parseFloat(font);
        // In Safari the font size gets rounded off when rendering hence calculating the safari height and shifting the baseline if it differs
        // from the actual canvas height
        const domHeight = getTextHeight(text, Math.round(fontSize), lineHeight);
        if (canvasHeight > height) {
            baseline += canvasHeight - domHeight;
        }
        if (height > canvasHeight) {
            baseline -= domHeight - canvasHeight;
        }
    }
    document.body.removeChild(container);
    return baseline;
};
/**
 * To get unitless line-height (if unknown) we can calculate it by dividing
 * height-per-line by fontSize.
 */
export const detectLineHeight = (textElement) => {
    const lineCount = splitIntoLines(textElement.text).length;
    return (textElement.height /
        lineCount /
        textElement.fontSize);
};
/**
 * We calculate the line height from the font size and the unitless line height,
 * aligning with the W3C spec.
 */
export const getLineHeightInPx = (fontSize, lineHeight) => {
    return fontSize * lineHeight;
};
// FIXME rename to getApproxMinContainerHeight
export const getApproxMinLineHeight = (fontSize, lineHeight) => {
    return getLineHeightInPx(fontSize, lineHeight) + BOUND_TEXT_PADDING * 2;
};
let canvas;
const getLineWidth = (text, font) => {
    if (!canvas) {
        canvas = document.createElement("canvas");
    }
    const canvas2dContext = canvas.getContext("2d");
    canvas2dContext.font = font;
    const width = canvas2dContext.measureText(text).width;
    // since in test env the canvas measureText algo
    // doesn't measure text and instead just returns number of
    // characters hence we assume that each letteris 10px
    if (isTestEnv()) {
        return width * 10;
    }
    return width;
};
export const getTextWidth = (text, font) => {
    const lines = splitIntoLines(text);
    let width = 0;
    lines.forEach((line) => {
        width = Math.max(width, getLineWidth(line, font));
    });
    return width;
};
export const getTextHeight = (text, fontSize, lineHeight) => {
    const lineCount = splitIntoLines(text).length;
    return getLineHeightInPx(fontSize, lineHeight) * lineCount;
};
export const parseTokens = (text) => {
    // Splitting words containing "-" as those are treated as separate words
    // by css wrapping algorithm eg non-profit => non-, profit
    const words = text.split("-");
    if (words.length > 1) {
        // non-proft org => ['non-', 'profit org']
        words.forEach((word, index) => {
            if (index !== words.length - 1) {
                words[index] = word += "-";
            }
        });
    }
    // Joining the words with space and splitting them again with space to get the
    // final list of tokens
    // ['non-', 'profit org'] =>,'non- proft org' => ['non-','profit','org']
    return words.join(" ").split(" ");
};
export const wrapText = (text, font, maxWidth) => {
    // if maxWidth is not finite or NaN which can happen in case of bugs in
    // computation, we need to make sure we don't continue as we'll end up
    // in an infinite loop
    if (!Number.isFinite(maxWidth) || maxWidth < 0) {
        return text;
    }
    const lines = [];
    const originalLines = text.split("\n");
    const spaceWidth = getLineWidth(" ", font);
    let currentLine = "";
    let currentLineWidthTillNow = 0;
    const push = (str) => {
        if (str.trim()) {
            lines.push(str);
        }
    };
    const resetParams = () => {
        currentLine = "";
        currentLineWidthTillNow = 0;
    };
    originalLines.forEach((originalLine) => {
        const currentLineWidth = getTextWidth(originalLine, font);
        // Push the line if its <= maxWidth
        if (currentLineWidth <= maxWidth) {
            lines.push(originalLine);
            return; // continue
        }
        const words = parseTokens(originalLine);
        resetParams();
        let index = 0;
        while (index < words.length) {
            const currentWordWidth = getLineWidth(words[index], font);
            // This will only happen when single word takes entire width
            if (currentWordWidth === maxWidth) {
                push(words[index]);
                index++;
            }
            // Start breaking longer words exceeding max width
            else if (currentWordWidth > maxWidth) {
                // push current line since the current word exceeds the max width
                // so will be appended in next line
                push(currentLine);
                resetParams();
                while (words[index].length > 0) {
                    const currentChar = String.fromCodePoint(words[index].codePointAt(0));
                    const width = charWidth.calculate(currentChar, font);
                    currentLineWidthTillNow += width;
                    words[index] = words[index].slice(currentChar.length);
                    if (currentLineWidthTillNow >= maxWidth) {
                        push(currentLine);
                        currentLine = currentChar;
                        currentLineWidthTillNow = width;
                    }
                    else {
                        currentLine += currentChar;
                    }
                }
                // push current line if appending space exceeds max width
                if (currentLineWidthTillNow + spaceWidth >= maxWidth) {
                    push(currentLine);
                    resetParams();
                    // space needs to be appended before next word
                    // as currentLine contains chars which couldn't be appended
                    // to previous line unless the line ends with hyphen to sync
                    // with css word-wrap
                }
                else if (!currentLine.endsWith("-")) {
                    currentLine += " ";
                    currentLineWidthTillNow += spaceWidth;
                }
                index++;
            }
            else {
                // Start appending words in a line till max width reached
                while (currentLineWidthTillNow < maxWidth && index < words.length) {
                    const word = words[index];
                    currentLineWidthTillNow = getLineWidth(currentLine + word, font);
                    if (currentLineWidthTillNow > maxWidth) {
                        push(currentLine);
                        resetParams();
                        break;
                    }
                    index++;
                    // if word ends with "-" then we don't need to add space
                    // to sync with css word-wrap
                    const shouldAppendSpace = !word.endsWith("-");
                    currentLine += word;
                    if (shouldAppendSpace) {
                        currentLine += " ";
                    }
                    // Push the word if appending space exceeds max width
                    if (currentLineWidthTillNow + spaceWidth >= maxWidth) {
                        if (shouldAppendSpace) {
                            lines.push(currentLine.slice(0, -1));
                        }
                        else {
                            lines.push(currentLine);
                        }
                        resetParams();
                        break;
                    }
                }
            }
        }
        if (currentLine.slice(-1) === " ") {
            // only remove last trailing space which we have added when joining words
            currentLine = currentLine.slice(0, -1);
            push(currentLine);
        }
    });
    return lines.join("\n");
};
export const charWidth = (() => {
    const cachedCharWidth = {};
    const calculate = (char, font) => {
        const ascii = char.charCodeAt(0);
        if (!cachedCharWidth[font]) {
            cachedCharWidth[font] = [];
        }
        if (!cachedCharWidth[font][ascii]) {
            const width = getLineWidth(char, font);
            cachedCharWidth[font][ascii] = width;
        }
        return cachedCharWidth[font][ascii];
    };
    const getCache = (font) => {
        return cachedCharWidth[font];
    };
    return {
        calculate,
        getCache,
    };
})();
const DUMMY_TEXT = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toLocaleUpperCase();
// FIXME rename to getApproxMinContainerWidth
export const getApproxMinLineWidth = (font, lineHeight) => {
    const maxCharWidth = getMaxCharWidth(font);
    if (maxCharWidth === 0) {
        return (measureText(DUMMY_TEXT.split("").join("\n"), font, lineHeight).width +
            BOUND_TEXT_PADDING * 2);
    }
    return maxCharWidth + BOUND_TEXT_PADDING * 2;
};
export const getMinCharWidth = (font) => {
    const cache = charWidth.getCache(font);
    if (!cache) {
        return 0;
    }
    const cacheWithOutEmpty = cache.filter((val) => val !== undefined);
    return Math.min(...cacheWithOutEmpty);
};
export const getMaxCharWidth = (font) => {
    const cache = charWidth.getCache(font);
    if (!cache) {
        return 0;
    }
    const cacheWithOutEmpty = cache.filter((val) => val !== undefined);
    return Math.max(...cacheWithOutEmpty);
};
export const getApproxCharsToFitInWidth = (font, width) => {
    // Generally lower case is used so converting to lower case
    const dummyText = DUMMY_TEXT.toLocaleLowerCase();
    const batchLength = 6;
    let index = 0;
    let widthTillNow = 0;
    let str = "";
    while (widthTillNow <= width) {
        const batch = dummyText.substr(index, index + batchLength);
        str += batch;
        widthTillNow += getLineWidth(str, font);
        if (index === dummyText.length - 1) {
            index = 0;
        }
        index = index + batchLength;
    }
    while (widthTillNow > width) {
        str = str.substr(0, str.length - 1);
        widthTillNow = getLineWidth(str, font);
    }
    return str.length;
};
export const getBoundTextElementId = (container) => {
    return container?.boundElements?.length
        ? container?.boundElements?.filter((ele) => ele.type === "text")[0]?.id ||
            null
        : null;
};
export const getBoundTextElement = (element) => {
    if (!element) {
        return null;
    }
    const boundTextElementId = getBoundTextElementId(element);
    if (boundTextElementId) {
        return (Scene.getScene(element)?.getElement(boundTextElementId) || null);
    }
    return null;
};
export const getContainerElement = (element) => {
    if (!element) {
        return null;
    }
    if (element.containerId) {
        return Scene.getScene(element)?.getElement(element.containerId) || null;
    }
    return null;
};
export const getContainerCenter = (container, appState) => {
    if (!isArrowElement(container)) {
        return {
            x: container.x + container.width / 2,
            y: container.y + container.height / 2,
        };
    }
    const points = LinearElementEditor.getPointsGlobalCoordinates(container);
    if (points.length % 2 === 1) {
        const index = Math.floor(container.points.length / 2);
        const midPoint = LinearElementEditor.getPointGlobalCoordinates(container, container.points[index]);
        return { x: midPoint[0], y: midPoint[1] };
    }
    const index = container.points.length / 2 - 1;
    let midSegmentMidpoint = LinearElementEditor.getEditorMidPoints(container, appState)[index];
    if (!midSegmentMidpoint) {
        midSegmentMidpoint = LinearElementEditor.getSegmentMidPoint(container, points[index], points[index + 1], index + 1);
    }
    return { x: midSegmentMidpoint[0], y: midSegmentMidpoint[1] };
};
export const getContainerCoords = (container) => {
    let offsetX = BOUND_TEXT_PADDING;
    let offsetY = BOUND_TEXT_PADDING;
    if (container.type === "ellipse") {
        // The derivation of coordinates is explained in https://github.com/excalidraw/excalidraw/pull/6172
        offsetX += (container.width / 2) * (1 - Math.sqrt(2) / 2);
        offsetY += (container.height / 2) * (1 - Math.sqrt(2) / 2);
    }
    // The derivation of coordinates is explained in https://github.com/excalidraw/excalidraw/pull/6265
    if (container.type === "diamond") {
        offsetX += container.width / 4;
        offsetY += container.height / 4;
    }
    return {
        x: container.x + offsetX,
        y: container.y + offsetY,
    };
};
export const getTextElementAngle = (textElement) => {
    const container = getContainerElement(textElement);
    if (!container || isArrowElement(container)) {
        return textElement.angle;
    }
    return container.angle;
};
export const getBoundTextElementOffset = (boundTextElement) => {
    const container = getContainerElement(boundTextElement);
    if (!container || !boundTextElement) {
        return 0;
    }
    if (isArrowElement(container)) {
        return BOUND_TEXT_PADDING * 8;
    }
    return BOUND_TEXT_PADDING;
};
export const getBoundTextElementPosition = (container, boundTextElement) => {
    if (isArrowElement(container)) {
        return LinearElementEditor.getBoundTextElementPosition(container, boundTextElement);
    }
};
export const shouldAllowVerticalAlign = (selectedElements) => {
    return selectedElements.some((element) => {
        const hasBoundContainer = isBoundToContainer(element);
        if (hasBoundContainer) {
            const container = getContainerElement(element);
            if (isTextElement(element) && isArrowElement(container)) {
                return false;
            }
            return true;
        }
        return false;
    });
};
export const suppportsHorizontalAlign = (selectedElements) => {
    return selectedElements.some((element) => {
        const hasBoundContainer = isBoundToContainer(element);
        if (hasBoundContainer) {
            const container = getContainerElement(element);
            if (isTextElement(element) && isArrowElement(container)) {
                return false;
            }
            return true;
        }
        return isTextElement(element);
    });
};
export const getTextBindableContainerAtPosition = (elements, appState, x, y) => {
    const selectedElements = getSelectedElements(elements, appState);
    if (selectedElements.length === 1) {
        return isTextBindableContainer(selectedElements[0], false)
            ? selectedElements[0]
            : null;
    }
    let hitElement = null;
    // We need to to hit testing from front (end of the array) to back (beginning of the array)
    for (let index = elements.length - 1; index >= 0; --index) {
        if (elements[index].isDeleted) {
            continue;
        }
        const [x1, y1, x2, y2] = getElementAbsoluteCoords(elements[index]);
        if (isArrowElement(elements[index]) &&
            isHittingElementNotConsideringBoundingBox(elements[index], appState, null, [x, y])) {
            hitElement = elements[index];
            break;
        }
        else if (x1 < x && x < x2 && y1 < y && y < y2) {
            hitElement = elements[index];
            break;
        }
    }
    return isTextBindableContainer(hitElement, false) ? hitElement : null;
};
const VALID_CONTAINER_TYPES = new Set([
    "rectangle",
    "ellipse",
    "diamond",
    "arrow",
]);
export const isValidTextContainer = (element) => VALID_CONTAINER_TYPES.has(element.type);
export const computeContainerDimensionForBoundText = (dimension, containerType) => {
    dimension = Math.ceil(dimension);
    const padding = BOUND_TEXT_PADDING * 2;
    if (containerType === "ellipse") {
        return Math.round(((dimension + padding) / Math.sqrt(2)) * 2);
    }
    if (containerType === "arrow") {
        return dimension + padding * 8;
    }
    if (containerType === "diamond") {
        return 2 * (dimension + padding);
    }
    return dimension + padding;
};
export const getBoundTextMaxWidth = (container, boundTextElement = getBoundTextElement(container)) => {
    const { width } = container;
    if (isArrowElement(container)) {
        const minWidth = (boundTextElement?.fontSize ?? DEFAULT_FONT_SIZE) *
            ARROW_LABEL_FONT_SIZE_TO_MIN_WIDTH_RATIO;
        return Math.max(ARROW_LABEL_WIDTH_FRACTION * width, minWidth);
    }
    if (container.type === "ellipse") {
        // The width of the largest rectangle inscribed inside an ellipse is
        // Math.round((ellipse.width / 2) * Math.sqrt(2)) which is derived from
        // equation of an ellipse -https://github.com/excalidraw/excalidraw/pull/6172
        return Math.round((width / 2) * Math.sqrt(2)) - BOUND_TEXT_PADDING * 2;
    }
    if (container.type === "diamond") {
        // The width of the largest rectangle inscribed inside a rhombus is
        // Math.round(width / 2) - https://github.com/excalidraw/excalidraw/pull/6265
        return Math.round(width / 2) - BOUND_TEXT_PADDING * 2;
    }
    return width - BOUND_TEXT_PADDING * 2;
};
export const getBoundTextMaxHeight = (container, boundTextElement) => {
    const { height } = container;
    if (isArrowElement(container)) {
        const containerHeight = height - BOUND_TEXT_PADDING * 8 * 2;
        if (containerHeight <= 0) {
            return boundTextElement.height;
        }
        return height;
    }
    if (container.type === "ellipse") {
        // The height of the largest rectangle inscribed inside an ellipse is
        // Math.round((ellipse.height / 2) * Math.sqrt(2)) which is derived from
        // equation of an ellipse - https://github.com/excalidraw/excalidraw/pull/6172
        return Math.round((height / 2) * Math.sqrt(2)) - BOUND_TEXT_PADDING * 2;
    }
    if (container.type === "diamond") {
        // The height of the largest rectangle inscribed inside a rhombus is
        // Math.round(height / 2) - https://github.com/excalidraw/excalidraw/pull/6265
        return Math.round(height / 2) - BOUND_TEXT_PADDING * 2;
    }
    return height - BOUND_TEXT_PADDING * 2;
};
export const isMeasureTextSupported = () => {
    const width = getTextWidth(DUMMY_TEXT, getFontString({
        fontSize: DEFAULT_FONT_SIZE,
        fontFamily: DEFAULT_FONT_FAMILY,
    }));
    return width > 0;
};
/**
 * Unitless line height
 *
 * In previous versions we used `normal` line height, which browsers interpret
 * differently, and based on font-family and font-size.
 *
 * To make line heights consistent across browsers we hardcode the values for
 * each of our fonts based on most common average line-heights.
 * See https://github.com/excalidraw/excalidraw/pull/6360#issuecomment-1477635971
 * where the values come from.
 */
const DEFAULT_LINE_HEIGHT = {
    // ~1.25 is the average for Virgil in WebKit and Blink.
    // Gecko (FF) uses ~1.28.
    [FONT_FAMILY.Virgil]: 1.25,
    // ~1.15 is the average for Virgil in WebKit and Blink.
    // Gecko if all over the place.
    [FONT_FAMILY.Helvetica]: 1.15,
    // ~1.2 is the average for Virgil in WebKit and Blink, and kinda Gecko too
    [FONT_FAMILY.Cascadia]: 1.2,
};
export const getDefaultLineHeight = (fontFamily) => {
    if (fontFamily in DEFAULT_LINE_HEIGHT) {
        return DEFAULT_LINE_HEIGHT[fontFamily];
    }
    return DEFAULT_LINE_HEIGHT[DEFAULT_FONT_FAMILY];
};
