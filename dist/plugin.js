var capacitorFacebook = (function (exports, core) {
    'use strict';

    const Facebook = core.registerPlugin('Facebook', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FacebookWeb()),
    });

    /* eslint-disable */
    class FacebookWeb extends core.WebPlugin {
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
                eval(`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${options.pixelId}');
            fbq('track', 'PageView');`);
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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
