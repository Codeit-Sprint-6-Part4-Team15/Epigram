'use client';

import { ChangeEvent, useState } from 'react';

import IcoUser from '@/public/assets/ic_user.svg';
import { CommentType } from '@/src/types';
import Image from 'next/image';

import useModal from '@/src/hooks/useModal';

import { userId } from '../CommentContainer';
import Button from './Button';
import ConfirmModal from './Modal/ConfirmModal';
import Modal from './Modal/Modal';
import Toggle from './Toggle';

interface CommentsProps {
  comment: CommentType;
  onEdit: (id: number, content: string, isPublic: boolean) => void;
  onDelete: (id: number) => void;
}

export default function Comment({ comment, onEdit, onDelete }: CommentsProps) {
  const [
    isDeleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useModal(false);
  const [content, setContent] = useState(comment.content);
  const [isPrivate, setIsPrivate] = useState(comment.isPrivate);
  const [isEdit, setIsEdit] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );
    return `${diff}시간 전`;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const changeMode = () => {
    setIsEdit(true);
  };

  const handleEdit = () => {
    onEdit(comment.id, content, isPrivate);
    setIsEdit(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
    closeDeleteModal();
  };
  return (
    <div
      key={comment.id}
      className="w-full rounded border-t border-line-200 bg-bg-100 px-6 py-4"
    >
      <div className="flex items-start space-x-4">
        <Image
          src={comment.writer.image ?? IcoUser}
          width={48}
          height={48}
          alt="프로필"
          className="rounded-full bg-white"
        />
        {isEdit ? (
          <div className="w-full">
            <textarea
              value={content}
              onChange={handleChange}
              className="w-full rounded-[12px] border border-blue-300 px-[16px] py-[10px] text-black-950 placeholder:typo-lg-regular xl:placeholder:typo-xl-regular placeholder:text-blue-400"
            />
            <div className="flex items-center justify-between">
              <Toggle
                content={[{ value: 'isPrivate', label: '공개' }]}
                checked={isPrivate}
                onChange={setIsPrivate}
              />
              <div className="w-[53px] xl:w-[60px]">
                <Button
                  type="button"
                  size={{ default: 'xs', md: 'xs', xl: 'sm' }}
                  onClick={handleEdit}
                >
                  저장
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="typo-xs-regular mb-2 flex items-center space-x-2 text-black-300">
                <div>{comment.writer.nickname}</div>
                <div>{formatTimeAgo(comment.updatedAt)}</div>
              </div>
              {userId === comment.writer.id && (
                <div className="typo-xs-regular mb-2 flex space-x-2 text-black-600">
                  <button onClick={changeMode} className="hover:underline">
                    수정
                  </button>
                  <button
                    onClick={openDeleteModal}
                    className="text-state-error hover:underline"
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
            <p>{comment.content}</p>
          </div>
        )}
      </div>
      <Modal opened={isDeleteModalOpened}>
        <ConfirmModal onClose={closeDeleteModal} onSubmit={handleDelete} />
      </Modal>
    </div>
  );
}
