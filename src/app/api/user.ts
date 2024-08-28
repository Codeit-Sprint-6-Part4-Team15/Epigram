import { User } from '@/src/types/user';

import instance from './axios';

export async function getUserMe(req: any) {
  try {
    const res = await instance.get('/users/me');
    return res.data as User;
  } catch (error) {
    console.error('유저 정보를 불러오는 데 실패했습니다.');
  }
}

export async function postImage(image: FormData) {
  try {
    console.log(image);
    const res = await instance.post('/images/upload', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.url;
  } catch (error) {
    console.error('이미지를 등록하는데 실패했습니다.');
  }
}

export async function patchUserInfo(image: string, nickname: string) {
  try {
    const res = await instance.patch('/users/me', {
      image,
      nickname,
    });
    return res.data;
  } catch (error) {
    console.error('유저 정보를 수정하는데 실패했습니다.');
  }
}
