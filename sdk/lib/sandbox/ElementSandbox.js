"use strict";
/**
 * ElementSandbox
 * Provides isolation and security for element execution
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementSandbox = void 0;
class ElementSandbox {
    constructor(elementId, permissions) {
        this.messageHandlers = new Map();
        this.elementId = elementId;
        this.permissions = permissions;
    }
    /**
     * Create the sandbox iframe
     */
    createSandbox(container) {
        this.iframe = document.createElement('iframe');
        this.iframe.sandbox.add('allow-scripts');
        // Add permissions based on element requirements
        if (this.permissions.clipboard) {
            this.iframe.sandbox.add('allow-clipboard-read');
            this.iframe.sandbox.add('allow-clipboard-write');
        }
        // Set CSP
        this.iframe.setAttribute('csp', this.getCSP());
        // Style the iframe
        this.iframe.style.width = '100%';
        this.iframe.style.height = '100%';
        this.iframe.style.border = 'none';
        // Setup message channel
        this.setupMessageChannel();
        container.appendChild(this.iframe);
    }
    /**
     * Load element code into the sandbox
     */
    loadElement(code, styles) {
        if (!this.iframe || !this.iframe.contentWindow) {
            throw new Error('Sandbox not created');
        }
        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${styles ? `<style>${styles}</style>` : ''}
          <script>
            // Element API proxy
            window.elementAPI = ${this.createAPIProxy()};
            
            // Message handler
            window.addEventListener('message', (event) => {
              if (event.source !== window.parent) return;
              
              const { type, id, method, args } = event.data;
              
              if (type === 'api-response') {
                const resolver = window.__apiResolvers[id];
                if (resolver) {
                  resolver(args[0]);
                  delete window.__apiResolvers[id];
                }
              }
            });
            
            window.__apiResolvers = {};
            window.__apiId = 0;
          </script>
        </head>
        <body>
          <div id="element-root"></div>
          <script>${code}</script>
        </body>
      </html>
    `;
        this.iframe.srcdoc = html;
    }
    /**
     * Destroy the sandbox
     */
    destroy() {
        if (this.iframe) {
            this.iframe.remove();
            this.iframe = undefined;
        }
        this.messageHandlers.clear();
    }
    /**
     * Send message to the element
     */
    sendMessage(type, data) {
        if (!this.iframe || !this.iframe.contentWindow) {
            throw new Error('Sandbox not created');
        }
        this.iframe.contentWindow.postMessage({
            type,
            data
        }, '*');
    }
    /**
     * Register a message handler
     */
    onMessage(type, handler) {
        this.messageHandlers.set(type, handler);
    }
    /**
     * Setup message channel for communication
     */
    setupMessageChannel() {
        window.addEventListener('message', (event) => {
            if (event.source !== this.iframe?.contentWindow)
                return;
            const { type, data } = event.data;
            const handler = this.messageHandlers.get(type);
            if (handler) {
                handler(data);
            }
        });
    }
    /**
     * Get Content Security Policy
     */
    getCSP() {
        const policies = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self' data:",
            "connect-src 'none'"
        ];
        if (this.permissions.network) {
            policies.push("connect-src *");
        }
        return policies.join('; ');
    }
    /**
     * Create API proxy for the element
     */
    createAPIProxy() {
        const methods = [
            'getPortfolio',
            'getTransactions',
            'getPrices',
            'saveData',
            'loadData',
            'sendNotification',
            'analyzeImage',
            'analyzeToken',
            'emit',
            'on'
        ];
        const proxy = {};
        methods.forEach(method => {
            proxy[method] = `function(...args) {
        return new Promise((resolve) => {
          const id = window.__apiId++;
          window.__apiResolvers[id] = resolve;
          
          window.parent.postMessage({
            type: 'api-call',
            id,
            method: '${method}',
            args
          }, '*');
        });
      }`;
        });
        return `{${Object.entries(proxy).map(([k, v]) => `${k}: ${v}`).join(',')}}`;
    }
}
exports.ElementSandbox = ElementSandbox;
