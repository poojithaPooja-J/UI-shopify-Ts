import axios from "axios";
import { BaseService } from "./base.service";
import { SetStatusResponse } from "../models/response/setStatus.response";
import { Payment } from "../models/response/payment.response";

export class PaymentService extends BaseService {

    async makePayment(access_token: string) {

        const url: string = `${this.getBaseUrl()}/api/payment`;
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        }

        const response = await axios.post(url, null, config);

        const paymentResponse: Payment = await response.data;
        new SetStatusResponse().set(paymentResponse, response);

        return paymentResponse;
    }
}