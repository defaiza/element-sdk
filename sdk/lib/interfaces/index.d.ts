/**
 * @defai/element-sdk interfaces
 * Type definitions for DEFAI elements
 */
export interface ElementMetadata {
    id: string;
    name: string;
    version: string;
    author: string;
    description: string;
    category: ElementCategory;
    tags: string[];
    icon: string;
    screenshots?: string[];
    minSize: ElementSize;
    maxSize: ElementSize;
    defaultSize: ElementSize;
    tierRequired: UserTier;
    price?: number;
}
export interface ElementPermissions {
    network: boolean;
    storage: boolean;
    notifications: boolean;
    clipboard: boolean;
    canReceiveFrom: string[];
    canSendTo: string[];
    portfolio: boolean;
    transactions: boolean;
    aiChat: boolean;
    wallet: boolean;
    maxMemory?: number;
    maxCpu?: number;
}
export interface ElementContext {
    api: ElementAPI;
    userId: string;
    userTier: UserTier;
    theme: 'light' | 'dark';
    locale: string;
    containerSize: ElementSize;
}
export interface ElementSize {
    width: number;
    height: number;
}
export interface ElementState {
    [key: string]: any;
}
export interface ElementSettings {
    [key: string]: any;
}
export type ElementLifecycleEvent = 'mount' | 'unmount' | 'resize' | 'settingsChange' | 'focus' | 'blur' | 'error';
export interface ElementBundle {
    manifest: ElementManifest;
    code: string;
    styles?: string;
    assets?: Record<string, string>;
}
export interface ElementManifest {
    metadata: ElementMetadata;
    permissions: ElementPermissions;
    dependencies?: Record<string, string>;
    build?: {
        entry: string;
        output: string;
        framework?: 'react' | 'vue' | 'vanilla';
    };
}
export interface ElementAPI {
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
export interface TokenBalance {
    mint: string;
    symbol: string;
    name: string;
    amount: number;
    decimals: number;
    usdValue?: number;
    logoUri?: string;
}
export interface AIImageAnalysis {
    objects: string[];
    text: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
    confidence: number;
}
export interface AITokenAnalysis {
    summary: string;
    riskScore: number;
    sentiment: 'bullish' | 'bearish' | 'neutral';
    keyMetrics: Record<string, any>;
}
export interface NotificationOptions {
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    actions?: NotificationAction[];
    duration?: number;
}
export interface NotificationAction {
    label: string;
    action: string;
}
export interface ElementValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
}
export interface ValidationError {
    code: string;
    message: string;
    field?: string;
}
export interface ValidationWarning {
    code: string;
    message: string;
    field?: string;
}
export interface ElementMarketplaceData {
    elementId: string;
    downloads: number;
    rating: number;
    reviews: ElementReview[];
    revenue: number;
    lastUpdated: Date;
}
export interface ElementReview {
    userId: string;
    rating: number;
    comment: string;
    timestamp: Date;
}
export interface ElementTransaction {
    id: string;
    elementId: string;
    userId: string;
    amount: number;
    type: 'purchase' | 'subscription' | 'in-app';
    timestamp: Date;
}
export type ElementCategory = 'Trading' | 'Analytics' | 'DEFAI' | 'Productivity' | 'AI Tools' | 'Information' | 'Utilities' | 'Games' | 'Developer Tools' | 'Communication' | 'Entertainment';
export type UserTier = 'free' | 'bronze' | 'silver' | 'gold' | 'titanium' | 'infinite';
export interface ElementTestResult {
    passed: boolean;
    tests: {
        name: string;
        passed: boolean;
        error?: string;
        duration: number;
    }[];
    coverage?: {
        statements: number;
        branches: number;
        functions: number;
        lines: number;
    };
}
export interface ElementPerformanceMetrics {
    loadTime: number;
    memoryUsage: number;
    cpuUsage: number;
    renderTime: number;
    errors: number;
}
