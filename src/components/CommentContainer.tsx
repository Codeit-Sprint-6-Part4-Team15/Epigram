"use client";

import { CommentType } from "@/src/types";
import instance from "../app/api/axios";
import Comment from "./commons/Comment";
import { useEffect } from "react";

let comments : CommentType[] = [];

async function getRecentComments() {
  try {
    const res = await instance.get("comments", {
      params: {
        limit : 4
      }
    });
    comments = await res.data.list;
  } catch (error) {
    throw new Error("댓글을 수정하는데 실패했습니다.")
  }
  return comments;
}

async function handleEdit (id:number, content:string, isPublic:boolean) {
  try {
    const res = await instance.patch("comments", {
      params: {
        id,
        content,
        isPublic
      }
    });
  } catch (error) {
    throw new Error("댓글을 수정하는데 실패했습니다.")
  }
}

async function handleDelete (id:number) {
  try {
    const res = await instance.delete("comments", {
      params: {
        id
      }
    });
  } catch (error) {
    throw new Error("댓글을 수정하는데 실패했습니다.")
  }
}

export default async function CommentsContainer() {
  comments = await getRecentComments();

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <Comment comment={comment} onEdit={handleEdit} onDelete={handleDelete}/>
      ))}
    </div>
  );
}
