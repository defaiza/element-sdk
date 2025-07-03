"use strict";
/**
 * Basic Element Template
 * A simple element template to get started
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicElement = void 0;
const element_sdk_1 = require("@defai/element-sdk");
class BasicElement extends element_sdk_1.DefaiElement {
    constructor() {
        super(...arguments);
        this.metadata = {
            id: 'basic-element',
            name: 'Basic Element',
            version: '1.0.0',
            author: 'Your Name',
            description: 'A simple element template',
            category: 'Utilities',
            tags: ['template', 'basic'],
            icon: '📦',
            screenshots: [],
            minSize: { width: 200, height: 150 },
            maxSize: { width: 800, height: 600 },
            defaultSize: { width: 400, height: 300 },
            tierRequired: 'free'
        };
        this.permissions = {
            storage: true,
            wallet: false,
            network: false,
            notifications: false,
            clipboard: false,
            canReceiveFrom: [],
            canSendTo: [],
            portfolio: false,
            transactions: false,
            aiChat: false,
            maxMemory: 50,
            maxCpu: 10,
            maxStorageSize: 5
        };
    }
    async onMount(context) {
        console.log('Element mounted with context:', context);
        // Initialize element state
        this.setState({
            counter: 0,
            message: 'Hello from Basic Element!'
        });
        // Set up event listeners
        this.on('increment', () => {
            const state = this.getState();
            this.setState({ counter: state.counter + 1 });
        });
    }
    async onUnmount() {
        console.log('Element unmounting...');
        // Clean up resources
    }
    async onResize(size) {
        console.log('Element resized:', size);
        // Handle resize
    }
    async onSettingsChange(settings) {
        console.log('Settings changed:', settings);
        // Handle settings update
    }
}
exports.BasicElement = BasicElement;
