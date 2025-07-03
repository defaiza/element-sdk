# @defai/element-react

React hooks and components for building DEFAI elements.

## Installation

```bash
npm install @defai/element-react @defai/element-sdk react
```

## Quick Start

```tsx
import React from 'react';
import { 
  ElementProvider, 
  useElementContext, 
  useElementAPI,
  useElementState 
} from '@defai/element-react';

function MyElementComponent() {
  const context = useElementContext();
  const api = useElementAPI();
  const [state, setState] = useElementState({
    counter: 0
  });
  
  const handleIncrement = () => {
    setState({ counter: state.counter + 1 });
  };
  
  return (
    <div>
      <h1>Count: {state.counter}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <p>Element ID: {context.elementId}</p>
    </div>
  );
}

// In your element class
export class MyElement extends DefaiElement {
  async onMount(context: ElementContext): Promise<void> {
    const root = document.getElementById('element-root');
    ReactDOM.render(
      <ElementProvider context={context}>
        <MyElementComponent />
      </ElementProvider>,
      root
    );
  }
}
```

## Hooks

### `useElementContext()`

Access the full element context.

```tsx
const context = useElementContext();
console.log(context.elementId, context.userTier, context.theme);
```

### `useElementAPI()`

Access element APIs directly.

```tsx
const api = useElementAPI();

// Use storage
await api.storage.set('key', 'value');
const value = await api.storage.get('key');

// Check wallet
if (api.wallet.isConnected()) {
  const balance = await api.wallet.getBalance();
}
```

### `useElementState<T>(initialState)`

Manage element state with React hooks.

```tsx
const [state, setState] = useElementState({
  isLoading: false,
  data: null,
  error: null
});

// Update state
setState({ isLoading: true });

// Partial updates
setState({ data: newData });
```

### `useElementEvents()`

Handle element events easily.

```tsx
const { emit, on } = useElementEvents();

// Emit events
const handleClick = () => {
  emit('button-clicked', { timestamp: Date.now() });
};

// Listen to events
useEffect(() => {
  const unsubscribe = on('external-data', (data) => {
    console.log('Received:', data);
  });
  
  return unsubscribe;
}, []);
```

### `useElementSize()`

Responsive design based on element size.

```tsx
const { width, height, isCompact } = useElementSize();

return (
  <div className={isCompact ? 'compact-view' : 'full-view'}>
    {isCompact ? <CompactLayout /> : <FullLayout />}
  </div>
);
```

### `useElementTheme()`

Access and respond to theme changes.

```tsx
const theme = useElementTheme();

return (
  <div className={theme === 'dark' ? 'dark-mode' : 'light-mode'}>
    {/* Your content */}
  </div>
);
```

### `useElementStorage<T>(key, defaultValue)`

Persistent storage with React state.

```tsx
const [settings, saveSettings, clearSettings] = useElementStorage('settings', {
  notifications: true,
  autoRefresh: false
});

const toggleNotifications = async () => {
  await saveSettings({
    ...settings,
    notifications: !settings.notifications
  });
};
```

### `useElementWallet()`

Wallet connection and balance tracking.

```tsx
const { connected, address, balance } = useElementWallet();

if (!connected) {
  return <div>Please connect your wallet</div>;
}

return (
  <div>
    <p>Address: {address}</p>
    <p>Balance: {balance} SOL</p>
  </div>
);
```

### `useElementPrices(symbols)`

Real-time price subscriptions.

```tsx
const { prices, loading } = useElementPrices(['SOL', 'BTC', 'ETH']);

if (loading) return <div>Loading prices...</div>;

return (
  <div>
    {Object.entries(prices).map(([symbol, price]) => (
      <div key={symbol}>{symbol}: ${price}</div>
    ))}
  </div>
);
```

## Components

### `<ElementProvider>`

Provides element context to child components.

```tsx
<ElementProvider context={elementContext}>
  <App />
</ElementProvider>
```

### `<ElementErrorBoundary>`

Catch and display element errors gracefully.

```tsx
<ElementErrorBoundary fallback={<ErrorFallback />}>
  <YourElement />
</ElementErrorBoundary>
```

### `<ElementLoader>`

Loading state component.

```tsx
if (isLoading) {
  return <ElementLoader message="Loading data..." />;
}
```

### `<ElementPermissionCheck>`

Conditionally render based on permissions.

```tsx
<ElementPermissionCheck permission="wallet" fallback={<NoWalletAccess />}>
  <WalletFeatures />
</ElementPermissionCheck>
```

## Advanced Usage

### Custom Hooks

Create custom hooks for your element logic:

```tsx
function useTokenPair(token1: string, token2: string) {
  const api = useElementAPI();
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const [price1, price2] = await Promise.all([
        api.prices.get(token1),
        api.prices.get(token2)
      ]);
      
      setData({
        [token1]: price1,
        [token2]: price2,
        ratio: price1 / price2
      });
    };
    
    fetchData();
    const interval = setInterval(fetchData, 5000);
    
    return () => clearInterval(interval);
  }, [token1, token2]);
  
  return data;
}
```

### TypeScript Support

Full TypeScript support with type inference:

```tsx
interface MyElementState {
  counter: number;
  items: string[];
  settings: {
    theme: 'light' | 'dark';
    refreshRate: number;
  };
}

const [state, setState] = useElementState<MyElementState>({
  counter: 0,
  items: [],
  settings: {
    theme: 'dark',
    refreshRate: 5000
  }
});
```

## Best Practices

1. **Always wrap your app** with `ElementProvider`
2. **Use error boundaries** to handle component errors
3. **Clean up subscriptions** in useEffect returns
4. **Memoize expensive computations** with useMemo
5. **Handle loading states** for async operations
6. **Check permissions** before using restricted APIs
7. **Optimize re-renders** with React.memo

## License

MIT