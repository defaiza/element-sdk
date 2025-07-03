"use strict";
/**
 * Mock context for testing elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockContext = createMockContext;
function createMockContext(overrides) {
    const mockAPI = {
        getPortfolio: async () => [
            {
                mint: 'So11111111111111111111111111111111111111112',
                symbol: 'SOL',
                name: 'Solana',
                amount: 10.5,
                decimals: 9,
                usdValue: 525,
                logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
            },
            {
                mint: 'DeFAi1111111111111111111111111111111111111',
                symbol: 'DEFAI',
                name: 'DEFAI Token',
                amount: 1000,
                decimals: 9,
                usdValue: 100,
                logoUri: 'https://defai.ai/logo.png'
            }
        ],
        getTransactions: async (limit = 10) => {
            const transactions = [];
            for (let i = 0; i < limit; i++) {
                transactions.push({
                    signature: `mock-sig-${i}`,
                    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
                    type: i % 2 === 0 ? 'send' : 'receive',
                    amount: Math.random() * 100,
                    token: 'SOL'
                });
            }
            return transactions;
        },
        getPrices: async (symbols) => {
            const prices = {};
            symbols.forEach(symbol => {
                switch (symbol) {
                    case 'SOL':
                        prices[symbol] = 50;
                        break;
                    case 'DEFAI':
                        prices[symbol] = 0.1;
                        break;
                    default:
                        prices[symbol] = Math.random() * 100;
                }
            });
            return prices;
        },
        saveData: async (key, value) => {
            // Mock implementation - in real tests, this could use localStorage or memory
            console.log(`Mock saveData: ${key} = ${JSON.stringify(value)}`);
        },
        loadData: async (key) => {
            // Mock implementation
            console.log(`Mock loadData: ${key}`);
            return null;
        },
        sendNotification: (options) => {
            console.log(`Mock notification: ${options.title} - ${options.message}`);
        },
        analyzeImage: async (imageData) => ({
            objects: ['chart', 'graph', 'data'],
            text: ['SOL', 'Price', '$50'],
            sentiment: 'positive',
            confidence: 0.85
        }),
        analyzeToken: async (tokenAddress) => ({
            summary: 'This is a mock token analysis',
            riskScore: 3.5,
            sentiment: 'neutral',
            keyMetrics: {
                marketCap: 1000000,
                volume24h: 50000,
                holders: 1000
            }
        }),
        emit: (event, data) => {
            console.log(`Mock emit: ${event}`, data);
        },
        on: (event, handler) => {
            console.log(`Mock on: ${event}`);
            // Return unsubscribe function
            return () => {
                console.log(`Mock unsubscribe: ${event}`);
            };
        }
    };
    return {
        api: mockAPI,
        userId: 'mock-user-123',
        userTier: 'bronze',
        theme: 'light',
        locale: 'en-US',
        containerSize: { width: 400, height: 600 },
        ...overrides
    };
}
