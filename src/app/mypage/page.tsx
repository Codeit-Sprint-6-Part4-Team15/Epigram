import IcoUser from '@/public/assets/ic_user.svg';
import Image from 'next/image';

import instance from '@/src/app/api/axios';

import ChartContainer from '@/src/components/ChartContainer';
import MyContents from '@/src/components/MyContents';

async function getUser() {
  let userData;
  try {
    const res = await instance.get('users/me');
    userData = await res.data;
  } catch (error) {
    throw new Error('사용자 정보를 불러오는데 실패했습니다.');
  }
  return userData;
}

export default async function MyPage() {
  const user = await getUser();
  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100 pt-[64px] xl:pt-[128px]">
      <div className="shadow-1 flex w-full flex-col items-center rounded-[24px] bg-white">
        <div className="relative -mt-[40px] flex flex-col items-center gap-[8px] xl:-mt-[60px] xl:gap-[16px]">
          <figure className="relative h-[80px] w-[80px] rounded-full border-2 border-blue-200 bg-white xl:h-[120px] xl:w-[120px]">
            <Image src={user.image ?? IcoUser} fill alt="유저 이미지" />
          </figure>
          <strong className="typo-lg-medium text-black-950 xl:typo-2xl-medium">
            {user.nickname}
          </strong>
          <button
            type="button"
            className="typo-md-regular mt-[8px] rounded-[100px] bg-line-100 px-[14px] py-[6px] text-gray-300 xl:typo-xl-regular xl:px-[15px] xl:py-[8px]"
          >
            로그아웃
          </button>
        </div>
        <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
          <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
            오늘의 감정
          </h3>
          <div>컴포넌트 1</div>
          <div>컴포넌트 2</div>
        </div>
        <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
          <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
            감정차트
          </h3>
          <div className="flex justify-center rounded-[8px] border border-blue-200 py-[24px]">
            <ChartContainer userId={136} year={2024} month={8} />
          </div>
        </div>
      </div>
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="hidden">내 컨텐츠</h3>
        <MyContents />
      </div>
    </div>
  );
}
