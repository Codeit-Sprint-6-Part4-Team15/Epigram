"use client";

import { useState, useEffect } from "react";
import { CommentType } from "@/src/types";
import Comment from "./commons/Comment";
import { getMyComments, getRecentComments, handleCommentDelete, handleCommentEdit } from "../app/api/comment";

const userId = 136;

export default function CommentsContainer({ type }: { type: "recent" | "my" }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [limit, setLimit] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      let fetchedComments: CommentType[] = [];
      switch (type) {
        case "recent":
          fetchedComments = await getRecentComments(limit);
          break;
        case "my":
          fetchedComments = await getMyComments(userId, limit);
          break;
      }
      setComments(fetchedComments);
    } catch (error) {
      console.error("댓글을 가져오는 데 실패했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMore = () => {
    setLimit(prevLimit => prevLimit + 4);
  };

  useEffect(() => {
    fetchComments();
  }, [type, limit]);

  return (
    <div className="">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} onEdit={handleCommentEdit} onDelete={handleCommentDelete} />
      ))}
      <button type="button" onClick={handleMore} disabled={isLoading}>
        <span>최신 댓글 더보기</span>
      </button>
    </div>
  );
}
