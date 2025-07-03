/**
 * ElementSandbox
 * Provides isolation and security for element execution
 */
import { ElementPermissions } from '../interfaces';
export declare class ElementSandbox {
    private iframe?;
    private permissions;
    private elementId;
    private messageHandlers;
    constructor(elementId: string, permissions: ElementPermissions);
    /**
     * Create the sandbox iframe
     */
    createSandbox(container: HTMLElement): void;
    /**
     * Load element code into the sandbox
     */
    loadElement(code: string, styles?: string): void;
    /**
     * Destroy the sandbox
     */
    destroy(): void;
    /**
     * Send message to the element
     */
    sendMessage(type: string, data: any): void;
    /**
     * Register a message handler
     */
    onMessage(type: string, handler: Function): void;
    /**
     * Setup message channel for communication
     */
    private setupMessageChannel;
    /**
     * Get Content Security Policy
     */
    private getCSP;
    /**
     * Create API proxy for the element
     */
    private createAPIProxy;
}
