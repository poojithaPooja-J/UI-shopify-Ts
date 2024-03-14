import { BaseResponse } from "./base.response";

export interface CreateProfileResponse extends BaseResponse {
    id: string
    created_at: string
    first_name: string
    last_name: string
    address: string
    mobile_number: string
    user_id: string
}

export interface UpdateProfileResponseBody extends BaseResponse {
    data: ProfileDetails
    message: string
    field_updated: string[]
}

export interface ProfileDetails {
    id: string
    created_at: string
    first_name: string
    last_name: string
    address: string
    mobile_number: string
    user_id: string
}