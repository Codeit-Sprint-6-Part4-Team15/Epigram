"use client";
import Image from "next/image";
import Button from "@/src/components/Button";

export default function Home() {
  const handleClick = () => {
    alert(1);
  };
  return (
    <>
      <Button type="link" href="/" size="xs">
        시작하기
      </Button>
      <Button type="button" style="outline" size="lg">
        시작하기
      </Button>
      <Button type="button" style="main" size="lg" onClick={handleClick}>
        시작하기
      </Button>
    </>
  );
}
