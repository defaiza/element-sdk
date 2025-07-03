"use strict";
/**
 * ElementEventEmitter
 * Enhanced event emitter for elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementEventEmitter = void 0;
const events_1 = require("events");
class ElementEventEmitter extends events_1.EventEmitter {
    constructor() {
        super();
        this.eventHistory = [];
        this.maxHistorySize = 100;
    }
    /**
     * Emit an event and record it in history
     */
    emit(event, ...args) {
        // Record event in history
        if (typeof event === 'string') {
            this.eventHistory.push({
                event,
                data: args[0],
                timestamp: Date.now()
            });
            // Trim history if needed
            if (this.eventHistory.length > this.maxHistorySize) {
                this.eventHistory.shift();
            }
        }
        return super.emit(event, ...args);
    }
    /**
     * Get event history
     */
    getHistory(event) {
        if (event) {
            return this.eventHistory.filter(e => e.event === event);
        }
        return [...this.eventHistory];
    }
    /**
     * Clear event history
     */
    clearHistory() {
        this.eventHistory = [];
    }
    /**
     * Set maximum history size
     */
    setMaxHistorySize(size) {
        this.maxHistorySize = Math.max(0, size);
        // Trim existing history if needed
        while (this.eventHistory.length > this.maxHistorySize) {
            this.eventHistory.shift();
        }
    }
    /**
     * Once with timeout
     */
    onceWithTimeout(event, handler, timeout) {
        const timeoutId = setTimeout(() => {
            this.removeListener(event, wrappedHandler);
            handler(new Error('Event timeout'));
        }, timeout);
        const wrappedHandler = (...args) => {
            clearTimeout(timeoutId);
            handler(...args);
        };
        this.once(event, wrappedHandler);
    }
    /**
     * Wait for event (promise-based)
     */
    waitFor(event, timeout) {
        return new Promise((resolve, reject) => {
            if (timeout) {
                this.onceWithTimeout(event, (result) => {
                    if (result instanceof Error) {
                        reject(result);
                    }
                    else {
                        resolve(result);
                    }
                }, timeout);
            }
            else {
                this.once(event, resolve);
            }
        });
    }
}
exports.ElementEventEmitter = ElementEventEmitter;
