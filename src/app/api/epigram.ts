import instance from './axios';

export async function getMyEpigrams(id: number, limit: number, cursor: number) {
  let comments;
  try {
    const res = await instance.get(`/epigrams`, {
      params: {
        limit,
        cursor,
        writerId: id
      },
    });
    comments = await res.data;
  } catch (error) {
    throw new Error('내 에피그램 목록을 불러오는데 실패했습니다.');
  }
  return comments;
}

export async function getRecentEpigrams(limit: number, cursor: number) {
  let comments;
  try {
    const res = await instance.get('/epigrams', {
      params: {
        limit,
        cursor,
      },
    });
    comments = await res.data;
  } catch (error) {
    throw new Error('최신 에피그램을 불러오는데 실패했습니다.');
  }
  return comments;
}