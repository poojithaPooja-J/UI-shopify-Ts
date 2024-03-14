import { BaseScreen } from "./BaseScreen";

export class ForgotPasswordScreen extends BaseScreen {
    private locators = {
        emailTextField: "#inp-email",
        nextIcon: "#icon-next",
        newPassword: "#inp-new-password",
        confirmPassword: "#inp-confirm-password",
        resetPassword: "#txt-reset-password",
        emailFieldEmptyMsg: "#txt-email-field-cannot-be-empty",
        inValidEmailMsg: "#txt-email-format-is-incorrect",
        inValidNewPasswordMsg: "#txt-password-should-be-minimum-of-5-characters",
        inValidConfirmMsg: "#txt-confirm-password-is-not-matched-with-password",
        confirmPasswordFieldEmptyMsg: "#txt-confirm-password-field-cannot-be-empty"

    }

    async enterEmailAndClickOnNext(email: string) {
        if (await this.isDisplayed(this.locators.nextIcon)) {
            await this.setValue(this.locators.emailTextField, email);
            await this.click(this.locators.nextIcon);
        }

    }
    async isEmailEmptyMsgDisplayed() {
        return await this.isDisplayed(this.locators.emailFieldEmptyMsg);
    }
    async isConfirmPasswordEmptyMsgDisplayed() {
        return await this.isDisplayed(this.locators.confirmPasswordFieldEmptyMsg);
    }
    async isNewPasswordInValidMsgDisplayed() {
        return await this.isDisplayed(this.locators.inValidNewPasswordMsg);
    }
    async isConfirmPasswordInValidMsgDisplayed() {
        return await this.isDisplayed(this.locators.inValidConfirmMsg);
    }

    async isIncorrectEmailMsgDisplayed() {
        return await this.isDisplayed(this.locators.inValidEmailMsg);
    }

    async enterNewPasswordAndClickOnResetPassword(password: string, confirmPassword: string) {
        await this.setValue(this.locators.newPassword, password);
        await this.setValue(this.locators.confirmPassword, confirmPassword);
        await this.click(this.locators.resetPassword);
    }
    async enterConfirmPassword(password: string) {
        await this.setValue(this.locators.confirmPassword, password);
    }
    async enterNewPassword(password: string) {
        await this.setValue(this.locators.newPassword, password);
    }

}