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
    const redirect_uri = `https://epigram-one.vercel.app/${endpoint}`;
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_APP_KEY}&state=google&response_type=token&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/userinfo.email`
}

export function getKakaoOauthUrlFor(endpoint: 'signin' | 'signup') {
    const redirect_uri = `https://epigram-one.vercel.app/${endpoint}`;
    return `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&state=kakao&redirect_uri=${redirect_uri}&response_type=token`
}