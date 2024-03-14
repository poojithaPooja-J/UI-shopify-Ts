export interface ProfileRequestBody {
    first_name: string
    last_name: string
    address: string
    mobile_number: string
}

export interface UpdateProfileRequestBody {
    first_name: string
}