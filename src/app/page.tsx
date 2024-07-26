"use client";
import Button from "@/src/components/commons/Button";

export default function Home() {
  const handleClick = () => {
    alert(1);
  };
  return (
    <>
      <Button type="button" variant="main" size={{ default: "xs", md: "xs", xl: "sm" }} onClick={handleClick}>
        시작하기
      </Button>
      <Button type="button" variant="outline" size={{ default: "sm", md: "md", xl: "lg" }} onClick={handleClick}>
        시작하기
      </Button>
      <Button type="button" variant="wide" size={{ default: "xl", md: "2xl", xl: "3xl" }} onClick={handleClick} disabled>
        시작하기
      </Button>
      <Button type="link" href="/" variant="main" size={{ default: "xs", md: "xs", xl: "sm" }} onClick={handleClick}>
        시작하기
      </Button>
    </>
  );
}
