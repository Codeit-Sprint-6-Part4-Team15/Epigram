'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  getCommentsForEpigram,
  handleCommentDelete,
  handleCommentEdit,
  handleCommentPost,
} from '../app/api/comment';
import { CommentType } from '../types';
import LoadingError from './LoadingError';
import Comment from './commons/Comment';
import Loader from './commons/Loader';
import TextArea from './commons/TextArea';

interface CommentsSectionProps {
  epigramId: number;
}

export default function EpigramDetailPageCommentsSection({
  epigramId,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [cursor, setCursor] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const fetchComments = async () => {
    if (cursor === null || isLoading) return;

    setIsLoading(true);

    try {
      const res = await getCommentsForEpigram(epigramId, 4, cursor);
      setComments((prevComments) => [...prevComments, ...res.list]);

      if (res.nextCursor && res.list.length === 4) {
        setCursor(res.nextCursor);
      } else {
        setCursor(null);
      }
    } catch (error: any) {
      setLoadingError(error);
      console.error('댓글을 불러오는 데 실패했습니다.', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    try {
      await handleCommentPost(epigramId, true, newComment);
      setNewComment('');
      setCursor(0);
      setComments([]);
      fetchComments();
    } catch (error) {
      console.error('댓글 작성에 실패했습니다.', error);
    }
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    console.log('에피그램id로 댓글불러오기:', epigramId);
    fetchComments();
  }, [epigramId]);

  return (
    <div>
      <TextArea
        variant="solid"
        placeholder="댓글을 입력해 주세요."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <div className="w-full">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={fetchComments}
            onEdit={handleCommentEdit}
            onDelete={handleCommentDelete}
          />
        ))}
        {isLoading && <Loader />}
        {loadingError && <LoadingError>{loadingError?.message}</LoadingError>}
      </div>
      {cursor !== null && (
        <button
          type="button"
          onClick={fetchComments}
          disabled={isLoading}
          className="typo-md-medium flex items-center gap-[4px] rounded-[100px] border border-line-200 px-[18px] py-[12px] text-blue-500 xl:typo-xl-medium xl:px-[40px]"
        >
          <Image
            src="/assets/ic_plus.svg"
            width={24}
            height={24}
            alt="아이콘"
          />
          <span>댓글 더보기</span>
        </button>
      )}
    </div>
  );
}
