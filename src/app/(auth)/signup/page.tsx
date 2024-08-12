"use client";

import Button from '@/src/components/commons/Button';
import Input from '@/src/components/commons/Input';
import InputError from '@/src/components/commons/InputError';
import { SignUpRequestBody, AuthResponse, FormErrorResponse } from '@/src/types/auth';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { postSignUp } from '../../api/auth';

export default function SignUp() {
    const { register, formState: { errors, isValid }, handleSubmit, setError } = useForm<SignUpRequestBody>({
        shouldUseNativeValidation: true,
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<SignUpRequestBody> = (data) => {
        postSignUp(data)
        .then((response: AuthResponse) => {
            localStorage.setItem('access_token', response.accessToken);
            localStorage.setItem('refresh_token', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
        })
        .catch((response: FormErrorResponse) => {
            Object.entries(response.details).forEach((value) => {
                let fieldName = value[0].replace('requestBody.', '') as 'email' | 'password' | 'passwordConfirmation' | 'nickname';
                let errorMessage = value[1].message;
                setError(fieldName, {type: 'custom', message: errorMessage});
            });
        });
    }

    return (
        <div className="block">
            <form onSubmit={handleSubmit(onSubmit)} className="*:mb-[16px] last-child:mb-[24px]">
                <label className="block">
                    <p className="sm:typo-md-medium md:typo-lg-medium typo-xl-medium">이메일</p>
                    <Input type="email" placeholder="이메일" {...register(
                        "email",
                        {
                            required: "이메일 주소를 입력해주세요",
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "잘못된 이메일 주소입니다."
                            },
                        })
                    } />
                    { errors.email && <InputError>{errors.email.message}</InputError>}
                </label>
                <label className="block">
                    <p className="sm:typo-md-medium md:typo-lg-medium typo-xl-medium">비밀번호</p>
                    <Input type="password" placeholder="비밀번호" {...register(
                        "password",
                        {
                            required: "비밀번호를 입력해주세요.",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])(.){12,}$/,
                                message: "숫자, 영어, 특수문자 포함 12자 이상 입력해주세요."
                            }
                        })
                    } />
                    <div className="md:h-[16px] sm:h-[10px]"></div>
                    <Input type="password" placeholder="비밀번호확인" {...register(
                        "passwordConfirmation",
                        {
                            required: "비밀번호를 입력해주세요.",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])(.){12,}$/,
                                message: "숫자, 영어, 특수문자 포함 12자 이상 입력해주세요.",
                            },
                            validate: {
                                areEachPasswordNotEqual: (_, values) => {
                                    return values.password !== values.passwordConfirmation ? "비밀번호가 일치하지 않습니다." : true;
                                },
                            },
                            deps: ["password"],
                        })
                    } />
                    { errors.passwordConfirmation && <InputError>{errors.passwordConfirmation?.message}</InputError>}
                </label>
                <label className="block">
                    <p>닉네임</p>
                    <Input type="text" placeholder="닉네임" {...register(
                        "nickname",
                        {
                            required: "닉네임을 입력해주세요",
                        })
                    } />
                    { errors.nickname && <InputError>{errors.nickname?.message}</InputError>}
                </label>
                <Button variant="wide" disabled={!isValid} size={{ default: "xl", md: "2xl", xl: "3xl" }} type="submit">가입하기</Button>
            </form>
            <p className="flex flex-row before:mr-2.5 before:content-[''] before:flex-1 before:m-auto before:border-b before:border-solid after:ml-2.5 after:content-[''] after:flex-1 after:m-auto after:border-b after:border-solid mb-[26px] lg:mb-[40px]">
                SNS 계정으로 간편 가입하기
            </p>
            <div className="flex flex-row justify-center gap-x-[16px] *:w-[40px] *:h-[40px] lg:*:w-[60px] lg:*:h-[60px]">
                <Image src="/assets/authPage/logo_google.svg" width="60" height="60" alt="구글로고" />
                <Image src="/assets/authPage/logo_kakao.svg" width="60" height="60" alt="카카오로고" />
            </div>
        </div>
    );
}