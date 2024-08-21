'use client';

import { useEffect, useState } from 'react';

import ChartContainer from '@/src/components/ChartContainer';
import EmotionCalendar from '@/src/components/EmotionCalender';
import MyContents from '@/src/components/MyContents';
import UserInfo from '@/src/components/UserInfo';
import TodayEmotionSelector from '@/src/components/commons/TodayEmotionSelector';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/\.\s/g, '.')
    .slice(0, -1);
}

export default function MyPage() {
  const [userId, setUserId] = useState(0);
  const today = formatDate(new Date());

  useEffect(() => {
    let user;
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        user = JSON.parse(userData);
        setUserId(user.id);
      }
    }
  }, []);

  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100 pt-[64px] xl:pt-[128px]">
      <div className="shadow-1 flex w-full flex-col items-center rounded-[24px] bg-white">
        <div className="relative -mt-[40px] flex flex-col items-center gap-[8px] xl:-mt-[60px] xl:gap-[16px]">
          <UserInfo />
        </div>
        <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
          <div className="mb-[16px] flex items-center justify-between">
            <h3 className="typo-lg-semibold text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
              오늘의 감정
            </h3>
            <span className="typo-lg-regular text-gray-400 xl:typo-xl-regular">
              {today}
            </span>
          </div>
          <div className="mb-[56px] flex justify-center lg:mb-[60px] xl:mb-[164px]">
            {userId !== 0 && <TodayEmotionSelector userId={136} />}
          </div>
          <div>{userId !== 0 && <EmotionCalendar userId={136} />}</div>
        </div>
        <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
          <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
            감정차트
          </h3>
          <div className="flex justify-center rounded-[8px] border border-blue-200 py-[24px]">
            {userId !== 0 && (
              <ChartContainer userId={136} year={2024} month={8} />
            )}
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
