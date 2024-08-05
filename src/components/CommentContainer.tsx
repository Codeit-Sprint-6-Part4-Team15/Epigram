"use client";

import { CommentType } from "@/src/types";
import Comment from "./commons/Comment";
import { getRecentComments, handleCommentDelete, handleCommentEdit } from "../app/api/comment";

export default async function CommentsContainer() {
  let comments : CommentType[] | null = null;

  if( !comments ) {
    comments = await getRecentComments();
  }

  return (
    <div className="space-y-4">
      {comments?.map(comment => (
        <Comment comment={comment} onEdit={handleCommentEdit} onDelete={handleCommentDelete} />
      ))}
    </div>
  );
}
