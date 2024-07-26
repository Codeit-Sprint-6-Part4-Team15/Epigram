import Image from "next/image";
import backgroundImg from "@/public/assets/landing-background.svg"
import chevron from "@/public/assets/ic-chevron-up.svg"
import more from "@/public/assets/ic-more-vertical.svg"
import landingImg1 from "@/public/assets/img-desktop-landing01.svg"
import landingImg2 from "@/public/assets/img-desktop-landing02.svg"
import landingImg3 from "@/public/assets/img-desktop-landing03.svg"
import cardImg1 from "@/public/assets/img-desktop-card01.svg"
import cardImg2 from "@/public/assets/img-desktop-card02.svg"
import cardImg3 from "@/public/assets/img-desktop-card03.svg"
import logo2Img1 from "@/public/assets/img-logo2-xl.webp"
import shreddedPaper1 from "@/public/assets/shredded-paper-1.webp"
import shreddedPaper2 from "@/public/assets/shredded-paper-2.webp"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center bg-bg-100">
    <div className="w-[400px] flex flex-col items-center mt-[320px]">
      <Image src={backgroundImg}
      alt="배경 이미지"
      layout="fill"
      objectFit="cover"
      className="z-[1]"/>
      <div className="z-[2] flex flex-col text-center items-center">
      <p className="iropke-4xl">
        나만 갖고 있기엔
      아까운 글이 있지 않나요?</p>
      <p className="iropke-xl mt-[40px]">다른 사람들과 감정을 공유해 보세요.</p>
      <Link href="/">
      <button className="w-[286px] h-[64px] mt-[48px] bg-black-500 text-white rounded-[12px]">시작하기</button>
      </Link>
      <button className="mt-[214px] text-blue-400 text-[16px]">더 알아보기</button>
      <Image src={chevron}
      alt="더 알아보기 버튼"
      width={25}
      height={25}/>
      </div>
    </div>
    <Image src={shreddedPaper1}
        alt="배경 이미지"
        width={2640}
        height={15}
        className="mt-[20px]"/>
   
    <main className="flex flex-col text-center">
      <div className="flex mt-[240px]">
      <Image src={landingImg1}
        alt="랜딩페이지 이미지"
        width={744}
        height={388}/>
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
        <Image src={landingImg2}
      alt="랜딩페이지 이미지"
      width={744}
      height={388}/>
      </div>
      <div className="flex mt-[380px]">
      <Image src={landingImg3}
      alt="랜딩페이지 이미지"
      width={744}
      height={388}/>
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
      <Image src={cardImg1}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[100px]"/>
       <Image src={cardImg2}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[60px]"/>
       <Image src={cardImg3}
      alt="랜딩페이지 이미지"
      width={640}
      height={388}
      className="mt-[60px]"/>
       <Image src={more}
      alt="더 알아보기 버튼"
      width={25}
      height={25}
      className="mt-[40px]"/>
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
