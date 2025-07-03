/**
 * Analytics Element Template
 * A template for creating data visualization and analytics elements
 */
import { DefaiElement, ElementContext, ElementMetadata, ElementPermissions } from '@defai/element-sdk';
export declare class AnalyticsElement extends DefaiElement {
    readonly metadata: ElementMetadata;
    readonly permissions: ElementPermissions;
    private dataUpdateInterval?;
    onMount(context: ElementContext): Promise<void>;
    onUnmount(): Promise<void>;
    onResize(size: {
        width: number;
        height: number;
    }): Promise<void>;
    onSettingsChange(settings: any): Promise<void>;
    private fetchAnalyticsData;
    private processDataForChart;
    private handleExternalData;
    private getAIInsights;
    exportData(format: 'csv' | 'json' | 'png'): Promise<void>;
    private convertToCSV;
}
