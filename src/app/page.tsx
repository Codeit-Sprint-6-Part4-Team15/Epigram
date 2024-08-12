'use client';

import { ReactNode, useState } from 'react';
import { useEffect, useRef } from 'react';

import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../components/commons/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollWrapperProps {
  children: ReactNode;
  direction: string;
}

const imageVariantsLeft = {
  hiddenState: { opacity: 0, x: -400 },
  showState: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const imageVariantsRight = {
  hiddenState: { opacity: 0, x: 400 },
  showState: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const cardVariant = {
  hiddenState: { opacity: 0, y: 60 },
  showState: {
    opacity: 1,
    y: 0,
    transition: { ease: 'easeInOut', duration: 1 },
  },
};

// 커스텀 훅이 적용된 Wrapper 컴포넌트
const ScrollWrapper = ({ children, direction }: ScrollWrapperProps) => {
  const { ref, animation } = useScrollAnimation();
  const directionVariant =
    direction === 'left'
      ? imageVariantsLeft
      : direction === 'right'
        ? imageVariantsRight
        : cardVariant;

  return (
    <motion.div
      ref={ref}
      variants={directionVariant}
      initial="hiddenState"
      animate={animation}
    >
      {children}
    </motion.div>
  );
};

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
}
