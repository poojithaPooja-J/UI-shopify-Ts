import { BaseScreen } from "./BaseScreen";

export class LoginScreen extends BaseScreen {
    private locators = {
        emailField: "#inp-email",
        passwordField: "#inp-password",
        loginButton: "#txt-login",
        forgotPassword: "#txt-forgot-password",
        popUpMsg: '//*[contains(@resource-id,"txt-modal-message")]',
        closePopUpIcon: "#btn-modal-cross",
        inValidEmailMsg: "#txt-email-format-is-incorrect",
        inValidPasswordMsg: "#txt-toast-message",
        passwordFieldEmptyMsg: "#txt-password-field-cannot-be-empty",
        emailFieldEmptyMsg: "#txt-email-field-cannot-be-empty"

    }
    async enterCredentials(email: string, password: string) {
        await this.setValue(this.locators.emailField, email);
        await this.setValue(this.locators.passwordField, password);
    }
    async isOnLoginScreen() {
        return await this.isDisplayed(this.locators.forgotPassword);
    }

    async enterCredentialsAndDoLogin(email: string, password: string) {
        await this.enterCredentials(email, password);
        await this.clickOnLoginButton();
    }


    async enterEmail(email: string) {
        await this.setValue(this.locators.emailField, email);
    }

    async enterEmailAndClickOnForgotPassword(email: string) {
        if (await this.isOnLoginScreen()) {
            await this.enterEmail(email);
            await this.clickOnForgotPassword();
        }

    }

    async isIncorrectEmailMsgDisplayed() {
        return await this.isDisplayed(this.locators.inValidEmailMsg);
    }

    async isIncorrectPasswordMsgDisplayed() {
        return await this.isDisplayed(this.locators.inValidPasswordMsg);
    }

    async isPasswordEmptyMsgDisplayed() {
        return await this.isDisplayed(this.locators.passwordFieldEmptyMsg);
    }
    async isEmailEmptyMsgDisplayed() {
        return await this.isDisplayed(this.locators.emailFieldEmptyMsg);
    }

    async clickOnLoginButton() {
        await this.click(this.locators.loginButton);
    }

    async clickOnForgotPassword() {
        await this.click(this.locators.forgotPassword);
    }
    async getPopUpMessage() {
        return this.getText(this.locators.popUpMsg);
    }

    async closePopUp() {
        await this.click(this.locators.closePopUpIcon);
    }

}