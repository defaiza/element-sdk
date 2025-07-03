/**
 * @defai/element-testing
 * Testing utilities for DEFAI elements
 */

export { createMockContext } from '@defai/element-sdk';

export function createTestElement(overrides?: any) {
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