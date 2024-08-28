'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';

import TextCard from '@/src/components/commons/TextCard';
import FloatingButtons from '@/src/components/epigrams/FloatingButtons';

import { Epigram } from '../../types/epigrams';
import { getEpigrams } from '../api/epigram';
import '../globals.css';

export default function Feed() {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);
  const [isGrid, setIsGrid] = useState(false);

  const fetchEpigrams = async (limit: number, cursor: number) => {
    try {
      setIsLoading(true);
      const data = await getEpigrams(limit, cursor);
      if (limit > data.list.length) {
        toast.info('에피그램을 모두 불러왔습니다');
      }
      setEpigrams((prevEpigrams) => [...prevEpigrams, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
      toast.error('에피그램 목록을 불러오는데 실패했습니다');
      console.error('에피그램 목록을 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMore = () => {
    fetchEpigrams(6, cursor);
  };

  const handleSort = () => {
    setIsGrid(!isGrid);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEpigrams(6, 0); // 초기 로드 시 6개 로드
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center overflow-y-auto bg-bg-100 bg-cover">
      <FloatingButtons />
      <div className="mx-[24px] flex w-full max-w-[1200px] flex-col px-[24px] lg:px-[72px]">
        <div className="flex justify-between">
          <h1 className="typo-lg-semibold mb-[24px] mt-[32px] md:typo-xl-semibold xl:typo-2xl-semibold xl:mb-[40px] xl:mt-[120px]">
            피드
          </h1>
          <button onClick={handleSort} className="lg:hidden">
            {isGrid && (
              <Image
                src="/assets/ic-sort-dashboard.svg"
                alt="정렬 선택 그리드"
                width={25}
                height={25}
              />
            )}
            {!isGrid && (
              <Image
                src="/assets/ic-sort-grid.svg"
                alt="정렬 선택 대시보드"
                width={25}
                height={25}
              />
            )}
          </button>
        </div>
        <div
          className={`grid flex-grow gap-[16px] xl:gap-[30px] ${
            isGrid ? 'grid-cols-2' : 'grid-cols-1'
          } items-start justify-start lg:grid-cols-2`}
        >
          {' '}
          {epigrams.map((epigram) => (
            <Link href={`epigrams/${epigram.id}`} key={epigram.id}>
              <div className="mx-auto max-w-[700px] transform transition hover:scale-105 hover:duration-700">
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
        <div className="mb-[50px] mt-[56px] flex items-center justify-center md:mb-[120px] xl:mt-[80px]">
          <button
            onClick={handleMore}
            disabled={isLoading}
            className="typo-md-medium flex h-[48px] w-[180px] justify-center rounded-[100px] border-[1px] border-line-200 bg-bg-100 px-[18px] py-[12px] text-blue-500 xl:typo-xl-medium hover:text-blue-800 xl:w-[238px] xl:py-[9px]"
          >
            <Image
              src="/assets/ic_plus.svg"
              alt="에피그램 더보기 버튼"
              width={25}
              height={25}
              className="mr-[4px] xl:mt-[3px]"
            />
            에피그램 더보기
          </button>
        </div>
      </div>
    </div>
  );
}
