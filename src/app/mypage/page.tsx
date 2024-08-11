import ChartContainer from '@/src/components/ChartContainer';
import EmotionCalendar from '@/src/components/EmotionCalender';
import TodayEmotionSelector from '@/src/components/commons/TodayEmotionSelector';

export default async function MyPage() {
  return (
    <>
      <div>
        <TodayEmotionSelector userId={766} />
      </div>
      <div>
        <EmotionCalendar userId={766} />
      </div>
    </>
  );
}
