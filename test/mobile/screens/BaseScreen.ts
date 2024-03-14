import { Selector } from "webdriverio";

export class BaseScreen {

    async getElement(selector: Selector) {
        const element = await $(selector);
        return element;
    }

    async click(selector: Selector) {
        const element = await this.getElement(selector);
        await element.waitForDisplayed();
        await element.click();
    }
    async setValue(selector: Selector, value: string | number) {
        const element = await this.getElement(selector);
        await element.waitForDisplayed({});
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
    async isDisplayed(selector: Selector) {
        await browser.pause(500);
        const element = await this.getElement(selector);
        return await element.isDisplayed();
    }

    async waitUntilDisabled(selector: Selector, time: number) {
        const element = await this.getElement(selector);
        return await element.waitForEnabled({ timeout: time, reverse: true })
    }
}
