'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

exports.PixelEventNames = void 0;
(function (PixelEventNames) {
    PixelEventNames["AddPaymentInfo"] = "AddPaymentInfo";
    PixelEventNames["AddToCart"] = "AddToCart";
    PixelEventNames["AddToWishlist"] = "AddToWishlist";
    PixelEventNames["CompleteRegistration"] = "CompleteRegistration";
    PixelEventNames["Contact"] = "Contact";
    PixelEventNames["CustomizeProduct"] = "CustomizeProduct";
    PixelEventNames["Donate"] = "Donate";
    PixelEventNames["FindLocation"] = "FindLocation";
    PixelEventNames["InitiateCheckout"] = "InitiateCheckout";
    PixelEventNames["Lead"] = "Lead";
    PixelEventNames["Purchase"] = "Purchase";
    PixelEventNames["Schedule"] = "Schedule";
    PixelEventNames["Search"] = "Search";
    PixelEventNames["StartTrial"] = "StartTrial";
    PixelEventNames["SubmitApplication"] = "SubmitApplication";
    PixelEventNames["Subscribe"] = "Subscribe";
    PixelEventNames["ViewContent"] = "ViewContent";
})(exports.PixelEventNames || (exports.PixelEventNames = {}));

const Facebook = core.registerPlugin('Facebook', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FacebookWeb()),
});

/* eslint-disable */
class FacebookWeb extends core.WebPlugin {
    async logEvent(options) {
        let type = ['AddPaymentInfo', 'AddToCart', 'AddToWishlist', 'CompleteRegistration',
            'Contact', 'CustomizeProduct', 'Donate', 'FindLocation', 'InitiateCheckout',
            'Lead', 'Purchase', 'Schedule', 'Search', 'StartTrial', 'SubmitApplication',
            'Subscribe', 'ViewContent'].findIndex(i => i == options.name) > -1 ? 'track' : 'trackCustom';
        window.fbq(type, options.name, options.bundle);
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FacebookWeb: FacebookWeb
});

exports.Facebook = Facebook;
//# sourceMappingURL=plugin.cjs.js.map
