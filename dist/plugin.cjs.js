'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const Facebook = core.registerPlugin('Facebook', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FacebookWeb()),
});

/* eslint-disable */
class FacebookWeb extends core.WebPlugin {
    init(options) {
        console.log('FacebookWeb constructor');
        return new Promise((resolve) => {
            window.fbAsyncInit = function () {
                FB.init({
                    appId: options.appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v15.0'
                });
                FB.AppEvents.logPageView();
                resolve();
            };
            if (!document.getElementById('facebook-jssdk')) {
                var js = document.createElement('script');
                js.id = 'facebook-jssdk';
                js.setAttribute('src', "https://connect.facebook.net/en_US/sdk.js");
                document.body.appendChild(js);
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
