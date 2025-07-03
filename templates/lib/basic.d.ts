/**
 * Basic Element Template
 * A simple element template to get started
 */
import { DefaiElement, ElementContext, ElementMetadata, ElementPermissions } from '@defai/element-sdk';
export declare class BasicElement extends DefaiElement {
    readonly metadata: ElementMetadata;
    readonly permissions: ElementPermissions;
    onMount(context: ElementContext): Promise<void>;
    onUnmount(): Promise<void>;
    onResize(size: {
        width: number;
        height: number;
    }): Promise<void>;
    onSettingsChange(settings: any): Promise<void>;
}
