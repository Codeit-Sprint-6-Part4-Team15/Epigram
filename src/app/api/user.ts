import { User } from '@/src/types/user';

import instance from './axios';

export async function getUserMe() {
  try {
    const res = await instance.get('/users/me');
    return res.data as User;
  } catch (error) {
    throw new Error('유저 정보를 불러오는 데 실패했습니다.');
  }
}
