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
import { PaymentService } from "../services/payment.service";
import { Payment } from "../models/response/payment.response";

let randomUtil: RandomUtil;
let authService: AuthService;
let access_token: string;
let cartItemsService: CartItemsService;
let cartService: CartService;
let productService: ProductService;
let paymentService: PaymentService;

describe("Payment ", () => {
    before(async () => {
        randomUtil = new RandomUtil();
        authService = new AuthService();
        cartItemsService = new CartItemsService();
        productService = new ProductService();
        cartService = new CartService();
        paymentService = new PaymentService();
    });

    beforeEach(async () => {
        const signUpRequestBody: AuthenticationRequestBody = {
            email: randomUtil.getRandomGmail(),
            password: randomUtil.getRandomPassword(6)
        };
        const signUpResponseBody: AuthenticationResponseBody = await authService.signUp(signUpRequestBody);
        access_token = signUpResponseBody.data.session.access_token;
    })

    it("Make Payment", async () => {
        const createCart: Cart = await cartService.createCart(access_token);
        expect(createCart.status).to.be.equal(201);
        const cartId = createCart.cart_id;

        const productsList: ProductsList = await productService.getAllProducts(access_token);
        const productId = productsList.products[1].id;

        const addItemBody: CartItemsRequestBody = {
            product_id: productId,
            quantity: randomUtil.getRandomNumber()
        };

        const addItems = await cartItemsService.AddItemsToCart(access_token, cartId, addItemBody);

        expect(addItems.status).to.be.equal(201);

        const response: Payment = await paymentService.makePayment(access_token);

        expect(response.status).to.be.equal(200);
        expect(response.message).to.be.equal('payment success');


    })
})