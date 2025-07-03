"use strict";
/**
 * Validator utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateElementName = validateElementName;
exports.validateManifest = validateManifest;
const ElementValidator_1 = require("../core/ElementValidator");
/**
 * Validate element name
 */
function validateElementName(name) {
    return ElementValidator_1.ElementValidator.validateName(name);
}
/**
 * Validate element manifest
 */
function validateManifest(manifest) {
    return ElementValidator_1.ElementValidator.validateManifest(manifest);
}
