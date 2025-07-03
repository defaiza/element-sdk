/**
 * @defai/element-templates
 * Element templates for quick starts
 */

export const basicTemplate = `
import { DefaiElement } from '@defai/element-sdk';

export class BasicElement extends DefaiElement {
  metadata = {
    id: 'basic-element',
    name: 'Basic Element',
    version: '1.0.0',
    author: 'Your Name',
    description: 'A basic element template',
    category: 'Utilities',
    tags: ['basic', 'template'],
    icon: '📦',
    minSize: { width: 300, height: 200 },
    maxSize: { width: 800, height: 600 },
    defaultSize: { width: 400, height: 300 },
    tierRequired: 'free'
  };
  
  permissions = {
    network: false,
    storage: true,
    notifications: false,
    clipboard: false,
    canReceiveFrom: [],
    canSendTo: [],
    portfolio: false,
    transactions: false,
    aiChat: false,
    wallet: false
  };
  
  async onMount(context) {
    console.log('Element mounted');
  }
  
  async onUnmount() {
    console.log('Element unmounted');
  }
  
  async onResize(size) {
    console.log('Element resized', size);
  }
  
  async onSettingsChange(settings) {
    console.log('Settings changed', settings);
  }
}
`;

export const reactTemplate = `
import React from 'react';
import { DefaiElement } from '@defai/element-sdk';
import { createRoot } from 'react-dom/client';

class ReactElement extends DefaiElement {
  metadata = {
    id: 'react-element',
    name: 'React Element',
    version: '1.0.0',
    author: 'Your Name',
    description: 'A React-based element template',
    category: 'Utilities',
    tags: ['react', 'template'],
    icon: '⚛️',
    minSize: { width: 300, height: 200 },
    maxSize: { width: 800, height: 600 },
    defaultSize: { width: 400, height: 300 },
    tierRequired: 'free'
  };
  
  permissions = {
    network: false,
    storage: true,
    notifications: false,
    clipboard: false,
    canReceiveFrom: [],
    canSendTo: [],
    portfolio: false,
    transactions: false,
    aiChat: false,
    wallet: false
  };
  
  async onMount(context) {
    const root = createRoot(document.getElementById('element-root'));
    root.render(<App context={context} />);
  }
  
  async onUnmount() {
    // Cleanup
  }
  
  async onResize(size) {
    // Handle resize
  }
  
  async onSettingsChange(settings) {
    // Handle settings change
  }
}

function App({ context }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello from React Element!</h1>
      <p>User: {context.userId}</p>
      <p>Tier: {context.userTier}</p>
    </div>
  );
}

export default ReactElement;
`;

export function getTemplate(name: string): string {
  switch (name) {
    case 'basic':
      return basicTemplate;
    case 'react':
      return reactTemplate;
    default:
      return basicTemplate;
  }
} 