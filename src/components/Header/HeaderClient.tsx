'use client';

import { useEffect, useRef, useState } from 'react';

import { User } from '@/src/types/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type HeaderClientProps = {
  user: User | null;
  isLoggedIn: boolean;
};

export default function HeaderClient({ user, isLoggedIn }: HeaderClientProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh_token');
    router.replace('/');
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return isLoggedIn ? (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="flex cursor-pointer items-center justify-center rounded-full p-[6px] hover:bg-blue-200 md:p-[8px] xl:p-[12px]"
      >
        <img
          src={user?.image ?? '/assets/ic_user.svg'}
          alt="profileIcon"
          className="h-[20px] w-[20px] rounded-full object-cover md:h-[28px] md:w-[28px] xl:h-[36px] xl:w-[36px]"
        />
      </button>
      {isDropdownOpen && (
        <ul className="typo-md-regular absolute right-0 flex w-[100px] flex-col items-center justify-center rounded-[16px] border-[1px] border-blue-300 bg-bg-100 xl:typo-xl-regular xl:w-[120px]">
          <Link
            href="/mypage"
            onClick={() => setIsDropdownOpen(false)}
            className="typo-md-medium mt-[10px] cursor-pointer xl:typo-xl-medium hover:text-black-100 xl:mt-[16px]"
          >
            마이페이지
          </Link>
          <li
            className="typo-md-medium my-[10px] cursor-pointer text-[12px] text-blue-600 xl:typo-xl-medium hover:text-blue-400 xl:my-[12px] xl:text-[16px]"
            onClick={handleLogout}
          >
            로그아웃
          </li>
        </ul>
      )}
    </div>
  ) : null;
}
