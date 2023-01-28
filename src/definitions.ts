export interface FacebookPlugin {
    init(options: { appId: string }): Promise<void>;
    login(options: { scope: string[] | null }): Promise<any>;
}
