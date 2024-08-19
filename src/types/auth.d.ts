export interface SignInRequestBody {
    email: string;
    password: string;
}

export interface SignUpRequestBody {
    email: string;
    password: string;
    passwordConfirmation: string,
    nickname: string,
    image?: string;
}

export interface AuthResponse {
    refreshToken: string;
    accessToken: string;
    user: User;
}

export interface FormErrorResponse {
    message: string;
    details: {
        [fieldName: string]: {
            message: string;
        }
    }
}

export interface OauthRequestBody {
    state?: string;
    redirectUri: string;
    token: OauthToken;
}

interface User {
    id: number;
    email: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
    createdAt: string;
    image: UrlType; // seems to be an url of the given image.
}

export type OauthToken = string;
export type OauthProvider = 'GOOGLE' | 'KAKAO' | 'NAVER'; 
export type UrlType = string;