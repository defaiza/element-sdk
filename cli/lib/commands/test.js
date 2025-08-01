"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCommand = void 0;
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
class TestCommand {
    constructor(options) {
        this.options = options;
    }
    async execute() {
        console.log(chalk_1.default.blue('🧪 Running element tests...'));
        console.log();
        const args = ['test'];
        if (this.options.watch) {
            args.push('--watch');
        }
        if (this.options.coverage) {
            args.push('--coverage');
        }
        // Add Jest configuration
        args.push('--config', path_1.default.join(__dirname, '../jest/jest.config.js'));
        return new Promise((resolve, reject) => {
            const jest = (0, child_process_1.spawn)('npx', ['jest', ...args], {
                stdio: 'inherit',
                cwd: process.cwd()
            });
            jest.on('close', (code) => {
                if (code === 0) {
                    console.log();
                    console.log(chalk_1.default.green('✅ All tests passed!'));
                    resolve();
                }
                else {
                    reject(new Error(`Tests failed with exit code ${code}`));
                }
            });
            jest.on('error', (error) => {
                reject(error);
            });
        });
    }
}
exports.TestCommand = TestCommand;
//# sourceMappingURL=test.js.map