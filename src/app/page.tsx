'use client';

import { ReactNode, useState } from 'react';
import { useEffect, useRef } from 'react';
import './globals.css';

import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '../components/commons/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import TextCard from '../components/commons/TextCard';

interface ScrollWrapperProps {
  children: ReactNode;
  direction: string;
}

const imageVariantsLeft = {
  hiddenState: { opacity: 0, x: -50 },
  showState: { opacity: 1, x: 0, transition: { 
   type: 'spring',
    stiffness: 100,
    damping: 6,
    duration: 1.5,
    bounce: 0.3,} },
};

const imageVariantsRight = {
  hiddenState: { opacity: 0, x: 50 },
  showState: { opacity: 1, x: 0, transition: {  type: 'spring',
    stiffness: 100,
    damping: 6,
    duration: 1.5,
    bounce: 0.3, } },
};

const cardVariant = {
  hiddenState: { opacity: 0, y: 30 },
  showState: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 6,
      duration: 2,
      bounce: 0.3,
    },
  },
};

const rotateVariant = {
  showState: {
    opacity: 1,
    y: [0, -10, 10, 0], // 위아래로 이동하는 효과
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const ScrollWrapper = ({ children, direction }: ScrollWrapperProps) => {
  const { ref, animation } = useScrollAnimation();
  const directionVariant =
    direction === 'left'
      ? imageVariantsLeft
      : direction === 'right'
      ? imageVariantsRight
      : direction === 'rotate'
      ? rotateVariant
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

  const router = useRouter();
  const handleClick = () => {
    router.push('/feed');
  };

  // //타이핑 효과 추가
  // const [displayText, setDisplayText] = useState('');
  // const content = '나만 갖고 있기엔\n아까운 글이 있지 않나요?';
  // let i = 0;

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });

  //   const typing = () => {
  //     if (i < content.length) {
  //       let txt = content[i++];
  //       setDisplayText((prev) => prev + (txt === '\n' ? '<br/>' : txt));
  //       setTimeout(typing, 100);
  //     } else {
  //       setShowElements(true);
  //     }
  //   };
  //   typing();
  // }, []);

  // useEffect(() => {
  //   if (typingCompleted) {
  //     animation.start('showState');
  //   }
  // }, [typingCompleted, animation]);

  // dangerouslySetInnerHTML={{ __html: displayText }}

  return (
    <div className="m-0 flex w-screen flex-col items-center bg-bg-100">
      <div className="note-background flex h-screen w-full flex-col items-center justify-center text-center ">
        <p
          className="white-space iropke-2xl md:iropke-3xl xl:iropke-4xl"
        >나만 갖고 있기엔</p>
     <p
          className="white-space iropke-2xl md:iropke-3xl xl:iropke-4xl"
        >아까운 글이 있지 않나요?</p>
          <div className="flex flex-col items-center">
              <p className="iropke-md mt-[8px] md:iropke-xl xl:iropke-xl md:mt-[24px] xl:mt-[40px]">
                다른 사람들과 감정을 공유해 보세요.
              </p>
              <Button
                type="button"
                variant="main"
                size={{ default: 'sm', md: 'sm', xl: 'lg' }}
                onClick={handleClick}
                className="mt-[24px] xl:mt-[48px]"
              >
                시작하기
              </Button>
            <ScrollWrapper direction="rotate">
            <button
              onClick={scrollToMain}
              className="typo-xs-semibold mt-[150px] flex flex-col items-center text-blue-400 md:typo-lg-medium xl:typo-lg-medium"
            >
              더 알아보기
              <Image
                src="/assets/landingPage/ic-chevron-up.svg"
                alt="더 알아보기 버튼"
                width={25}
                height={25}
              />
            </button>
            </ScrollWrapper>
          </div>
      </div>
      <main ref={mainRef} className="flex flex-col items-center text-center overflow-hidden">
        <div className="ml-[24px] mr-[24px] mt-[174px] flex flex-col items-center justify-center xl:mt-[240px] xl:flex-row">
          <ScrollWrapper direction="left">
            <div className="block md:hidden xl:hidden">
              <Image
                src="/assets/landingPage/landing01-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden md:block xl:hidden">
              <Image
                src="/assets/landingPage/landing01-md.svg"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden xl:block">
              <Image
                src="/assets/landingPage/landing01-lg.svg"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388}
              />
            </div>
          </ScrollWrapper>
          <div className="ml-[0px] mt-[40px] text-left xl:ml-[80px] xl:mt-[192px]">
            <p className="typo-2xl-bold xl:typo-3xl-bold">
              명언이나 글귀, <br />
              토막 상식들을 공유해 보세요.
            </p>
            <p className="typo-lg-regular mt-[20px] text-blue-600 xl:typo-2xl-bold xl:mt-[40px]">
              나만 알던 소중한 글들을
              <br className="block md:hidden xl:block" /> 다른 사람들에게
              전파하세요.
            </p>
          </div>
        </div>
        <div className="ml-[24px] mr-[24px] mt-[192px] flex flex-col md:mt-[220px] xl:mt-[380px] xl:flex-row">
          <div className="mr-[80px] mt-[230px] hidden text-right xl:block">
            <p className="typo-2xl-bold xl:typo-3xl-bold">
              감정 상태에 따라, <br /> 알맞은 위로를 받을 수 있어요.
            </p>
            <p className="typo-lg-regular mt-[20px] text-blue-600 xl:typo-2xl-bold xl:mt-[40px]">
              태그를 통해 글을 모아 볼 수 있어요.
            </p>
          </div>
          <ScrollWrapper direction="right">
            <div className="block md:hidden xl:hidden ">
              <Image
                src="/assets/landingPage/landing02-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden md:block xl:hidden">
              <Image
                src="/assets/landingPage/landing02-md.svg"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden xl:block ">
              <Image
                src="/assets/landingPage/landing02-lg.svg"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388}
              />
            </div>
          </ScrollWrapper>
          <div className="mt-[40px] block text-right md:block xl:mt-[192px] xl:hidden">
            <p className="typo-2xl-bold xl:typo-3xl-bold">
              감정 상태에 따라, <br /> 알맞은 위로를 받을 수 있어요.
            </p>
            <p className="typo-lg-regular mt-[20px] text-blue-600 xl:typo-2xl-bold xl:mt-[40px]">
              태그를 통해 글을 모아 볼 수 있어요.
            </p>
          </div>
        </div>
        <div className="ml-[24px] mr-[24px] mt-[192px] flex flex-col md:mt-[220px] xl:mt-[380px] xl:flex-row">
          <ScrollWrapper direction="left">
            <div className="block md:hidden xl:hidden">
              <Image
                src="/assets/landingPage/landing03-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden md:block xl:hidden">
              <Image
                src="/assets/landingPage/landing03-md.svg"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250}
              />
            </div>
            <div className="hidden xl:block">
              <Image
                src="/assets/landingPage/landing03-lg.svg"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388}
              />
            </div>
          </ScrollWrapper>
          <div className="ml-[0px] mt-[40px] text-left xl:ml-[80px] xl:mt-[192px]">
            <p className="typo-2xl-bold xl:typo-3xl-bold">
              내가 요즘 어떤 감정 상태인지 <br />
              통계로 한눈에 볼 수 있어요.
            </p>
            <p className="typo-lg-regular mt-[20px] text-blue-600 xl:typo-2xl-bold xl:mt-[40px]">
              감정 달력으로 <br className="block md:hidden xl:block" />내 마음에
              담긴 감정을 확인해보세요
            </p>
          </div>
        </div>
        <div className="w-[312px] md:w-[384px] xl:w-[640px] mt-[280px] flex flex-col items-center text-center xl:mt-[480px] gap-[20px] xl:gap-[25px]">
          <p className="typo-2xl-bold mb-[40px] xl:typo-3xl-bold xl:mb-[60px]">
            사용자들이 직접 <br />
            인용한 에피그램들
          </p>
          <ScrollWrapper direction="up">
            <TextCard
                  content={"절대 어제를 후회하지 마라. 인생은 오늘의 내 안에 있고 내일은 스스로 만드는것이다."}
                  author={"L론허바드"}
                  tags={[{name:"나아가야할때"},{name:"꿈을이루고싶을때"}]}
                />
          </ScrollWrapper>
          <ScrollWrapper direction="up">
          <TextCard
                  content={"올바르게 작동하지 않는다고 걱정하지 마라. 만일 모든 게 잘 된다면 굳이 당신이 일할 이유가 없다."}
                  author={"모셔의 법칙"}
                  tags={[{name:"걱정"},{name:"동기부여"}]}
                />
          </ScrollWrapper>
          <ScrollWrapper direction="up">
          <TextCard
                  content={"많은 경우 사람들은 원하는 것을 보여주기 전까지는 무엇을 원하는지도 모른다."}
                  author={"스티븐잡스"}
                  tags={[{name:"도전"}]}
                />
          </ScrollWrapper>
            <Image
              src="assets/landingPage/ic-more-vertical.svg"
              alt="더 알아보기 버튼"
              width={25}
              height={25}
              className="mb-[30px] mt-[40px] xl:mb-[60px]"
            />
        </div>
      </main>
      <div className="note-background flex h-[500px] w-screen flex-col items-center md:h-[528px] xl:h-[780px]">
        <div className='flex'>
          <div className='m-0'>
        <ScrollWrapper direction="rotate">
        <Image
            src="/assets/landingPage/charcacter1.svg"
            alt="에피그램 캐릭터"
            width={122}
            height={200}
            className="mt-[180px]"
          />
          </ScrollWrapper>
          </div>
        <div className='flex flex-col items-center w-[122px] xl:w-[286px] md:mx-[40px] mx-[20px] '>
        <div className="block md:hidden xl:hidden">
          <Image
            src="/assets/landingPage/logo2-lg.webp"
            alt="날마다 에피그램"
            width={122}
            height={200}
            className="mt-[180px]"
          />
        </div>
        <div className="hidden md:block xl:hidden">
          <Image
            src="/assets/landingPage/logo2-lg.webp"
            alt="날마다 에피그램"
            width={122}
            height={200}
            className="mt-[180px]"
          />
        </div>
        <div className="hidden md:hidden xl:block">
          <Image
            src="/assets/landingPage/logo2-xl.webp"
            alt="날마다 에피그램"
            width={184}
            height={388}
            className="mt-[250px]"
          />
        </div>
        <Button
          type="button"
          variant="main"
          size={{ default: 'sm', md: 'md', xl: 'lg' }}
          onClick={handleClick}
          className="mt-[24px] xl:mt-[48px]"
        >
          시작하기
        </Button>
        </div>
        <ScrollWrapper direction='rotate'>
        <Image
            src="/assets/landingPage/charcacter2.svg"
            alt="에피그램 캐릭터"
            width={122}
            height={200}
            className='mt-[200px]'
          />
          </ScrollWrapper>
        </div>
      </div>
    </div>
  );
}
