import { BaseResponse } from "../base.response"

export interface DeletedCartResponse extends BaseResponse {
    cart_id: string
    message: string
}