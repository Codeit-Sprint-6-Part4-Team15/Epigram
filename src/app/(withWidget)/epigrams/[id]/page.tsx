"use client";

import { getEpigramById } from "@/src/app/api/epigram";
import DropdownMenu from "@/src/components/commons/DropdownMenu";
import { EpigramById } from "@/src/types/epigrams";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EpigramDetailPage({ params }: { params: { slug: string, id:number } }) {
  const [epigram, setEpigram] = useState<EpigramById | null>(null);  
  const id = params.id

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.info("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
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

  //TODO: 배경 이미지 변경
  return (<>
  <div className="w-screen h-screen flex flex-col items-center bg-bg-100">
  <div className="h-[288px] p-[22px] w-[380px] md:w-[500px] xl:w-[640px]">
  <div className="flex  justify-between  h-[36px] ">
    {epigram&&epigram.tags&&<div className="flex items-center overflow-hidden whitespace-nowrap">
        <div className="flex">
        {epigram?.tags.map((tag,index) => (
            <span key={index} className="text-blue-400 typo-lg-regular mr-[16px] xl:typo-xl-regular">
              # {tag.name}
            </span>
          ))}
        </div>
        </div>}
        <DropdownMenu/>
      </div>
        <p className="text-black-700 md:mt-[24px] iropke-2xl xl:mt-[32px] xl:iropke-3xl">
          {epigram?.content}
        </p>
        <p className="text-right text-blue-400 iropke-lg md:iropke-xl xl:iropke-2xl mt-[16px] md:mt-[24px] xl:mt-[40px]">
         -  {epigram?.author} - 
        </p>
        <div className="flex justify-center mt-[32px] xl:mt-[36px]">
          <button className="flex items-center justify-center bg-black-600 text-blue-100 rounded-[100px] py-[6px] px-[14px] gap-[4px] typo-md-medium  xl:typo-xl-medium mr-[8px] xl:mr-[16px]">
          <Image
                src="/assets/ic-like.svg"
                alt="에피그램 좋아요 버튼"
                width={36}
                height={36}
                className="mr-[4px] w-[20px] h-[20px] md:w-[24px] md:h-[24px] xl:w-[36px] xl:h-[36px]"
                />
                {epigram?.likeCount}
          </button>
          {epigram&&epigram.referenceTitle&&
          <button  onClick={() => handleCopyClipBoard(epigram?.referenceUrl || '')}
          className="flex items-center justify-center bg-line-100 text-gray-300 typo-md-medium xl:typo-xl-medium gap-[6px] py-[6px] px-[14px] rounded-[100px]">
            {epigram?.referenceTitle}
            <Image
                src="/assets/ic-external-link.svg"
                alt="에피그램 공유 버튼"
                width={36}
                height={36}
                className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] xl:w-[36px] xl:h-[36px]"
                />
          </button>}
        </div>
      </div>
  </div>
  </>);
}