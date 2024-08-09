import ChartContainer from '@/src/components/ChartContainer';
import TodayEmotionSelector from '@/src/components/commons/TodayEmotionSelector';

export default async function MyPage() {
  return (
    <div>
      <TodayEmotionSelector userId={766} showDate={false} />
    </div>
  );
}
