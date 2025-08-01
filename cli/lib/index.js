#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const chalk_1 = __importDefault(require("chalk"));
const dev_1 = require("./commands/dev");
const build_1 = require("./commands/build");
const test_1 = require("./commands/test");
const validate_1 = require("./commands/validate");
const serve_1 = require("./commands/serve");
const program = new commander_1.Command();
program
    .name('defai-element')
    .description('CLI for developing DEFAI elements')
    .version('1.0.0');
// Development server command
program
    .command('dev')
    .description('Start development server with hot reload')
    .option('-p, --port <number>', 'Port number', '3000')
    .option('-h, --host <string>', 'Host address', 'localhost')
    .option('--env <string>', 'Environment', 'development')
    .option('--open', 'Open browser automatically', false)
    .action(async (options) => {
    try {
        const devCommand = new dev_1.DevCommand(options);
        await devCommand.execute();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Development server failed:'), error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
});
// Build command
program
    .command('build')
    .description('Build element for production')
    .option('--no-minify', 'Disable minification')
    .option('--sourcemap', 'Generate source maps')
    .option('--analyze', 'Analyze bundle size')
    .action(async (options) => {
    try {
        const buildCommand = new build_1.BuildCommand(options);
        await buildCommand.execute();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Build failed:'), error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
});
// Test command
program
    .command('test')
    .description('Run element tests')
    .option('--watch', 'Watch mode')
    .option('--coverage', 'Generate coverage report')
    .action(async (options) => {
    try {
        const testCommand = new test_1.TestCommand(options);
        await testCommand.execute();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Tests failed:'), error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
});
// Validate command
program
    .command('validate')
    .description('Validate element code and configuration')
    .option('--strict', 'Enable strict validation')
    .option('--config <file>', 'Custom validation config')
    .option('--fix', 'Auto-fix issues where possible')
    .action(async (options) => {
    try {
        const validateCommand = new validate_1.ValidateCommand(options);
        await validateCommand.execute();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Validation failed:'), error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
});
// Serve command
program
    .command('serve <directory>')
    .description('Serve built element locally')
    .option('-p, --port <number>', 'Port number', '8080')
    .action(async (directory, options) => {
    try {
        const serveCommand = new serve_1.ServeCommand(directory, options);
        await serveCommand.execute();
    }
    catch (error) {
        console.error(chalk_1.default.red('❌ Serve failed:'), error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
});
// Placeholder commands for future implementation
program
    .command('publish')
    .description('Publish element to marketplace')
    .action(() => {
    console.log(chalk_1.default.yellow('🚧 Publish command coming soon!'));
    console.log('For now, build your element and publish manually.');
});
program
    .command('create <name>')
    .description('Create new element from template')
    .action(() => {
    console.log(chalk_1.default.yellow('🚧 Create command coming soon!'));
    console.log('Use the sample-workspace-template as a starting point.');
});
// Parse command line arguments
program.parse();
//# sourceMappingURL=index.js.map