import axios from "axios";
import { BaseService } from "./base.service";
import { SetStatusResponse } from "../models/response/setStatus.response";
import { healthCheckResponse } from "../models/response/healthCheck.response";

export class HealthCheckService extends BaseService {

    async getHealthCheck() {
        const url: string = `${this.getBaseUrl()}/health-check`;


        const response = await axios.get(url);

        const healthCheckResponse: healthCheckResponse = response.data;
        new SetStatusResponse().set(healthCheckResponse, response);

        return healthCheckResponse;
    }
}