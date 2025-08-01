export interface ServeOptions {
    port: string;
}
export declare class ServeCommand {
    private directory;
    private options;
    constructor(directory: string, options: ServeOptions);
    execute(): Promise<void>;
}
//# sourceMappingURL=serve.d.ts.map