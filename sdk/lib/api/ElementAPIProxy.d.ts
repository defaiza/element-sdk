/**
 * ElementAPIProxy
 * Handles API calls from elements with permission checks
 */
import { ElementAPI, ElementPermissions, TokenBalance, NotificationOptions, AIImageAnalysis, AITokenAnalysis } from '../interfaces';
export declare class ElementAPIProxy implements ElementAPI {
    private permissions;
    private elementId;
    private actualAPI;
    constructor(elementId: string, permissions: ElementPermissions, actualAPI: ElementAPI);
    getPortfolio(): Promise<TokenBalance[]>;
    getTransactions(limit?: number): Promise<any[]>;
    getPrices(symbols: string[]): Promise<Record<string, number>>;
    saveData(key: string, value: any): Promise<void>;
    loadData(key: string): Promise<any>;
    sendNotification(options: NotificationOptions): void;
    analyzeImage(imageData: string): Promise<AIImageAnalysis>;
    analyzeToken(tokenAddress: string): Promise<AITokenAnalysis>;
    emit(event: string, data: any): void;
    on(event: string, handler: (data: any) => void): () => void;
}
