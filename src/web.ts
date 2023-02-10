/* eslint-disable */
import { WebPlugin } from '@capacitor/core';

import type { FacebookPlugin } from './definitions';

declare global {
    interface Window { fbAsyncInit: any; FB: any; fbq: any; _fbq: any }
}
declare var FB: any;

export class FacebookWeb extends WebPlugin implements FacebookPlugin {
    async logEvent(options: { name: string; valueToSum: number | void; bundle: void | Record<string, unknown>; }): Promise<void> {
        let type = ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration',
            'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout',
            'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication',
            'Subscribe', 'ViewContent'].findIndex(i => i == options.name) > -1 ? 'track' : 'trackCustom';
        window.fbq(type, options.name, options.bundle)
    }
    init(options: { appId: string; autoLogEvent: boolean, pixelId: string | void }): Promise<void> {
        return new Promise((resolve) => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: options.appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v15.0'
                });
                FB.AppEvents.logPageView();
            };
            if (!document.getElementById('facebook-jssdk')) {
                var js = document.createElement('script');
                js.id = 'facebook-jssdk';
                js.setAttribute('src', "https://connect.facebook.net/en_US/sdk.js");
                js.onload = () => {
                    resolve()
                }
                document.body.appendChild(js);
            }
            if (options.pixelId) {
                if (!document.querySelector('#fb_pixel')) {
                    let n: any = (window.fbq = function () {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    })
                    if (!window._fbq) window._fbq = n
                    n.push = n
                    n.loaded = !0
                    n.version = '2.0'
                    n.queue = []
                    let script = document.createElement('script')
                    script.setAttribute('src', 'https://connect.facebook.net/en_US/fbevents.js')
                    document.body.appendChild(script)
                    window.fbq('init', options.pixelId)
                }
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
