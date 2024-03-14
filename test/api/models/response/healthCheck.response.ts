import { BaseResponse } from "./base.response"

export interface healthCheckResponse extends BaseResponse {
    message: string
}