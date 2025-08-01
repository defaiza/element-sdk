export interface TestOptions {
    watch: boolean;
    coverage: boolean;
}
export declare class TestCommand {
    private options;
    constructor(options: TestOptions);
    execute(): Promise<void>;
}
//# sourceMappingURL=test.d.ts.map