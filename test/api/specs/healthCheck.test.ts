import { expect } from "chai";
import { RandomUtil } from "../../../Utils/common/randomUtils";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { healthCheckResponse } from "../models/response/healthCheck.response";
import { AuthService } from "../services/auth.service";
import { HealthCheckService } from "../services/healthCheck.service"

let healthCheckService: HealthCheckService;
let randomUtil: RandomUtil;
let authService: AuthService;
describe("Health Check", () => {
    before(async () => {
        healthCheckService = new HealthCheckService();
        randomUtil = new RandomUtil();
        authService = new AuthService();
    });

    beforeEach(async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        await authService.signUp(signUpRequestBody);
    })
    it("Get Health Check", async () => {
        const response: healthCheckResponse = await healthCheckService.getHealthCheck();
        expect(response.status).to.be.equal(200);
        expect(response.message).to.be.equal('ok');
    })
})