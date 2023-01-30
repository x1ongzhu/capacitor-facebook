export interface FacebookPlugin {
    init(options: {
        appId: string;
    }): Promise<void>;
    login(options: {
        scope: string[] | null;
    }): Promise<any>;
    logEvent(options: {
        name: string;
        valueToSum: number | void;
        bundle: Record<string, unknown> | void;
    }): Promise<void>;
}
