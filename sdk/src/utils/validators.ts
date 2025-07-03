/**
 * Validator utility functions
 */

import { ElementManifest } from '../interfaces';
import { ElementValidator } from '../core/ElementValidator';

/**
 * Validate element name
 */
export function validateElementName(name: string): boolean {
  return ElementValidator.validateName(name);
}

/**
 * Validate element manifest
 */
export function validateManifest(manifest: ElementManifest) {
  return ElementValidator.validateManifest(manifest);
} 