import { AuthenticationRequestBody } from "../models/request/authentication.request"
import { RandomUtil } from "../../../Utils/common/randomUtils"
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { AuthService } from "../services/auth.service";
import { expect } from 'chai';

let randomUtil: RandomUtil;
let authService: AuthService;

describe("SignUp and Login", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
    })
    it("Do SignUp", async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        expect(signUpResponseBody.status).to.be.equal(201);
        expect(signUpResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(signUpResponseBody.data.user.id).not.null;
        expect(signUpResponseBody.data.session.access_token).not.null;
    })

    it("Do login", async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        expect(signUpResponseBody.status).to.be.equal(201);

        const loginRequestBody: AuthenticationRequestBody = {
            email: signUpRequestBody.email,
            password: signUpRequestBody.password
        }
        const loginResponseBody: AuthenticationResponseBody = await authService.login(loginRequestBody);
        expect(loginResponseBody.status).to.be.equal(200);
        expect(loginResponseBody.data.user.email).to.be.equal(signUpRequestBody.email);
        expect(loginResponseBody.data.session.access_token).not.null;
    })
})