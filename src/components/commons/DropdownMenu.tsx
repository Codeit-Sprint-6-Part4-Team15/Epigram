'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import useDetectClose from '@/src/hooks/useDetectClose';

import { deleteEpigram } from '@/src/app/api/epigram';

import Loader from './Loader';
import ConfirmModal from './Modal/ConfirmModal';

export default function DropdownMenu() {
  const dropDownRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const handleDelete = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    //게시물 삭제
    try {
      deleteEpigram(Number(id));
      console.log('게시물이 삭제되었습니다.');
      //TODO: 삭제 시 메인페이지 피드로 이동하도록
      router.push('/');
    } catch (error) {
      console.error('에피그램 삭제 중 오류가 발생했습니다:', error);
    }
  };

  const handleEdit = async () => {
    setIsOpen(!isOpen);
    setIsLoading(true);
    await router.push(`${id}/edit`);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} ref={dropDownRef}>
        <Image
          src="/assets/ic-more-vertical.svg"
          alt="수정 삭제 메뉴"
          width={24}
          height={24}
          className="xl:h-[36px] xl:w-[36px]"
        />

        {isOpen && (
          <ul className="typo-md-regualr xl:typo-xl-regualr absolute right-[10px] flex h-[80px] w-[97px] flex-col items-center justify-center rounded-[16px] border-[1px] border-blue-300 bg-bg-100 xl:h-[112px] xl:w-[134px]">
            <li
              className="typo-md-medium my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
              onClick={() => handleEdit()}
            >
              수정하기
            </li>
            <li
              className="typo-md-medium my-[6px] xl:typo-xl-medium hover:text-black-100 xl:my-[8px]"
              onClick={() => handleDelete()}
            >
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
      {isLoading && <Loader />} {/* 로딩 상태일 때 Loader 컴포넌트 렌더링 */}
    </div>
  );
}
