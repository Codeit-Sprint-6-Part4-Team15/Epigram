import ChartContainer from '@/src/components/ChartContainer';
import EmotionCalendar from '@/src/components/EmotionCalender';
import MyContents from '@/src/components/MyContents';
import UserInfo from '@/src/components/UserInfo';
import TodayEmotionSelector from '@/src/components/commons/TodayEmotionSelector';

export default function MyPage() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100 pt-[64px] xl:pt-[128px]">
      <div className="shadow-1 flex w-full flex-col items-center rounded-[24px] bg-white">
        <div className="relative -mt-[40px] flex flex-col items-center gap-[8px] xl:-mt-[60px] xl:gap-[16px]">
          <UserInfo />
        </div>
        <div className="w-[384px] py-[36px] xl:w-[640px] xl:py-[80px]">
          <h3 className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]">
            오늘의 감정
          </h3>
          <div className="mb-[56px] flex justify-center lg:mb-[60px] xl:mb-[164px]">
            <TodayEmotionSelector userId={136} />
          </div>
          <div>
            <EmotionCalendar userId={136} />
          </div>
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
