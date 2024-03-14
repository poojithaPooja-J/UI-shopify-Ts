import { LoginDetails } from "../resources/LoginDetails";
import * as credentials from "../resources/credentials.json";
import { OtpScreen } from "../screens/OtpScreen";
import { ScreenUtils } from "../screens/commonFunctions/ScreenUtils";
import { expect } from "chai";

let otpScreen = new OtpScreen();
let screenUtils = new ScreenUtils();

it("Verify functionality of resend otp option", async () => {
    const data: LoginDetails = credentials.validCredentials as LoginDetails;
    await screenUtils.login(data.username, data.password);
    expect(await otpScreen.isOTPFieldEnabled()).to.be.true;
    await otpScreen.waitUntilOTPTimeExpires();
    expect(await otpScreen.isOTPFieldEnabled()).to.be.false;
    await otpScreen.clickOnResendOTPButton();
    expect(await otpScreen.isOTPFieldEnabled()).to.be.true;

})