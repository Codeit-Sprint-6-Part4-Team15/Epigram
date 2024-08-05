import instance from "./axios";

export async function getMyComments( id: number, limit: number ) {
  let comments;
  try {
    const res = await instance.get(`users/${id}/comments`, {
      params: {
        limit
      }
    });
    comments = await res.data.list;
  } catch (error) {
    throw new Error("내 댓글 목록을 불러오는데 실패했습니다.")
  }
  return comments;
}

export async function getRecentComments( limit: number ) {
  let comments;
  try {
    const res = await instance.get("comments", {
      params: {
        limit
      }
    });
    comments = await res.data.list;
  } catch (error) {
    throw new Error("최신 댓글을 불러오는데 실패했습니다.")
  }
  return comments;
}

export async function handleCommentEdit (id:number, content:string, isPrivate:boolean) {
  try {
    const res = await instance.patch(`comments/${id}`, {
      content,
      isPrivate
    });
  } catch (error) {
    throw new Error("댓글을 수정하는데 실패했습니다.")
  }
}

export async function handleCommentDelete (id:number) {
  try {
    const res = await instance.delete(`comments/${id}`);
  } catch (error) {
    throw new Error("댓글을 삭제하는데 실패했습니다.")
  }
}