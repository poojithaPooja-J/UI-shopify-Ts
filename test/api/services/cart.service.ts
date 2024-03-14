import axios from "axios";
import { Cart } from "../models/response/cart/createCart.response";
import { BaseService } from "./base.service";
import { DeletedCartResponse } from "../models/response/cart/deleteCart.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class CartService extends BaseService {
    async createCart(access_token: string) {
        const url: string = `${this.getBaseUrl()}/api/cart`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.post(url, null, config)
        const cartResponseBody: Cart = response.data;
        new SetStatusResponse().set(cartResponseBody, response);

        return response.data;
    }

    async getCart(access_token: string) {

        const url: string = `${this.getBaseUrl()}/api/cart`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.get(url, config)
        const cartResponseBody: Cart = response.data;
        new SetStatusResponse().set(cartResponseBody, response);

        return response.data;

    }
    async deleteCart(access_token: string, id: string) {
        const url: string = `${this.getBaseUrl()}/api/cart/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.delete(url, config)
        const deletedCartResponse: DeletedCartResponse = response.data;
        new SetStatusResponse().set(deletedCartResponse, response);

        return response.data;

    }
}