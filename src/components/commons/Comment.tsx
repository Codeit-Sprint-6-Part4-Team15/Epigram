"use client";

import { CommentType } from "@/src/types";
import { ChangeEvent, useState } from "react";


interface CommentsProps {
  comment: CommentType;
  onEdit: (id: number, content:string, isPublic:boolean) => void;
  onDelete: (id: number) => void;
}

export default function Comment({ comment, onEdit, onDelete }: CommentsProps) {
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
  }

  const handleDelete = () => {
    onDelete(comment.id);
  }
  return (
    <div key={comment.id} className="py-4 px-6 bg-bg-100 rounded shadow">
      <div className="flex items-center space-x-4">
        <img src={comment.writer.image} alt="프로필" className="w-12 h-12 rounded-full" />
        { isEdit ? 
        <div className="w-full">
          <textarea value={content} onChange={handleChange} className="w-full border px-[16px] py-[10px] rounded-[12px] border-blue-300 text-black-950 placeholder:text-blue-400 placeholder:typo-lg-regular xl:placeholder:typo-xl-regular"/>
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
              <button onClick={handleDelete} className="hover:underline text-state-error">삭제</button>
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
        }
      </div>
    </div>
  );
}
