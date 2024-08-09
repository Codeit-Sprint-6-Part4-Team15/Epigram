import EmotionCalendar from "@/src/components/EmotionCalender";
import EmotionSelector from "@/src/components/EmotionSelector";
import ChartContainer from '@/src/components/ChartContainer';
import DonutChart from '@/src/components/DonutChart';

export default async function MyPage() {
  
  return (
    <div>
      <EmotionSelector title='오늘의 감정은 어떤가요?' />
      <ChartContainer userId={136} year={2024} month={8} />
    </div>
  );
}
