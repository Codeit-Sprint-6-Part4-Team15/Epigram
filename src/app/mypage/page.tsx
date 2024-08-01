import DonutChart from "@/src/components/DonutChart";
import IMG_EMOTION from "@/public/assets/emotionChart";

export default async function MyPage() {
  return (
    <div>
      <DonutChart data={[{ emotion : "HAPPY", rate: 55, image: IMG_EMOTION.HAPPY, label:"기쁨", color:"#48BB98"},
         {emotion: "MOVED", rate: 45, image: IMG_EMOTION.MOVED, label:"감동", color:"#FBC85B"},
         {emotion: "WORRIED", rate: 0, image: IMG_EMOTION.WORRIED, label:"고민", color:"#C7D1E0"},
         {emotion: "SAD", rate: 0, image: IMG_EMOTION.SAD, label:"슬픔", color:"#E3E9F1"},
         {emotion: "ANGRY", rate: 0, image: IMG_EMOTION.ANGRY, label:"분노", color:"#EFF3F8"}]} />
    </div>
  );
}
