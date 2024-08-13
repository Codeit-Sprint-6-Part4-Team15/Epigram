import { SignInRequestBody, SignUpRequestBody, AuthResponse, FormErrorResponse } from "@/src/types/auth";
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