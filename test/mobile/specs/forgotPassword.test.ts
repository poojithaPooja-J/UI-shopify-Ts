// import { expect } from '@wdio/globals'
import { expect } from 'chai';
import { LoginScreen } from '../screens/LoginScreen';
import { ForgotPasswordDetails } from '../resources/ForgotPasswordDetails';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import * as credentials from "../resources/credentials.json";
import { ScreenUtils } from '../screens/commonFunctions/ScreenUtils';

let loginScreen: LoginScreen;
let forgotPasswordScreen: ForgotPasswordScreen;
let screenUtils: ScreenUtils;
describe.skip("Forgot Password Positive flow", async () => {
    before(async () => {
        loginScreen = new LoginScreen();
        forgotPasswordScreen = new ForgotPasswordScreen();
        screenUtils = new ScreenUtils();
    })
    it('verify Forgot Password', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await loginScreen.enterEmailAndClickOnForgotPassword(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext(data.email);
        await forgotPasswordScreen.enterNewPasswordAndClickOnResetPassword(data.newpassword, data.newpassword)

        const userName = await loginScreen.getPopUpMessage();
        expect(userName).to.equal("Your password has been reset");
    });

})
describe("Forgot Password  Negative flows", async () => {
    before(async () => {
        loginScreen = new LoginScreen();
        forgotPasswordScreen = new ForgotPasswordScreen();
        screenUtils = new ScreenUtils();
    })
    it('verify with Invalid Email', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        const inValidData = credentials.invalidEmail;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext(inValidData.username);
        const emailInvalidMsg = await forgotPasswordScreen.isIncorrectEmailMsgDisplayed();
        expect(emailInvalidMsg).to.be.true;
    });
    it('verify with Empty Email', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext("");
        const emailFieldEmptyMsg = await forgotPasswordScreen.isEmailEmptyMsgDisplayed();
        expect(emailFieldEmptyMsg).to.be.true;
    });

    it('verify with Invalid new Password', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        const inValidData = credentials.invalidPassword;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext(data.email);
        await forgotPasswordScreen.enterNewPasswordAndClickOnResetPassword(inValidData.password, inValidData.password);
        let inValidMsg = await forgotPasswordScreen.isNewPasswordInValidMsgDisplayed();
        expect(inValidMsg).to.be.true;

    });

    it('verify with Valid New Password and inValid Confirm password', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        const inValidData = credentials.invalidPassword;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext(data.email);
        await forgotPasswordScreen.enterNewPasswordAndClickOnResetPassword(data.newpassword, inValidData.password);
        let inValidMsg = await forgotPasswordScreen.isConfirmPasswordInValidMsgDisplayed();
        expect(inValidMsg).to.be.true;
    });

    it('verify with Empty New Password and Empty Confirm password', async () => {
        const data: ForgotPasswordDetails = credentials.forgotPasswordDetails as ForgotPasswordDetails;
        await screenUtils.goToForgotPasswordScreen(data.email);
        await forgotPasswordScreen.enterEmailAndClickOnNext(data.email);
        await forgotPasswordScreen.enterNewPasswordAndClickOnResetPassword("", "");
        let inValidNewPasswordMsg = await forgotPasswordScreen.isNewPasswordInValidMsgDisplayed();
        let confirmPasswordFieldEmptyMsg = await forgotPasswordScreen.isConfirmPasswordEmptyMsgDisplayed();
        expect(inValidNewPasswordMsg).to.be.true;
        expect(confirmPasswordFieldEmptyMsg).to.be.true;

    });

})



