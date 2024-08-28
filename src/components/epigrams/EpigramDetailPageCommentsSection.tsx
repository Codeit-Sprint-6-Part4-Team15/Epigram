import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  getCommentsForEpigram,
  handleCommentDelete,
  handleCommentEdit,
  handleCommentPost,
} from '../../app/api/comment';
import { getUserMe } from '../../app/api/user';
import { Comment as CommentType } from '../../types/comments';
import Button from '../commons/Button';
import Comment from '../commons/Comment';
import Loader from '../commons/Loader';
import LoadingError from '../commons/LoadingError';
import TextArea from '../commons/TextArea';
import Toggle from '../commons/Toggle';

interface CommentsSectionProps {
  epigramId: number;
  userId: number | null;
}

export default function EpigramDetailPageCommentsSection({
  epigramId,
  userId,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserMe();
        if (userData && userData.image) {
          setProfileImage(userData.image);
        } else {
          setProfileImage('/assets/ic_user.svg');
        }
      } catch (error) {
        console.error('프로필 이미지를 가져오는데 실패했습니다.', error);
        setProfileImage('/assets/ic_user.svg');
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const fetchComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCommentsForEpigram(epigramId);

      setComments((prevComments) => {
        const newComments = response.list.filter(
          (newComment) =>
            !prevComments.some((comment) => comment.id === newComment.id),
        );
        return [...prevComments, ...newComments];
      });

      setTotalCount(response.totalCount);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        console.error('Unknown error:', err);
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [epigramId]);

  useEffect(() => {
    fetchComments();
  }, []);

  const onEditComment = async (
    id: number,
    content: string,
    isPrivate: boolean,
  ) => {
    try {
      await handleCommentEdit(id, content, isPrivate);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, content, isPrivate } : comment,
        ),
      );
    } catch (error) {
      console.error('댓글 수정에 실패했습니다.', error);
    }
  };

  const onDeleteComment = async (id: number) => {
    try {
      await handleCommentDelete(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id),
      );
      setTotalCount((prevTotalCount) => prevTotalCount - 1);
    } catch (error) {
      console.error('댓글 삭제에 실패했습니다.', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    try {
      const newCommentData = await handleCommentPost(
        epigramId,
        isPrivate,
        newComment,
      );
      setNewComment('');
      setComments((prevComments) => [newCommentData, ...prevComments]);
      setTotalCount((prevTotalCount) => prevTotalCount + 1);
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
    <div className="mb-[40px] flex flex-col items-center">
      <div className="typo-lg-semibold mb-4 self-start xl:typo-xl-semibold lg:mb-6">
        댓글 ({totalCount})
      </div>
      {userId ? (
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
            <div className="flex items-center justify-between">
              <Toggle
                content={[
                  { value: 'isPrivate', label: isPrivate ? '비공개' : '공개' },
                ]}
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
              <div className="w-[53px] xl:w-[60px]">
                <Button
                  type="button"
                  size={{ default: 'xs', md: 'xs', xl: 'sm' }}
                  onClick={handleCommentSubmit}
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-3 flex w-full items-start gap-4 lg:mb-8 xl:mb-10">
          <Image
            src="/assets/ic_user.svg"
            alt="User Profile Placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1">
            <TextArea
              placeholder="로그인이 필요합니다"
              variant="outlined"
              disabled
            />
            <p className="mt-2 text-center text-red-500">
              <Link href="/signin" className="text-blue-500 underline">
                로그인 하러가기
              </Link>
            </p>
          </div>
        </div>
      )}
      <div className="w-full">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
            onUpdate={fetchComments}
          />
        ))}
        {isLoading && <Loader />}
        {error && <LoadingError>{error.message}</LoadingError>}
      </div>
    </div>
  );
}
