"use strict";
/**
 * @defai/element-sdk
 * Core SDK for building DEFAI elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK_VERSION = exports.PERMISSION_TYPES = exports.USER_TIERS = exports.ELEMENT_CATEGORIES = exports.ElementEventEmitter = exports.validateManifest = exports.validateElementName = exports.createMockContext = exports.ElementValidator = exports.ElementAPIProxy = exports.ElementSandbox = exports.DefaiElement = void 0;
// Core exports
var DefaiElement_1 = require("./core/DefaiElement");
Object.defineProperty(exports, "DefaiElement", { enumerable: true, get: function () { return DefaiElement_1.DefaiElement; } });
var ElementSandbox_1 = require("./sandbox/ElementSandbox");
Object.defineProperty(exports, "ElementSandbox", { enumerable: true, get: function () { return ElementSandbox_1.ElementSandbox; } });
var ElementAPIProxy_1 = require("./api/ElementAPIProxy");
Object.defineProperty(exports, "ElementAPIProxy", { enumerable: true, get: function () { return ElementAPIProxy_1.ElementAPIProxy; } });
var ElementValidator_1 = require("./core/ElementValidator");
Object.defineProperty(exports, "ElementValidator", { enumerable: true, get: function () { return ElementValidator_1.ElementValidator; } });
// Utility exports
var mockContext_1 = require("./testing/mockContext");
Object.defineProperty(exports, "createMockContext", { enumerable: true, get: function () { return mockContext_1.createMockContext; } });
var validators_1 = require("./utils/validators");
Object.defineProperty(exports, "validateElementName", { enumerable: true, get: function () { return validators_1.validateElementName; } });
Object.defineProperty(exports, "validateManifest", { enumerable: true, get: function () { return validators_1.validateManifest; } });
var eventEmitter_1 = require("./utils/eventEmitter");
Object.defineProperty(exports, "ElementEventEmitter", { enumerable: true, get: function () { return eventEmitter_1.ElementEventEmitter; } });
// Constants
exports.ELEMENT_CATEGORIES = [
    'Trading',
    'Analytics',
    'DEFAI',
    'Productivity',
    'AI Tools',
    'Information',
    'Utilities',
    'Games',
    'Developer Tools',
    'Communication',
    'Entertainment'
];
exports.USER_TIERS = [
    'free',
    'bronze',
    'silver',
    'gold',
    'titanium',
    'infinite'
];
exports.PERMISSION_TYPES = [
    'storage',
    'wallet',
    'network',
    'notifications',
    'clipboard',
    'portfolio',
    'transactions',
    'aiChat'
];
// Version
exports.SDK_VERSION = '1.0.0';
