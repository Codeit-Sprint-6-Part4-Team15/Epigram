import EmotionCalendar from "@/src/components/EmotionCalender";
import EmotionSelector from "@/src/components/EmotionSelector";

export default async function MyPage() {
  
  return (
    <div>
      <EmotionSelector title='오늘의 감정은 어떤가요?'/>
    </div>
  );
}
