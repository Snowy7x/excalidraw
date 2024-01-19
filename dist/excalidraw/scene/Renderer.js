import { isElementInViewport } from "../element/sizeHelpers";
import { isImageElement } from "../element/typeChecks";
import { cancelRender } from "../renderer/renderScene";
import { memoize } from "../utils";
export class Renderer {
    scene;
    constructor(scene) {
        this.scene = scene;
    }
    getRenderableElements = (() => {
        const getVisibleCanvasElements = ({ elements, zoom, offsetLeft, offsetTop, scrollX, scrollY, height, width, }) => {
            return elements.filter((element) => isElementInViewport(element, width, height, {
                zoom,
                offsetLeft,
                offsetTop,
                scrollX,
                scrollY,
            }));
        };
        const getCanvasElements = ({ editingElement, elements, pendingImageElementId, }) => {
            return elements.filter((element) => {
                if (isImageElement(element)) {
                    if (
                    // => not placed on canvas yet (but in elements array)
                    pendingImageElementId === element.id) {
                        return false;
                    }
                }
                // we don't want to render text element that's being currently edited
                // (it's rendered on remote only)
                return (!editingElement ||
                    editingElement.type !== "text" ||
                    element.id !== editingElement.id);
            });
        };
        return memoize(({ zoom, offsetLeft, offsetTop, scrollX, scrollY, height, width, editingElement, pendingImageElementId, 
        // unused but serves we cache on it to invalidate elements if they
        // get mutated
        versionNonce: _versionNonce, }) => {
            const elements = this.scene.getNonDeletedElements();
            const canvasElements = getCanvasElements({
                elements,
                editingElement,
                pendingImageElementId,
            });
            const visibleElements = getVisibleCanvasElements({
                elements: canvasElements,
                zoom,
                offsetLeft,
                offsetTop,
                scrollX,
                scrollY,
                height,
                width,
            });
            return { canvasElements, visibleElements };
        });
    })();
    // NOTE Doesn't destroy everything (scene, rc, etc.) because it may not be
    // safe to break TS contract here (for upstream cases)
    destroy() {
        cancelRender();
        this.getRenderableElements.clear();
    }
}
