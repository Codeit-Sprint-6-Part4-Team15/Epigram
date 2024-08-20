"use client";

import { getEpigramById, likeEpigram, unlikeEpigram } from "@/src/app/api/epigram";
import DropdownMenu from "@/src/components/commons/DropdownMenu";
import EpigramDetailPageCommentsSection from "@/src/components/EpigramDetailPageCommentsSection";
import { Epigram } from "@/src/types/epigrams";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//FIX: 전역 유저 아이디 필요 
const USER_ID = 767;

export default function EpigramDetailPage({ params }: { params: { slug: string, id: number } }) {
  const [epigram, setEpigram] = useState<Epigram | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const id = params.id;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      if (epigram?.isLiked === false) {
        const data = await likeEpigram(id);
        setEpigram(data);
        setIsLiked(!isLiked);
      } else {
        const data = await unlikeEpigram(id);
        setEpigram(data);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류가 발생했습니다:", error);
    }
  };

  const fetchEpigram = async () => {
    try {
      const data = await getEpigramById(id);
      setEpigram(data);
    } catch (error) {
      console.error("에피그램을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEpigram();
  }, []);

  return (
    <div className="w-screen h-full bg-bg-100">
      <div className="note-background w-screen pt-[40px] h-auto flex flex-col items-center">
        <div className="p-[22px] w-[380px] md:w-[500px] xl:w-[640px]">
          <div className="flex justify-between mb-[16px]">
            {epigram && epigram.tags && (
              <div className="flex items-center overflow-hidden whitespace-nowrap">
                <div className="flex">
                  {epigram?.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: "/search",
                        query: {
                          query: tag.name,
                        },
                      }}
                    >
                      <span className="text-blue-400 typo-lg-regular mr-[16px] xl:typo-xl-regular">
                        # {tag.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {USER_ID === epigram?.writerId && <DropdownMenu />}
          </div>
          <p className="text-black-700 md:mt-[24px] iropke-2xl xl:mt-[32px] xl:iropke-3xl">
            {epigram?.content}
          </p>
          <p className="text-right text-blue-400 iropke-lg md:iropke-xl xl:iropke-2xl mt-[16px] md:mt-[24px] xl:mt-[40px]">
            - {epigram?.author} -
          </p>
          <div className="flex justify-center mt-[32px] xl:mt-[36px] mb-[20px]">
            <button onClick={handleLike} className="flex items-center justify-center bg-black-600 text-blue-100 rounded-[100px] py-[6px] px-[14px] gap-[4px] typo-md-medium xl:typo-xl-medium mr-[8px] xl:mr-[16px]">
              <Image
                src="/assets/ic-like.svg"
                alt="에피그램 좋아요 버튼"
                width={36}
                height={36}
                className="mr-[4px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] xl:w-[36px] xl:h-[36px]"
              />
              {epigram?.likeCount}
            </button>
            {epigram && epigram.referenceTitle && (
              <button onClick={() => handleCopyClipBoard(epigram?.referenceUrl || '')}
                className="flex items-center justify-center bg-line-100 text-gray-300 typo-md-medium xl:typo-xl-medium gap-[6px] py-[6px] px-[14px] rounded-[100px]">
                {epigram?.referenceTitle}
                <Image
                  src="/assets/ic-external-link.svg"
                  alt="에피그램 공유 버튼"
                  width={36}
                  height={36}
                  className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] xl:w-[36px] xl:h-[36px]"
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bg-bg-100 h-[600px]">
      {/* {epigram && epigram.id && <EpigramDetailPageCommentsSection epigramId={epigram.id} userId={USER_ID} />} */}
      </div>
    </div>
  );
}
