"use client";

import { getEpigramById } from "@/src/app/api/epigram";
import DropdownMenu from "@/src/components/commons/DropdownMenu";
import { EpigramById } from "@/src/types/epigrams";
import { useEffect, useState } from "react";

export default function EpigramDetailPage({ params }: { params: { slug: string } }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [epigram, setEpigram] = useState<EpigramById | null>(null); 

  const fetchEpigrams = async () => { // 데이터 확인용
    try {
      //TODO:아이디 params로 받아오기
      const data = await getEpigramById(336);
      setEpigram(data);
      console.log(epigram)
    } catch (error) {
      console.error("에피그램을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEpigrams();
  }, []);

  //TODO: 배경 이미지 변경
  return (<>
  <div className="w-screen h-screen flex flex-col items-center">
  <div className="h-[288px] p-[22px] w-[380px] md:w-[500px] xl:w-[640px]">
  <div className="flex  justify-between  h-[36px] ">
    <div className="flex items-center overflow-hidden whitespace-nowrap">
        <div className="flex">
        {epigram?.tags.map((tag,index) => (
            <span key={index} className="text-blue-400 typo-lg-regular mr-[16px] xl:typo-xl-regular">
              # {tag.name}
            </span>
          ))}
        </div>
        </div>
        <DropdownMenu selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
      </div>
        <p className="text-black-700 md:mt-[24px] iropke-2xl xl:mt-[32px] xl:iropke-3xl">
          {epigram?.content}
        </p>
        <p className="text-blue-400 iropke-lg md:iropke-xl xl:iropke-2xl mt-[16px] md:mt-[24px] xl:mt-[40px]">
         -  {epigram?.author} - 
        </p>
      </div>
  </div>
  </>);
}