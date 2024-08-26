'use client';

import { ClientSideUser } from '@/src/components/epigrams/ClientSideUserId';
import EpigramsContainer from '@/src/components/epigrams/EpigramsContainer';
import TodayEpigram from '@/src/components/epigrams/TodayEpigram';
import CommentsContainer from '@/src/components/myPage/CommentContainer';
import { useEffect } from 'react';

export default async function EpigramsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);
  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100">
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          오늘의 에피그램
        </h3>
        <TodayEpigram />
      </div>
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          오늘의 감정은 어떤가요?
        </h3>
        <div className="flex justify-center">
          <ClientSideUser />
        </div>
      </div>
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          최신 에피그램
        </h3>
        <EpigramsContainer type="recent" />
      </div>
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          최신 댓글
        </h3>
        <CommentsContainer type="recent" />
      </div>
    </div>
  );
}
