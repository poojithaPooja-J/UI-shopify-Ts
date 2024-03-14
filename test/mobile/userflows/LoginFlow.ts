import { OtpScreen } from '../screens/OtpScreen'
import { ScreenUtils } from '../screens/commonFunctions/ScreenUtils'

let otpScreen: OtpScreen = new OtpScreen();
let screenUtils: ScreenUtils = new ScreenUtils();

export class LoginFlow {
    async performLogin(userName: string, password: string, otp: string) {
        await screenUtils.login(userName, password);
        await otpScreen.enterOTPAndVerify(otp);
    }
}