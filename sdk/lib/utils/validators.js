"use strict";
/**
 * Validator utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateManifest = exports.validateElementName = void 0;
const ElementValidator_1 = require("../core/ElementValidator");
/**
 * Validate element name
 */
function validateElementName(name) {
    return ElementValidator_1.ElementValidator.validateName(name);
}
exports.validateElementName = validateElementName;
/**
 * Validate element manifest
 */
function validateManifest(manifest) {
    return ElementValidator_1.ElementValidator.validateManifest(manifest);
}
exports.validateManifest = validateManifest;
