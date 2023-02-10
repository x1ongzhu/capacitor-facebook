/* eslint-disable */
import { WebPlugin } from '@capacitor/core';
export class FacebookWeb extends WebPlugin {
    async logEvent(options) {
        window.fbq(options.name, options.valueToSum, options.bundle);
    }
    init(options) {
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
                    resolve();
                };
                document.body.appendChild(js);
            }
            if (options.pixelId) {
                if (!document.querySelector('#fb_pixel')) {
                    let n = (window.fbq = function () {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                    });
                    if (!window._fbq)
                        window._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.queue = [];
                    let script = document.createElement('script');
                    script.setAttribute('src', 'https://connect.facebook.net/en_US/fbevents.js');
                    document.body.appendChild(script);
                    window.fbq('init', options.pixelId);
                }
            }
        });
    }
    async login(options) {
        // FB.getLoginStatus((response: any) => {
        //     console.log(response)
        // });
        options = options || {};
        if (!options.scope || options.scope.length === 0) {
            options.scope = ['public_profile', 'email'];
        }
        FB.login((response) => {
            console.log(response);
        }, { scope: options.scope.join(',') });
    }
}
//# sourceMappingURL=web.js.map