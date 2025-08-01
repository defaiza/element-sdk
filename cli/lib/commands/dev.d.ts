export interface DevOptions {
    port: string;
    host: string;
    env: string;
    open: boolean;
}
export declare class DevCommand {
    private options;
    constructor(options: DevOptions);
    execute(): Promise<void>;
}
//# sourceMappingURL=dev.d.ts.map