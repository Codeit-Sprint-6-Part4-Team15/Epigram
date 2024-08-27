'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { Epigram } from '@/src/types/epigrams';
import Image from 'next/image';
import Link from 'next/link';

import {
  getEpigramById,
  likeEpigram,
  unlikeEpigram,
} from '@/src/app/api/epigram';
import { getUserMe } from '@/src/app/api/user';

import DropdownMenu from '@/src/components/commons/DropdownMenu';
import EpigramDetailPageCommentsSection from '@/src/components/epigrams/EpigramDetailPageCommentsSection';

let USER_ID: any = null;

export default function EpigramDetailPage({
  params,
}: {
  params: { slug: string; id: number };
}) {
  const [epigram, setEpigram] = useState<Epigram | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const id = params.id;

  const checkLoginStatus = () => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트가 처음 렌더링될 때 로그인 상태 체크
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info('링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      const likeButtonImage = document.querySelector('.like-button-image');
      likeButtonImage?.classList.add('active');
      setTimeout(() => {
        likeButtonImage?.classList.remove('active');
      }, 200);

      if (!isLoggedIn) {
        toast.info('로그인이 필요합니다.');
        return;
      }

      if (epigram?.isLiked === false) {
        const data = await likeEpigram(id);
        setEpigram(data);
        setIsLiked(true);
      } else {
        const data = await unlikeEpigram(id);
        setEpigram(data);
        setIsLiked(false);
      }
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다:', error);
    }
  };

  const fetchEpigram = async () => {
    try {
      const data = await getEpigramById(id);
      const userData = await getUserMe();
      USER_ID = userData?.id;
      setEpigram(data);
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('에피그램을 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchEpigram();
  }, []);

  const handleShareButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const openLinkInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="h-screen w-screen bg-bg-100 bg-fixed">
      <div className="absolute bg-bg-100">
        <div className="note-background flex h-auto w-screen flex-col items-center pt-[40px]">
          <div className="w-[380px] p-[22px] md:w-[500px] xl:w-[640px]">
            <div className="mb-[16px] flex justify-between">
              {epigram && epigram.tags && (
                <div className="flex items-center overflow-hidden whitespace-nowrap">
                  <div className="flex">
                    {epigram?.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={{
                          pathname: '/search',
                          query: {
                            query: tag.name,
                          },
                        }}
                      >
                        <span
                          key={tag.id}
                          className="typo-lg-regular mr-[16px] text-blue-400 xl:typo-xl-regular"
                        >
                          #{tag.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {USER_ID === epigram?.writerId && <DropdownMenu />}
            </div>
            <p className="iropke-2xl text-black-700 xl:iropke-3xl md:mt-[24px] xl:mt-[32px]">
              {epigram?.content}
            </p>
            <p className="iropke-lg mt-[16px] text-right text-blue-400 md:iropke-xl xl:iropke-2xl md:mt-[24px] xl:mt-[40px]">
              - {epigram?.author} -
            </p>
            <div className="mb-[20px] mt-[32px] flex justify-center xl:mt-[36px]">
              <button
                onClick={handleLike}
                className={`typo-md-medium mr-[8px] flex w-[76px] items-center justify-center gap-[4px] rounded-[100px] xl:w-[102px] ${
                  isLiked ? 'bg-black-600' : 'bg-gray-400'
                } px-[14px] py-[6px] text-blue-100 xl:typo-xl-medium xl:mr-[16px]`}
              >
                <Image
                  src="/assets/ic-like.svg"
                  alt="에피그램 좋아요 버튼"
                  width={36}
                  height={36}
                  className="like-button-image mr-[4px] h-[20px] w-[20px] md:h-[24px] md:w-[24px] xl:h-[36px] xl:w-[36px]"
                />
                {epigram?.likeCount}
              </button>
              {epigram && epigram.referenceTitle && (
                <div className="relative">
                  <button
                    onClick={handleShareButtonClick}
                    className="typo-md-medium flex items-center justify-center gap-[6px] rounded-[100px] bg-line-100 px-[14px] py-[6px] text-gray-300 xl:typo-xl-medium"
                  >
                    {epigram?.referenceTitle}
                    <Image
                      src="/assets/ic-external-link.svg"
                      alt="에피그램 공유 버튼"
                      width={36}
                      height={36}
                      className="h-[20px] w-[20px] md:h-[24px] md:w-[24px] xl:h-[36px] xl:w-[36px]"
                    />
                  </button>
                  {isDropdownOpen && (
                    <div
                      ref={dropDownRef}
                      className="absolute right-0 mt-[8px] flex w-[200px] items-center justify-center rounded-[8px] border border-bg-100 bg-white p-[8px] shadow-lg"
                    >
                      <a
                        className="cursor-pointer text-sm text-gray-400 hover:underline"
                        onClick={() =>
                          openLinkInNewTab(epigram?.referenceUrl || '')
                        }
                      >
                        {epigram?.referenceUrl}
                      </a>
                      <button
                        onClick={() =>
                          handleCopyClipBoard(epigram?.referenceUrl || '')
                        }
                        className="ml-[10px] text-blue-500 hover:underline"
                      >
                        <Image
                          src="/assets/ic-copy.svg"
                          alt="링크 복사 버튼"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-auto w-[380px] bg-bg-100 p-[22px] md:w-[500px] xl:w-[640px]">
            {epigram && epigram.id && (
              <EpigramDetailPageCommentsSection
                epigramId={epigram.id}
                userId={USER_ID}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
