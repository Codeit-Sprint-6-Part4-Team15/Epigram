'use client';

import React, { useEffect, useState } from 'react';

import IcoUser from '@/public/assets/ic_user.svg';
import Image from 'next/image';

import instance from '@/src/app/api/axios';

import { User } from '../types/auth';
import Loader from './commons/Loader';
import { useRouter } from 'next/navigation';

export default function UserInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    router.replace('/'); // 홈 페이지로 리다이렉트
  };
  const getUser = async () => {
    let userData;
    setIsLoading(true);
    try {
      const res = await instance.get('users/me');
      userData = await res.data;
    } catch (error) {
      console.error('유저 데이터를 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
    return userData;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <figure className="relative flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border-2 border-blue-200 bg-white xl:h-[120px] xl:w-[120px]">
        <Image src={user?.image ?? IcoUser} fill alt="유저 이미지" />
      </figure>
      <strong className="typo-lg-medium text-black-950 xl:typo-2xl-medium">
        {user?.nickname ?? 'user'}
      </strong>
      <button
        type="button"
        className="typo-md-regular mt-[8px] rounded-[100px] bg-line-100 px-[14px] py-[6px] text-gray-300 xl:typo-xl-regular xl:px-[15px] xl:py-[8px]"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </>
  );
}
