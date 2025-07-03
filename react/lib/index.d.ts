/**
 * @defai/element-react
 * React components and hooks for DEFAI elements
 */
export type { ElementContext, ElementState, ElementAPI, ElementMetadata, ElementPermissions } from '@defai/element-sdk';
/**
 * Hook for element state management
 */
export declare function useElementState<T extends Record<string, any>>(initialState: T): readonly [T, (updates: Partial<T>) => void];
/**
 * Hook for element events
 */
export declare function useElementEvents(): {
    emit: (event: string, data: any) => void;
    on: (event: string, handler: Function) => () => void;
};
/**
 * Hook for element size
 */
export declare function useElementSize(): {
    width: number;
    height: number;
};
/**
 * Hook for element theme
 */
export declare function useElementTheme(): "light" | "dark";
