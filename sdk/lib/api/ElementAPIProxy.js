"use strict";
/**
 * ElementAPIProxy
 * Handles API calls from elements with permission checks
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementAPIProxy = void 0;
class ElementAPIProxy {
    constructor(elementId, permissions, actualAPI) {
        this.elementId = elementId;
        this.permissions = permissions;
        this.actualAPI = actualAPI;
    }
    async getPortfolio() {
        if (!this.permissions.portfolio) {
            throw new Error('Portfolio permission not granted');
        }
        return this.actualAPI.getPortfolio();
    }
    async getTransactions(limit) {
        if (!this.permissions.transactions) {
            throw new Error('Transactions permission not granted');
        }
        return this.actualAPI.getTransactions(limit);
    }
    async getPrices(symbols) {
        if (!this.permissions.network) {
            throw new Error('Network permission not granted');
        }
        return this.actualAPI.getPrices(symbols);
    }
    async saveData(key, value) {
        if (!this.permissions.storage) {
            throw new Error('Storage permission not granted');
        }
        // Prefix key with element ID to isolate storage
        const prefixedKey = `${this.elementId}:${key}`;
        return this.actualAPI.saveData(prefixedKey, value);
    }
    async loadData(key) {
        if (!this.permissions.storage) {
            throw new Error('Storage permission not granted');
        }
        // Prefix key with element ID to isolate storage
        const prefixedKey = `${this.elementId}:${key}`;
        return this.actualAPI.loadData(prefixedKey);
    }
    sendNotification(options) {
        if (!this.permissions.notifications) {
            throw new Error('Notifications permission not granted');
        }
        this.actualAPI.sendNotification(options);
    }
    async analyzeImage(imageData) {
        if (!this.permissions.aiChat) {
            throw new Error('AI chat permission not granted');
        }
        return this.actualAPI.analyzeImage(imageData);
    }
    async analyzeToken(tokenAddress) {
        if (!this.permissions.aiChat) {
            throw new Error('AI chat permission not granted');
        }
        return this.actualAPI.analyzeToken(tokenAddress);
    }
    emit(event, data) {
        // Check if element can send to others
        if (this.permissions.canSendTo.length === 0) {
            throw new Error('Element cannot send events');
        }
        // Include source element ID
        this.actualAPI.emit(event, {
            source: this.elementId,
            data
        });
    }
    on(event, handler) {
        // Wrap handler to check permissions
        const wrappedHandler = (payload) => {
            // Check if this element can receive from the source
            const canReceive = this.permissions.canReceiveFrom.includes('*') ||
                this.permissions.canReceiveFrom.includes(payload.source);
            if (canReceive) {
                handler(payload.data);
            }
        };
        return this.actualAPI.on(event, wrappedHandler);
    }
}
exports.ElementAPIProxy = ElementAPIProxy;
