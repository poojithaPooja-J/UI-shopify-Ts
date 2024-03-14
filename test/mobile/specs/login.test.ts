// import { expect } from '@wdio/globals'
import { expect } from 'chai';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { LoginDetails } from '../resources/LoginDetails';
// import { LoginFlow } from '../../userflows/LoginFlow'
import { LoginFlow } from './../userflows/LoginFlow';
import { ScreenUtils } from '../screens/commonFunctions/ScreenUtils';
import * as credentials from "../resources/credentials.json";



let homeScreen: HomeScreen;
let loginScreen: LoginScreen;
let loginFlow: LoginFlow;
let screenUtils: ScreenUtils;

describe.skip('Login', async () => {
    before(async () => {
        loginFlow = new LoginFlow();
    })
    it('should login with valid credentials', async () => {
        const data: LoginDetails = credentials.validCredentials as LoginDetails;
        await loginFlow.performLogin(data.username, data.password, data.otp);

        const userName = await homeScreen.getUserNameInTitle();
        expect(userName).to.equal("Jack Sparrow");
    });
});

describe("Login Negative flows", async () => {
    before(async () => {
        screenUtils = new ScreenUtils();
        loginScreen = new LoginScreen();
    })

    it('verify login with InValid email ', async () => {
        const data: LoginDetails = credentials.invalidEmail as LoginDetails;
        await screenUtils.login(data.username, data.password);
        let invalidEmailMsg: boolean = await loginScreen.isIncorrectEmailMsgDisplayed();
        expect(invalidEmailMsg).to.be.true;
    });

    it('verify login with InValid password ', async () => {
        const data: LoginDetails = credentials.invalidPassword as LoginDetails;
        await screenUtils.login(data.username, data.password);
        let invalidPasswordMsg: boolean = await loginScreen.isIncorrectPasswordMsgDisplayed();
        expect(invalidPasswordMsg).to.be.true;
    });
    it('verify login with valid email and empty password ', async () => {
        const data: LoginDetails = credentials.invalidPassword as LoginDetails;
        await screenUtils.login(data.username, "");
        let passwordFieldEmptyMsg: boolean = await loginScreen.isPasswordEmptyMsgDisplayed();
        expect(passwordFieldEmptyMsg).to.be.true;
    });
    it('verify login with empty email', async () => {
        const data: LoginDetails = credentials.invalidPassword as LoginDetails;
        await screenUtils.login("", data.password);
        let emailFieldEmptyMsg: boolean = await loginScreen.isEmailEmptyMsgDisplayed();
        expect(emailFieldEmptyMsg).to.be.true;
    });

    it('verify login with empty email and empty password', async () => {
        await screenUtils.login("", "");
        let passwordFieldEmptyMsg: boolean = await loginScreen.isPasswordEmptyMsgDisplayed();
        let emailFieldEmptyMsg: boolean = await loginScreen.isEmailEmptyMsgDisplayed();
        expect(passwordFieldEmptyMsg).to.be.true;
        expect(emailFieldEmptyMsg).to.be.true;
    });
})



