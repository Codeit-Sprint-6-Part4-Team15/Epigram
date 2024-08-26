'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import IcoArrowUp from '@/public/assets/ic_arrow_up.svg';
import IcoPencil from '@/public/assets/ic_pencil.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function FloatingButtons() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  };

  const handleAddEpigramClick = () => {
    if (isLoggedIn) {
      router.push('/addepigram');
    } else {
      toast.error('로그인이 필요합니다.');
    }
  };

  useEffect(() => {
    checkLoginStatus();
    const setScroll = () => {
      setScrollY(window.scrollY);
    };
    document.addEventListener('scroll', setScroll);

    return () => {
      document.removeEventListener('scroll', setScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-[30px] right-[10px] flex flex-col items-end gap-[3px] z-[999]">
      <button
        onClick={handleAddEpigramClick}
        className="group flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-[100px] bg-blue-900 text-white transition-[width] hover:w-[158px]"
      >
        <Image
          src={IcoPencil}
          width={30}
          height={30}
          alt="에피그램 만들기"
          className="group-hover:hidden"
        />
        <span className="hidden items-center gap-[2px] pl-[10px] pr-[20px] group-hover:flex">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 12H18.5"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12.5 6L12.5 18"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="typo-lg-medium whitespace-nowrap">
            에피그램 만들기
          </span>
        </span>
      </button>
      {scrollY !== 0 && (
        <button
          type="button"
          className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-900"
          onClick={scrollToTop}
        >
          <Image src={IcoArrowUp} width={22} height={12} alt="위로" />
        </button>
      )}
    </div>
  );
}
