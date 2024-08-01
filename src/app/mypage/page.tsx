import DonutChart from "@/src/components/DonutChart";

export default function MyPage() {
  return (
    <div>
      <DonutChart rateObj={{ HAPPY: 9, MOVED: 19, WORRIED: 50, SAD: 17, ANGRY: 5 }} />
    </div>
  );
}
