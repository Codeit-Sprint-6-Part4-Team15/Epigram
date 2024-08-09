'use client';

import { ReactNode, useState } from 'react';
import { useEffect, useRef } from 'react';

import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../components/commons/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Login from './test/login';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [typingCompleted, setTypingCompleted] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const animation = useAnimation();

  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = () => {
    //시작하기 버튼 클릭 시
    const router = useRouter();
    router.push('/epigrams');
  };

  //타이핑 효과 추가
  const [displayText, setDisplayText] = useState('');
  const content = '나만 갖고 있기엔\n아까운 글이 있지 않나요?';
  let i = 0;

  useEffect(() => {
    const typing = () => {
      if (i < content.length) {
        let txt = content[i++];
        setDisplayText((prev) => prev + (txt === '\n' ? '<br/>' : txt));
        setTimeout(typing, 100);
      } else {
        setShowElements(true);
      }
    };
    typing();
  }, []);

  useEffect(() => {
    if (typingCompleted) {
      animation.start('showState');
    }
  }, [typingCompleted, animation]);

  return (
    <>
      <Login />
    </>
  );
}
