"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCommand = void 0;
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const webpack_config_1 = require("../webpack/webpack.config");
class DevCommand {
    constructor(options) {
        this.options = options;
    }
    async execute() {
        const spinner = (0, ora_1.default)('Starting development server...').start();
        try {
            const port = parseInt(this.options.port, 10);
            const host = this.options.host;
            // Create webpack configuration
            const config = (0, webpack_config_1.createWebpackConfig)({
                mode: 'development',
                sourceMaps: true,
                minify: false
            });
            const compiler = (0, webpack_1.default)(config);
            if (!compiler) {
                throw new Error('Failed to create webpack compiler');
            }
            // Configure dev server
            const devServerConfig = {
                port,
                host,
                hot: true,
                open: this.options.open,
                static: {
                    directory: './public',
                    publicPath: '/'
                },
                devMiddleware: {
                    publicPath: '/',
                },
                client: {
                    overlay: true,
                    progress: true
                },
                historyApiFallback: true
            };
            const server = new webpack_dev_server_1.default(devServerConfig, compiler);
            await server.start();
            spinner.succeed('Development server started successfully!');
            console.log();
            console.log(chalk_1.default.green('🚀 Element development server is running:'));
            console.log();
            console.log(`  ${chalk_1.default.bold('Local:')}            http://${host}:${port}`);
            console.log(`  ${chalk_1.default.bold('Network:')}          http://localhost:${port}`);
            console.log();
            console.log(chalk_1.default.cyan('📝 To stop the server, press Ctrl+C'));
            console.log();
        }
        catch (error) {
            spinner.fail('Failed to start development server');
            throw error;
        }
    }
}
exports.DevCommand = DevCommand;
//# sourceMappingURL=dev.js.map