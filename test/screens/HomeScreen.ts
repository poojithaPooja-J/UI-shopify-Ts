import { BaseScreen } from "./BaseScreen";



export class HomeScreen extends BaseScreen {

    constructor() {
        super();

    }
    private locators = {
        profileNavigator: "#icon-profile",
        userName: "#txt-username",
        popUpMsg: '//*[contains(@resource-id,"txt-modal-message")]',
        closePopUpIcon: "#btn-modal-cross"
    }
    async navigateToProfile() {
        await this.click(this.locators.profileNavigator);
    }
    async getUserNameInTitle(): Promise<string> {
        return this.getText(this.locators.userName);
    }

    async getPopUpMessage() {
        return this.getText(this.locators.popUpMsg);
    }

    async closePopUp() {
        await this.click(this.locators.closePopUpIcon);
    }
}