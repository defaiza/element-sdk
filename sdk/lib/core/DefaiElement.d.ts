/**
 * DefaiElement base class
 * All elements must extend this class
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { ElementMetadata, ElementPermissions, ElementContext, ElementSize, ElementState, ElementSettings } from '../interfaces';
export declare abstract class DefaiElement extends EventEmitter {
    abstract readonly metadata: ElementMetadata;
    abstract readonly permissions: ElementPermissions;
    protected state: ElementState;
    protected context?: ElementContext;
    private mounted;
    constructor();
    abstract onMount(context: ElementContext): void | Promise<void>;
    abstract onUnmount(): void | Promise<void>;
    abstract onResize(size: ElementSize): void | Promise<void>;
    abstract onSettingsChange(settings: ElementSettings): void | Promise<void>;
    onFocus?(): void | Promise<void>;
    onBlur?(): void | Promise<void>;
    onError?(error: Error): void | Promise<void>;
    protected setState(newState: Partial<ElementState>): void;
    protected getState(): ElementState;
    protected saveData(key: string, value: any): Promise<void>;
    protected loadData(key: string): Promise<any>;
    protected emitToOthers(event: string, data: any): void;
    protected onFromOthers(event: string, handler: (data: any) => void): () => void;
    _mount(context: ElementContext): Promise<void>;
    _unmount(): Promise<void>;
    _resize(size: ElementSize): Promise<void>;
    _settingsChange(settings: ElementSettings): Promise<void>;
    protected get isMounted(): boolean;
    protected get currentContext(): ElementContext | undefined;
}
