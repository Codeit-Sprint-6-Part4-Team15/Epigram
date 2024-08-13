'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  getCommentsForEpigram,
  getMyCommentsForEpigram,
  handleCommentDelete,
  handleCommentEdit,
  handleCommentPost,
} from '../app/api/comment';
import { getUserMe } from '../app/api/user';
import { CommentType } from '../types';
import LoadingError from './LoadingError';
import Comment from './commons/Comment';
import Loader from './commons/Loader';
import TextArea from './commons/TextArea';
import Toggle from './commons/Toggle';

interface CommentsSectionProps {
  epigramId: number;
  userId: number;
}

export default function EpigramDetailPageCommentsSection({
  epigramId,
  userId,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [cursor, setCursor] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const [profileImage, setProfileImage] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [myComments, setMyComments] = useState<CommentType[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const userData = await getUserMe();
        setProfileImage(userData.image);
      } catch (error) {
        console.error('유저데이터를 가져오는 데 실패했습니다.', error);
      }
    }

    fetchUserProfile();
  }, []);

  const fetchMyComments = async () => {
    try {
      const res = await getMyCommentsForEpigram(epigramId, userId, 10000, 0);
      setMyComments(res.list);
    } catch (error) {
      console.error('내 댓글을 불러오는 데 실패했습니다.', error);
    }
  };

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

  const fetchTotalCommentsCount = async () => {
    try {
      const res = await getCommentsForEpigram(epigramId, 10000, 0);
      setTotalCount(res.totalCount);
    } catch (error) {
      console.error('전체 댓글 수를 불러오는 데 실패했습니다.', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    try {
      await handleCommentPost(epigramId, isPrivate, newComment);
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
    fetchTotalCommentsCount();
    fetchComments();
  }, [epigramId]);

  return (
    <div className="flex flex-col items-center">
      <div className="typo-lg-semibold mb-4 self-start xl:typo-xl-semibold lg:mb-6">
        댓글 ({totalCount})
      </div>
      <div className="mb-3 flex w-full items-start gap-4 lg:mb-8 xl:mb-10">
        <Image
          src={profileImage}
          alt="User Profile"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1">
          <TextArea
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Toggle
            content={[{ value: 'isPrivate', label: '공개' }]}
            checked={!isPrivate}
            onChange={setIsPrivate}
          />
        </div>
      </div>
      <div className="w-full">
        {comments.map((comment) => {
          const isMyComment = myComments.some(
            (myComment) => myComment.id === comment.id,
          );
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onUpdate={fetchComments}
              onEdit={isMyComment ? handleCommentEdit : undefined}
              onDelete={isMyComment ? handleCommentDelete : undefined}
            />
          );
        })}
        {isLoading && <Loader />}
        {loadingError && <LoadingError>{loadingError?.message}</LoadingError>}
      </div>
      {cursor !== null && (
        <button
          type="button"
          onClick={fetchComments}
          disabled={isLoading}
          className="typo-md-medium mt-[40px] flex items-center gap-[4px] rounded-[100px] border border-line-200 px-[18px] py-[12px] text-blue-500 xl:typo-xl-medium xl:mt-[72px] xl:px-[40px]"
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
