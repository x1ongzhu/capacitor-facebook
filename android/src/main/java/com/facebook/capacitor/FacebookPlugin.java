package com.facebook.capacitor;

import androidx.annotation.NonNull;

import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
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
import java.util.List;

@CapacitorPlugin(name = "Facebook")
public class FacebookPlugin extends Plugin {

    private Facebook implementation = new Facebook();
    private PluginCall loginCallback;

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", implementation.echo(value));
        call.resolve(ret);
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

    @Override
    public void load() {
        super.load();
        FacebookSdk.sdkInitialize(getContext());
        AppEventsLogger.activateApp(getActivity().getApplication());
        CallbackManager callbackManager = CallbackManager.Factory.create();
        LoginManager.getInstance().registerCallback(callbackManager,
                new FacebookCallback<>() {
                    @Override
                    public void onSuccess(LoginResult loginResult) {
                        JSObject res = new JSObject();
                        res.put("accessToken", loginResult.getAccessToken());
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
    }
}
