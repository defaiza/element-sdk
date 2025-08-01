"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeCommand = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
class ServeCommand {
    constructor(directory, options) {
        this.directory = directory;
        this.options = options;
    }
    async execute() {
        const spinner = (0, ora_1.default)('Starting static server...').start();
        try {
            const port = parseInt(this.options.port, 10);
            const app = (0, express_1.default)();
            // Serve static files
            const staticPath = path_1.default.resolve(process.cwd(), this.directory);
            app.use(express_1.default.static(staticPath));
            // Fallback to index.html for SPA routing
            app.get('*', (req, res) => {
                res.sendFile(path_1.default.join(staticPath, 'index.html'));
            });
            // Start server
            const server = app.listen(port, () => {
                spinner.succeed('Static server started successfully!');
                console.log();
                console.log(chalk_1.default.green('🌐 Serving built element:'));
                console.log();
                console.log(`  ${chalk_1.default.bold('Local:')}            http://localhost:${port}`);
                console.log(`  ${chalk_1.default.bold('Directory:')}        ${staticPath}`);
                console.log();
                console.log(chalk_1.default.cyan('📝 To stop the server, press Ctrl+C'));
                console.log();
            });
            // Handle graceful shutdown
            process.on('SIGINT', () => {
                console.log();
                console.log(chalk_1.default.yellow('Shutting down server...'));
                server.close(() => {
                    process.exit(0);
                });
            });
        }
        catch (error) {
            spinner.fail('Failed to start server');
            throw error;
        }
    }
}
exports.ServeCommand = ServeCommand;
//# sourceMappingURL=serve.js.map