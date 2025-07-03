"use strict";
/**
 * @defai/element-react
 * React components and hooks for DEFAI elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementTheme = exports.useElementSize = exports.useElementEvents = exports.useElementState = void 0;
const react_1 = require("react");
/**
 * Hook for element state management
 */
function useElementState(initialState) {
    const [state, setState] = (0, react_1.useState)(initialState);
    const updateState = (0, react_1.useCallback)((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);
    return [state, updateState];
}
exports.useElementState = useElementState;
/**
 * Hook for element events
 */
function useElementEvents() {
    const handlersRef = (0, react_1.useRef)(new Map());
    const emit = (0, react_1.useCallback)((event, data) => {
        const handlers = handlersRef.current.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(data));
        }
    }, []);
    const on = (0, react_1.useCallback)((event, handler) => {
        if (!handlersRef.current.has(event)) {
            handlersRef.current.set(event, new Set());
        }
        handlersRef.current.get(event).add(handler);
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
exports.useElementEvents = useElementEvents;
/**
 * Hook for element size
 */
function useElementSize() {
    const [size, setSize] = (0, react_1.useState)({ width: 400, height: 600 });
    (0, react_1.useEffect)(() => {
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
exports.useElementSize = useElementSize;
/**
 * Hook for element theme
 */
function useElementTheme() {
    const [theme, setTheme] = (0, react_1.useState)('light');
    (0, react_1.useEffect)(() => {
        // In production, get theme from element context
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mediaQuery.matches ? 'dark' : 'light');
        const handler = (e) => {
            setTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);
    return theme;
}
exports.useElementTheme = useElementTheme;
