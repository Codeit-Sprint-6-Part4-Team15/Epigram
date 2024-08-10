"use client";

import useDetectClose from "@/src/hooks/useDetectClose";
import Image from "next/image";
import { useRef } from "react";

interface DropdownMenuProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const DropdownMenu : React.FC<DropdownMenuProps> =({ selectedValue, setSelectedValue }) => {
  const dropDownRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  return (
    <div className=" pt-[200px] pl-[500px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        ref={dropDownRef}
        className="relative"
      >
        <Image
            src="/assets/ic-more-vertical.svg"
            alt="수정 삭제 메뉴"
            width={24}
            height={24}
            className="xl:w-[36px] xl:h-[36px]"/>
        
        {isOpen && (
        <ul
          className="flex flex-col items-center justify-center absolute top-[30px] xl:top-[40px] right-[10px] w-[97px] h-[80px] xl:w-[134px] xl:h-[112px] typo-md-regualr xl:typo-xl-regualr rounded-[16px] border-[1px] border-blue-300 bg-bg-100"      >
          <li className="my-[6px] xl:my-[8px] hover:text-black-100" onClick={() => handleSelect("수정하기")}>
            수정하기
          </li>
          <li className="my-[6px] xl:my-[8px] hover:text-black-100" onClick={() => handleSelect("삭제하기")}>
            삭제하기
          </li>
        </ul>
      )}
      </button>
      
    </div>
  );
};

export default DropdownMenu;
