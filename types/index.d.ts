/**
 * @defai/element-types
 * TypeScript type definitions for DEFAI Element SDK
 */

declare module '@defai/element-types' {
  // Size and Position
  export interface ElementSize {
    width: number;
    height: number;
  }

  export interface ElementPosition {
    x: number;
    y: number;
  }

  // Element Metadata
  export interface ElementMetadata {
    id: string;
    name: string;
    version: string;
    author: string;
    authorWallet?: string;
    description: string;
    category: ElementCategory;
    tags: string[];
    icon: string;
    screenshots: string[];
    minSize: ElementSize;
    maxSize: ElementSize;
    defaultSize: ElementSize;
    tierRequired: UserTier;
    price?: number;
    royaltyPercentage?: number;
    dependencies?: string[];
    repository?: string;
    documentation?: string;
    changelog?: string;
  }

  // Permissions
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
    maxMemory: number;
    maxCpu: number;
    maxStorageSize: number;
    camera?: boolean;
    microphone?: boolean;
    geolocation?: boolean;
    fullscreen?: boolean;
  }

  // Element Context
  export interface ElementContext {
    elementId: string;
    version: string;
    isDevelopment: boolean;
    userTier: UserTier;
    userWallet?: string;
    containerSize: ElementSize;
    theme: 'light' | 'dark';
    locale: string;
    api: ElementAPI;
    emit: (event: string, data?: any) => void;
    on: (event: string, handler: Function) => void;
    off: (event: string, handler: Function) => void;
  }

  // API Interfaces
  export interface ElementAPI {
    storage: StorageAPI;
    wallet: WalletAPI;
    prices: PricesAPI;
    network: NetworkAPI;
    notifications: NotificationsAPI;
    ai: AIAPI;
    analytics: AnalyticsAPI;
    communication: CommunicationAPI;
  }

  export interface StorageAPI {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    remove: (key: string) => Promise<void>;
    clear: () => Promise<void>;
    getUsage: () => Promise<{ used: number; limit: number }>;
  }

  export interface WalletAPI {
    isConnected: () => boolean;
    getAddress: () => string | null;
    getBalance: () => Promise<number>;
    getTokens: () => Promise<TokenBalance[]>;
    signMessage: (message: string) => Promise<string>;
  }

  export interface PricesAPI {
    get: (symbol: string) => Promise<number>;
    getMultiple: (symbols: string[]) => Promise<{ [symbol: string]: number }>;
    subscribe: (symbols: string[], callback: (prices: { [symbol: string]: number }) => void) => () => void;
  }

  export interface NetworkAPI {
    fetch: (url: string, options?: RequestInit) => Promise<Response>;
    websocket: (url: string) => WebSocket;
  }

  export interface NotificationsAPI {
    show: (title: string, options?: NotificationOptions) => Promise<void>;
    requestPermission: () => Promise<NotificationPermission>;
  }

  export interface AIAPI {
    sendMessage: (message: string) => Promise<string>;
    analyzeImage: (imageData: string) => Promise<AIImageAnalysis>;
    getTokenAnalysis: (symbol: string) => Promise<AITokenAnalysis>;
  }

  export interface AnalyticsAPI {
    track: (event: string, properties?: any) => void;
    identify: (userId: string, traits?: any) => void;
    page: (name: string, properties?: any) => void;
  }

  export interface CommunicationAPI {
    send: (targetElementId: string, event: string, data: any) => void;
    broadcast: (event: string, data: any) => void;
    request: (targetElementId: string, action: string, params?: any) => Promise<any>;
  }

  // Data Types
  export interface TokenBalance {
    symbol: string;
    name: string;
    balance: number;
    value: number;
    address: string;
    decimals: number;
    logo?: string;
  }

  export interface AIImageAnalysis {
    description: string;
    labels: string[];
    confidence: number;
    suggestions?: string[];
  }

  export interface AITokenAnalysis {
    sentiment: 'bullish' | 'bearish' | 'neutral';
    summary: string;
    keyPoints: string[];
    riskLevel: 'low' | 'medium' | 'high';
    technicalIndicators?: any;
  }

  export interface NotificationOptions {
    body?: string;
    icon?: string;
    badge?: string;
    tag?: string;
    requireInteraction?: boolean;
    actions?: NotificationAction[];
  }

  export interface NotificationAction {
    action: string;
    title: string;
    icon?: string;
  }

  // Element Types
  export type ElementCategory = 
    | 'Trading'
    | 'Analytics' 
    | 'DEFAI'
    | 'Productivity'
    | 'Social'
    | 'Games'
    | 'Utilities'
    | 'Information'
    | 'AI Tools'
    | 'Developer Tools'
    | 'Communication'
    | 'Entertainment';

  export type UserTier = 'free' | 'bronze' | 'silver' | 'gold' | 'titanium' | 'infinite';

  export interface ElementState {
    [key: string]: any;
  }

  export interface ElementSettings {
    [key: string]: any;
  }

  // Element Bundle
  export interface ElementBundle {
    manifest: ElementManifest;
    code: string;
    styles?: string;
    assets?: { [path: string]: string };
    signature?: string;
  }

  export interface ElementManifest {
    metadata: ElementMetadata;
    permissions: ElementPermissions;
    entryPoint: string;
    files: string[];
    checksum: string;
    buildTime: number;
    sdkVersion: string;
  }

  // Validation
  export interface ElementValidationResult {
    valid: boolean;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    score: number;
  }

  export interface ValidationError {
    code: string;
    message: string;
    file?: string;
    line?: number;
    severity: 'error' | 'critical';
  }

  export interface ValidationWarning {
    code: string;
    message: string;
    file?: string;
    line?: number;
    severity: 'warning' | 'info';
  }

  // Marketplace
  export interface ElementMarketplaceData {
    elementId: string;
    downloads: number;
    rating: number;
    reviews: number;
    revenue: number;
    featured: boolean;
    verified: boolean;
    lastUpdated: number;
  }

  export interface ElementReview {
    id: string;
    elementId: string;
    userId: string;
    rating: number;
    comment: string;
    timestamp: number;
    helpful: number;
    verified: boolean;
  }

  export interface ElementTransaction {
    id: string;
    elementId: string;
    buyerWallet: string;
    sellerWallet: string;
    price: number;
    royalty: number;
    timestamp: number;
    txHash: string;
    status: 'pending' | 'completed' | 'failed';
  }

  // Performance
  export interface ElementPerformanceMetrics {
    loadTime: number;
    memoryUsage: number;
    cpuUsage: number;
    renderTime: number;
    apiCalls: number;
    errors: number;
  }

  // Testing
  export interface ElementTestResult {
    passed: boolean;
    tests: {
      name: string;
      passed: boolean;
      duration: number;
      error?: string;
    }[];
    coverage: {
      lines: number;
      statements: number;
      functions: number;
      branches: number;
    };
  }

  // Lifecycle
  export interface ElementLifecycleEvent {
    type: 'mount' | 'unmount' | 'resize' | 'settings-change' | 'pause' | 'resume' | 'error';
    timestamp: number;
    data?: any;
  }

  // Element Base Class (for reference)
  export abstract class DefaiElement<TState = ElementState> {
    abstract readonly metadata: ElementMetadata;
    abstract readonly permissions: ElementPermissions;
    protected context: ElementContext;
    
    abstract onMount(context: ElementContext): void | Promise<void>;
    abstract onUnmount(): void | Promise<void>;
    abstract onResize(size: ElementSize): void | Promise<void>;
    abstract onSettingsChange(settings: ElementSettings): void | Promise<void>;
    
    onPause?(): void | Promise<void>;
    onResume?(): void | Promise<void>;
    onError?(error: Error): void | Promise<void>;
    
    getState(): TState;
    setState(state: Partial<TState>): void;
    emit(event: string, data?: any): void;
    on(event: string, handler: Function): void;
    off(event: string, handler: Function): void;
    saveData(key: string, value: any): Promise<void>;
    loadData(key: string): Promise<any>;
    track(event: string, properties?: any): void;
  }
}