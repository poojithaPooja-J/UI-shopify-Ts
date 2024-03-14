import { BaseResponse } from "./base.response"

export interface Payment extends BaseResponse {
    message: string
    amount_paid: number
}