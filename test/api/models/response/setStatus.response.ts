import { BaseResponse } from "./base.response";

export class SetStatusResponse  {
    async set(data: any, response: any) {
        data.status = response.status;
        data.statusText = response.statusText;
    }
}