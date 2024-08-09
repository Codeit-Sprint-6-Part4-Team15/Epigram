import instance from '@/src/app/api/axios';

import CommentsContainer from '@/src/components/CommentContainer';
import EpigramsContainer from '@/src/components/EpigramsContainer';
import TextCard from '@/src/components/commons/TextCard';

async function getTodayEpigram() {
  let todayEpigramData;
  try {
    //TODO : const res = await instance.get('epigrams/today');
    let res = await instance.get('epigrams/today');
    todayEpigramData = await res.data;

    if (!todayEpigramData) {
      res = await instance.get('epigrams/222');
      todayEpigramData = await res.data;
    }
  } catch (error) {
    console.error('오늘의 에피그램 데이터를 불러오는데 실패했습니다.');
  }
  return todayEpigramData;
}

export default async function EpigramsPage() {
  const todayEpigram = await getTodayEpigram();

  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100">
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          오늘의 에피그램
        </h3>
        <TextCard
          id={todayEpigram?.id}
          content={todayEpigram?.content}
          author={todayEpigram?.author}
          tags={todayEpigram?.tags ?? []}
        />
      </div>
      <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
        <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
          오늘의 감정은 어떤가요?
        </h3>
        <div>컴포넌트</div>
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
