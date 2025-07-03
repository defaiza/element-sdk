"use strict";
/**
 * Trading Element Template
 * A template for creating trading-related elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingElement = void 0;
const element_sdk_1 = require("@defai/element-sdk");
class TradingElement extends element_sdk_1.DefaiElement {
    constructor() {
        super(...arguments);
        this.metadata = {
            id: 'trading-element',
            name: 'Trading Element',
            version: '1.0.0',
            author: 'Your Name',
            description: 'A trading element with price tracking and wallet integration',
            category: 'Trading',
            tags: ['trading', 'prices', 'wallet'],
            icon: '📈',
            screenshots: [],
            minSize: { width: 300, height: 400 },
            maxSize: { width: 1200, height: 800 },
            defaultSize: { width: 600, height: 500 },
            tierRequired: 'bronze'
        };
        this.permissions = {
            storage: true,
            wallet: true,
            network: true,
            notifications: true,
            clipboard: false,
            canReceiveFrom: ['price-feed', 'portfolio-manager'],
            canSendTo: ['trade-executor'],
            portfolio: true,
            transactions: true,
            aiChat: true,
            maxMemory: 100,
            maxCpu: 20,
            maxStorageSize: 10
        };
    }
    async onMount(context) {
        console.log('Trading element mounted');
        // Initialize state
        this.setState({
            prices: {},
            balance: 0,
            selectedToken: 'SOL',
            isLoading: true
        });
        // Check wallet connection
        if (context.api.wallet.isConnected()) {
            const balance = await context.api.wallet.getBalance();
            const tokens = await context.api.wallet.getTokens();
            this.setState({
                balance,
                tokens,
                walletConnected: true
            });
        }
        // Subscribe to prices
        const symbols = ['SOL', 'BTC', 'ETH', 'DEFAI'];
        this.priceSubscription = context.api.prices.subscribe(symbols, (prices) => {
            this.setState({ prices, isLoading: false });
        });
        // Listen for trade signals
        this.on('trade-signal', async (data) => {
            console.log('Received trade signal:', data);
            // Handle trade signal
        });
    }
    async onUnmount() {
        // Cleanup subscriptions
        if (this.priceSubscription) {
            this.priceSubscription();
        }
    }
    async onResize(size) {
        // Adjust layout based on size
        const isCompact = size.width < 400 || size.height < 300;
        this.setState({ isCompact });
    }
    async onSettingsChange(settings) {
        // Update trading parameters
        if (settings.selectedToken) {
            this.setState({ selectedToken: settings.selectedToken });
        }
    }
    // Custom methods for trading functionality
    async executeTrade(type, amount) {
        const state = this.getState();
        if (!state.walletConnected) {
            await this.context.api.notifications.show('Wallet not connected', {
                body: 'Please connect your wallet to trade'
            });
            return;
        }
        // Emit trade request
        this.emit('trade-request', {
            type,
            token: state.selectedToken,
            amount,
            price: state.prices[state.selectedToken]
        });
        // Track analytics
        this.track('trade_attempted', {
            type,
            token: state.selectedToken,
            amount
        });
    }
    async getAIAnalysis() {
        const state = this.getState();
        const analysis = await this.context.api.ai.getTokenAnalysis(state.selectedToken);
        this.setState({ aiAnalysis: analysis });
        return analysis;
    }
}
exports.TradingElement = TradingElement;
