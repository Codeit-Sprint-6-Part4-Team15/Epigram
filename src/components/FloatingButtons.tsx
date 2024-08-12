'use client';

import IcoArrowUp from '@/public/assets/ic_arrow_up.svg';
import IcoPencil from '@/public/assets/ic_pencil.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function FloatingButtons() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="fixed bottom-[30px] right-[10px] flex flex-col items-end gap-[3px]">
      <Link
        href="/addepigram"
        className="group flex h-[50px] w-[50px] items-center justify-center rounded-[100px] bg-blue-900 text-white transition-[width] hover:w-[158px]"
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
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M12.5 6L12.5 18"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <span className="typo-lg-medium whitespace-nowrap">
            에피그램 만들기
          </span>
        </span>
      </Link>
      <button
        type="button"
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-blue-900"
        onClick={scrollToTop}
      >
        <Image src={IcoArrowUp} width={22} height={12} alt="위로" />
      </button>
    </div>
  );
}
