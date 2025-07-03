/**
 * AI Chat Element Template
 * A template for creating AI-powered chat elements
 */
import { DefaiElement, ElementContext, ElementMetadata, ElementPermissions } from '@defai/element-sdk';
export declare class AIChatElement extends DefaiElement {
    readonly metadata: ElementMetadata;
    readonly permissions: ElementPermissions;
    onMount(context: ElementContext): Promise<void>;
    onUnmount(): Promise<void>;
    onResize(size: {
        width: number;
        height: number;
    }): Promise<void>;
    onSettingsChange(settings: any): Promise<void>;
    sendMessage(content: string): Promise<void>;
    private handleCommand;
    private analyzeToken;
    private initiateTrade;
    private showPortfolio;
    private showHelp;
    private checkForActions;
    private generateId;
    private addSystemMessage;
    private formatAnalysis;
    private saveChatHistory;
    clearHistory(): Promise<void>;
    exportChat(format?: 'json' | 'markdown'): Promise<void>;
}
