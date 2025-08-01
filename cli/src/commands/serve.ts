import express from 'express';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export interface ServeOptions {
  port: string;
}

export class ServeCommand {
  constructor(
    private directory: string,
    private options: ServeOptions
  ) {}

  async execute(): Promise<void> {
    const spinner = ora('Starting static server...').start();
    
    try {
      const port = parseInt(this.options.port, 10);
      const app = express();
      
      // Serve static files
      const staticPath = path.resolve(process.cwd(), this.directory);
      app.use(express.static(staticPath));
      
      // Fallback to index.html for SPA routing
      app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(staticPath, 'index.html'));
      });

      // Start server
      const server = app.listen(port, () => {
        spinner.succeed('Static server started successfully!');
        
        console.log();
        console.log(chalk.green('🌐 Serving built element:'));
        console.log();
        console.log(`  ${chalk.bold('Local:')}            http://localhost:${port}`);
        console.log(`  ${chalk.bold('Directory:')}        ${staticPath}`);
        console.log();
        console.log(chalk.cyan('📝 To stop the server, press Ctrl+C'));
        console.log();
      });

      // Handle graceful shutdown
      process.on('SIGINT', () => {
        console.log();
        console.log(chalk.yellow('Shutting down server...'));
        server.close(() => {
          process.exit(0);
        });
      });

    } catch (error) {
      spinner.fail('Failed to start server');
      throw error;
    }
  }
} 