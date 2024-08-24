'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import searchIcon from '@/public/assets/ic_search.svg';
import epigramLogo from '@/public/assets/logo.svg';
import hamberger from '@/public/assets/ic_hamberger.svg';
import closeIcon from '@/public/assets/ic_close_bk.svg';
import userProfile from '@/public/assets/ic_user.svg';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import instance from './api/axios';
import { User } from '../types/auth';
import Loader from '../components/commons/Loader';

function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // 드롭다운을 참조하기 위한 ref

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('click', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    router.replace('/'); // 홈 페이지로 리다이렉트
    window.location.reload(); // 페이지 새로 고침
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 처음 렌더링될 때 로그인 상태 체크
  }, [pathname]); // pathname이 변경될 때마다 로그인 상태 체크

  const renderNavBarContent = () => {
    if (pathname === '/' || pathname === '/epigrams' || pathname.startsWith('/epigrams/') || pathname === '/search' || pathname === '/addepigram' || pathname === '/mypage' || pathname === '/feed') {
      return (
        <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[48px] md:h-[60px] xl:px-[88px] xl:h-[80px]'>
          <div className='flex'>
            <Image className='block 2xs:hidden' src={hamberger} alt='hamberger' onClick={toggleSidebar} />
            <Link href="/"><Image className='w-[101px] h-[50px] cursor-pointer md:h-[58px] xl:w-[170px] xl:h-[78px]' src={epigramLogo} alt='epigramLogo' /></Link>
          </div>
          <div className='flex items-center gap-[6px] md:gap-[8px]'>
            <Link href='/feed'>
              <div className='hidden 2xs:flex text-[14px] hover:underline p-[6px] md:text-[16px] md:p-[8px] xl:text-[20px] xl:p-[12px]'>
                피드
              </div>
            </Link>
            <Link href="/search">
              <div className='hidden 2xs:flex justify-center items-center p-[6px] rounded-full hover:bg-blue-200 md:p-[8px] xl:p-[12px]'>
                <Image className='w-[20px] h-[20px] cursor-pointer md:w-[28px] md:h-[28px] xl:w-[36px] xl:h-[36px]' src={searchIcon} alt='searchIcon' />
              </div>
            </Link>
            {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={handleToggleDropdown} className='flex items-center justify-center hover:bg-blue-200 rounded-full cursor-pointer p-[6px] md:p-[8px] xl:p-[12px]'>
                <Image className='w-[20px] h-[20px] md:w-[28px] md:h-[28px] xl:w-[36px] xl:h-[36px]' src={user?.image ?? userProfile} alt='profileIcon' />
              </button>
              {isDropdownOpen && (
              <ul className="typo-md-regular xl:typo-xl-regular absolute right-[10px] flex w-[97px] flex-col items-center justify-center rounded-[16px] border-[1px] border-blue-300 bg-bg-100 xl:w-[134px]">
                <Link href='/epigrams'
                  onClick={() => setIsDropdownOpen(false)}
                  className="typo-md-medium cursor-pointer my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
                >
                  메인페이지
                </Link>
                <Link href='/mypage'
                  onClick={() => setIsDropdownOpen(false)}
                  className="typo-md-medium cursor-pointer my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
                >
                  마이페이지
                </Link>
                <Link href='/addepigram'
                  onClick={() => setIsDropdownOpen(false)}
                  className="typo-md-medium cursor-pointer my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
                >
                  작성하기
                </Link>
                <li
                  className="typo-md-medium cursor-pointer my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
                  onClick={handleLogout}
                >
                  로그아웃
                </li>
              </ul>
            )}
            </div>
            ) : (
            <Link href="/signin" className='flex items-center justify-center transition-colors duration-100 rounded-3xl bg-blue-950 hover:bg-blue-700 text-[12px] text-white px-[14px] py-[6px] cursor-pointer md:text-[14px] md:px-[18px] md:py-[8px] xl:px-[24px] xl:py-[12px] xl:text-[16px]'>
              로그인
            </Link>
          )}
          </div>
        </div>
      );
    // } else if (pathname === '/epigrams' || pathname.startsWith('/epigrams/') || pathname === '/search' || pathname === '/addepigram' || pathname === '/mypage' || pathname === '/feed') {
    //   return (
    //     <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[72px] md:h-[60px] xl:px-[120px] xl:h-[80px]'>
    //       <div className='flex items-center gap-[12px] md:gap-[24px] xl:gap-[36px]'>
    //         <div className='block cursor-pointer md:hidden'>
    //           <Image src={hamberger} alt='hamberger' onClick={toggleSidebar} />
    //         </div>
    //         <Link href='/'>
    //           <Image className='w-[101px] h-[50px] md:h-[58px] xl:w-[160px] xl:h-[78px]' src={epigramLogo} alt='epigramLogo' />
    //         </Link>
    //         <div className='hidden md:flex md:gap-[24px] text-[14px] xl:text-[16px]'>
    //           <Link href='/feed'>피드</Link>
    //           <Link href='/search'>검색</Link>
    //         </div>
    //       </div>
    //       <div className='flex items-center gap-[6px]'>
    //         <div><Image width={20} height={20} className='w-[16px] h-[16px] xl:w-[24px] xl:h-[24px]' src={user?.image ?? userProfile} alt='userProfile'/></div>
    //         <div className='text-[13px] xl:text-[14px]'>{user?.nickname ?? 'user'}</div>
    //       </div>
    //     </div>
    //   );
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
        <div className="fixed inset-0 z-50 flex md:hidden">
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