import webpack from 'webpack';
export interface WebpackConfigOptions {
    mode: 'development' | 'production';
    sourceMaps: boolean;
    minify: boolean;
}
export declare function createWebpackConfig(options: WebpackConfigOptions): webpack.Configuration;
//# sourceMappingURL=webpack.config.d.ts.map