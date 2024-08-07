'use client';

import { useCallback, useEffect, useState } from 'react';

import { CommentType, CommentsResponse } from '@/src/types';
import Image from 'next/image';

import {
  getMyComments,
  getRecentComments,
  handleCommentDelete,
  handleCommentEdit,
} from '../app/api/comment';
import LoadingError from './LoadingError';
import Comment from './commons/Comment';
import Loader from './commons/Loader';
import { Epigram, EpigramsResponse } from '../types/epigrams';
import { getMyEpigrams, getRecentEpigrams } from '../app/api/epigram';
import TextCard from './commons/TextCard';

// FIX : userId 전역값으로 변경해야함
export const userId = 136;

export default function EpigramsContainer({ type }: { type: 'recent' | 'my' }) {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [limit, setLimit] = useState(4);
  const [cursor, setCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const fetchEpigrams = useCallback(
    async (limit: number) => {
      setIsLoading(true);
      try {
        let fetchedEpigrams: EpigramsResponse;
        switch (type) {
          case 'recent':
            fetchedEpigrams = await getRecentEpigrams(limit, 0);
            break;
          case 'my':
            fetchedEpigrams = await getMyEpigrams(userId, limit, 0);
            break;
        }
        setEpigrams(fetchedEpigrams?.list);
        setCursor(fetchedEpigrams?.nextCursor);
      } catch (error: any) {
        setLoadingError(error);
        console.error('댓글을 가져오는 데 실패했습니다.', error);
      } finally {
        setIsLoading(false);
      }
    },
    [type, limit],
  );

  const handleMore = async () => {
    setLimit((prevLimit) => prevLimit + 4);
    setIsLoading(true);
    try {
      let fetchedEpigrams: EpigramsResponse;
      switch (type) {
        case 'recent':
          fetchedEpigrams = await getRecentEpigrams(limit, cursor);
          setCursor(fetchedEpigrams.nextCursor);
          break;
        case 'my':
          fetchedEpigrams = await getMyEpigrams(userId, limit, cursor);
          setCursor(fetchedEpigrams.nextCursor);
          break;
      }
      setEpigrams((prevEpigrams) => [...prevEpigrams, ...fetchedEpigrams.list]);
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 더 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEpigrams(limit);
  }, [, fetchEpigrams]);

  return (
    <div className="flex flex-col items-center gap-[40px] xl:gap-[72px]">
      <div className="w-full">
        {epigrams.map((epigram) => (
          <TextCard
            key={epigram.id}
            id={epigram.id}
            content={epigram.content}
            author={epigram.author}
            tags={epigram.tags}
          />
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