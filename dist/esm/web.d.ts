import { WebPlugin } from '@capacitor/core';
import type { FacebookPlugin } from './definitions';
declare global {
    interface Window {
        fbAsyncInit: any;
        FB: any;
    }
}
export declare class FacebookWeb extends WebPlugin implements FacebookPlugin {
    init(options: {
        appId: string;
    }): Promise<void>;
    login(options: {
        scope: string[] | null;
    }): Promise<any>;
}
