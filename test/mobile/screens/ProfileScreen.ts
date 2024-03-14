import { BaseScreen } from "./BaseScreen";

export class ProfileScreen extends BaseScreen {

    private locators = {
        loginButton: "#btn-login",
        registerButton: "#btn-register",
        logoutButton: "#txt-logout"
    }
    async goToLoginscreen() {
        if (await this.isLoginButtonDisplayed()) {
            await this.click(this.locators.loginButton);
        }

    }
    async goToRegisterScreen() {
        await this.click(this.locators.registerButton);
    }

    async isProfileIconVisible() {
        return await this.isDisplayed(this.locators.loginButton);
    }

    async doLogout() {
        await this.click(this.locators.logoutButton);
    }

    async isLoginButtonDisplayed() {
        return await this.isDisplayed(this.locators.loginButton);
    }

}