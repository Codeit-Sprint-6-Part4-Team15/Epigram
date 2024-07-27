'use client';

import Image from 'next/image';
import searchIcon from '@/public/assets/searchIcon.svg';
import profileIcon from '@/public/assets/profileIcon.svg';
import epigramLogo from '@/public/assets/epigramLogo.png';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function Header() {
  const pathname = usePathname();

  const renderNavBarContent = () => {
    if (pathname === '/login' || pathname === '/signup') {
      return (
        <div className='w-full h-[52px] flex justify-center items-center border-b border-line-300 md:h-[60px] xl:h-[80px]'>
          <Image className='w-[119px] h-[36px] cursor-pointer md:w-[172px] md:h-[48px]' src={epigramLogo} alt='epigramLogo' />
        </div>
      );
    } else if (pathname === '/' || pathname === '/search' || pathname === '/epigrams' || pathname === '/mypage') {
      return (
        <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[48px] md:h-[60px] xl:px-[88px] xl:h-[80px]'>
          <Link href="/search"><Image className='w-[20px] h-[20px] cursor-pointer xl:w-[36px] xl:h-[36px]' src={searchIcon} alt='searchIcon' /></Link>
          <Link href="/"><Image className='w-[119px] h-[36px] cursor-pointer xl:w-[172px] xl:h-[48px]' src={epigramLogo} alt='epigramLogo' /></Link>
          <Link href="/mypage"><Image className='w-[20px] h-[20px] cursor-pointer xl:w-[36px] xl:h-[36px]' src={profileIcon} alt='profileIcon' /></Link>
        </div>
      );
    } else if (pathname === '/addepigram') {
      return (
        <div className='w-full h-[52px] flex items-center justify-between border-b border-line-300 px-[24px] md:px-[48px] md:h-[60px] xl:px-[88px] xl:h-[80px]'>
          <Link href="/search"><Image className='w-[20px] h-[20px] cursor-pointer xl:w-[36px] xl:h-[36px]' src={searchIcon} alt='searchIcon' /></Link>
          <div className='text-[16px] font-semibold md:text-[20px] xl:text-[24px]'>에피그램 만들기</div>
          <Link href="/mypage"><Image className='w-[20px] h-[20px] cursor-pointer xl:w-[36px] xl:h-[36px]' src={profileIcon} alt='profileIcon' /></Link>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <nav>
      {renderNavBarContent()}
    </nav>
  );
}

export default Header;