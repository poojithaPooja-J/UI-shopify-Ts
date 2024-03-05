import { BaseScreen } from "./BaseScreen";

export class OtpScreen extends BaseScreen {
    private locators = {
        verifyButton: "#btn-verify",
        otpButton1: "#inp-opt-1",
        otpButton2: "#inp-opt-2",
        otpButton3: "#inp-opt-3",
        otpButton4: "#inp-opt-4",

    }

    async enterOtpAndVerify(value: string) {
        await this.setValue(this.locators.otpButton1, value.charAt(0));
        await this.setValue(this.locators.otpButton2, value.charAt(1));
        await this.setValue(this.locators.otpButton3, value.charAt(2));
        await this.setValue(this.locators.otpButton4, value.charAt(3));

    }

    async clickOnVerifyButton() {
        await this.click(this.locators.verifyButton);
    }

}