import { SignInRequestBody, SignUpRequestBody, AuthResponse, FormErrorResponse, OauthRequestBody } from "@/src/types/auth";
import instance from "./axios";
import axios from "axios";

export async function postSignIn(signInPayload : SignInRequestBody): Promise<AuthResponse> {
    try {
        const response = await instance.post<AuthResponse>('/auth/signIn', signInPayload);
        return Promise.resolve(response.data);
    } catch (e) {
        if(axios.isAxiosError<FormErrorResponse>(e) && e.response) {
            return Promise.reject(e.response.data);
        }
        return Promise.reject(e);
    }
}

export async function postSignUp(signUpPayload: SignUpRequestBody): Promise<AuthResponse> {
    try {
        const response = await instance.post<AuthResponse>('/auth/signUp', signUpPayload);
        return response.data;
    } catch (e) {
        if(axios.isAxiosError<FormErrorResponse>(e) && e.response) {
            return Promise.reject(e.response.data);
        }
        return Promise.reject(e);
    }
}

export async function postOAuthGoogle(OAuthPayload: OauthRequestBody): Promise<AuthResponse> {
    try {
        const response = await instance.post<AuthResponse>('/auth/signIn/GOOGLE', OAuthPayload);
        return response.data;
    } catch (e) {
        if(axios.isAxiosError(e) && e.response) {
            return Promise.reject(e.response.data);
        }
        return Promise.reject(e);
    }
}

export async function postOAuthKakao(OAuthPayload: OauthRequestBody): Promise<AuthResponse> {
    try {
        const response = await instance.post<AuthResponse>('/auth/signIn/KAKAO', OAuthPayload);
        return response.data;
    } catch (e) {
        if(axios.isAxiosError(e) && e.response) {
            return Promise.reject(e.response.data);
        }
        return Promise.reject(e);
    }
}

export function getGoogleOAuthUrlFor(endpoint: 'signin' | 'signup') {
    const searchParams = new URLSearchParams();
    
    searchParams.set('client_id', process.env.NEXT_PUBLIC_GOOGLE_APP_KEY!);
    searchParams.set('state', 'google');
    searchParams.set('response_type', 'token id_token');
    searchParams.set('redirect_uri', `https://epigram-one.vercel.app/${endpoint}`);
    searchParams.set('scope', 'openid profile email')
    searchParams.set('nonce',
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    );

    return `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`;
}

export function getKakaoOauthUrlFor(endpoint: 'signin' | 'signup') {
    const searchParams = new URLSearchParams();
    searchParams.set('client_id', process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!);
    searchParams.set('state', 'kakao');
    searchParams.set('response_type', 'code');
    searchParams.set('redirect_uri', `https://epigram-one.vercel.app/${endpoint}`);
    return `https://kauth.kakao.com/oauth/authorize?${searchParams.toString()}`
}