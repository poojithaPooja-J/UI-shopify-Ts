import { RandomUtil } from "../../../Utils/common/randomUtils";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { AuthService } from "../services/auth.service";
import { expect } from "chai";
import { CartService } from "../services/cart.service";
import { Cart } from "../models/response/cart/createCart.response";
import { ProductsList } from "../models/response/product/getProducts.response";
import { ProductService } from "../services/product.service";
import { CartItemsService } from "../services/cartItems.service";
import { CartItemsRequestBody } from "../models/request/cartItems.request";

let randomUtil: RandomUtil;
let authService: AuthService;
let access_token: string;
let cartItemsService: CartItemsService;
let cartService: CartService;
let productService: ProductService;

describe("Cart Items", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
        cartItemsService = new CartItemsService();
        productService = new ProductService();
        cartService = new CartService();
    });

    beforeEach(async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        access_token = signUpResponseBody.data.session.access_token;
    })

    it("Add Items to Cart", async () => {
        const createCart: Cart = await cartService.createCart(access_token);
        expect(createCart.status).to.be.equal(201);
        const cartId = createCart.cart_id;

        const productsList: ProductsList = await productService.getAllProducts(access_token);
        const productId = productsList.products[1].id;
        const presentQuantity = productsList.products[1].quantity;

        const body: CartItemsRequestBody = {
            product_id: productId,
            quantity: randomUtil.getRandomNumber()
        };

        const response = await cartItemsService.AddItemsToCart(access_token, cartId, body);

        expect(response.status).to.be.equal(201);
        expect(response.cart_id).to.be.equal(cartId);
        expect(response.product_id).to.be.equal(productId);
        expect(response.quantity).to.be.equal(body.quantity);

    })

    it("Update Items In Cart", async () => {
        const createCart: Cart = await cartService.createCart(access_token);
        expect(createCart.status).to.be.equal(201);
        const cartId = createCart.cart_id;

        const productsList: ProductsList = await productService.getAllProducts(access_token);
        const productId = productsList.products[1].id;

        const addItemBody: CartItemsRequestBody = {
            product_id: productId,
            quantity: randomUtil.getRandomNumber()
        };

        const cartItemId = (await cartItemsService.AddItemsToCart(access_token, cartId, addItemBody)).cart_item_id;


        const updateItemBody: CartItemsRequestBody = {
            product_id: productId,
            quantity: randomUtil.getRandomNumber()
        };
        const updatedItemsResponse = await cartItemsService.updateItemsInCart(access_token, cartId, updateItemBody, cartItemId);

        expect(updatedItemsResponse.status).to.be.equal(200);
        expect(updatedItemsResponse.cart_id).to.be.equal(cartId);
        expect(updatedItemsResponse.product_id).to.be.equal(productId);
        expect(updatedItemsResponse.cart_item_id).to.be.equal(cartItemId);
        expect(updatedItemsResponse.quantity).to.be.equal(updateItemBody.quantity);


    })
})