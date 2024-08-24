'use client';

import { useEffect } from 'react';
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
      <form onSubmit={handleSubmit(onSubmit)} className="mb-[24px]">
        <label className="block">
          <p className="typo-md-bold md:typo-lg-semibold lg:typo-xl-semibold">
            이메일
          </p>
          <Input
            type="email"
            placeholder="example@example.com"
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
          <p className="typo-md-bold md:typo-lg-semibold lg:typo-xl-semibold">
            비밀번호
          </p>
          <Input
            type="password"
            placeholder="숫자, 영어, 특수문자 포함 8자 이상"
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
          <div className="sm:h-[10px] md:h-[16px]"></div>
          <Input
            type="password"
            placeholder="비밀번호확인"
            {...register('passwordConfirmation', {
              required: '비밀번호를 입력해주세요.',
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`])(.){12,}$/,
                message: '숫자, 영어, 특수문자 포함 12자 이상 입력해주세요.',
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
          <p className="typo-md-bold md:typo-lg-semibold lg:typo-xl-semibold">
            닉네임
          </p>
          <Input
            type="text"
            placeholder="닉네임"
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
        <div className="mb-[40px] text-right text-blue-400 sm:typo-md-medium md:typo-lg-medium lg:typo-xl-medium">
          이미 회원이신가요?&nbsp;
          <Link
            href="/signin"
            className="font-medium text-black-500 underline sm:text-[14px]/[26px] md:text-[16px]/[26px] lg:text-[20px]/[26px]"
          >
            로그인
          </Link>
        </div>
      </form>
      <p className="mb-[26px] flex flex-row before:m-auto before:mr-2.5 before:flex-1 before:border-b before:border-solid before:content-[''] after:m-auto after:ml-2.5 after:flex-1 after:border-b after:border-solid after:content-[''] lg:mb-[40px]">
        SNS 계정으로 간편 가입하기
      </p>
      <div className="flex flex-row justify-center gap-x-[16px] *:h-[40px] *:w-[40px] lg:*:h-[60px] lg:*:w-[60px]">
        <Link href={getGoogleOAuthUrlFor('signup')}>
          <Image
            src="/assets/authPage/logo_google.svg"
            width="60"
            height="60"
            alt="구글로고"
          />
        </Link>
        <Link href={getKakaoOauthUrlFor('signup')}>
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
