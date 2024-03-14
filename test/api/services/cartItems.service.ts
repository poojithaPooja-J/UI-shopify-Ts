import axios from "axios";
import { CartItemsRequestBody } from "../models/request/cartItems.request";
import { BaseService } from "./base.service";
import { CartItemsResponseBody } from "../models/response/cart/addedcartItems.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class CartItemsService extends BaseService {

    async AddItemsToCart(access_token: string, cart_id: string, body: CartItemsRequestBody) {
        const url: string = `${this.getBaseUrl()}/api/cart/${cart_id}/items`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.post(url, body, config);

        const addedItems: CartItemsResponseBody = response.data;
        new SetStatusResponse().set(addedItems, response);

        return addedItems;
    }

    async updateItemsInCart(access_token: string, cart_id: string, body: CartItemsRequestBody, cart_item_id: string) {
        const url: string = `${this.getBaseUrl()}/api/cart/${cart_id}/items/${cart_item_id}`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }


        const response = await axios.put(url, body, config);
        const updatedItems: CartItemsResponseBody = response.data;
        new SetStatusResponse().set(updatedItems, response);

        return updatedItems;
    }
}