'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getMyEpigrams, getRecentEpigrams } from '../app/api/epigram';
import { Epigram, EpigramsResponse } from '../types/epigrams';
import LoadingError from './LoadingError';
import Loader from './commons/Loader';
import TextCard from './commons/TextCard';

// FIX : userId 전역값으로 변경해야함
export const userId = 136;

interface EpigramsContainerProps {
  type: 'recent' | 'my';
  setCount?: (count: number) => void;
}

export default function EpigramsContainer({
  type,
  setCount,
}: EpigramsContainerProps) {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const fetchEpigrams = useCallback(async () => {
    setIsLoading(true);
    try {
      let fetchedEpigrams: EpigramsResponse;
      switch (type) {
        case 'recent':
          fetchedEpigrams = await getRecentEpigrams(3, 0);
          break;
        case 'my':
          fetchedEpigrams = await getMyEpigrams(userId, 3, 0);
          if (setCount) setCount(fetchedEpigrams?.totalCount);
          break;
      }
      setEpigrams(fetchedEpigrams?.list);
      setCursor(fetchedEpigrams?.nextCursor ?? null);
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 가져오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  const handleMore = async () => {
    let fetchedEpigrams: EpigramsResponse;
    setIsLoading(true);
    try {
      switch (type) {
        case 'recent':
          fetchedEpigrams = await getRecentEpigrams(5, cursor ?? 0);
          break;
        case 'my':
          fetchedEpigrams = await getMyEpigrams(userId, 5, cursor ?? 0);
          break;
      }
      setCursor(fetchedEpigrams.nextCursor ?? 0);
      setEpigrams((prevEpigrams) => [...prevEpigrams, ...fetchedEpigrams.list]);
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 더 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpigrams();
  }, [fetchEpigrams]);

  return (
    <div className="flex flex-col items-center gap-[40px] xl:gap-[72px]">
      <div className="flex w-full flex-col gap-[16px]">
        {epigrams?.map((epigram) => (
          <Link href={`epigrams/${epigram.id}`}>
            <TextCard
              key={epigram.id}
              id={epigram.id}
              content={epigram.content}
              author={epigram.author}
              tags={epigram.tags}
            />
          </Link>
        ))}
        {isLoading && <Loader />}
        {loadingError && <LoadingError>{loadingError?.message}</LoadingError>}
      </div>
      {cursor !== null && (
        <button
          type="button"
          onClick={handleMore}
          disabled={isLoading}
          className="typo-md-medium flex items-center gap-[4px] rounded-[100px] border border-line-200 px-[18px] py-[12px] text-blue-500 xl:typo-xl-medium xl:px-[40px]"
        >
          <Image
            src="/assets/ic_plus.svg"
            width={24}
            height={24}
            alt="아이콘"
          />
          <span>최신 에피그램 더보기</span>
        </button>
      )}
    </div>
  );
}
