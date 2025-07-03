/**
 * @defai/element-react
 * React components and hooks for DEFAI elements
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// Re-export types from SDK
export type { 
  ElementContext, 
  ElementState, 
  ElementAPI,
  ElementMetadata,
  ElementPermissions
} from '@defai/element-sdk';

/**
 * Hook for element state management
 */
export function useElementState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  
  const updateState = useCallback((updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);
  
  return [state, updateState] as const;
}

/**
 * Hook for element events
 */
export function useElementEvents() {
  const handlersRef = useRef<Map<string, Set<Function>>>(new Map());
  
  const emit = useCallback((event: string, data: any) => {
    const handlers = handlersRef.current.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }, []);
  
  const on = useCallback((event: string, handler: Function) => {
    if (!handlersRef.current.has(event)) {
      handlersRef.current.set(event, new Set());
    }
    handlersRef.current.get(event)!.add(handler);
    
    // Return unsubscribe function
    return () => {
      const handlers = handlersRef.current.get(event);
      if (handlers) {
        handlers.delete(handler);
      }
    };
  }, []);
  
  return { emit, on };
}

/**
 * Hook for element size
 */
export function useElementSize() {
  const [size, setSize] = useState({ width: 400, height: 600 });
  
  useEffect(() => {
    const handleResize = () => {
      // In production, get size from element container
      const container = document.getElementById('element-root');
      if (container) {
        setSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

/**
 * Hook for element theme
 */
export function useElementTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // In production, get theme from element context
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return theme;
} 