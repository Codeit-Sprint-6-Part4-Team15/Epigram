'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import searchIcon from '@/public/assets/ic_search.svg';
import profileIcon from '@/public/assets/ic_profile.svg';
import epigramLogo from '@/public/assets/logo.svg';
import hamberger from '@/public/assets/ic_hamberger.svg';
import closeIcon from '@/public/assets/ic_close_bk.svg';
import userProfile from '@/public/assets/ic_user.svg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import instance from './api/axios';
import { User } from '../types/auth';
import Loader from '../components/commons/Loader';

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
        <Link href='/' className='w-full h-[52px] flex justify-center items-center border-b border-line-300 md:h-[60px] xl:h-[80px]'>
          <Image className='w-[119px] h-[36px] cursor-pointer md:w-[172px] md:h-[48px]' src={epigramLogo} alt='epigramLogo' />
        </Link>
      );
    } else if (pathname === '/') {
      return (
        <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[48px] md:h-[60px] xl:px-[88px] xl:h-[80px]'>
          <Link href="/search"><Image className='w-[20px] h-[20px] cursor-pointer xl:w-[36px] xl:h-[36px]' src={searchIcon} alt='searchIcon' /></Link>
          <Link href="/"><Image className='w-[170px] h-[50px] cursor-pointer xl:w-[170px] xl:h-[70px]' src={epigramLogo} alt='epigramLogo' /></Link>
          <button onClick={handleProfileClick} className='flex items-center justify-center cursor-pointer'>
            <Image className='w-[20px] h-[20px] xl:w-[36px] xl:h-[36px]' src={profileIcon} alt='profileIcon' />
          </button>        
        </div>
      );
    } else if (pathname === '/epigrams' || pathname.startsWith('/epigrams/') || pathname === '/search' || pathname === '/addepigram' || pathname === '/mypage' || pathname === '/feed') {
      return (
        <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[72px] md:h-[60px] xl:px-[120px] xl:h-[80px]'>
          <div className='flex items-center gap-[12px] md:gap-[24px] xl:gap-[36px]'>
            <div className='block cursor-pointer md:hidden'>
              <Image src={hamberger} alt='hamberger' onClick={toggleSidebar} />
            </div>
            <Link href='/'>
              <Image className='w-[101px] h-[26px] xl:w-[131px] xl:h-[36px]' src={epigramLogo} alt='epigramLogo' />
            </Link>
            <div className='hidden md:flex md:gap-[24px] text-[14px] xl:text-[16px]'>
              <Link href='/feed'>피드</Link>
              <Link href='/search'>검색</Link>
            </div>
          </div>
          <div className='flex items-center gap-[6px]'>
            <div><Image width={20} height={20} className='w-[16px] h-[16px] xl:w-[24px] xl:h-[24px]' src={user?.image ?? userProfile} alt='userProfile'/></div>
            <div className='text-[13px] xl:text-[14px]'>{user?.nickname ?? 'user'}</div>
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
    <nav className='sticky top-0 z-10 w-full bg-white'>
      {renderNavBarContent()}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-3/5 bg-white h-full">
            <div className='h-[54px] px-[16px] flex items-center justify-end border-b border-line-300'><Image className='cursor-pointer w-[24px] h-[24px]' src={closeIcon} alt='close' onClick={toggleSidebar} /></div>
            <Link href='/feed' className='text-[16px] px-[20px] h-[74px] flex items-center hover:bg-blue-200'>
              <div>피드</div>
            </Link>
            <Link href='/search' className='text-[16px] px-[20px] h-[74px] flex items-center hover:bg-blue-200'>
              <div>검색</div>
            </Link>
          </div>
          <div className="w-2/5 bg-gray-700 opacity-50 h-full" onClick={toggleSidebar}></div>
        </div>
      )}
    </nav>
  );
}

export default Header;