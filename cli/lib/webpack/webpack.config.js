"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebpackConfig = void 0;
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
function createWebpackConfig(options) {
    const isDevelopment = options.mode === 'development';
    return {
        mode: options.mode,
        entry: './src/index.tsx',
        output: {
            path: path_1.default.resolve(process.cwd(), 'dist'),
            filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
            clean: true,
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            alias: {
                '@': path_1.default.resolve(process.cwd(), 'src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: isDevelopment,
                                compilerOptions: {
                                    module: 'esnext'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new html_webpack_plugin_1.default({
                template: './public/index.html',
                filename: 'index.html'
            }),
            ...(isDevelopment ? [
                new react_refresh_webpack_plugin_1.default({
                    exclude: [/node_modules/]
                })
            ] : [])
        ],
        optimization: {
            minimize: options.minify,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devtool: options.sourceMaps ? (isDevelopment ? 'eval-source-map' : 'source-map') : false,
        stats: {
            errorDetails: true
        }
    };
}
exports.createWebpackConfig = createWebpackConfig;
//# sourceMappingURL=webpack.config.js.map