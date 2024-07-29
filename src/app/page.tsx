"use client";
import { useState } from "react";
import RadioGroup from "@/src/components/commons/RadioGroup";
import Toggle from "../components/commons/Toggle";

export default function Home() {
  const [selectedFruit, setSelectedFruit] = useState<string>("apple");
  const [isPublic, setIsPublic] = useState(false);

  const handleChange = (value: string) => {
    setSelectedFruit(value);
  };

  const handleToggle = (value: boolean) => {
    setIsPublic(value);
  }

  return (
    <>
      <RadioGroup name="fruit" size="sm" content={{ apple: "사과", banana: "바나나", mango: "망고" }} selectedValue={selectedFruit} onChange={handleChange} />
      <Toggle content={{public : "공개"}} checked={isPublic} onChange={handleToggle}/>
    </>
  );
}
