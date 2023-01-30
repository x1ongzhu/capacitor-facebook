import { WebPlugin } from '@capacitor/core';
import type { FacebookPlugin } from './definitions';
declare global {
    interface Window {
        fbAsyncInit: any;
        FB: any;
        fbq: any;
    }
}
export declare class FacebookWeb extends WebPlugin implements FacebookPlugin {
    logEvent(options: {
        name: string;
        valueToSum: number | void;
        bundle: void | Record<string, unknown>;
    }): Promise<void>;
    init(options: {
        appId: string;
        pixelId: string | void;
    }): Promise<void>;
    login(options: {
        scope: string[] | null;
    }): Promise<any>;
}
