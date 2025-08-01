import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

export interface WebpackConfigOptions {
  mode: 'development' | 'production';
  sourceMaps: boolean;
  minify: boolean;
}

export function createWebpackConfig(options: WebpackConfigOptions): webpack.Configuration {
  const isDevelopment = options.mode === 'development';
  
  return {
    mode: options.mode,
    entry: './src/index.tsx',
    
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      clean: true,
      publicPath: '/'
    },
    
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(process.cwd(), 'src')
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
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html'
      }),
      
      ...(isDevelopment ? [
        new ReactRefreshWebpackPlugin({
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