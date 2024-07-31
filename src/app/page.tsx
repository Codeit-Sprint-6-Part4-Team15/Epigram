"use client";

import DonutChart from "../components/DonutChart";

export default function Home() {
  return (
    <>
      <DonutChart rateObj={{ HAPPY: 35, MOVED: 20, WORRIED: 19, SAD: 17, ANGRY: 9 }} />
    </>
  );
}
