"use client";

import useDetectClose from "@/src/hooks/useDetectClose";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ConfirmModal from "./Modal/ConfirmModal";

export default function DropdownMenu(){
  const dropDownRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const handleDelete = () => {
    setIsOpen(!isOpen); 
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    // 여기서 삭제 작업을 수행
    console.log("게시물이 삭제되었습니다.");
  };

  const handleSelect = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        ref={dropDownRef}
      >
        <Image
            src="/assets/ic-more-vertical.svg"
            alt="수정 삭제 메뉴"
            width={24}
            height={24}
            className="xl:w-[36px] xl:h-[36px]"/>
        
        {isOpen && (
        <ul
          className="absolute right-[10px] flex flex-col items-center justify-center w-[97px] h-[80px] xl:w-[134px] xl:h-[112px] typo-md-regualr xl:typo-xl-regualr rounded-[16px] border-[1px] border-blue-300 bg-bg-100">
           <Link href="/edit" >
          <li className="my-[6px] xl:my-[8px] typo-md-medium xl:typo-xl-medium hover:text-black-100" onClick={() => handleSelect()}>
            수정하기
          </li>
          </Link> 
          <li className="my-[6px] xl:my-[8px] typo-md-medium xl:typo-xl-medium hover:text-black-100" onClick={() => handleDelete()}>
            삭제하기
          </li>
        </ul>
      )}
      </button>
      {isModalOpen && (
        <ConfirmModal
          onClose={handleCloseModal}
          onSubmit={handleConfirmDelete}
          type="게시물"
        />
      )}
    </div>
  );
};

