"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildCommand = void 0;
const webpack_1 = __importDefault(require("webpack"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
const webpack_config_1 = require("../webpack/webpack.config");
class BuildCommand {
    constructor(options) {
        this.options = options;
    }
    async execute() {
        const spinner = (0, ora_1.default)('Building element for production...').start();
        try {
            // Create webpack configuration
            const config = (0, webpack_config_1.createWebpackConfig)({
                mode: 'production',
                sourceMaps: this.options.sourcemap,
                minify: this.options.minify
            });
            // Add bundle analyzer if requested
            if (this.options.analyze) {
                config.plugins = config.plugins || [];
                config.plugins.push(new webpack_bundle_analyzer_1.BundleAnalyzerPlugin({
                    analyzerMode: 'server',
                    openAnalyzer: true
                }));
            }
            // Run webpack build
            const compiler = (0, webpack_1.default)(config);
            if (!compiler) {
                throw new Error('Failed to create webpack compiler');
            }
            const stats = await new Promise((resolve, reject) => {
                compiler.run((err, stats) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(stats);
                });
            });
            // Handle build results
            if (stats.hasErrors()) {
                spinner.fail('Build failed with errors');
                console.log();
                console.log(chalk_1.default.red('Build errors:'));
                console.log(stats.toString({
                    colors: true,
                    errors: true,
                    warnings: false
                }));
                throw new Error('Build failed');
            }
            if (stats.hasWarnings()) {
                spinner.warn('Build completed with warnings');
                console.log();
                console.log(chalk_1.default.yellow('Build warnings:'));
                console.log(stats.toString({
                    colors: true,
                    errors: false,
                    warnings: true
                }));
            }
            else {
                spinner.succeed('Build completed successfully!');
            }
            console.log();
            console.log(chalk_1.default.green('✨ Element built for production:'));
            console.log();
            console.log(stats.toString({
                colors: true,
                modules: false,
                chunks: false,
                chunkModules: false,
                children: false
            }));
            console.log();
        }
        catch (error) {
            spinner.fail('Build failed');
            throw error;
        }
    }
}
exports.BuildCommand = BuildCommand;
//# sourceMappingURL=build.js.map