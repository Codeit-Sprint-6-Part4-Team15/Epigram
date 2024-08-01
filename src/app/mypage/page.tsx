import DonutChart from "@/src/components/DonutChart";

export default async function MyPage() {
  return (
    <div>
      <DonutChart rateObj={{ HAPPY: 55, MOVED: 1, WORRIED: 1, SAD: 1, ANGRY: 42 }} />
    </div>
  );
}
