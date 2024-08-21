'use client';

import React, { useEffect, useState } from 'react';

import IcoSetting from '@/public/assets/Ic_setting.svg';
import IcoUser from '@/public/assets/ic_user.svg';
import Image from 'next/image';

import instance from '@/src/app/api/axios';

import useModal from '../hooks/useModal';
import { User } from '../types/auth';
import Loader from './commons/Loader';
import Modal from './commons/Modal/Modal';
import ProfileEditModal from './commons/Modal/ProfileEditModal';

export default function UserInfo() {
  const [
    isProfileEditModalOpened,
    { open: openProfileEditModal, close: closeProfileEditModal },
  ] = useModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
      <button type="button" onClick={openProfileEditModal}>
        <figure className="relative flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 border-blue-200 bg-white xl:h-[120px] xl:w-[120px]">
          <Image src={user?.image ?? IcoUser} fill alt="유저 이미지" />
          <span className="absolute right-0 top-0 rounded-full border-2 border-blue-200 bg-white p-[2px]">
            <Image
              src={IcoSetting}
              width={20}
              height={20}
              alt="프로필 수정하기"
            />
          </span>
        </figure>
      </button>
      <strong className="typo-lg-medium text-black-950 xl:typo-2xl-medium">
        {user?.nickname ?? 'user'}
      </strong>
      <button
        type="button"
        className="typo-md-regular mt-[8px] rounded-[100px] bg-line-100 px-[14px] py-[6px] text-gray-300 xl:typo-xl-regular xl:px-[15px] xl:py-[8px]"
      >
        로그아웃
      </button>
      <Modal opened={isProfileEditModalOpened}>
        <ProfileEditModal user={user} onClose={closeProfileEditModal} />
      </Modal>
    </>
  );
}
