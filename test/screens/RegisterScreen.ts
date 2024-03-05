import { BaseScreen } from "./BaseScreen";

export class RegisterScreen extends BaseScreen {

    private locators = {
        nameField: "#inp-fullname",
        emailField: "#inp-email",
        passwordField: "#inp-password",
        confirmPasswordField: "#inp-confirm-password",
        mobileNumberField: "#inp-mobile-number",
        registerButton: "#btn-register"

    }
    async enterDetailsForRegister(name: string, email: string, password: string, mobileNumber: string) {
        await this.setValue(this.locators.nameField, name);
        await this.setValue(this.locators.emailField, email);
        await this.setValue(this.locators.passwordField, password);
        await this.setValue(this.locators.confirmPasswordField, password);
        await this.setValue(this.locators.mobileNumberField, mobileNumber);
    }

    async clickOnRegisterButton() {
        await this.click(this.locators.registerButton);
    }
}