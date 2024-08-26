import { useEffect, useState } from 'react';

import Image from 'next/image';

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
  userId: number;
}

export default function EpigramDetailPageCommentsSection({
  epigramId,
  userId,
}: CommentsSectionProps) {
  const PAGE_SIZE = 4;
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [cursor, setCursor] = useState<number | null>(0);
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

    fetchUserProfile();
  }, []);

  // 댓글 불러오기 함수
  const fetchComments = async () => {
    if (cursor === null) return;

    setIsLoading(true);
    try {
      const response = await getCommentsForEpigram(
        epigramId,
        PAGE_SIZE,
        cursor,
      );
      console.log('서버로부터 불러온 댓글들:', response);
      setComments((prevComments) => {
        return [...prevComments, ...response.list];
      });
      if (response.list.length < PAGE_SIZE) {
        setCursor(null);
      } else {
        setCursor(response.nextCursor);
      }
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
  };

  useEffect(() => {
    console.log('에피그램 ID에 대한 댓글 불러오기:', epigramId);
    fetchComments();
  }, []);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;
    try {
      console.log('댓글 제출 중:', newComment);
      const newCommentData = await handleCommentPost(
        epigramId,
        isPrivate,
        newComment,
      );
      console.log('새로 제출된 댓글:', newCommentData);
      setNewComment('');
      setComments((prevComments) => {
        console.log('이전 댓글 리스트:', prevComments);
        return [newCommentData, ...prevComments];
      });
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

  useEffect(() => {}, [userId]);

  return (
    <div className="flex flex-col items-center">
      <div className="typo-lg-semibold mb-4 self-start xl:typo-xl-semibold lg:mb-6">
        댓글 ({totalCount})
      </div>
      {userId && (
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
      )}
      <div className="w-full">
        {comments.map((comment) => {
          console.log('렌더링 중인 댓글:', comment);
          return (
            <Comment
              key={comment.id}
              comment={comment}
              onEdit={handleCommentEdit}
              onDelete={handleCommentDelete}
              onUpdate={fetchComments}
            />
          );
        })}
        {isLoading && <Loader />}
        {error && <LoadingError>{error.message}</LoadingError>}
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
