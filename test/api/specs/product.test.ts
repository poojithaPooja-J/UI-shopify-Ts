import { RandomUtil } from "../../../Utils/common/randomUtils";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { AuthService } from "../services/auth.service";
import { expect } from "chai";
import { ProductService } from "../services/product.service";
import { ProductsList } from "../models/response/product/getProducts.response";
import { Product } from "../models/response/product/getProduct.response";


let randomUtil: RandomUtil;
let authService: AuthService;
let productService: ProductService;
let access_token: string;

describe("SignUp and Login", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
        productService = new ProductService();
    });

    beforeEach(async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        access_token = signUpResponseBody.data.session.access_token;
    })
    it("Get All the Products", async () => {
        const response = await productService.getAllProducts(access_token);
        expect(response.status).to.be.equal(200);
        expect(response.products.length).to.be.equal(20);
    })

    it("Get Products in Limit", async () => {
        let limit: number = 4;
        let page: number = 4;
        const response = await productService.getProductsInLimit(limit, page, access_token)
        expect(response.status).to.be.equal(200);
        expect(response.products.length).to.be.equal(4);
    })

    it("Get Product By Id", async () => {
        const productsList: ProductsList = await productService.getAllProducts(access_token);
        const product_id = productsList.products[1].id;
        const response: Product = await productService.getProductByID(product_id, access_token);
        expect(response.status).to.be.equal(200);
        expect(response.product.id).to.be.equal(product_id);
    })
})
