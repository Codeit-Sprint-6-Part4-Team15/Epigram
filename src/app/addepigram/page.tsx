"use client";
import Button from "@/src/components/commons/Button";
import RadioGroup from "@/src/components/commons/RadioGroup";
import TextArea from "@/src/components/commons/TextArea";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [selectedAuthor, setSelectedAuthor] = useState<string>("직접 입력");
    const handleChange = (value: string) => {
        setSelectedAuthor(value);
      };
      const handleClick = () => {
        alert(1);
      };
      let inputClass = "typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] border-blue-300 pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]";
    return (
  
     <div className="flex justify-center h-screen">
        <div className="flex flex-col h-screen ml-[24px] mr-[24px] ">
        <h1 className="typo-lg-semibold mt-[24px] md:typo-xl-semibold xl:typo-2xl-semibold">에피그램 만들기</h1>
        <form className="flex flex-col mt-[24px] ">
            <label className="flex typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mb-[8px] xl:mb-[24px] xl:mt-[40px]">
                내용
                <Image
                src="/assets/ic-essential.svg"
                alt="내용 필수 입력"
                width={9}
                height={26}
                className="ml-[4px]"
                />
            </label>
            <TextArea variant="outlined" placeholder="500자 이내로 입력해주세요" />
            <label className="flex typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mt-[54px] xl:mb-[24px]">
                저자
                <Image
                src="/assets/ic-essential.svg"
                alt="저자 필수 입력"
                width={9}
                height={26}
                className="ml-[4px]"
                />
            </label>
            <RadioGroup name="fruit" size="sm" content={{ directInput: "직접 입력", unknown: "알 수 없음", myself: "본인" }} selectedValue={selectedAuthor} onChange={handleChange} />
            <input className={`${inputClass}`} placeholder="저자 이름 입력"/>
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                출처
            </label>
            <input className={`${inputClass}`} placeholder="출처 제목 입력"/>
            <input className={`${inputClass}`} placeholder="URL (ex. https://www.website.com)"/>
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                태그
            </label>
            <input className={`${inputClass}`} placeholder="입력하여 태그 작성 (최대 10자)"/>
            <Button type="button" variant="main" size={{ default: "sm", md: "md", xl: "md" }} className="mt-[24px] xl:mt-[40px]" onClick={handleClick} disabled>
                작성 완료 
                </Button>
        </form>
        </div>
        </div>
    )
  }