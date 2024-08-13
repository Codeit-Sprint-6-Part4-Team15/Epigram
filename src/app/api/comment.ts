import { CommentType } from '@/src/types';

import instance from './axios';

export async function getMyComments(id: number, limit: number, cursor: number) {
  let comments;
  try {
    const res = await instance.get(`/users/${id}/comments`, {
      params: {
        limit,
        cursor,
      },
    });
    comments = await res.data;
  } catch (error) {
    throw new Error('내 댓글 목록을 불러오는데 실패했습니다.');
  }
  return comments;
}

export async function getRecentComments(limit: number, cursor: number) {
  let comments;
  try {
    const res = await instance.get('/comments', {
      params: {
        limit,
        cursor,
      },
    });
    comments = await res.data;
  } catch (error) {
    throw new Error('최신 댓글을 불러오는데 실패했습니다.');
  }
  return comments;
}

export async function handleCommentEdit(
  id: number,
  content: string,
  isPrivate: boolean,
) {
  try {
    const res = await instance.patch(`/comments/${id}`, {
      content,
      isPrivate,
    });
  } catch (error) {
    throw new Error('댓글을 수정하는데 실패했습니다.');
  }
}

export async function handleCommentDelete(id: number) {
  try {
    const res = await instance.delete(`/comments/${id}`);
  } catch (error) {
    throw new Error('댓글을 삭제하는데 실패했습니다.');
  }
}

export async function handleCommentPost(
  epigramId: number,
  isPrivate: boolean,
  content: string,
) {
  try {
    const res = await instance.post('/comments', {
      epigramId,
      isPrivate,
      content,
    });
    return res.data;
  } catch (error) {
    throw new Error('댓글을 작성하는 데 실패했습니다.');
  }
}

export async function getCommentsForEpigram(
  epigramId: number,
  limit: number,
  cursor: number | null,
) {
  let comments;
  try {
    const res = await instance.get('/comments', {
      params: {
        limit,
        cursor,
      },
    });
    comments = await res.data;

    const filteredComments = comments.list.filter(
      (comment: CommentType) => comment.epigramId === epigramId,
    );

    return {
      totalCount: filteredComments.length,
      nextCursor: comments.nextCursor,
      list: filteredComments,
    };
  } catch (error) {
    throw new Error('특정 에피그램의 댓글을 불러오는데 실패했습니다.');
  }
}

export async function getMyCommentsForEpigram(
  epigramId: number,
  userId: number,
  limit: number,
  cursor: number | null,
) {
  let comments;
  try {
    const res = await instance.get('/comments', {
      params: { limit, cursor },
    });

    comments = res.data.list;

    const filteredComments = comments.filter(
      (comment: CommentType) =>
        comment.epigramId === epigramId && comment.writer.id === userId,
    );

    return {
      totalCount: filteredComments.length,
      nextCursor: res.data.nextCursor,
      list: filteredComments,
    };
  } catch (error) {
    throw new Error('특정 에피그램의 내 댓글을 불러오는데 실패했습니다.');
  }
}
