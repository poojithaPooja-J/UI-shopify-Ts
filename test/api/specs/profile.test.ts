import { expect } from "chai";
import { RandomUtil } from "../../../Utils/common/randomUtils";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { ProfileRequestBody, UpdateProfileRequestBody } from "../models/request/profile.request";
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { CreateProfileResponse, UpdateProfileResponseBody } from "../models/response/profile.response";
import { AuthService } from "../services/auth.service";
import { ProfileService } from "../services/profile.service";

let randomUtil: RandomUtil;
let authService: AuthService;
let access_token: string;
let profileService: ProfileService;
describe("Profile", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
        profileService = new ProfileService();

    });

    beforeEach(async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        access_token = signUpResponseBody.data.session.access_token;
    })

    it("Create Profile", async () => {
        const profile: ProfileRequestBody = {
            first_name: randomUtil.getRandomName(5),
            last_name: randomUtil.getRandomName(5),
            address: randomUtil.getRandomName(15),
            mobile_number: randomUtil.getRandomMobileNumber()
        };

        const response: CreateProfileResponse = await profileService.createProfile(access_token, profile);
        expect(response.status).to.be.equal(201);
        expect(response.first_name).to.be.equal(profile.first_name);
        expect(response.last_name).to.be.equal(profile.last_name);
        expect(response.address).to.be.equal(profile.address);
        expect(response.mobile_number).to.be.equal(profile.mobile_number);
    })

    it("Update Profile", async () => {
        const profile: ProfileRequestBody = {
            first_name: randomUtil.getRandomName(5),
            last_name: randomUtil.getRandomName(5),
            address: randomUtil.getRandomName(15),
            mobile_number: randomUtil.getRandomMobileNumber()
        };

        const createResponse: CreateProfileResponse = await profileService.createProfile(access_token, profile);
        expect(createResponse.status).to.be.equal(201);


        const updateProfileBody: UpdateProfileRequestBody = {
            first_name: randomUtil.getRandomName(5),
        };

        const updateProfileResponse: UpdateProfileResponseBody = await profileService.updateProfile(access_token, updateProfileBody);

        expect(updateProfileResponse.status).to.be.equal(200);
        expect(updateProfileResponse.data.first_name).to.be.equal(updateProfileBody.first_name);
        expect(updateProfileResponse.data.last_name).to.be.equal(createResponse.last_name);
        expect(updateProfileResponse.data.address).to.be.equal(createResponse.address);
        expect(updateProfileResponse.data.mobile_number).to.be.equal(createResponse.mobile_number);
        expect(updateProfileResponse.message).to.be.equal("Profile updated successfully");
        expect(updateProfileResponse.field_updated[0]).to.be.equal('first_name');

    })

})