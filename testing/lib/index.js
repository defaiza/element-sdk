"use strict";
/**
 * @defai/element-testing
 * Testing utilities for DEFAI elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestElement = exports.createMockContext = void 0;
var element_sdk_1 = require("@defai/element-sdk");
Object.defineProperty(exports, "createMockContext", { enumerable: true, get: function () { return element_sdk_1.createMockContext; } });
function createTestElement(overrides) {
    return {
        metadata: {
            id: 'test-element',
            name: 'Test Element',
            version: '1.0.0',
            author: 'Test',
            description: 'Test element',
            category: 'Utilities',
            tags: ['test'],
            icon: '🧪',
            minSize: { width: 300, height: 200 },
            maxSize: { width: 800, height: 600 },
            defaultSize: { width: 400, height: 300 },
            tierRequired: 'free',
            ...overrides?.metadata
        },
        permissions: {
            network: false,
            storage: true,
            notifications: false,
            clipboard: false,
            canReceiveFrom: [],
            canSendTo: [],
            portfolio: false,
            transactions: false,
            aiChat: false,
            wallet: false,
            ...overrides?.permissions
        }
    };
}
exports.createTestElement = createTestElement;
