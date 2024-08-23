'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  AuthResponse,
  FormErrorResponse,
  SignInRequestBody,
} from '@/src/types/auth';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/src/components/commons/Button';
import Input from '@/src/components/commons/Input';
import InputError from '@/src/components/commons/InputError';

import {
  getGoogleOAuthUrlFor,
  getKakaoOauthUrlFor,
  postOAuthGoogle,
  postOAuthKakao,
  postSignIn,
} from '../../api/auth';

export default function Login() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<SignInRequestBody>({
    shouldUseNativeValidation: true,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) router.push('/');
    const searchParams = new URL(window.location.href).searchParams;
    const hashParams = new URLSearchParams(window.location.hash);
    if (hashParams.has('id_token')) {
      postOAuthGoogle({
        redirectUri: 'https://epigram-one.vercel.app/signin',
        token: hashParams.get('id_token')!,
      }).then(onAuthSucceeded);
    }
    if (searchParams.get('code') !== null) {
      if (searchParams.get('state') === 'kakao') {
        postOAuthKakao({
          redirectUri: 'https://epigram-one.vercel.app/signin',
          token: searchParams.get('code') ?? 'ERROR',
        }).then(onAuthSucceeded);
      }
    }
  }, []);

  const onAuthSucceeded = (response: AuthResponse) => {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    router.push('/');
  };

  const onAuthFailed = (response: FormErrorResponse) => {
    if (response.details) {
      Object.entries(response.details).forEach(([key, value]) => {
        let fieldName = key.replace(
          'requestBody.',
          '',
        ) as keyof SignInRequestBody;
        let errorMessage = value.message;
        setError(fieldName, { type: 'custom', message: errorMessage });
      });
    } else {
      console.error('Error details are missing or undefined', response);
    }
  };
  const onSubmit: SubmitHandler<SignInRequestBody> = (data) => {
    postSignIn(data).then(onAuthSucceeded, onAuthFailed);
  };

  return (
    <div className="block">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="last-child:mb-[24px] *:mb-[16px]"
      >
        <label className="block">
          <Input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일 주소를 입력해주세요',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '잘못된 이메일 주소입니다.',
              },
            })}
          />
          {errors.email && <InputError>{errors.email?.message}</InputError>}
        </label>
        <label className="block">
          <Input
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: '비밀번호를 입력해주세요' })}
          />
          {errors.password && (
            <InputError>{errors.password?.message}</InputError>
          )}
        </label>
        <Button
          variant="wide"
          type="submit"
          disabled={!isValid}
          size={{ default: 'xl', md: '2xl', xl: '3xl' }}
        >
          로그인
        </Button>
      </form>
      <div className="mb-[40px] text-right text-blue-400 sm:typo-md-medium md:typo-lg-medium lg:typo-xl-medium">
        회원이 아니신가요?&nbsp;
        <Link
          href="/signup"
          className="font-medium text-black-500 underline sm:text-[14px]/[26px] md:text-[16px]/[26px] lg:text-[20px]/[26px]"
        >
          가입하기
        </Link>
      </div>
      <p className="mb-[26px] flex flex-row before:m-auto before:mr-2.5 before:flex-1 before:border-b before:border-solid before:content-[''] after:m-auto after:ml-2.5 after:flex-1 after:border-b after:border-solid after:content-[''] lg:mb-[40px]">
        SNS 계정으로 로그인하기
      </p>
      <div className="flex flex-row justify-center gap-x-[16px] *:h-[40px] *:w-[40px] lg:*:h-[60px] lg:*:w-[60px]">
        <Link href={getGoogleOAuthUrlFor('signin')}>
          <Image
            src="/assets/authPage/logo_google.svg"
            width="60"
            height="60"
            alt="구글로고"
          />
        </Link>
        <Link href={getKakaoOauthUrlFor('signin')}>
          <Image
            src="/assets/authPage/logo_kakao.svg"
            width="60"
            height="60"
            alt="카카오로고"
          />
        </Link>
      </div>
    </div>
  );
}
