export interface ValidateOptions {
    strict: boolean;
    config?: string;
    fix: boolean;
}
export declare class ValidateCommand {
    private options;
    constructor(options: ValidateOptions);
    execute(): Promise<void>;
    private validateManifest;
    private validatePackageJson;
    private validateEntryPoint;
    private validateRequiredFiles;
}
//# sourceMappingURL=validate.d.ts.map