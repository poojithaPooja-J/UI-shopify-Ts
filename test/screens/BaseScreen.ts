import { Selector } from "webdriverio";

export class BaseScreen {

    async getElement(selector: Selector) {
        const element = await $(selector);
        await element.waitForDisplayed();
        return element;
    }

    async click(selector: Selector) {
        const element = await this.getElement(selector);
        await element.click();
    }
    async setValue(selector: Selector, value: string | number) {
        const element = await this.getElement(selector);
        await element.setValue(value);
    }

    async getText(selector: Selector) {
        const element = await this.getElement(selector);
        return await element.getText();
    }

    async isEnabled(selector: Selector) {
        const element = await this.getElement(selector);
        return await element.isEnabled();
    }
}
