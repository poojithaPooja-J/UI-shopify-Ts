import { BaseResponse } from "../base.response"
import { ProductValues } from "./getProduct.response"

export interface ProductsList extends BaseResponse {
    products: ProductValues[]
}

