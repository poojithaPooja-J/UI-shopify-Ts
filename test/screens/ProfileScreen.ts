import { BaseScreen } from "./BaseScreen";

export class ProfileScreen extends BaseScreen {

    private locators = {
        loginButton: "#btn-login",
        registerButton: "#btn-register"
    }
    async goToLoginscreen() {
        await this.click(this.locators.loginButton);
    }
    async goToRegisterScreen() {
        await this.click(this.locators.registerButton);
    }

}