import ChartContainer from '@/src/components/ChartContainer';
import TodayEmotionSelector from "@/src/components/commons/TodayEmotionSelector";

export default async function MyPage() {
  
  return (
    <div>
      <TodayEmotionSelector userId={766} title='오늘의 감정은 어떤가요?' />
      <ChartContainer userId={136} year={2024} month={8} />
    </div>
  );
}
