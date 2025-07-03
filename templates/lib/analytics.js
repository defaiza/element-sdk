"use strict";
/**
 * Analytics Element Template
 * A template for creating data visualization and analytics elements
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsElement = void 0;
const element_sdk_1 = require("@defai/element-sdk");
class AnalyticsElement extends element_sdk_1.DefaiElement {
    constructor() {
        super(...arguments);
        this.metadata = {
            id: 'analytics-element',
            name: 'Analytics Element',
            version: '1.0.0',
            author: 'Your Name',
            description: 'A element for displaying charts and analytics',
            category: 'Analytics',
            tags: ['analytics', 'charts', 'data'],
            icon: '📊',
            screenshots: [],
            minSize: { width: 400, height: 300 },
            maxSize: { width: 1600, height: 1000 },
            defaultSize: { width: 800, height: 600 },
            tierRequired: 'silver'
        };
        this.permissions = {
            storage: true,
            wallet: false,
            network: true,
            notifications: false,
            clipboard: true,
            canReceiveFrom: ['*'], // Can receive data from any element
            canSendTo: ['report-generator'],
            portfolio: true,
            transactions: false,
            aiChat: true,
            maxMemory: 150,
            maxCpu: 30,
            maxStorageSize: 20
        };
    }
    async onMount(context) {
        console.log('Analytics element mounted');
        // Initialize state
        this.setState({
            chartType: 'line',
            timeframe: '24h',
            data: [],
            isLoading: true,
            selectedMetrics: ['volume', 'price', 'tvl']
        });
        // Load saved preferences
        const preferences = await this.loadData('preferences');
        if (preferences) {
            this.setState(preferences);
        }
        // Fetch initial data
        await this.fetchAnalyticsData();
        // Set up periodic updates
        this.dataUpdateInterval = setInterval(() => {
            this.fetchAnalyticsData();
        }, 60000); // Update every minute
        // Listen for data from other elements
        this.on('data-update', (data) => {
            this.handleExternalData(data);
        });
    }
    async onUnmount() {
        // Clean up interval
        if (this.dataUpdateInterval) {
            clearInterval(this.dataUpdateInterval);
        }
        // Save preferences
        const state = this.getState();
        await this.saveData('preferences', {
            chartType: state.chartType,
            timeframe: state.timeframe,
            selectedMetrics: state.selectedMetrics
        });
    }
    async onResize(size) {
        // Adjust chart rendering based on size
        const state = this.getState();
        // Determine optimal chart configuration
        let chartConfig = {
            showLegend: true,
            showGrid: true,
            dataPoints: 100
        };
        if (size.width < 600) {
            chartConfig.showLegend = false;
            chartConfig.dataPoints = 50;
        }
        if (size.height < 400) {
            chartConfig.showGrid = false;
        }
        this.setState({ chartConfig });
    }
    async onSettingsChange(settings) {
        // Update display settings
        if (settings.chartType) {
            this.setState({ chartType: settings.chartType });
        }
        if (settings.timeframe) {
            this.setState({ timeframe: settings.timeframe });
            await this.fetchAnalyticsData();
        }
        if (settings.selectedMetrics) {
            this.setState({ selectedMetrics: settings.selectedMetrics });
        }
    }
    // Custom methods for analytics
    async fetchAnalyticsData() {
        const state = this.getState();
        try {
            // Fetch data from API
            const response = await this.context.api.network.fetch(`https://api.defai.com/analytics?timeframe=${state.timeframe}`);
            const data = await response.json();
            // Process data for visualization
            const processedData = this.processDataForChart(data);
            this.setState({
                data: processedData,
                isLoading: false,
                lastUpdated: Date.now()
            });
            // Get AI insights
            if (this.permissions.aiChat) {
                const insights = await this.getAIInsights(processedData);
                this.setState({ aiInsights: insights });
            }
        }
        catch (error) {
            console.error('Failed to fetch analytics data:', error);
            this.setState({ error: 'Failed to load data', isLoading: false });
        }
    }
    processDataForChart(rawData) {
        // Transform raw data for chart library
        return rawData.map((item) => ({
            timestamp: item.timestamp,
            value: item.value,
            volume: item.volume,
            change: item.change
        }));
    }
    handleExternalData(data) {
        // Merge external data with existing data
        const state = this.getState();
        const mergedData = [...state.data, ...data];
        this.setState({ data: mergedData });
        // Broadcast processed data
        this.emit('analytics-processed', {
            chartType: state.chartType,
            data: mergedData,
            metrics: state.selectedMetrics
        });
    }
    async getAIInsights(data) {
        const prompt = `Analyze this trading data and provide insights: ${JSON.stringify(data.slice(-10))}`;
        const insights = await this.context.api.ai.sendMessage(prompt);
        return insights;
    }
    // Public method for exporting data
    async exportData(format) {
        const state = this.getState();
        switch (format) {
            case 'csv':
                const csv = this.convertToCSV(state.data);
                this.context.api.clipboard?.write(csv);
                break;
            case 'json':
                const json = JSON.stringify(state.data, null, 2);
                this.context.api.clipboard?.write(json);
                break;
            case 'png':
                // Would implement chart screenshot functionality
                this.emit('request-screenshot');
                break;
        }
        await this.context.api.notifications.show('Data exported', {
            body: `Data exported as ${format.toUpperCase()}`
        });
    }
    convertToCSV(data) {
        if (data.length === 0)
            return '';
        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(',')).join('\\n');
        return `${headers}\\n${rows}`;
    }
}
exports.AnalyticsElement = AnalyticsElement;
