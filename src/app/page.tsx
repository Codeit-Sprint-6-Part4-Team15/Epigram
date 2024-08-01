'use client'
import Image from "next/image";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Button from "../components/commons/Button";
import { Router, useRouter } from "next/router";

interface ScrollWrapperProps {
  children: ReactNode;
  direction:string;
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
  showState: { opacity: 1, y: 0, transition: {ease: "easeInOut",duration: 1 } },
};

// 커스텀 훅이 적용된 Wrapper 컴포넌트
const ScrollWrapper = ({ children, direction }: ScrollWrapperProps) => {
  const { ref, animation } = useScrollAnimation();
  const directionVariant = direction === "left" 
  ? imageVariantsLeft 
  : direction === "right" 
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
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick =()=>{ //시작하기 버튼 클릭 시
    const router = useRouter()
    router.push('/epigrams')
  }

  //타이핑 효과 추가
  const [displayText, setDisplayText] = useState("");
  const content = "나만 갖고 있기엔\n아까운 글이 있지 않나요?";
  let i = 0;

  useEffect(() => {
    const typing = () => {
      if (i < content.length) {
        let txt = content[i++];
        setDisplayText((prev) => prev + (txt === "\n" ? "<br/>" : txt));
        setTimeout(typing, 100); 
      }else{
        setShowElements(true);
      }
    };
    typing(); 
  }, []); 

  useEffect(() => {
    if (typingCompleted) {
      animation.start("showState");
    }
  }, [typingCompleted, animation]);

  return (
    <div className="flex flex-col items-center bg-bg-100">
    <div className="w-[440px] flex flex-col items-center mt-[320px] ">
    <Image 
  src="/assets/landingPage/landing-background.webp"
  alt="배경 이미지"
  layout="fill"
  objectFit="cover"
  className="z-[1]"
/>
      <div className="z-[2] flex flex-col text-center items-center">
      <p className="iropke-2xl md:iropke-3xl xl:iropke-4xl white-space" dangerouslySetInnerHTML={{ __html: displayText }}></p>
      {showElements && (
            <div className="flex flex-col items-center">
               <ScrollWrapper direction="up">
      <p className="iropke-md md:iropke-xl xl:iropke-xl mt-[8px] md:mt-[24px] xl:mt-[40px]">다른 사람들과 감정을 공유해 보세요.</p>
      <Button type="button" variant="main" size={{ default: "sm", md: "sm", xl: "lg" }} onClick={handleClick} className="mt-[24px] xl:mt-[48px]">
        시작하기
      </Button>
      </ScrollWrapper>
      <button onClick={scrollToMain} className="flex flex-col items-center mt-[214px] text-blue-400 typo-xs-semibold md:typo-lg-medium xl:typo-lg-medium">더 알아보기
      <Image src="/assets/landingPage/ic-chevron-up.svg"
      alt="더 알아보기 버튼"
      width={25}
      height={25}/>
      </button>
      </div>
     
      )}
      </div>
    </div>
    <main ref={mainRef} className="flex flex-col text-center">
      <div className="flex flex-col mt-[174px] xl:flex-row xl:mt-[240px] mr-[24px] ml-[24px]">
            <ScrollWrapper direction="left">
            <div className="block md:hidden xl:hidden">
              <Image src="/assets/landingPage/landing01-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250} />
            </div>
           <div className="hidden md:block xl:hidden">
              <Image src="/assets/landingPage/landing01-md.webp"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250} />
            </div>
            <div className="hidden xl:block">
              <Image src="/assets/landingPage/landing01-lg.webp"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388} />
            </div>
        </ScrollWrapper>
        <div className="ml-[0px] mt-[40px] xl:ml-[80px] xl:mt-[192px] text-left">
          <p className="typo-2xl-bold xl:typo-3xl-bold">명언이나 글귀, <br/>토막 상식들을 공유해 보세요.</p>
          <p className="typo-lg-regualr mt-[20px] xl:mt-[40px] xl:typo-2xl-bold text-blue-600">나만 알던 소중한 글들을 
          <br className="block md:hidden xl:block"/> 다른 사람들에게 전파하세요.</p>
      </div>
      </div>
      <div className="flex flex-col mt-[192px] md:mt-[220px] xl:mt-[380px] xl:flex-row mr-[24px] ml-[24px]">
        <div className="mr-[80px] mt-[192px] text-right hidden xl:block">
      <p className="typo-2xl-bold xl:typo-3xl-bold">감정 상태에 따라, <br/> 알맞은 위로를 받을 수 있어요.</p>
      <p className="typo-lg-regualr mt-[20px] xl:mt-[40px] xl:typo-2xl-bold text-blue-600">
        태그를 통해 글을 모아 볼 수 있어요.
        </p>
        </div>
        <ScrollWrapper direction="right"
          >
       <div className="block md:hidden xl:hidden ">
              <Image src="/assets/landingPage/landing02-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250} />
            </div>
           <div className="hidden md:block xl:hidden">
              <Image src="/assets/landingPage/landing02-md.webp"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250} />
            </div>
            <div className="hidden xl:block">
              <Image src="/assets/landingPage/landing02-lg.webp"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388} />
            </div>
      </ScrollWrapper>
      <div className="mt-[40px] xl:mt-[192px] text-right block md:block xl:hidden">
      <p className="typo-2xl-bold xl:typo-3xl-bold">감정 상태에 따라, <br/> 알맞은 위로를 받을 수 있어요.</p>
      <p className="typo-lg-regualr mt-[20px] xl:mt-[40px] xl:typo-2xl-bold text-blue-600">
        태그를 통해 글을 모아 볼 수 있어요.
        </p>
        </div>
      </div>
      <div className="flex flex-col mt-[192px] md:mt-[220px] xl:mt-[380px] xl:flex-row mr-[24px] ml-[24px]">
      <ScrollWrapper direction="left">
      <div className="block md:hidden xl:hidden">
              <Image src="/assets/landingPage/landing03-sm.svg"
                alt="랜딩페이지 이미지 (작은 크기)"
                width={500}
                height={250} />
            </div>
           <div className="hidden md:block xl:hidden">
              <Image src="/assets/landingPage/landing03-md.webp"
                alt="랜딩페이지 이미지 (중간 크기)"
                width={500}
                height={250} />
            </div>
            <div className="hidden xl:block">
              <Image src="/assets/landingPage/landing03-lg.webp"
                alt="랜딩페이지 이미지 (큰 크기)"
                width={744}
                height={388} />
            </div>
      </ScrollWrapper>
      <div className="ml-[0px] xl:ml-[80px] mt-[40px] xl:mt-[192px] text-left">
      <p className="typo-2xl-bold xl:typo-3xl-bold">내가 요즘 어떤 감정 상태인지 <br/>통계로 한눈에 볼 수 있어요.</p>
        <p className="typo-lg-regualr mt-[20px] xl:mt-[40px] xl:typo-2xl-bold text-blue-600">
        감정 달력으로 <br className="block md:hidden xl:block"/>내 마음에 담긴 감정을 확인해보세요</p>
        </div>
      </div>
      <div className="mt-[280px] xl:mt-[480px] text-center flex flex-col items-center">
      <p className="typo-2xl-bold xl:typo-3xl-bold mb-[40px] xl:mb-[60px]">사용자들이 직접 <br/>인용한 에피그램들</p>
      <ScrollWrapper direction="up">
      <div className="block md:hidden xl:hidden">
              <Image src="/assets/landingPage/card01-sm.webp"
                alt="카드 이미지 (작은 크기)"
                width={312}
                height={152} />
            </div>
           <div className="hidden md:block xl:hidden">
              <Image src="/assets/landingPage/card01-md.webp"
                alt="카드 이미지 (중간 크기)"
                width={384}
                height={180} />
            </div>
            <div className="hidden xl:block">
              <Image src="/assets/landingPage/card01-lg.webp"
                alt="카드 이미지 (큰 크기)"
                width={640}
                height={198} />
            </div>
      </ScrollWrapper>
      <ScrollWrapper direction="up"
          >
         <div className="block md:hidden xl:hidden mt-[16px]">
              <Image src="/assets/landingPage/card02-sm.webp"
                alt="카드 이미지 (작은 크기)"
                width={312}
                height={200} />
            </div>
           <div className="hidden md:block xl:hidden mt-[20px]">
              <Image src="/assets/landingPage/card02-md.webp"
                alt="카드 이미지 (중간 크기)"
                width={384}
                height={232} />
            </div>
            <div className="hidden xl:block mt-[60px]">
              <Image src="/assets/landingPage/card02-lg.webp"
                alt="카드 이미지 (큰 크기)"
                width={640}
                height={276} />
            </div>
      </ScrollWrapper>
      <ScrollWrapper direction="up"
          >
         <div className="block md:hidden xl:hidden mt-[16px]">
              <Image src="/assets/landingPage/card03-sm.webp"
                alt="카드 이미지 (작은 크기)"
                width={312}
                height={152} />
            </div>
           <div className="hidden md:block xl:hidden mt-[20px]">
              <Image src="/assets/landingPage/card03-md.webp"
                alt="카드 이미지 (중간 크기)"
                width={384}
                height={180} />
            </div>
            <div className="hidden xl:block mt-[60px]">
              <Image src="/assets/landingPage/card03-lg.webp"
                alt="카드 이미지 (큰 크기)"
                width={640}
                height={196} />
            </div>
           </ScrollWrapper>
           <ScrollWrapper direction="up"
          >
       <Image src="assets/ic-more-vertical.svg"
      alt="더 알아보기 버튼"
      width={25}
      height={25}
      className="mt-[40px] mb-[30px] xl:mb-[60px]"/>
          </ScrollWrapper>
        </div>
        
    </main>
    <div className="relative w-screen">
    <div className="flex flex-col items-center  relative z-[2]">
      <div className="block md:hidden xl:hidden">
      <Image src="/assets/landingPage/logo2-lg.webp"
      alt="날마다 에피그램"
      width={122}
      height={200}
      className="mt-[180px]"/>
            </div>
            <div className="hidden md:block xl:hidden">
      <Image src="/assets/landingPage/logo2-lg.webp"
      alt="날마다 에피그램"
      width={122}
      height={200}
      className="mt-[180px]"/>
            </div>
       <div className="hidden md:hidden xl:block">
      <Image src="/assets/landingPage/logo2-xl.webp"
      alt="날마다 에피그램"
      width={184}
      height={388}
      className="mt-[495px]"/>
            </div>
    <Button type="button" variant="main" size={{ default: "sm", md: "sm", xl: "lg" }} onClick={handleClick} className="mt-[24px] xl:mt-[48px] mb-[200px] xl:mb-[400px]">
        시작하기
      </Button>
    </div>
    <Image src="/assets/landingPage/landing-background.webp"
      alt="배경 이미지"
      layout="fill"
      objectFit="cover"
      className=" w-screen z-[1]"/>
    </div>
    </div>
  );
}
