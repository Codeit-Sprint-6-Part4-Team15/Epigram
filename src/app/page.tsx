'use client'
import Image from "next/image";
import { ReactNode, useState } from "react";
import backgroundImg from "@/public/assets/landingPage/landing-background.svg"
import chevron from "@/public/assets/landingPage/ic-chevron-up.svg"
import more from "@/public/assets/landingPage/ic-more-vertical.svg"
import landingImg1 from "@/public/assets/landingPage/landing01-lg.svg"
import landingImg2 from "@/public/assets/landingPage/landing02-lg.svg"
import landingImg3 from "@/public/assets/landingPage/landing03-lg.svg"
import cardImg1 from "@/public/assets/landingPage/card01-lg.svg"
import cardImg2 from "@/public/assets/landingPage/card02-lg.svg"
import cardImg3 from "@/public/assets/landingPage/card03-lg.svg"
import logo2Img1 from "@/public/assets/landingPage/logo2-lg.svg"
import Link from "next/link";
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react";

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

const useScrollAnimation = () => { //스크롤 애니메이션 커스텀 훅
  const animation = useAnimation();
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      // 엘리먼트가 뷰포트 내에 들어오면 showState 애니메이션 실행
      animation.start("showState");
    } else {
      // 엘리먼트가 뷰포트에서 벗어나면 hiddenState 애니메이션 실행
      animation.start("hiddenState");
    }
  }, [animation, isInView]);

  return { ref, animation };
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
  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      }
    };
    typing(); 
  }, []); 

  return (
    <div className="flex flex-col items-center bg-bg-100">
    <div className="w-[440px] flex flex-col items-center mt-[320px]">
      <Image src={backgroundImg}
      alt="배경 이미지"
      layout="fill"
      objectFit="cover"
      className="z-[1]"/>
      <div className="z-[2] flex flex-col text-center items-center">
      <p className="iropke-4xl white-space" dangerouslySetInnerHTML={{ __html: displayText }}></p>
      <p className="iropke-xl mt-[40px]">다른 사람들과 감정을 공유해 보세요.</p>
      <Link href="/">
      <button className="w-[286px] h-[64px] mt-[48px] bg-black-500 text-white rounded-[12px]">시작하기</button>
      </Link>
      <button onClick={scrollToMain} className="flex flex-col items-center mt-[214px] text-blue-400 text-[16px]">더 알아보기
      <Image src={chevron}
      alt="더 알아보기 버튼"
      width={25}
      height={25}/>
      </button>
      </div>
    </div>
  
    <main ref={mainRef} className="flex flex-col text-center">
      <div className="flex mt-[240px]">
            <ScrollWrapper direction="left"
          >
      <Image src={landingImg1}
        alt="랜딩페이지 이미지"
        width={744}
        height={388}/>
        </ScrollWrapper>
        <div className="ml-[80px] mt-[192px] text-left">
          <p className="typo-3xl-bold">명언이나 글귀,</p>
          <p className="typo-3xl-bold">토막 상식들을 공유해 보세요.</p>
          <p className="mt-[40px] typo-2xl-bold text-blue-600">나만 알던 소중한 글들을</p>
          <p className="typo-2xl-bold text-blue-600">다른 사람들에게 전파하세요.</p>
      </div>
      </div>
      <div className="flex mt-[380px]">
        <div className="mr-[80px] mt-[192px] text-right">
      <p className="typo-3xl-bold">감정 상태에 따라,</p>
      <p className="typo-3xl-bold"> 알맞은 위로를 받을 수 있어요.</p>
      <p className="typo-2xl-bold text-blue-600 mt-[40px]">
        태그를 통해 글을 모아 볼 수 있어요.
        </p>
        </div>
        <ScrollWrapper direction="right"
          >
        <Image src={landingImg2}
      alt="랜딩페이지 이미지"
      width={744}
      height={388}/>
      </ScrollWrapper>
      </div>
      <div className="flex mt-[380px]">
      <ScrollWrapper direction="left"
          >
      <Image src={landingImg3}
      alt="랜딩페이지 이미지"
      width={744}
      height={388}/>
      </ScrollWrapper>
      <div className="ml-[80px] mt-[192px] text-left">
      <p className="typo-3xl-bold">
        내가 요즘 어떤 감정 상태인지 </p>
        <p className="typo-3xl-bold">통계로 한눈에 볼 수 있어요.
        </p>
        <p className="typo-2xl-bold text-blue-600 mt-[40px]">
        감정 달력으로</p>
        <p className="typo-2xl-bold text-blue-600">내 마음에 담긴 감정을 확인해보세요
        </p>
        </div>
      </div>
      <div className="mt-[480px] text-center flex flex-col items-center mb-[60px]">
      <p className="typo-3xl-bold">사용자들이 직접</p>
      <p className="typo-3xl-bold"> 인용한 에피그램들</p>
      <ScrollWrapper direction="up"
          >
      <Image src={cardImg1}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[100px]"/>
      </ScrollWrapper>
      <ScrollWrapper direction="up"
          >
       <Image src={cardImg2}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[60px]"/>
      </ScrollWrapper>
      <ScrollWrapper direction="up"
          >
       <Image src={cardImg3}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[60px]"/>
           </ScrollWrapper>
           <ScrollWrapper direction="up"
          >
       <Image src={more}
      alt="더 알아보기 버튼"
      width={25}
      height={25}
      className="mt-[40px]"/>
          </ScrollWrapper>
        </div>
        
    </main>
    <div className="relative w-screen">
    <div className="flex flex-col items-center  relative z-[2]">
    <Image src={logo2Img1}
      alt="날마다 에피그램"
      width={184}
      height={388}
      className="mt-[495px]"/>
        <Link href="/">
    <button className="w-[286px] h-[64px] mt-[48px] bg-black-500 text-white rounded-[12px] mb-[400px]">시작하기</button>
    </Link>
    </div>
    <Image src={backgroundImg}
      alt="배경 이미지"
      layout="fill"
      objectFit="cover"
      className=" b-0 w-screen z-[1]"/>
    </div>
    </div>
  );
}
