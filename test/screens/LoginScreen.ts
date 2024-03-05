import { BaseScreen } from "./BaseScreen";

export class LoginScreen extends BaseScreen {
    private locators = {
        emailFiled: "#inp-email",
        passwordField: "#inp-password",
        loginButton: "#txt-login"
    }
    async enterCredentials(email: string, password: string) {
        await this.setValue(this.locators.emailFiled, email);
        await this.setValue(this.locators.passwordField, password);

    }
    async clickOnLoginButton() {
        await this.click(this.locators.loginButton);
    }

}