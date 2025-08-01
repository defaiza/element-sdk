export interface BuildOptions {
    minify: boolean;
    sourcemap: boolean;
    analyze: boolean;
}
export declare class BuildCommand {
    private options;
    constructor(options: BuildOptions);
    execute(): Promise<void>;
}
//# sourceMappingURL=build.d.ts.map