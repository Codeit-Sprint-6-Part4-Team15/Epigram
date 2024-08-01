import DonutChart from "@/src/components/DonutChart";
import IMG_EMOTION from "@/public/assets/emotionChart";

export default async function MyPage() {
  return (
    <div>
      <DonutChart data={[{ emotion : "HAPPY", rate: 25, image: IMG_EMOTION.HAPPY, label:"기쁨", color:"#E46E80"},
         {emotion: "MOVED", rate: 25, image: IMG_EMOTION.MOVED, label:"감동", color:"#FBC85B"},
         {emotion: "WORRIED", rate: 25, image: IMG_EMOTION.WORRIED, label:"고민", color:"#48BB98"},
         {emotion: "SAD", rate: 25, image: IMG_EMOTION.SAD, label:"슬픔", color:"#5195EE"},
         ]} />
    </div>
  );
}
