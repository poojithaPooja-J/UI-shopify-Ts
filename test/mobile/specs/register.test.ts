// import { expect } from '@wdio/globals'
import { expect } from 'chai';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ScreenUtils } from '../screens/commonFunctions/ScreenUtils';
import { RegisterDetails } from '../resources/RegisterDetails';
import * as credentials from "../resources/credentials.json";

let homeScreen: HomeScreen;
let profileScreen: ProfileScreen;
let otpScreen: OtpScreen;
let registerScreen: RegisterScreen;
let screenUtils: ScreenUtils;

describe('Register with valid details', () => {
    before(async () => {
        homeScreen = new HomeScreen();
        profileScreen = new ProfileScreen();
        otpScreen = new OtpScreen();
        registerScreen = new RegisterScreen();
        screenUtils = new ScreenUtils();
    })

    it('should register with valid credentials', async () => {
        const data: RegisterDetails = credentials.registerDetails as RegisterDetails;
        await homeScreen.navigateToProfile();
        await profileScreen.goToRegisterScreen();
        await registerScreen.enterDetailsAndClickOnRegister(data);
        await otpScreen.enterOTPAndVerify(data.otp);
        const popUpMsg = await homeScreen.getPopUpMessage();
        expect(popUpMsg).to.equal("Registration is successful");
        await homeScreen.closePopUp();
        const userName = await homeScreen.getUserNameInTitle();
        expect(userName).to.equal(data.username);
    });
});
