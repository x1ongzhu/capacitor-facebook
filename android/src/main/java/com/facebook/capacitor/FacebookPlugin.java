package com.facebook.capacitor;

import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsConstants;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.login.LoginManager;
import com.facebook.login.LoginResult;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@CapacitorPlugin(name = "Facebook")
public class FacebookPlugin extends Plugin {

    private PluginCall loginCallback;
    private AppEventsLogger logger;

    @Override
    public void load() {
        super.load();
        FacebookSdk.sdkInitialize(getContext());
        FacebookSdk.setAutoLogAppEventsEnabled(true);
        AppEventsLogger.activateApp(getActivity().getApplication());
        CallbackManager callbackManager = CallbackManager.Factory.create();
        LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        JSObject res = new JSObject();
                        res.put("accessToken", loginResult.getAccessToken());
                        res.put("authenticationToken", loginResult.getAuthenticationToken());
                        res.put("recentlyDeniedPermissions", loginResult.getRecentlyDeniedPermissions());
                        res.put("recentlyGrantedPermissions", loginResult.getRecentlyGrantedPermissions());
                        if (loginCallback != null) {
                            loginCallback.resolve(res);
                        }
                    }

                    @Override
                    public void onCancel() {
                        // App code
                    }

                    @Override
                    public void onError(@NonNull FacebookException exception) {
                        // App code
                    }
                });
        logger = AppEventsLogger.newLogger(getActivity());
    }

    @PluginMethod
    public void init(PluginCall call) {
        call.resolve();
    }

    @PluginMethod
    public void login(PluginCall call) {
        JSArray scope = call.getArray("scope");
        List<String> permissions = new ArrayList<>();
        if (scope == null || scope.length() == 0) {
            permissions.addAll(Arrays.asList("public_profile", "email"));
        } else {
            for (int i = 0; i < scope.length(); i++) {
                try {
                    permissions.add(scope.getString(i));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        call.setKeepAlive(true);
        loginCallback = call;
        LoginManager.getInstance().logInWithReadPermissions(getActivity(), permissions);
    }

    @PluginMethod
    public void logEvent(PluginCall call) {
        if (!call.hasOption("name")) {
            call.reject("name is required");
            return;
        }
        String name = call.getString("name");
        Double valueToSum = null;
        if (call.hasOption("valueToSum")) {
            valueToSum = call.getDouble("valueToSum");
        }
        Bundle bundle = null;
        if (call.hasOption("bundle")) {
            bundle = parseBundle(call.getObject("bundle"));
        }
        if (valueToSum != null && bundle != null) {
            logger.logEvent(name, valueToSum, bundle);
        } else if (valueToSum != null) {
            logger.logEvent(name, valueToSum);
        } else if (bundle != null) {
            logger.logEvent(name, bundle);
        } else {
            logger.logEvent(name);
        }
    }

    public Bundle parseBundle(JSObject object) {
        Iterator<String> keys = object.keys();
        Bundle bundle = new Bundle();
        while (keys.hasNext()) {
            String key = keys.next();
            bundle.putString(key, object.getString(key));
        }
        return bundle;
    }
}
