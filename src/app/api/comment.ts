import { CommentsResponse } from '@/src/types/comments';

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
    console.error('내 댓글 목록을 불러오는데 실패했습니다.');
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
    console.error('최신 댓글을 불러오는데 실패했습니다.');
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
    console.error('댓글을 수정하는데 실패했습니다.');
  }
}

export async function handleCommentDelete(id: number) {
  try {
    const res = await instance.delete(`/comments/${id}`);
  } catch (error) {
    console.error('댓글을 삭제하는데 실패했습니다.');
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
): Promise<CommentsResponse> {
  try {
    const res = await instance.get(`/epigrams/${epigramId}/comments`, {
      params: {
        limit: 9999,
      },
    });
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('특정 에피그램의 댓글을 불러오는데 실패했습니다.');
  }
}
