import { RegisterDetails } from "../resources/RegisterDetails";
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
    async enterDetailsForRegister(details: RegisterDetails) {
        await this.setValue(this.locators.nameField, details.username);
        await this.setValue(this.locators.emailField, details.email);
        await this.setValue(this.locators.passwordField, details.password);
        await this.setValue(this.locators.confirmPasswordField, details.password);
        await this.setValue(this.locators.mobileNumberField, details.mobilenumber);
    }

    async clickOnRegisterButton() {
        await this.click(this.locators.registerButton);
    }

    async enterDetailsAndClickOnRegister(details: RegisterDetails) {
        await this.enterDetailsForRegister(details);
        await this.clickOnRegisterButton();

    }
}