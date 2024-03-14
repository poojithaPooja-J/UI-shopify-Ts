import { BaseResponse } from "../base.response"

export interface Product extends BaseResponse {
    product: ProductValues;
}
export interface ProductValues {
    created_at: string
    name: string
    description: string
    price: number
    quantity: number
    id: string
    category_id: string
}