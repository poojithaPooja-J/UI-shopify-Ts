import { BaseScreen } from "../BaseScreen"
import { HomeScreen } from "../HomeScreen";
import { ProfileScreen } from "../ProfileScreen";
import { LoginScreen } from "../LoginScreen";


let homeScreen: HomeScreen = new HomeScreen();
let profileScreen: ProfileScreen = new ProfileScreen();
let loginScreen: LoginScreen = new LoginScreen();

export class ScreenUtils extends BaseScreen {

    async login(userName: string, password: string) {
        await homeScreen.navigateToProfile();
        await profileScreen.goToLoginscreen();
        await loginScreen.enterCredentials(userName, password)
        await loginScreen.clickOnLoginButton();
    }

    async goToForgotPasswordScreen(email: string) {
        await homeScreen.navigateToProfile();
        await profileScreen.goToLoginscreen();
        await loginScreen.enterEmailAndClickOnForgotPassword(email);
    }

    async logout() {
        await homeScreen.navigateToProfile();
        await profileScreen.doLogout();
    }




}