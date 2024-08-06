import ChartContainer from "@/src/components/ChartContainer";
import DonutChart from "@/src/components/DonutChart";

export default async function MyPage() {
  return (
    <div>
      <ChartContainer userId={136} year={2024} month={8} />
    </div>
  );
}
