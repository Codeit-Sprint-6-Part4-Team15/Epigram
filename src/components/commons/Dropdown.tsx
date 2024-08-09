'use client';

import { useRef } from 'react';

import Image from 'next/image';

import useDetectClose from '@/src/hooks/useDetectClose';

interface DropdownProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ selectedValue, setSelectedValue }) => {
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropDownRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer relative text-gray-200 typo-xs-semibold xl:typo-xl-semibold flex justify-center items-center w-[90px] h-[30px] xl:w-[144px] xl:h-[52px] bg-bg-100 rounded-[8px]"
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
        <ul className="absolute top-[30px] xl:top-[45px] mt-[4px] left-0 flex justify-center items-center w-[344px] h-[88px] gap-[8px] xl:w-[560px] xl:h-[128px] bg-white rounded-[16px] xl:gap-[12px] drop-shadow-xl xl:mt-[15px] z-50">
          <li onClick={() => handleSelect("감동")}>
            <Image
              src="/assets/emoji-heart.svg"
              width={96}
              height={96}
              alt="감동 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[5px] hover:border-illust-yellow"
            />
          </li>
          <li onClick={() => handleSelect("기쁨")}>
            <Image
              src="/assets/emoji-smile.svg"
              width={96}
              height={96}
              alt="기쁨 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[5px] hover:border-illust-green"
            />
          </li>
          <li onClick={() => handleSelect("고민")}>
            <Image
              src="/assets/emoji-worry.svg"
              width={96}
              height={96}
              alt="고민 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[5px] hover:border-illust-purple"
            />
          </li>
          <li onClick={() => handleSelect("슬픔")}>
            <Image
              src="/assets/emoji-sad.svg"
              width={96}
              height={96}
              alt="슬픔 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[5px] hover:border-illust-blue"
            />
          </li>
          <li onClick={() => handleSelect("분노")}>
            <Image
              src="/assets/emoji-mad.svg"
              width={96}
              height={96}
              alt="분노 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[5px] hover:border-illust-red"
            />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
