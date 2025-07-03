/**
 * ElementEventEmitter
 * Enhanced event emitter for elements
 */
import { EventEmitter } from 'events';
export declare class ElementEventEmitter extends EventEmitter {
    private eventHistory;
    private maxHistorySize;
    constructor();
    /**
     * Emit an event and record it in history
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     * Get event history
     */
    getHistory(event?: string): Array<{
        event: string;
        data: any;
        timestamp: number;
    }>;
    /**
     * Clear event history
     */
    clearHistory(): void;
    /**
     * Set maximum history size
     */
    setMaxHistorySize(size: number): void;
    /**
     * Once with timeout
     */
    onceWithTimeout(event: string, handler: (...args: any[]) => void, timeout: number): void;
    /**
     * Wait for event (promise-based)
     */
    waitFor(event: string, timeout?: number): Promise<any>;
}
