import { useEffect, useState } from 'react';

import Image from 'next/image';
import useSWR, { useSWRInfinite } from 'swr';

import {
  getCommentsForEpigram,
  handleCommentDelete,
  handleCommentEdit,
  handleCommentPost,
} from '../app/api/comment';
import { getUserMe } from '../app/api/user';
import { Comment as CommentType, CommentsResponse } from '../types/comments';
import LoadingError from './LoadingError';
import Comment from './commons/Comment';
import Loader from './commons/Loader';
import TextArea from './commons/TextArea';
import Toggle from './commons/Toggle';

interface CommentsSectionProps {
  epigramId: number;
  userId: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EpigramDetailPageCommentsSection({
  epigramId,
  userId,
}: CommentsSectionProps) {
  const [newComment, setNewComment] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // SWR을 이용하여 유저 프로필 이미지 가져오기
  const { data: userData } = useSWR('/api/user/me', getUserMe);

  // 유저 프로필 이미지 설정
  useEffect(() => {
    if (userData) {
      setProfileImage(userData.image);
    }
  }, [userData]);

  // SWR Infinite를 이용하여 페이지네이션 처리
  const { data, error, size, setSize, mutate } =
    useSWRInfinite<CommentsResponse>(
      (index: number) =>
        `/api/comments/epigram/${epigramId}?limit=4&cursor=${index * 4}`,
      fetcher,
      {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      },
    );

  const comments: CommentType[] = data
    ? data.flatMap((page: CommentsResponse) => page.list)
    : [];
  const totalCount = data ? data[0]?.totalCount : 0;
  const isLoading = !data && !error;
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.list.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.list.length < 4);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    try {
      await handleCommentPost(epigramId, isPrivate, newComment);
      setNewComment('');
      await mutate(); // 새로운 댓글 작성 후 SWR 데이터를 갱신
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

  return (
    <div className="flex flex-col items-center">
      <div className="typo-lg-semibold mb-4 self-start xl:typo-xl-semibold lg:mb-6">
        댓글 ({totalCount})
      </div>
      <div className="mb-3 flex w-full items-start gap-4 lg:mb-8 xl:mb-10">
        <Image
          src={profileImage || '/assets/ic_user.svg'}
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
            content={[{ value: 'isPrivate', label: '비공개' }]}
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
          />
        </div>
      </div>
      <div className="w-full">
        {comments.map((comment) => {
          const isMyComment = comment.writer.id === userId; // 내 댓글인지 확인
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onUpdate={mutate} // 댓글 수정 후 SWR 데이터를 갱신
              onEdit={isMyComment ? handleCommentEdit : undefined}
              onDelete={isMyComment ? handleCommentDelete : undefined}
            />
          );
        })}
        {isLoadingMore && <Loader />}
        {error && <LoadingError>{error.message}</LoadingError>}
      </div>
      {!isReachingEnd && (
        <button
          type="button"
          onClick={() => setSize(size + 1)} // 다음 댓글 불러오기
          disabled={isLoadingMore}
          className="px/[18px] py/[12px] xl:mt/[72px] xl:px/[40px] typo-md-medium mt-[40px] flex items-center gap-[4px] rounded-[100px] border border-line-200 text-blue-500 xl:typo-xl-medium"
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
