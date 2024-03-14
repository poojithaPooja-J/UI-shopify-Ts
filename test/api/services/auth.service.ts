import axios from "axios";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { BaseService } from "./base.service";
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class AuthService extends BaseService {

    async signUp(body: AuthenticationRequestBody) {
        const url: string = `${this.getBaseUrl()}/api/auth/signup`;

        const response = await axios.post(url, body);

        const signUpResponseBody: AuthenticationResponseBody = response.data;
        new SetStatusResponse().set(signUpResponseBody, response);

        return signUpResponseBody;
    }

    async login(body: AuthenticationRequestBody) {
        const url: string = `${this.getBaseUrl()}/api/auth/login`;

        const response = await axios.post(url, body);

        const loginResponseBody: AuthenticationResponseBody = response.data;
        new SetStatusResponse().set(loginResponseBody, response);

        return loginResponseBody;
    }
}