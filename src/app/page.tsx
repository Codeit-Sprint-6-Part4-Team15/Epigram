"use client";

import DonutChart from "../components/DonutChart";

export default function Home() {
  return (
    <>
      <DonutChart rateArr={[35, 20, 19, 17, 9]} />
    </>
  );
}
