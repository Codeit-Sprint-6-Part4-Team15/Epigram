"use client";

import { Comment } from "@/src/types/comments";

interface CommentsProps {
  comments: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function Comments({ comments, onEdit, onDelete }: CommentsProps) {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor(((now.getTime() - date.getTime()) / (1000 * 60 * 60)));
    return `${diff}시간 전`;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="py-4 px-6 bg-bg-100 rounded shadow">
          <div className="flex items-center space-x-4">
            <img src={comment.writer.image} alt="프로필" className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-black-300 typo-xs-regular mb-2">
                  <div>{comment.writer.nickname}</div>
                  <div>{formatTimeAgo(comment.updatedAt)}</div>
                </div>
                <div className="flex space-x-2 text-black-600 typo-xs-regular mb-2">
                  <button onClick={() => onEdit(comment.id)} className="hover:underline">수정</button>
                  <button onClick={() => onDelete(comment.id)} className="hover:underline text-state-error">삭제</button>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
