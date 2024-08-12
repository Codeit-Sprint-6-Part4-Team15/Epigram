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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [cursor, setCursor] = useState<number>(0);

  const fetchEpigrams = async (limit: number, cursor: number) => { 
    try {
      setIsLoading(true);
      const data = await getEpigrams(limit, cursor);
      if (limit>data.list.length) {
        toast.info("에피그램을 모두 불러왔습니다");
      }
      setEpigrams((prevEpigrams) => [...prevEpigrams, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
        toast.error("에피그램 목록을 불러오는데 실패했습니다");
        console.error("에피그램 목록을 불러오는데 실패했습니다:", error);
    } finally{
      setIsLoading(false);
    }
  };

  const handleMore = () => {
    fetchEpigrams(6, cursor);
  };

  useEffect(() => {
    fetchEpigrams(6, 0);  // 초기 로드 시 6개를 불러옴
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-bg-100 bg-cover overflow-y-auto">
        <div className="flex flex-col w-full max-w-[1200px] mx-[24px] min-h-screen px-[24px] lg:px-[72px]">
          <div className="flex justify-between">
            <h1 className="typo-lg-semibold mt-[32px] mb-[24px] xl:mb-[40px] xl:mt-[120px] md:typo-xl-semibold xl:typo-2xl-semibold">
              피드
            </h1>
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
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[12px] xl:gap-[30px]">
            {epigrams.map((epigram) => (
              <Link href={`epigrams/${epigram.id}`} key={epigram.id}>
                <div className="transition transform hover:scale-105 hover:duration-700">
                  <TextCard
                    id={epigram.id}
                    content={epigram.content}
                    author={epigram.author}
                    tags={epigram.tags}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center mt-[56px] xl:mt-[80px] mb-[50px] md:mb-[120px]">
            <button 
              onClick={handleMore}
              disabled={isLoading}
              className="w-[180px] xl:w-[238px] h-[48px] flex justify-center typo-md-medium xl:typo-xl-medium xl:py-[9px] py-[12px] px-[18px] border-line-200 border border-[1px] rounded-[100px] bg-bg-100 text-blue-500 hover:text-blue-800">
              <Image src="/assets/ic_plus.svg"
                    alt="에피그램 더보기 버튼"
                    width={25}
                    height={25}
                    className="mr-[4px] xl:mt-[3px]" />
              에피그램 더보기
            </button>
          </div>
        </div>
    </div>
  );
}
