export interface FacebookPlugin {
    init(options: {
        appId: string;
        autoLogEvent: boolean | true;
    }): Promise<void>;
    login(options: {
        scope: string[] | null;
    }): Promise<any>;
    logEvent(options: {
        name: string;
        valueToSum: number | void;
        bundle: Record<string, unknown> | void;
    }): Promise<void>;
}
export declare enum PixelEventNames {
    AddPaymentInfo = "AddPaymentInfo",
    AddToCart = "AddToCart",
    AddToWishlist = "AddToWishlist",
    CompleteRegistration = "CompleteRegistration",
    Contact = "Contact",
    CustomizeProduct = "CustomizeProduct",
    Donate = "Donate",
    FindLocation = "FindLocation",
    InitiateCheckout = "InitiateCheckout",
    Lead = "Lead",
    Purchase = "Purchase",
    Schedule = "Schedule",
    Search = "Search",
    StartTrial = "StartTrial",
    SubmitApplication = "SubmitApplication",
    Subscribe = "Subscribe",
    ViewContent = "ViewContent"
}
