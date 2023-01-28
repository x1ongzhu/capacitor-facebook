/* eslint-disable */
import { WebPlugin } from '@capacitor/core';

import type { FacebookPlugin } from './definitions';

declare global {
    interface Window { fbAsyncInit: any; FB: any; }
}
declare var FB: any;

export class FacebookWeb extends WebPlugin implements FacebookPlugin {
    init(options: { appId: string; }): Promise<void> {
        console.log('FacebookWeb constructor')
        return new Promise((resolve) => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: options.appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v15.0'
                });
                FB.AppEvents.logPageView();
                resolve()
            };
            if (!document.getElementById('facebook-jssdk')) {
                var js = document.createElement('script');
                js.id = 'facebook-jssdk';
                js.setAttribute('src', "https://connect.facebook.net/en_US/sdk.js");
                document.body.appendChild(js);
            }
        })

    }
    async login(options: { scope: string[] | null }): Promise<any> {
        // FB.getLoginStatus((response: any) => {
        //     console.log(response)
        // });
        options = options || {};
        if (!options.scope || options.scope.length === 0) {
            options.scope = ['public_profile', 'email'];
        }
        FB.login((response: any) => {
            console.log(response)
        }, { scope: options.scope.join(',') });
    }
}
