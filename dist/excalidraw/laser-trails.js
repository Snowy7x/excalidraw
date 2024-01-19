import { AnimatedTrail } from "./animated-trail";
import { easeOut } from "./utils";
import { getClientColor } from "./clients";
export class LaserTrails {
    animationFrameHandler;
    app;
    localTrail;
    collabTrails = new Map();
    container;
    constructor(animationFrameHandler, app) {
        this.animationFrameHandler = animationFrameHandler;
        this.app = app;
        this.animationFrameHandler.register(this, this.onFrame.bind(this));
        this.localTrail = new AnimatedTrail(animationFrameHandler, app, {
            ...this.getTrailOptions(),
            fill: () => "red",
        });
    }
    getTrailOptions() {
        return {
            simplify: 0,
            streamline: 0.4,
            sizeMapping: (c) => {
                const DECAY_TIME = 1000;
                const DECAY_LENGTH = 50;
                const t = Math.max(0, 1 - (performance.now() - c.pressure) / DECAY_TIME);
                const l = (DECAY_LENGTH -
                    Math.min(DECAY_LENGTH, c.totalLength - c.currentIndex)) /
                    DECAY_LENGTH;
                return Math.min(easeOut(l), easeOut(t));
            },
        };
    }
    startPath(x, y) {
        this.localTrail.startPath(x, y);
    }
    addPointToPath(x, y) {
        this.localTrail.addPointToPath(x, y);
    }
    endPath() {
        this.localTrail.endPath();
    }
    start(container) {
        this.container = container;
        this.animationFrameHandler.start(this);
        this.localTrail.start(container);
    }
    stop() {
        this.animationFrameHandler.stop(this);
        this.localTrail.stop();
    }
    onFrame() {
        this.updateCollabTrails();
    }
    updateCollabTrails() {
        if (!this.container || this.app.state.collaborators.size === 0) {
            return;
        }
        for (const [key, collabolator] of this.app.state.collaborators.entries()) {
            let trail;
            if (!this.collabTrails.has(key)) {
                trail = new AnimatedTrail(this.animationFrameHandler, this.app, {
                    ...this.getTrailOptions(),
                    fill: () => getClientColor(key),
                });
                trail.start(this.container);
                this.collabTrails.set(key, trail);
            }
            else {
                trail = this.collabTrails.get(key);
            }
            if (collabolator.pointer && collabolator.pointer.tool === "laser") {
                if (collabolator.button === "down" && !trail.hasCurrentTrail) {
                    trail.startPath(collabolator.pointer.x, collabolator.pointer.y);
                }
                if (collabolator.button === "down" &&
                    trail.hasCurrentTrail &&
                    !trail.hasLastPoint(collabolator.pointer.x, collabolator.pointer.y)) {
                    trail.addPointToPath(collabolator.pointer.x, collabolator.pointer.y);
                }
                if (collabolator.button === "up" && trail.hasCurrentTrail) {
                    trail.addPointToPath(collabolator.pointer.x, collabolator.pointer.y);
                    trail.endPath();
                }
            }
        }
        for (const key of this.collabTrails.keys()) {
            if (!this.app.state.collaborators.has(key)) {
                const trail = this.collabTrails.get(key);
                trail.stop();
                this.collabTrails.delete(key);
            }
        }
    }
}
