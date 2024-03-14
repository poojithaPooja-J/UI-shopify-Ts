import { RandomUtil } from "../../../Utils/common/randomUtils";
import { AuthenticationRequestBody } from "../models/request/authentication.request";
import { AuthenticationResponseBody } from "../models/response/authentication.response";
import { AuthService } from "../services/auth.service";
import { expect } from "chai";
import { CartService } from "../services/cart.service";
import { Cart } from "../models/response/cart/createCart.response";
import { DeletedCartResponse } from "../models/response/cart/deleteCart.response";

let randomUtil: RandomUtil;
let authService: AuthService;
let access_token: string;
let cartService: CartService;
let createdCart: Cart;

describe("Cart", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
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

    it("Create Cart", async () => {
        const cart: Cart = await cartService.createCart(access_token);
        expect(cart.status).to.be.equal(201);
    })

    it("Get Cart", async () => {
        const createCart: Cart = await cartService.createCart(access_token);
        expect(createCart.status).to.be.equal(201);

        const cart: Cart = await cartService.getCart(access_token);
        createdCart = cart;
        expect(cart.status).to.be.equal(200);
    })

    it("Delete Cart", async () => {
        const createCart: Cart = await cartService.createCart(access_token);
        expect(createCart.status).to.be.equal(201);

        const cart: DeletedCartResponse = await cartService.deleteCart(access_token, createCart.cart_id);
        expect(cart.status).to.be.equal(200);
        expect(cart.cart_id).to.be.equal(createCart.cart_id);
        expect(cart.message).to.be.equal("Cart deleted");
    })
})