'use client'
import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Button from "../components/commons/Button";
import { Router, useRouter } from "next/router";
import EmotionCalendar from "../components/EmotionCalender";
import Dropdown from "../components/commons/Dropdown";



export default function Home() {
  const [selectedValue, setSelectedValue] = useState<string>('필터: 없음');

  return (
    <>
      <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue}/> 
      <EmotionCalendar/>
    </>
  );
}