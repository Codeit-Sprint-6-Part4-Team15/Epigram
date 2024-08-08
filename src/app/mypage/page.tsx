import ChartContainer from '@/src/components/ChartContainer';
import DonutChart from '@/src/components/DonutChart';

export default async function MyPage() {
  return (
    <div className="flex min-h-[100vh] flex-col items-center bg-bg-100">
      <div className="flex w-full flex-col items-center rounded-[24px] bg-white">
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
        <h3
          className="typo-lg-semibold mb-[16px] text-black-600 xl:typo-2xl-semibold xl:mb-[40px]"
          role="tablist"
        >
          <button
            type="button"
            id="tab-1"
            role="tab"
            aria-controls="tabpanel-1"
          >
            내 에피그램
          </button>
          <button
            type="button"
            id="tab-2"
            role="tab"
            aria-controls="tabpanel-2"
          >
            내 댓글
          </button>
          <div id="tabpanel-1" role="tabpanel"></div>
          <div id="tabpanel-2" role="tabpanel"></div>
        </h3>
      </div>
    </div>
  );
}
