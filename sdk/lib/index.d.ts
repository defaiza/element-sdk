/**
 * @defai/element-sdk
 * Core SDK for building DEFAI elements
 */
export { DefaiElement } from './core/DefaiElement';
export { ElementSandbox } from './sandbox/ElementSandbox';
export { ElementAPIProxy } from './api/ElementAPIProxy';
export { ElementValidator } from './core/ElementValidator';
export type { ElementMetadata, ElementPermissions, ElementContext, ElementSize, ElementState, ElementSettings, ElementLifecycleEvent, ElementBundle, ElementManifest, ElementAPI, TokenBalance, AIImageAnalysis, AITokenAnalysis, NotificationOptions, NotificationAction, ElementValidationResult, ValidationError, ValidationWarning, ElementMarketplaceData, ElementReview, ElementTransaction, ElementCategory, UserTier, ElementTestResult, ElementPerformanceMetrics } from './interfaces';
export { createMockContext } from './testing/mockContext';
export { validateElementName, validateManifest } from './utils/validators';
export { ElementEventEmitter } from './utils/eventEmitter';
export declare const ELEMENT_CATEGORIES: readonly ["Trading", "Analytics", "DEFAI", "Productivity", "AI Tools", "Information", "Utilities", "Games", "Developer Tools", "Communication", "Entertainment"];
export declare const USER_TIERS: readonly ["free", "bronze", "silver", "gold", "titanium", "infinite"];
export declare const PERMISSION_TYPES: readonly ["storage", "wallet", "network", "notifications", "clipboard", "portfolio", "transactions", "aiChat"];
export declare const SDK_VERSION = "1.0.0";
