"use strict";
/**
 * AI Chat Element Template
 * A template for creating AI-powered chat elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIChatElement = void 0;
const element_sdk_1 = require("@defai/element-sdk");
class AIChatElement extends element_sdk_1.DefaiElement {
    constructor() {
        super(...arguments);
        this.metadata = {
            id: 'ai-chat-element',
            name: 'AI Chat Element',
            version: '1.0.0',
            author: 'Your Name',
            description: 'An AI-powered chat assistant element',
            category: 'AI Tools',
            tags: ['ai', 'chat', 'assistant'],
            icon: '🤖',
            screenshots: [],
            minSize: { width: 300, height: 400 },
            maxSize: { width: 800, height: 1200 },
            defaultSize: { width: 400, height: 600 },
            tierRequired: 'gold'
        };
        this.permissions = {
            storage: true,
            wallet: true,
            network: true,
            notifications: true,
            clipboard: true,
            canReceiveFrom: ['*'],
            canSendTo: ['*'],
            portfolio: true,
            transactions: true,
            aiChat: true,
            maxMemory: 100,
            maxCpu: 25,
            maxStorageSize: 15
        };
    }
    async onMount(context) {
        console.log('AI Chat element mounted');
        // Initialize state
        this.setState({
            messages: [],
            isTyping: false,
            model: 'gpt-4',
            systemPrompt: 'You are a helpful DEFAI trading assistant.',
            maxTokens: 2048,
            temperature: 0.7
        });
        // Load chat history
        const history = await this.loadData('chatHistory');
        if (history) {
            this.setState({ messages: history });
        }
        // Listen for external commands
        this.on('ai-command', async (command) => {
            await this.processCommand(command);
        });
        // Set up auto-save
        setInterval(() => {
            this.saveChatHistory();
        }, 30000); // Save every 30 seconds
    }
    async onUnmount() {
        // Save chat history before unmounting
        await this.saveChatHistory();
    }
    async onResize(size) {
        // Adjust UI based on size
        const isCompact = size.width < 350 || size.height < 500;
        this.setState({ isCompact });
    }
    async onSettingsChange(settings) {
        // Update AI settings
        if (settings.model) {
            this.setState({ model: settings.model });
        }
        if (settings.systemPrompt) {
            this.setState({ systemPrompt: settings.systemPrompt });
        }
        if (settings.temperature !== undefined) {
            this.setState({ temperature: settings.temperature });
        }
    }
    // Core chat functionality
    async sendMessage(content) {
        const state = this.getState();
        // Add user message
        const userMessage = {
            id: this.generateId(),
            role: 'user',
            content,
            timestamp: Date.now()
        };
        this.setState({
            messages: [...state.messages, userMessage],
            isTyping: true
        });
        try {
            // Check for special commands
            if (content.startsWith('/')) {
                await this.handleCommand(content);
                return;
            }
            // Get AI response
            const response = await this.context.api.ai.sendMessage(content);
            // Add assistant message
            const assistantMessage = {
                id: this.generateId(),
                role: 'assistant',
                content: response,
                timestamp: Date.now()
            };
            const updatedMessages = [...this.getState().messages, assistantMessage];
            this.setState({
                messages: updatedMessages,
                isTyping: false
            });
            // Check if response contains actionable items
            await this.checkForActions(response);
            // Emit message event
            this.emit('message-received', assistantMessage);
        }
        catch (error) {
            console.error('Failed to get AI response:', error);
            this.setState({
                isTyping: false,
                error: 'Failed to get response'
            });
        }
    }
    // Handle special commands
    async handleCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0].substring(1); // Remove '/'
        const args = parts.slice(1);
        switch (cmd) {
            case 'clear':
                this.setState({ messages: [] });
                await this.saveData('chatHistory', []);
                break;
            case 'analyze':
                if (args[0]) {
                    await this.analyzeToken(args[0]);
                }
                break;
            case 'trade':
                if (args.length >= 3) {
                    await this.initiateTrade(args[0], args[1], parseFloat(args[2]));
                }
                break;
            case 'portfolio':
                await this.showPortfolio();
                break;
            case 'help':
                await this.showHelp();
                break;
            default:
                this.addSystemMessage(`Unknown command: ${cmd}`);
        }
        this.setState({ isTyping: false });
    }
    // Analyze token using AI
    async analyzeToken(symbol) {
        this.setState({ isTyping: true });
        try {
            const analysis = await this.context.api.ai.getTokenAnalysis(symbol);
            const message = {
                id: this.generateId(),
                role: 'assistant',
                content: this.formatAnalysis(analysis),
                timestamp: Date.now(),
                metadata: { type: 'analysis', symbol }
            };
            this.setState({
                messages: [...this.getState().messages, message],
                isTyping: false
            });
            // Broadcast analysis
            this.emit('token-analyzed', { symbol, analysis });
        }
        catch (error) {
            this.addSystemMessage(`Failed to analyze ${symbol}`);
            this.setState({ isTyping: false });
        }
    }
    // Initiate trade through chat
    async initiateTrade(action, symbol, amount) {
        if (!this.context.api.wallet.isConnected()) {
            this.addSystemMessage('Please connect your wallet first');
            return;
        }
        // Emit trade request
        this.emit('trade-request', {
            action,
            symbol,
            amount,
            timestamp: Date.now()
        });
        this.addSystemMessage(`Trade request sent: ${action} ${amount} ${symbol}`);
    }
    // Show portfolio information
    async showPortfolio() {
        if (!this.permissions.portfolio) {
            this.addSystemMessage('Portfolio access not permitted');
            return;
        }
        const tokens = await this.context.api.wallet.getTokens();
        const balance = await this.context.api.wallet.getBalance();
        let portfolioMsg = `**Your Portfolio**\\n\\n`;
        portfolioMsg += `SOL Balance: ${balance}\\n\\n`;
        portfolioMsg += `**Tokens:**\\n`;
        tokens.forEach(token => {
            portfolioMsg += `- ${token.symbol}: ${token.balance} ($${token.value})\\n`;
        });
        this.addSystemMessage(portfolioMsg);
    }
    // Show help information
    async showHelp() {
        const helpMsg = `**Available Commands:**
/clear - Clear chat history
/analyze [symbol] - Analyze a token
/trade [buy/sell] [symbol] [amount] - Initiate a trade
/portfolio - Show your portfolio
/help - Show this help message

You can also ask me anything about trading, DeFi, or the crypto market!`;
        this.addSystemMessage(helpMsg);
    }
    // Check AI response for actionable items
    async checkForActions(response) {
        // Check for price mentions
        const priceRegex = /\\$([0-9,]+\\.?[0-9]*)/g;
        const prices = response.match(priceRegex);
        if (prices) {
            this.emit('prices-mentioned', prices);
        }
        // Check for token mentions
        const tokenRegex = /\\b(SOL|BTC|ETH|DEFAI|USDC)\\b/g;
        const tokens = response.match(tokenRegex);
        if (tokens) {
            this.emit('tokens-mentioned', tokens);
        }
    }
    // Helper methods
    generateId() {
        return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    addSystemMessage(content) {
        const message = {
            id: this.generateId(),
            role: 'assistant',
            content,
            timestamp: Date.now(),
            metadata: { type: 'system' }
        };
        this.setState({
            messages: [...this.getState().messages, message]
        });
    }
    formatAnalysis(analysis) {
        return `**Token Analysis**
Sentiment: ${analysis.sentiment}
Risk Level: ${analysis.riskLevel}

${analysis.summary}

**Key Points:**
${analysis.keyPoints.map((point) => `- ${point}`).join('\\n')}`;
    }
    async saveChatHistory() {
        const state = this.getState();
        // Keep only last 100 messages
        const recentMessages = state.messages.slice(-100);
        await this.saveData('chatHistory', recentMessages);
    }
    // Public methods
    async clearHistory() {
        this.setState({ messages: [] });
        await this.saveData('chatHistory', []);
    }
    async exportChat(format = 'markdown') {
        const state = this.getState();
        if (format === 'json') {
            const data = JSON.stringify(state.messages, null, 2);
            await this.context.api.clipboard?.write(data);
        }
        else {
            const markdown = state.messages.map(msg => `**${msg.role === 'user' ? 'You' : 'Assistant'}:** ${msg.content}\\n`).join('\\n');
            await this.context.api.clipboard?.write(markdown);
        }
        await this.context.api.notifications.show('Chat exported', {
            body: `Chat history copied to clipboard as ${format.toUpperCase()}`
        });
    }
}
exports.AIChatElement = AIChatElement;
