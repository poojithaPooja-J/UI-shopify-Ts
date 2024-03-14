import axios from "axios";
import { BaseService } from "./base.service";
import { ProductsList } from "../models/response/product/getProducts.response";
import { Product } from "../models/response/product/getProduct.response";
import { SetStatusResponse } from "../models/response/setStatus.response";

export class ProductService extends BaseService {
    async getAllProducts(access_token: string) {
        const url: string = `${this.getBaseUrl()}/api/products`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.get(url, config);

        const productsList: ProductsList = response.data;
        new SetStatusResponse().set(productsList, response);

        return productsList;
    }

    async getProductsInLimit(limit: number, page: number, access_token: string) {

        const url: string = `${this.getBaseUrl()}/api/products?limit=${limit}&page=${page}`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.get(url, config);

        const productsList: ProductsList = response.data;
        new SetStatusResponse().set(productsList, response);

        return productsList;
    }

    async getProductByID(product_id: string, access_token: string) {

        const url: string = `${this.getBaseUrl()}/api/products/${product_id}`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.get(url, config);

        const product: Product = response.data;
        new SetStatusResponse().set(product, response);

        return product;
    }

}