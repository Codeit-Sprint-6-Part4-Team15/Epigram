'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  AuthResponse,
  FormErrorResponse,
  SignUpRequestBody,
} from '@/src/types/auth';
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
  postSignUp,
} from '../../api/auth';

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = useForm<SignUpRequestBody>({
    shouldUseNativeValidation: true,
    mode: 'onBlur',
  });
  const [googleOAuthUrl, setGoogleOAuthUrl] = useState('');
  const [kakaoOAuthUrl, setKakaoOAuthUrl] = useState('');

  useEffect(() => {
    setGoogleOAuthUrl(getGoogleOAuthUrlFor('signin'));
    setKakaoOAuthUrl(getKakaoOauthUrlFor('signin'));
  }, []);

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

  const onSubmit: SubmitHandler<SignUpRequestBody> = (data) => {
    postSignUp(data).then(onAuthSucceeded, onAuthFailed);
  };

  const onAuthSucceeded = (response: AuthResponse) => {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    router.push('/');
  };

  const onAuthFailed = (response: FormErrorResponse) => {
    Object.entries(response.details).forEach((value) => {
      let fieldName = value[0].replace(
        'requestBody.',
        '',
      ) as keyof SignUpRequestBody;
      let errorMessage = value[1].message;
      setError(fieldName, { type: 'custom', message: errorMessage });
    });
  };

  return (
    <div className="block">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-[24px]"
        autoComplete="off"
      >
        <label className="block">
          <Input
            type="email"
            placeholder="이메일 example@example.com"
            autoComplete="off"
            {...register('email', {
              required: '이메일 주소를 입력해주세요',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '잘못된 이메일 주소입니다.',
              },
            })}
          />
          <InputError isVisible={!!errors.email}>
            {errors.email?.message}
          </InputError>
        </label>
        <label className="block">
          <Input
            type="password"
            placeholder="비밀번호 8자 이상(숫자, 문자, 특수문자)"
            autoComplete="new-password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])(.){8,}$/,
                message: '숫자, 영어, 특수문자 포함 8자 이상 입력해주세요.',
              },
            })}
          />
          <InputError isVisible={!!errors.password}>
            {errors.password?.message}
          </InputError>
          <Input
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
            {...register('passwordConfirmation', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])(.){8,}$/,
                message: '숫자, 영어, 특수문자 포함 8자 이상 입력해주세요.',
              },
              validate: {
                areEachPasswordNotEqual: (_, values) => {
                  return values.password !== values.passwordConfirmation
                    ? '비밀번호가 일치하지 않습니다.'
                    : true;
                },
              },
              deps: ['password'],
            })}
          />
          <InputError isVisible={!!errors.passwordConfirmation}>
            {errors.passwordConfirmation?.message}
          </InputError>
        </label>
        <label className="block">
          <Input
            type="text"
            placeholder="닉네임"
            autoComplete="off"
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
            })}
          />
          <InputError isVisible={!!errors.nickname}>
            {errors.nickname?.message}
          </InputError>
        </label>
        <Button
          variant="wide"
          disabled={!isValid}
          size={{ default: 'xl', md: '2xl', xl: '3xl' }}
          type="submit"
        >
          가입하기
        </Button>
        <div className="mb-[40px] mt-2 text-center text-blue-400 sm:typo-md-medium md:typo-lg-medium lg:typo-xl-medium lg:mt-4">
          이미 회원이신가요?&nbsp;
          <Link
            href="/signin"
            className="font-medium text-black-500 underline sm:text-[14px]/[26px] md:text-[16px]/[26px] lg:text-[20px]/[26px]"
          >
            로그인
          </Link>
        </div>
      </form>
      <p className="mb-[26px] flex flex-row text-blue-400 before:m-auto before:mr-2.5 before:flex-1 before:border-b before:border-solid before:border-blue-400 before:content-[''] after:m-auto after:ml-2.5 after:flex-1 after:border-b after:border-solid after:border-blue-400 after:content-[''] lg:mb-[40px]">
        SNS 계정으로 간편 가입하기
      </p>
      <div className="flex flex-row justify-center gap-x-[16px] *:h-[40px] *:w-[40px] lg:*:h-[60px] lg:*:w-[60px]">
        <Link href={googleOAuthUrl}>
          <Image
            src="/assets/authPage/logo_google.svg"
            width="60"
            height="60"
            alt="구글로고"
          />
        </Link>
        <Link href={kakaoOAuthUrl}>
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
