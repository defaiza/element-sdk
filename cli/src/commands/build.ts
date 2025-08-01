import webpack from 'webpack';
import chalk from 'chalk';
import ora from 'ora';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { createWebpackConfig } from '../webpack/webpack.config';

export interface BuildOptions {
  minify: boolean;
  sourcemap: boolean;
  analyze: boolean;
}

export class BuildCommand {
  constructor(private options: BuildOptions) {}

  async execute(): Promise<void> {
    const spinner = ora('Building element for production...').start();
    
    try {
      // Create webpack configuration
      const config = createWebpackConfig({
        mode: 'production',
        sourceMaps: this.options.sourcemap,
        minify: this.options.minify
      });

      // Add bundle analyzer if requested
      if (this.options.analyze) {
        config.plugins = config.plugins || [];
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true
          })
        );
      }

      // Run webpack build
      const compiler = webpack(config);
      
      if (!compiler) {
        throw new Error('Failed to create webpack compiler');
      }
      
      const stats = await new Promise<webpack.Stats>((resolve, reject) => {
        compiler.run((err: Error | null, stats?: webpack.Stats) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(stats!);
        });
      });

      // Handle build results
      if (stats.hasErrors()) {
        spinner.fail('Build failed with errors');
        console.log();
        console.log(chalk.red('Build errors:'));
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
        console.log(chalk.yellow('Build warnings:'));
        console.log(stats.toString({
          colors: true,
          errors: false,
          warnings: true
        }));
      } else {
        spinner.succeed('Build completed successfully!');
      }

      console.log();
      console.log(chalk.green('✨ Element built for production:'));
      console.log();
      console.log(stats.toString({
        colors: true,
        modules: false,
        chunks: false,
        chunkModules: false,
        children: false
      }));
      console.log();

    } catch (error) {
      spinner.fail('Build failed');
      throw error;
    }
  }
} 