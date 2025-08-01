import { spawn } from 'child_process';
import chalk from 'chalk';
import path from 'path';

export interface TestOptions {
  watch: boolean;
  coverage: boolean;
}

export class TestCommand {
  constructor(private options: TestOptions) {}

  async execute(): Promise<void> {
    console.log(chalk.blue('🧪 Running element tests...'));
    console.log();

    const args = ['test'];
    
    if (this.options.watch) {
      args.push('--watch');
    }
    
    if (this.options.coverage) {
      args.push('--coverage');
    }

    // Add Jest configuration
    args.push('--config', path.join(__dirname, '../jest/jest.config.js'));

    return new Promise((resolve, reject) => {
      const jest = spawn('npx', ['jest', ...args], {
        stdio: 'inherit',
        cwd: process.cwd()
      });

      jest.on('close', (code) => {
        if (code === 0) {
          console.log();
          console.log(chalk.green('✅ All tests passed!'));
          resolve();
        } else {
          reject(new Error(`Tests failed with exit code ${code}`));
        }
      });

      jest.on('error', (error) => {
        reject(error);
      });
    });
  }
} 