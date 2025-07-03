/**
 * Trading Element Template
 * A template for creating trading-related elements
 */
import { DefaiElement, ElementContext, ElementMetadata, ElementPermissions } from '@defai/element-sdk';
export declare class TradingElement extends DefaiElement {
    readonly metadata: ElementMetadata;
    readonly permissions: ElementPermissions;
    private priceSubscription?;
    onMount(context: ElementContext): Promise<void>;
    onUnmount(): Promise<void>;
    onResize(size: {
        width: number;
        height: number;
    }): Promise<void>;
    onSettingsChange(settings: any): Promise<void>;
    executeTrade(type: 'buy' | 'sell', amount: number): Promise<void>;
    getAIAnalysis(): Promise<any>;
}
