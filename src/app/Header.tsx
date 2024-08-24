'use client';

import { useEffect, useState } from 'react';

import closeIcon from '@/public/assets/ic_close_bk.svg';
import hamberger from '@/public/assets/ic_hamberger.svg';
import profileIcon from '@/public/assets/ic_profile.svg';
import searchIcon from '@/public/assets/ic_search.svg';
import userProfile from '@/public/assets/ic_user.svg';
import epigramLogo from '@/public/assets/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Loader from '../components/commons/Loader';
import { User } from '../types/auth';
import instance from './api/axios';

function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 744px)'); // 'md' 사이즈 기준

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setIsSidebarOpen(false); // 'md' 사이즈 이상일 때 사이드바를 강제로 끔
      }
    };

    // 미디어 쿼리 변화 감지
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // 초기 상태 설정
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    // 클린업
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
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

  const handleProfileClick = () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // access_token이 있을 경우 /mypage로 이동
      window.location.href = '/mypage';
    } else {
      // access_token이 없을 경우 /signin으로 이동
      window.location.href = '/signin';
    }
  };

  const renderNavBarContent = () => {
    if (pathname === '/signin' || pathname === '/signup') {
      return (
        <Link
          href="/"
          className="flex h-[52px] w-full items-center justify-center border-b border-line-300 md:h-[60px] xl:h-[80px]"
        >
          <Image
            className="h-[36px] w-[119px] cursor-pointer md:h-[48px] md:w-[172px]"
            src={epigramLogo}
            alt="epigramLogo"
          />
        </Link>
      );
    } else if (pathname === '/') {
      return (
        <div className="flex h-[52px] w-full items-center justify-between border-b border-line-300 px-[24px] md:h-[60px] md:px-[48px] xl:h-[80px] xl:px-[88px]">
          <Link href="/search">
            <Image
              className="h-[20px] w-[20px] cursor-pointer xl:h-[36px] xl:w-[36px]"
              src={searchIcon}
              alt="searchIcon"
            />
          </Link>
          <Link href="/">
            <Image
              className="h-[50px] w-[170px] cursor-pointer xl:h-[70px] xl:w-[170px]"
              src={epigramLogo}
              alt="epigramLogo"
              priority={true}
            />
          </Link>
          <button
            onClick={handleProfileClick}
            className="flex cursor-pointer items-center justify-center"
          >
            <Image
              className="h-[20px] w-[20px] xl:h-[36px] xl:w-[36px]"
              src={profileIcon}
              alt="profileIcon"
            />
          </button>
        </div>
      );
    } else if (
      pathname === '/epigrams' ||
      pathname.startsWith('/epigrams/') ||
      pathname === '/search' ||
      pathname === '/addepigram' ||
      pathname === '/mypage' ||
      pathname === '/feed'
    ) {
      return (
        <div className="flex h-[52px] w-full items-center justify-between border-b border-line-300 px-[24px] md:h-[60px] md:px-[72px] xl:h-[80px] xl:px-[120px]">
          <div className="flex items-center gap-[12px] md:gap-[24px] xl:gap-[36px]">
            <div className="block cursor-pointer md:hidden">
              <Image src={hamberger} alt="hamberger" onClick={toggleSidebar} />
            </div>
            <Link href="/">
              <Image
                className="h-[26px] w-[101px] xl:h-[36px] xl:w-[131px]"
                src={epigramLogo}
                alt="epigramLogo"
              />
            </Link>
            <div className="hidden text-[14px] md:flex md:gap-[24px] xl:text-[16px]">
              <Link href="/feed">피드</Link>
              <Link href="/search">검색</Link>
            </div>
          </div>
          <div className="flex items-center gap-[6px]">
            <div>
              <Image
                width={20}
                height={20}
                className="h-[16px] w-[16px] xl:h-[24px] xl:w-[24px]"
                src={user?.image ?? userProfile}
                alt="userProfile"
              />
            </div>
            <div className="text-[13px] xl:text-[14px]">
              {user?.nickname ?? 'user'}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <nav className="sticky top-0 z-10 w-full bg-white">
      {renderNavBarContent()}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="h-full w-3/5 bg-white">
            <div className="flex h-[54px] items-center justify-end border-b border-line-300 px-[16px]">
              <Image
                className="h-[24px] w-[24px] cursor-pointer"
                src={closeIcon}
                alt="close"
                onClick={toggleSidebar}
              />
            </div>
            <Link
              href="/feed"
              className="flex h-[74px] items-center px-[20px] text-[16px] hover:bg-blue-200"
            >
              <div>피드</div>
            </Link>
            <Link
              href="/search"
              className="flex h-[74px] items-center px-[20px] text-[16px] hover:bg-blue-200"
            >
              <div>검색</div>
            </Link>
          </div>
          <div
            className="h-full w-2/5 bg-gray-700 opacity-50"
            onClick={toggleSidebar}
          ></div>
        </div>
      )}
    </nav>
  );
}

export default Header;
