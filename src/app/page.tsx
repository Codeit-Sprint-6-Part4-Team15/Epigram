"use client";
import { useState } from "react";
import RadioGroup from "@/src/components/commons/RadioGroup";

export default function Home() {
  const [selectedFruit, setSelectedFruit] = useState<string>("apple");

  const handleChange = (value: string) => {
    setSelectedFruit(value);
  };

  return (
    <>
      <RadioGroup name="fruit" size="sm" content={{ apple: "사과", banana: "바나나", mango: "망고" }} selectedValue={selectedFruit} onChange={handleChange} />
    </>
  );
}
