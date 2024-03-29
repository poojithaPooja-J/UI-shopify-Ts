import { BaseScreen } from "./BaseScreen";

export class OtpScreen extends BaseScreen {
    private locators = {
        verifyButton: "#btn-verify",
        otpButton1: "#inp-opt-1",
        otpButton2: "#inp-opt-2",
        otpButton3: "#inp-opt-3",
        otpButton4: "#inp-opt-4",
        resendOtpButton: "#txt-resend-otp"

    }

    async enterOtp(value: string) {
        await this.setValue(this.locators.otpButton1, value.charAt(0));
        await this.setValue(this.locators.otpButton2, value.charAt(1));
        await this.setValue(this.locators.otpButton3, value.charAt(2));
        await this.setValue(this.locators.otpButton4, value.charAt(3));

    }

    async enterOTPAndVerify(value: string) {
        await this.enterOtp(value);
        await this.clickOnVerifyButton();
    }

    async clickOnVerifyButton() {
        await this.click(this.locators.verifyButton);
    }

    async isOTPFieldEnabled() {
        return await this.isEnabled(this.locators.otpButton1);
    }

    async clickOnResendOTPButton() {
        await this.click(this.locators.resendOtpButton);
    }
    async waitUntilOTPTimeExpires() {
        await this.waitUntilDisabled(this.locators.otpButton1, 40000);
    }

}