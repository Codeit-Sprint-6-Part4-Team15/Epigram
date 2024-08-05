"use client";

import { CommentType } from "@/src/types";
import { ChangeEvent, useState } from "react";
import Toggle from "./Toggle";
import Button from "./Button";
import { useRouter } from "next/router";
import useModal from "@/src/hooks/useModal";
import Modal from "./Modal/Modal";
import ConfirmModal from "./Modal/ConfirmModal";


interface CommentsProps {
  comment: CommentType;
  onEdit: (id: number, content:string, isPublic:boolean) => void;
  onDelete: (id: number) => void;
}

export default function Comment({ comment, onEdit, onDelete}: CommentsProps) {
  const [isDeleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useModal(false);
  const [content, setContent] = useState(comment.content);
  const [isPrivate, setIsPrivate] = useState(comment.isPrivate);
  const [isEdit, setIsEdit] = useState(false);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor(((now.getTime() - date.getTime()) / (1000 * 60 * 60)));
    return `${diff}시간 전`;
  }

  const handleChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }
  const changeMode = () => {
    setIsEdit(true);
  }

  const handleEdit = () => {
    onEdit(comment.id, content, isPrivate);
    setIsEdit(false);
  }

  const handleDelete = () => {
    onDelete(comment.id);
    closeDeleteModal();
  }
  return (
    <div key={comment.id} className="w-full py-4 px-6 bg-bg-100 rounded border-t border-line-200">
      <div className="flex items-start space-x-4">
        <img src={comment.writer.image} alt="프로필" className="w-12 h-12 rounded-full" />
        { isEdit ? 
        <div className="w-full">
          <textarea value={content} onChange={handleChange} className="w-full border px-[16px] py-[10px] rounded-[12px] border-blue-300 text-black-950 placeholder:text-blue-400 placeholder:typo-lg-regular xl:placeholder:typo-xl-regular"/>
          <div className="flex items-center justify-between">
            <Toggle content={[{value:"isPrivate", label:"공개"}]} checked={isPrivate} onChange={setIsPrivate}/>
            <div className="w-[53px] xl:w-[60px]">
              <Button type="button" size={{default:"xs", md:"xs", xl:"sm"}} onClick={handleEdit}>저장</Button>
            </div>
          </div>
        </div>
        :
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-black-300 typo-xs-regular mb-2">
              <div>{comment.writer.nickname}</div>
              <div>{formatTimeAgo(comment.updatedAt)}</div>
            </div>
            <div className="flex space-x-2 text-black-600 typo-xs-regular mb-2">
              <button onClick={changeMode} className="hover:underline">수정</button>
              <button onClick={openDeleteModal} className="hover:underline text-state-error">삭제</button>
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
        }
      </div>
      <Modal opened={isDeleteModalOpened}>
        <ConfirmModal onClose={closeDeleteModal} onSubmit={handleDelete} />
      </Modal>
    </div>
  );
}
