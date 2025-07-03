/**
 * Validator utility functions
 */
import { ElementManifest } from '../interfaces';
/**
 * Validate element name
 */
export declare function validateElementName(name: string): boolean;
/**
 * Validate element manifest
 */
export declare function validateManifest(manifest: ElementManifest): import("../interfaces").ElementValidationResult;
