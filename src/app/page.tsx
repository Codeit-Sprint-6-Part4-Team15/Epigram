"use client";

import DonutChart from "../components/DonutChart";

export default function Home() {
  // TODO: DonutChart rateObj value 값의 합이 무조건 100이여야함
  return (
    <>
      <DonutChart bestEmotion="HAPPY" rateObj={{ HAPPY: 50, MOVED: 9, WORRIED: 19, SAD: 17, ANGRY: 5 }} />
    </>
  );
}
