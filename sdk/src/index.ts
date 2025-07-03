/**
 * @defai/element-sdk
 * Core SDK for building DEFAI elements
 */

// Core exports
export { DefaiElement } from './core/DefaiElement';
export { ElementSandbox } from './sandbox/ElementSandbox';
export { ElementAPIProxy } from './api/ElementAPIProxy';
export { ElementValidator } from './core/ElementValidator';

// Interface exports
export type {
  // Core types
  ElementMetadata,
  ElementPermissions,
  ElementContext,
  ElementSize,
  ElementState,
  ElementSettings,
  ElementLifecycleEvent,
  ElementBundle,
  ElementManifest,
  
  // API types
  ElementAPI,
  TokenBalance,
  AIImageAnalysis,
  AITokenAnalysis,
  NotificationOptions,
  NotificationAction,
  
  // Validation types
  ElementValidationResult,
  ValidationError,
  ValidationWarning,
  
  // Marketplace types
  ElementMarketplaceData,
  ElementReview,
  ElementTransaction,
  
  // Other types
  ElementCategory,
  UserTier,
  ElementTestResult,
  ElementPerformanceMetrics
} from './interfaces';

// Utility exports
export { createMockContext } from './testing/mockContext';
export { validateElementName, validateManifest } from './utils/validators';
export { ElementEventEmitter } from './utils/eventEmitter';

// Constants
export const ELEMENT_CATEGORIES = [
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
] as const;

export const USER_TIERS = [
  'free',
  'bronze',
  'silver',
  'gold',
  'titanium',
  'infinite'
] as const;

export const PERMISSION_TYPES = [
  'storage',
  'wallet',
  'network',
  'notifications',
  'clipboard',
  'portfolio',
  'transactions',
  'aiChat'
] as const;

// Version
export const SDK_VERSION = '1.0.0';