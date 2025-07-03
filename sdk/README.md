# @defai/element-sdk

Core SDK for building DEFAI elements.

## Installation

```bash
npm install @defai/element-sdk
```

## Quick Start

```typescript
import { DefaiElement, ElementContext, ElementMetadata, ElementPermissions } from '@defai/element-sdk';

export class MyElement extends DefaiElement {
  readonly metadata: ElementMetadata = {
    id: 'my-element',
    name: 'My Element',
    version: '1.0.0',
    author: 'Your Name',
    description: 'A custom DEFAI element',
    category: 'Utilities',
    tags: ['custom'],
    icon: '🔧',
    screenshots: [],
    minSize: { width: 200, height: 150 },
    maxSize: { width: 800, height: 600 },
    defaultSize: { width: 400, height: 300 },
    tierRequired: 'free'
  };
  
  readonly permissions: ElementPermissions = {
    storage: true,
    wallet: false,
    network: false,
    notifications: false,
    clipboard: false,
    canReceiveFrom: [],
    canSendTo: [],
    portfolio: false,
    transactions: false,
    aiChat: false,
    maxMemory: 50,
    maxCpu: 10,
    maxStorageSize: 5
  };
  
  async onMount(context: ElementContext): Promise<void> {
    console.log('Element mounted!');
    // Initialize your element
  }
  
  async onUnmount(): Promise<void> {
    console.log('Element unmounting...');
    // Cleanup
  }
  
  async onResize(size: { width: number; height: number }): Promise<void> {
    console.log('Element resized:', size);
  }
  
  async onSettingsChange(settings: any): Promise<void> {
    console.log('Settings changed:', settings);
  }
}
```

## Core Features

### State Management

```typescript
// Set state
this.setState({ counter: 0 });

// Get state
const state = this.getState();
```

### Storage API

```typescript
// Save data
await this.saveData('preferences', { theme: 'dark' });

// Load data
const prefs = await this.loadData('preferences');
```

### Event System

```typescript
// Emit events
this.emit('data-updated', { value: 42 });

// Listen to events
this.on('external-event', (data) => {
  console.log('Received:', data);
});
```

### Element Communication

```typescript
// Send to specific element
this.context.api.communication.send('other-element-id', 'message', data);

// Broadcast to all elements
this.context.api.communication.broadcast('announcement', data);
```

## API Access

### Wallet API

```typescript
if (this.context.api.wallet.isConnected()) {
  const balance = await this.context.api.wallet.getBalance();
  const tokens = await this.context.api.wallet.getTokens();
}
```

### Price API

```typescript
// Get single price
const solPrice = await this.context.api.prices.get('SOL');

// Subscribe to prices
const unsubscribe = this.context.api.prices.subscribe(['SOL', 'BTC'], (prices) => {
  console.log('Updated prices:', prices);
});
```

### AI API

```typescript
// Chat with AI
const response = await this.context.api.ai.sendMessage('What is the current market trend?');

// Get token analysis
const analysis = await this.context.api.ai.getTokenAnalysis('SOL');
```

### Network API

```typescript
// Fetch data
const response = await this.context.api.network.fetch('https://api.example.com/data');
const data = await response.json();

// WebSocket connection
const ws = this.context.api.network.websocket('wss://stream.example.com');
```

## Best Practices

1. **Always check permissions** before using APIs
2. **Handle errors gracefully** with try-catch blocks
3. **Clean up resources** in onUnmount
4. **Optimize for different sizes** in onResize
5. **Use TypeScript** for better type safety
6. **Follow security guidelines** - no eval, no direct DOM access
7. **Test thoroughly** with the testing utilities

## Documentation

For full documentation, visit: https://docs.defai.com/elements

## License

MIT