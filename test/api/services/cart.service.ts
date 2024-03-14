import axios from "axios";
import { Cart } from "../models/response/cart/createCart.response";
import { BaseService } from "./base.service";
import { DeletedCartResponse } from "../models/response/cart/deleteCart.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class CartService extends BaseService {
    async createCart(access_token: string) {
        try {
            const url: string = `${this.getBaseUrl()}/api/cart`;
            const config = {
                headers: { Authorization: `Bearer ${access_token}` }
            }

            const response = await axios.post(url, null, config)
            const cart: Cart = response.data;
            new SetStatusResponse().set(cart, response);

            return response.data;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }

    async getCart(access_token: string) {
        try {
            const url: string = `${this.getBaseUrl()}/api/cart`;
            const config = {
                headers: { Authorization: `Bearer ${access_token}` }
            }

            const response = await axios.get(url, config)
            const cart: Cart = response.data;
            new SetStatusResponse().set(cart, response);

            return response.data;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }
    async deleteCart(access_token: string, id: string) {
        try {
            const url: string = `${this.getBaseUrl()}/api/cart/${id}`;
            const config = {
                headers: { Authorization: `Bearer ${access_token}` }
            }

            const response = await axios.delete(url, config)
            const deletedCartResponse: DeletedCartResponse = response.data;
            new SetStatusResponse().set(deletedCartResponse, response);

            return response.data;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw error;
        }
    }
}