'use client';

import { useRef } from 'react';

import Image from 'next/image';

import useDetectClose from '@/src/hooks/useDetectClose';

interface DropdownProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export default function Dropdown({
  selectedValue,
  setSelectedValue,
}: DropdownProps) {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleSelect = (value: string) => {
    if (selectedValue === value) {
      setSelectedValue('필터: 없음');
    } else {
      setSelectedValue(value);
    }
    setIsOpen(false);
  };

  return (
    <div ref={dropDownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="typo-xs-semibold relative flex h-[30px] w-[90px] cursor-pointer items-center justify-center rounded-[8px] bg-bg-100 text-gray-200 xl:typo-xl-semibold xl:h-[52px] xl:w-[144px]"
      >
        {selectedValue}
        <Image
          src="/assets/ic-chevron-down-gray.svg"
          alt="드롭다운 펼치기"
          width={36}
          height={36}
          className="ml-[2px] h-[16px] w-[16px] xl:h-[36px] xl:w-[36px]"
        />
      </div>
      {isOpen && (
        <ul className="absolute left-1/2 top-[30px] z-50 mt-[4px] flex h-[88px] w-[344px] -translate-x-1/2 transform items-center justify-center gap-[8px] rounded-[16px] bg-white drop-shadow-xl xl:top-[45px] xl:mt-[15px] xl:h-[128px] xl:w-[560px] xl:gap-[12px]">
          <li onClick={() => handleSelect('감동')}>
            <Image
              src="/assets/emoji-heart.svg"
              width={96}
              height={96}
              alt="감동 이모지"
              className="h-[56px] w-[56px] rounded-[16px] hover:border-[5px] hover:border-illust-yellow xl:h-[96px] xl:w-[96px]"
            />
          </li>
          <li onClick={() => handleSelect('기쁨')}>
            <Image
              src="/assets/emoji-smile.svg"
              width={96}
              height={96}
              alt="기쁨 이모지"
              className="h-[56px] w-[56px] rounded-[16px] hover:border-[5px] hover:border-illust-green xl:h-[96px] xl:w-[96px]"
            />
          </li>
          <li onClick={() => handleSelect('고민')}>
            <Image
              src="/assets/emoji-worry.svg"
              width={96}
              height={96}
              alt="고민 이모지"
              className="h-[56px] w-[56px] rounded-[16px] hover:border-[5px] hover:border-illust-purple xl:h-[96px] xl:w-[96px]"
            />
          </li>
          <li onClick={() => handleSelect('슬픔')}>
            <Image
              src="/assets/emoji-sad.svg"
              width={96}
              height={96}
              alt="슬픔 이모지"
              className="h-[56px] w-[56px] rounded-[16px] hover:border-[5px] hover:border-illust-blue xl:h-[96px] xl:w-[96px]"
            />
          </li>
          <li onClick={() => handleSelect('분노')}>
            <Image
              src="/assets/emoji-mad.svg"
              width={96}
              height={96}
              alt="분노 이모지"
              className="h-[56px] w-[56px] rounded-[16px] hover:border-[5px] hover:border-illust-red xl:h-[96px] xl:w-[96px]"
            />
          </li>
        </ul>
      )}
    </div>
  );
}
