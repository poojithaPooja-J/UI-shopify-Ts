import { BaseResponse } from "../base.response"

export interface Cart extends BaseResponse {
    cart_id: string
    user_id: string
    created_at: string
}