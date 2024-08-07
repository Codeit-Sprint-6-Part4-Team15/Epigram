import DonutChart from "@/src/components/DonutChart";
import IMG_EMOTION from "@/public/assets/emotionChart";
import instance from "@/src/app/api/axios";
import { EmotionData } from "@/src/types/emotion";

interface ChartContainerProps {
  userId: number;
  year: number;
  month: number;
}

const emotionInfo: EmotionData[] = [
  { emotion: "HAPPY", rate: 0, image: IMG_EMOTION.HAPPY, label: "기쁨", color: "#E46E80" },
  { emotion: "MOVED", rate: 0, image: IMG_EMOTION.MOVED, label: "감동", color: "#FBC85B" },
  { emotion: "WORRIED", rate: 0, image: IMG_EMOTION.WORRIED, label: "고민", color: "#48BB98" },
  { emotion: "SAD", rate: 0, image: IMG_EMOTION.SAD, label: "슬픔", color: "#5195EE" },
  { emotion: "ANGRY", rate: 0, image: IMG_EMOTION.ANGRY, label: "분노", color: "#8E80E3" },
];

async function getMonthlyData(id: number, year: number, month: number) {
  let monthlyData;
  try {
    const res = await instance.get("emotionLogs/monthly", {
      params: {
        userId: id,
        year: year,
        month: month
      }
    });
    monthlyData = await res.data;
  } catch (error) {
    throw new Error("사용자의 월 감정 데이터를 불러오는데 실패했습니다.")
  }

  // 카운트
  const emotionCounts = await monthlyData.reduce((acc, item) => {
    acc[item.emotion] = (acc[item.emotion] || 0) + 1;
    return acc;
  }, {});

  const totalRecords = monthlyData.length;

  // 비율 계산
  const updatedEmotionInfo = emotionInfo.map(info => {
    const count = emotionCounts[info.emotion] || 0;
    const rate = totalRecords > 0 ? Math.round((count / totalRecords) * 100) : 0;
    return { ...info, rate };
  });

  return updatedEmotionInfo;
}

export default async function ChartContainer({ userId, year, month }: ChartContainerProps) {
  return (
    <div>
      <DonutChart data={await getMonthlyData(userId, year, month)} />
    </div>
  );
}
