import { User } from '@/src/types/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'; // useState 추가

import Loader from '../commons/Loader';
import HeaderClient from './HeaderClient';
import closeIcon from '@/public/assets/ic_close_bk.svg'; // closeIcon 추가
import hamberger from '@/public/assets/ic_hamberger.svg'
import { SearchIcon } from '@/src/app/search/components/SearchHistory';

type HeaderProps = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  pathname: string;
};

function HeaderServer({ user, isLoggedIn, isLoading, pathname }: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  const isActiveLink = (linkPath: string) => pathname === linkPath;
  return (
    <nav className="sticky top-0 z-10 w-full bg-white">
      <div className="overflow:hidden flex h-[52px] w-full items-center justify-between border-b border-line-300 px-[24px] md:h-[60px] md:px-[48px] xl:h-[80px] xl:px-[88px]">
        <div className="flex">
          <button onClick={toggleSidebar} className="absolute top-[13px] left-[12px] 2xs:hidden"><Image src={hamberger} alt='sidebarbtn' /></button> {/* 사이드바 열기 버튼 추가 */}
          <Link href="/">
            <Image
              priority={true}
              width={101}
              height={50}
              className="h-[50px] w-[101px] cursor-pointer md:h-[58px] xl:h-[78px] xl:w-[170px]"
              src="/assets/logo.svg"
              alt="epigramLogo"
            />
          </Link>
        </div>
        <div className="flex items-center gap-[6px] md:gap-[8px]">
          {isLoggedIn && (
            <div className="flex gap-[6px] md:gap-[8px]">
            <Link href="/epigrams">
              <div className={`hidden p-[6px] text-[14px] hover:underline 2xs:flex md:p-[8px] md:text-[16px] xl:p-[12px] xl:text-[20px] ${isActiveLink('/epigrams') ? 'cursor-default text-gray-400 hover:no-underline' : ''}`}>
                대시보드
              </div>
            </Link>
            <Link href="/feed">
              <div className={`hidden p-[6px] text-[14px] hover:underline 2xs:flex md:p-[8px] md:text-[16px] xl:p-[12px] xl:text-[20px] ${isActiveLink('/feed') ? 'cursor-default text-gray-400 hover:no-underline' : ''}`}>
                피드
              </div>
            </Link>
          </div>
          )}
          <Link href="/search">
            <div className={`hidden items-center justify-center rounded-full p-[6px] 2xs:flex md:p-[8px] xl:p-[12px] ${isActiveLink('/search') ? 'cursor-default' : 'transition-transform duration-200 ease-in-out hover:scale-110'}`}>
              <SearchIcon
                className={`h-[20px] w-[20px] ${isActiveLink('/search') ? 'cursor-default' : 'cursor-pointer'} md:h-[28px] md:w-[28px] xl:h-[36px] xl:w-[36px]`}
                color={pathname === '/search' ? '#ABB8CE' : 'black'} // 현재 페이지에 따라 색상 변경
              />
            </div>
          </Link>
          {isLoading ? (
            <div className="flex h-[32px] w-[65px] cursor-pointer items-center justify-center rounded-3xl bg-black-500 px-[14px] py-[6px] text-[12px] text-white transition-colors duration-100 hover:bg-black-600 md:h-[37px] md:w-[73px] md:px-[18px] md:py-[8px] md:text-[14px] xl:h-[43px] xl:w-[90px] xl:px-[24px] xl:py-[12px] xl:text-[16px]">
              <Loader />
            </div>
          ) : isLoggedIn ? (
            <HeaderClient user={user} isLoggedIn={isLoggedIn} />
          ) : (
            <Link
              href="/signin"
              className="flex h-[32px] w-[65px] cursor-pointer items-center justify-center rounded-3xl bg-black-500 px-[14px] py-[6px] text-[12px] text-white transition-colors duration-100 hover:bg-black-600 md:h-[37px] md:w-[73px] md:px-[18px] md:py-[8px] md:text-[14px] xl:h-[43px] xl:w-[90px] xl:px-[24px] xl:py-[12px] xl:text-[16px]"
            >
              로그인
            </Link>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="h-full w-3/5 bg-white">
            <div className="flex h-[54px] items-center justify-end border-b border-line-300 px-[16px]">
              <Image
                className="h-[24px] w-[24px] cursor-pointer"
                src={closeIcon}
                alt="close"
                onClick={toggleSidebar}
              />
            </div>
            {isLoggedIn && (
              <div>
                <Link href="/epigrams">
                  <div className={`flex h-[74px] items-center px-[20px] text-[16px] ${isActiveLink('/epigrams') ? 'cursor-default text-gray-400' : 'hover:bg-blue-200'}`}>
                    <div>대시보드</div>
                  </div>
                </Link>
                <Link href="/feed">
                  <div className={`flex h-[74px] items-center px-[20px] text-[16px] ${isActiveLink('/feed') ? 'cursor-default text-gray-400' : 'hover:bg-blue-200'}`}>
                    <div>피드</div>
                  </div>
                </Link>
              </div>
            )}
            <Link
              href="/search"
              className={`flex h-[74px] items-center px-[20px] text-[16px] ${isActiveLink('/search') ? 'cursor-default text-gray-400' : 'hover:bg-blue-200'}`}
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

export default HeaderServer;