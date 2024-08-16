"use client";

import TextCard from "@/src/components/commons/TextCard";
import { useEffect, useState } from "react";
import { getEpigrams } from "../api/epigram";
import Link from "next/link";
import { toast } from "react-toastify";
import { Epigram } from '../../types/epigrams';
import Image from "next/image";


export default function Feed() {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);

  const fetchEpigrams = async () => { // 데이터 확인용
    try {
      const data = await getEpigrams(6);
      setEpigrams(data.list);
    } catch (error) {
        toast.error("에피그램 목록을 불러오는데 실패했습니다");
        console.error("에피그램 목록을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEpigrams();
  }, []);


  return (
    <div className="flex justify-center h-screen bg-bg-100 bg-cover overflow-y-auto">
        <div className="flex flex-col h-screen ml-[24px] mr-[24px] xl:w-[1200px] mb-[50px] lg:mb-[120px] ">
          <div className="flex justify-between">
        <h1 className="typo-lg-semibold mt-[32px] mb-[24px] xl:mb-[40px] xl:mt-[120px] md:typo-xl-semibold xl:typo-2xl-semibold">피드</h1>
       <button className="lg:hidden">
       <Image src="/assets/ic-sort-dashboard.svg"
                  alt="정렬 선택 그리드"
                  width={25}
                  height={25} />
        <Image src="/assets/ic-sort-grid.svg"
                  alt="정렬 선택 대시보드"
                  width={25}
                  height={25} />
        </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[16px] lg:gap-[12px] xl:gap-[30px]">
        {epigrams.map((epigram) => (
          <Link href={`epigrams/${epigram.id}`}>
            <div className="transition transform hover:scale-105 hover:duration-700">
            <TextCard
              key={epigram.id}
              id={epigram.id}
              content={epigram.content}
              author={epigram.author}
              tags={epigram.tags}
            />
            </div>
          </Link>
        ))}
        </div>
        </div>
    </div>
  );
}
