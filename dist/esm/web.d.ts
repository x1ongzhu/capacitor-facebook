import { WebPlugin } from '@capacitor/core';
import type { FacebookPlugin } from './definitions';
declare global {
    interface Window {
        fbAsyncInit: any;
        FB: any;
        fbq: any;
        _fbq: any;
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
        autoLogEvent: boolean;
        pixelId: string | void;
    }): Promise<void>;
    login(options: {
        scope: string[] | null;
    }): Promise<any>;
}
