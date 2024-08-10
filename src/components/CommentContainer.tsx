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

// FIX : userId 전역값으로 변경해야함
export const userId = 136;

interface CommentsContainerProps {
  type: 'recent' | 'my';
  setCount?: (count: number) => void;
}

export default function CommentsContainer({
  type,
  setCount,
}: CommentsContainerProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [cursor, setCursor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      let fetchedComments: CommentsResponse;
      switch (type) {
        case 'recent':
          fetchedComments = await getRecentComments(4, 0);
          break;
        case 'my':
          fetchedComments = await getMyComments(userId, 4, 0);
          if (setCount) setCount(fetchedComments?.totalCount);
          break;
      }
      setComments(fetchedComments?.list);
      setCursor(fetchedComments?.nextCursor);
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 가져오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  const handleMore = async () => {
    setIsLoading(true);
    try {
      let fetchedComments: CommentsResponse;
      switch (type) {
        case 'recent':
          fetchedComments = await getRecentComments(4, cursor);
          break;
        case 'my':
          fetchedComments = await getMyComments(userId, 4, cursor);
          break;
      }
      setCursor(fetchedComments.nextCursor);
      setComments((prevComments) => [...prevComments, ...fetchedComments.list]);
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 더 불러오는데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="flex flex-col items-center gap-[40px] xl:gap-[72px]">
      <div className="w-full">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleCommentEdit}
            onDelete={handleCommentDelete}
            onUpdate={fetchComments}
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
          <span>최신 댓글 더보기</span>
        </button>
      )}
    </div>
  );
}
