'use client';

import { useEffect, useState } from 'react';

import { CommentType } from '@/src/types';
import Image from 'next/image';

import {
  getMyComments,
  getRecentComments,
  handleCommentDelete,
  handleCommentEdit,
} from '../app/api/comment';
import Comment from './commons/Comment';

// FIX : userId 전역값으로 변경해야함
export const userId = 136;

export default function CommentsContainer({ type }: { type: 'recent' | 'my' }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [limit, setLimit] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      let fetchedComments: CommentType[] = [];
      switch (type) {
        case 'recent':
          fetchedComments = await getRecentComments(limit);
          break;
        case 'my':
          fetchedComments = await getMyComments(userId, limit);
          break;
      }
      setComments(fetchedComments);
    } catch (error) {
      console.error('댓글을 가져오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMore = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };

  useEffect(() => {
    fetchComments();
  }, [type, limit]);

  return (
    <div className="flex flex-col items-center gap-[40px] xl:gap-[72px]">
      <div className="w-full">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleCommentEdit}
            onDelete={handleCommentDelete}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleMore}
        disabled={isLoading}
        className="typo-md-medium flex items-center gap-[4px] rounded-[100px] border border-line-200 px-[18px] py-[12px] text-blue-500 xl:typo-xl-medium xl:px-[40px]"
      >
        <Image src="/assets/ic_plus.svg" width={24} height={24} alt="아이콘" />
        <span>최신 댓글 더보기</span>
      </button>
    </div>
  );
}
