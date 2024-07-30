"use client";
import useDetectClose from "@/src/hooks/useDetectClose";
import Image from "next/image";
import { useRef } from "react";
  
const Dropdown = () => {
  const dropDownRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  return (
    <div className=" pt-[200px] pl-[300px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        ref={dropDownRef}
        className="relative text-gray-200 typo-xs-semibold xl:typo-xl-semibold flex justify-center items-center w-[90px] h-[30px] xl:w-[144px] xl:h-[52px] bg-bg-100 rounded-[8px]"
      >
        필터: 없음
        <Image
          src="/assets/ic-chevron-down-gray.svg"
          alt="드롭다운 펼치기"
          width={36}
          height={36}
          className="w-[16px] h-[16px] xl:w-[36px] xl:h-[36px] ml-[2px]"
        />
        {isOpen && (
        <ul
          className="absolute top-[30px] right-0 flex justify-center items-center w-[344px] h-[88px] gap-[8px] xl:w-[560px] xl:h-[128px] bg-white rounded-[16px] xl:gap-[12px] drop-shadow-xl mt-[4px]"
        >
          <li>
            <Image
              src="/assets/emoji-heart.svg"
              width={96}
              height={96}
              alt="하트 이모지"
              className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[6px] hover: hover:border-illust-yellow"
            />
          </li>
          <li>
            <Image
              src="/assets/emoji-smile.svg"
              width={96}
              height={96}
              alt="웃음 이모지"
                className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[6px] hover: hover:border-illust-green "
            />
          </li>
          <li>
            <Image
              src="/assets/emoji-worry.svg"
              width={96}
              height={96}
              alt="고민 이모지"
                className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[6px] hover: hover:border-illust-purple"
            />
          </li>
          <li>
            <Image
              src="/assets/emoji-sad.svg"
              width={96}
              height={96}
              alt="슬픔 이모지"
                className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[6px] hover: hover:border-illust-blue"
            />
          </li>
          <li>
            <Image
              src="/assets/emoji-mad.svg"
              width={96}
              height={96}
              alt="분노 이모지"
                className="w-[56px] h-[56px] xl:w-[96px] xl:h-[96px] rounded-[16px] hover:border-[6px] hover: hover:border-illust-red"
            />
          </li>
        </ul>
      )}
      </button>
      
    </div>
  );
};

export default Dropdown;
