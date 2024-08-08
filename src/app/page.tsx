'use client'
import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Button from "../components/commons/Button";
import Login from "./test/login";
import { useRouter } from "next/router";


export default function Home() {


  return (
    <>
      <Login/>

    </>
  );
}