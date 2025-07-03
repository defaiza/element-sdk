/**
 * ElementValidator
 * Validates element manifests and code
 */
import { ElementManifest, ElementValidationResult } from '../interfaces';
export declare class ElementValidator {
    /**
     * Validate a element manifest
     */
    static validateManifest(manifest: ElementManifest): ElementValidationResult;
    /**
     * Validate element code
     */
    static validateCode(code: string): ElementValidationResult;
    /**
     * Validate element name
     */
    static validateName(name: string): boolean;
}
