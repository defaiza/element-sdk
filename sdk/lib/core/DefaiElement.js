"use strict";
/**
 * DefaiElement base class
 * All elements must extend this class
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaiElement = void 0;
const events_1 = require("events");
class DefaiElement extends events_1.EventEmitter {
    constructor() {
        super();
        // Element state
        this.state = {};
        this.mounted = false;
    }
    // State management
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.emit('stateChange', this.state);
    }
    getState() {
        return { ...this.state };
    }
    // Data persistence
    async saveData(key, value) {
        if (!this.context) {
            throw new Error('Element not mounted');
        }
        if (!this.permissions.storage) {
            throw new Error('Storage permission not granted');
        }
        return this.context.api.saveData(key, value);
    }
    async loadData(key) {
        if (!this.context) {
            throw new Error('Element not mounted');
        }
        if (!this.permissions.storage) {
            throw new Error('Storage permission not granted');
        }
        return this.context.api.loadData(key);
    }
    // Inter-element communication
    emitToOthers(event, data) {
        if (!this.context) {
            throw new Error('Element not mounted');
        }
        this.context.api.emit(event, {
            source: this.metadata.id,
            data
        });
    }
    onFromOthers(event, handler) {
        if (!this.context) {
            throw new Error('Element not mounted');
        }
        return this.context.api.on(event, (payload) => {
            // Check if this element can receive from the source
            const canReceive = this.permissions.canReceiveFrom.includes('*') ||
                this.permissions.canReceiveFrom.includes(payload.source);
            if (canReceive) {
                handler(payload.data);
            }
        });
    }
    // Internal lifecycle management
    async _mount(context) {
        if (this.mounted) {
            throw new Error('Element already mounted');
        }
        this.context = context;
        this.mounted = true;
        this.emit('lifecycle', { event: 'mount' });
        await this.onMount(context);
    }
    async _unmount() {
        if (!this.mounted) {
            throw new Error('Element not mounted');
        }
        this.emit('lifecycle', { event: 'unmount' });
        await this.onUnmount();
        this.mounted = false;
        this.context = undefined;
    }
    async _resize(size) {
        if (!this.mounted) {
            throw new Error('Element not mounted');
        }
        this.emit('lifecycle', { event: 'resize' });
        await this.onResize(size);
    }
    async _settingsChange(settings) {
        if (!this.mounted) {
            throw new Error('Element not mounted');
        }
        this.emit('lifecycle', { event: 'settingsChange' });
        await this.onSettingsChange(settings);
    }
    // Utility methods
    get isMounted() {
        return this.mounted;
    }
    get currentContext() {
        return this.context;
    }
}
exports.DefaiElement = DefaiElement;
