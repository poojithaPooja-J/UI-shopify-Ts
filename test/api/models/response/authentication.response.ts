import { BaseResponse } from "./base.response"

export interface AuthenticationResponseBody extends BaseResponse {
    data: Data
}

export interface Data {
    user: User
    session: Session
}

export interface User {
    id: string
    aud: string
    role: string
    email: string
    email_confirmed_at: string
    phone: string
    last_sign_in_at: string
    app_metadata: AppMetadata
    user_metadata: UserMetadata
    identities: Identity[]
    created_at: string
    updated_at: string
}

export interface AppMetadata {
    provider: string
    providers: string[]
}

export interface UserMetadata { }

export interface Identity {
    identity_id: string
    id: string
    user_id: string
    identity_data: IdentityData
    provider: string
    last_sign_in_at: string
    created_at: string
    updated_at: string
    email: string
}

export interface IdentityData {
    email: string
    email_verified: boolean
    phone_verified: boolean
    sub: string
}

export interface Session {
    access_token: string
    token_type: string
    expires_in: number
    expires_at: number
    refresh_token: string
    user: User
}



