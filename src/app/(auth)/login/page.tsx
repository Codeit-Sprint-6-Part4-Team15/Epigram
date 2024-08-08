"use client";

import Button from '@/src/components/commons/Button';
import Input from '@/src/components/commons/Input';
import InputError from '@/src/components/commons/InputError';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginValues {
    username: string;
    password: string;
}

export default function Login() {
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<LoginValues>({
        shouldUseNativeValidation: true,
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<LoginValues> = (data) => {
        console.log(data);
        /* API 관련 코드가 머지되는대로 해당 로직을 추가하겠습니다. */
    }

    return (
        <div className="block">
            <form onSubmit={handleSubmit(onSubmit)} className="*:mb-[16px] last-child:mb-[24px]">
                <label className="block">
                    <Input type="email" placeholder="이메일" {...register(
                        "username",
                        {
                            required: "이메일 주소를 입력해주세요",
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: "잘못된 이메일 주소입니다."
                            }
                        }
                        )
                    } />
                    { errors.username && <InputError>{errors.username?.message}</InputError>}
                </label>
                <label className="block">
                    <Input type="password" placeholder="비밀번호" {...register("password", { required: "비밀번호를 입력해주세요" })} />
                    { errors.password && <InputError>{errors.password?.message}</InputError>}
                </label>
                <Button variant="wide" disabled={!isValid} size={{ default: "xl", md: "2xl", xl: "3xl" }} type="button">로그인</Button>
            </form>
            <div className="text-right lg:typo-xl-medium md:typo-lg-medium sm:typo-md-medium text-blue-400 mb-[40px]">
                회원이 아니신가요?&nbsp;
                <Link href="/" className="text-black-500 lg:text-[20px]/[26px] md:text-[16px]/[26px] sm:text-[14px]/[26px] font-medium underline">가입하기</Link>
            </div>
            <p className="flex flex-row before:mr-2.5 before:content-[''] before:flex-1 before:m-auto before:border-b before:border-solid after:ml-2.5 after:content-[''] after:flex-1 after:m-auto after:border-b after:border-solid mb-[26px] lg:mb-[40px]">
                SNS 계정으로 로그인하기
            </p>
            <div className="flex flex-row justify-center gap-x-[16px] *:w-[40px] *:h-[40px] lg:*:w-[60px] lg:*:h-[60px]">
                <Image src="/assets/authPage/logo_google.svg" width="60" height="60" alt="구글로고" />
                <Image src="/assets/authPage/logo_kakao.svg" width="60" height="60" alt="카카오로고" />
            </div>
        </div>
        
    );
}