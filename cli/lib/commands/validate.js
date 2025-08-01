"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateCommand = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
class ValidateCommand {
    constructor(options) {
        this.options = options;
    }
    async execute() {
        const spinner = (0, ora_1.default)('Validating element...').start();
        try {
            const issues = [];
            // Check manifest.json
            await this.validateManifest(issues);
            // Check package.json
            await this.validatePackageJson(issues);
            // Check entry point
            await this.validateEntryPoint(issues);
            // Check required files
            await this.validateRequiredFiles(issues);
            // Report results
            const errors = issues.filter(i => i.type === 'error');
            const warnings = issues.filter(i => i.type === 'warning');
            if (errors.length > 0) {
                spinner.fail('Validation failed');
                console.log();
                console.log(chalk_1.default.red('❌ Errors:'));
                errors.forEach(error => {
                    console.log(`  ${chalk_1.default.red('•')} ${error.message}`);
                });
            }
            else {
                spinner.succeed('Validation passed');
            }
            if (warnings.length > 0) {
                console.log();
                console.log(chalk_1.default.yellow('⚠️  Warnings:'));
                warnings.forEach(warning => {
                    console.log(`  ${chalk_1.default.yellow('•')} ${warning.message}`);
                });
            }
            if (errors.length === 0 && warnings.length === 0) {
                console.log();
                console.log(chalk_1.default.green('🎉 Element validation passed with no issues!'));
            }
            console.log();
            if (errors.length > 0) {
                throw new Error('Validation failed');
            }
        }
        catch (error) {
            spinner.fail('Validation failed');
            throw error;
        }
    }
    async validateManifest(issues) {
        try {
            const manifestPath = path_1.default.join(process.cwd(), 'manifest.json');
            if (!await fs_extra_1.default.pathExists(manifestPath)) {
                issues.push({
                    type: 'error',
                    message: 'manifest.json is required'
                });
                return;
            }
            const manifest = await fs_extra_1.default.readJson(manifestPath);
            // Required fields
            const requiredFields = ['id', 'name', 'version', 'description', 'category'];
            for (const field of requiredFields) {
                if (!manifest[field]) {
                    issues.push({
                        type: 'error',
                        message: `manifest.json missing required field: ${field}`
                    });
                }
            }
            // Validate permissions
            if (manifest.permissions) {
                const validPermissions = ['wallet', 'network', 'ai', 'storage', 'notifications', 'messaging'];
                for (const permission of Object.keys(manifest.permissions)) {
                    if (!validPermissions.includes(permission)) {
                        issues.push({
                            type: 'warning',
                            message: `Unknown permission in manifest.json: ${permission}`
                        });
                    }
                }
            }
        }
        catch (error) {
            issues.push({
                type: 'error',
                message: `Failed to parse manifest.json: ${error instanceof Error ? error.message : String(error)}`
            });
        }
    }
    async validatePackageJson(issues) {
        try {
            const packagePath = path_1.default.join(process.cwd(), 'package.json');
            if (!await fs_extra_1.default.pathExists(packagePath)) {
                issues.push({
                    type: 'error',
                    message: 'package.json is required'
                });
                return;
            }
            const pkg = await fs_extra_1.default.readJson(packagePath);
            // Check SDK dependency
            if (!pkg.dependencies || !pkg.dependencies['@defai/element-sdk']) {
                issues.push({
                    type: 'error',
                    message: 'package.json must include @defai/element-sdk dependency'
                });
            }
        }
        catch (error) {
            issues.push({
                type: 'error',
                message: `Failed to parse package.json: ${error instanceof Error ? error.message : String(error)}`
            });
        }
    }
    async validateEntryPoint(issues) {
        const entryPoints = ['src/index.tsx', 'src/index.ts'];
        let hasEntryPoint = false;
        for (const entryPoint of entryPoints) {
            if (await fs_extra_1.default.pathExists(path_1.default.join(process.cwd(), entryPoint))) {
                hasEntryPoint = true;
                break;
            }
        }
        if (!hasEntryPoint) {
            issues.push({
                type: 'error',
                message: 'No entry point found (src/index.tsx or src/index.ts required)'
            });
        }
    }
    async validateRequiredFiles(issues) {
        const requiredFiles = ['tsconfig.json'];
        for (const file of requiredFiles) {
            if (!await fs_extra_1.default.pathExists(path_1.default.join(process.cwd(), file))) {
                issues.push({
                    type: 'warning',
                    message: `Recommended file missing: ${file}`
                });
            }
        }
    }
}
exports.ValidateCommand = ValidateCommand;
//# sourceMappingURL=validate.js.map