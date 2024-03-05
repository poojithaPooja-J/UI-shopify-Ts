// import { expect } from '@wdio/globals'
import { expect } from 'chai';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { loginDetails } from '../../resources/LoginDetails';
import { registerDetails } from '../../resources/RegisterDetails';
import * as credentials from "../../resources/credentials.json";

let homeScreen: HomeScreen;
let profileScreen: ProfileScreen;
let loginScreen: LoginScreen;
let otpScreen: OtpScreen;
let registerScreen: RegisterScreen;

describe('Login', () => {
    before(async () => {
        homeScreen = new HomeScreen();
        profileScreen = new ProfileScreen();
        loginScreen = new LoginScreen();
        otpScreen = new OtpScreen();
        registerScreen = new RegisterScreen();
    })
    it.skip('should login with valid credentials', async () => {
        const data: loginDetails = credentials.credentialsSets.validCredentials as loginDetails;
        await homeScreen.navigateToProfile();
        await profileScreen.goToLoginscreen();
        await loginScreen.enterCredentials(data.username, data.password);
        await loginScreen.clickOnLoginButton();
        await otpScreen.enterOtpAndVerify(data.otp);

        const userName = await homeScreen.getUserNameInTitle();
        expect(userName).to.equal("Jack Sparrow");
    });

    it('should register with valid credentials', async () => {
        const data: registerDetails = credentials.credentialsSets.registerDetails as registerDetails;
        await homeScreen.navigateToProfile();
        await profileScreen.goToRegisterScreen();
        await registerScreen.enterDetailsForRegister(data.username, data.email, data.password, data.mobilenumber);
        await otpScreen.enterOtpAndVerify(data.otp);
        const popUpMsg = await homeScreen.getPopUpMessage();
        expect(popUpMsg).to.equal("Registration is successful");
        await homeScreen.closePopUp();
        const userName = await homeScreen.getUserNameInTitle();
        expect(userName).to.equal(data.username);
    });
});
