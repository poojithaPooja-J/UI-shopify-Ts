// import { LoginFlow } from "../../userflows/LoginFlow";
import { LoginFlow } from "./../userflows/LoginFlow";
import { LoginDetails } from '../resources/LoginDetails';
import { ProfileScreen } from "../screens/ProfileScreen";
import * as credentials from "../resources/credentials.json";
import { ScreenUtils } from "../screens/commonFunctions/ScreenUtils";
import { expect } from "chai";

let loginFlow = new LoginFlow();
let profileScreen = new ProfileScreen();
let screenUtils = new ScreenUtils();
it("Logout", async () => {
    const data: LoginDetails = credentials.validCredentials as LoginDetails;
    await loginFlow.performLogin(data.username, data.password, data.otp);
    await screenUtils.logout();
    let isDisplayed: boolean = await profileScreen.isLoginButtonDisplayed();
    expect(isDisplayed).to.be.true;


})