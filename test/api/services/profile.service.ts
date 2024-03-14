import axios from "axios";
import { ProfileRequestBody, UpdateProfileRequestBody } from "../models/request/profile.request";
import { BaseService } from "./base.service";
import { CreateProfileResponse, UpdateProfileResponseBody } from "../models/response/profile.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class ProfileService extends BaseService {
    async createProfile(access_token: string, body: ProfileRequestBody) {
        const url: string = `${this.getBaseUrl()}/api/profile`;

        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }
        const response = await axios.post(url, body, config);

        const profile: CreateProfileResponse = response.data;
        new SetStatusResponse().set(profile, response);

        return profile;

    }

    async updateProfile(access_token: string, body: UpdateProfileRequestBody) {
        const url: string = `${this.getBaseUrl()}/api/profile`;

        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }
        const response = await axios.patch(url, body, config);

        const updatedProfile: UpdateProfileResponseBody = response.data;
        new SetStatusResponse().set(updatedProfile, response);

        return updatedProfile;

    }
}