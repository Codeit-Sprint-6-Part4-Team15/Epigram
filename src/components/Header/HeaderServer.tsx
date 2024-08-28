import { User } from '@/src/types/auth';
import Image from 'next/image';
import Link from 'next/link';

import DotLoader from '../commons/DotLoader';
import HeaderClient from './HeaderClient';

type HeaderProps = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  pathname: string;
};

function HeaderServer({ user, isLoggedIn, isLoading, pathname }: HeaderProps) {
  if (pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  return (
    <nav className="sticky top-0 z-10 w-full bg-white">
      <div className="flex h-[52px] w-full items-center justify-between border-b border-line-300 px-[24px] md:h-[60px] md:px-[48px] xl:h-[80px] xl:px-[88px]">
        <div className="flex">
          <Image
            priority={true}
            width={101}
            height={50}
            className="h-[50px] w-[101px] cursor-pointer md:h-[58px] xl:h-[78px] xl:w-[170px]"
            src="/assets/logo.svg"
            alt="epigramLogo"
          />
        </div>
        <div className="flex items-center gap-[6px] md:gap-[8px]">
          {isLoggedIn && (
            <div className="flex">
              <Link href="/epigrams">
                <div className="hidden p-[6px] text-[14px] hover:underline 2xs:flex md:p-[8px] md:text-[16px] xl:p-[12px] xl:text-[20px]">
                  대시보드
                </div>
              </Link>
              <Link href="/feed">
                <div className="hidden p-[6px] text-[14px] hover:underline 2xs:flex md:p-[8px] md:text-[16px] xl:p-[12px] xl:text-[20px]">
                  피드
                </div>
              </Link>
            </div>
          )}
          <Link href="/search">
            <div className="hidden items-center justify-center rounded-full p-[6px] hover:bg-blue-200 2xs:flex md:p-[8px] xl:p-[12px]">
              <Image
                width={20}
                height={20}
                className="h-[20px] w-[20px] cursor-pointer md:h-[28px] md:w-[28px] xl:h-[36px] xl:w-[36px]"
                src="/assets/ic_search.svg"
                alt="searchIcon"
              />
            </div>
          </Link>
          {isLoading ? (
            <div className="flex h-[32px] w-[65px] items-center justify-center">
              <DotLoader />
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
    </nav>
  );
}

export default HeaderServer;
