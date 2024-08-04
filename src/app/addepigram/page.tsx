"use client";
import Button from "@/src/components/commons/Button";
import RadioGroup from "@/src/components/commons/RadioGroup";
import TextArea from "@/src/components/commons/TextArea";
import Image from "next/image";
import { useState } from "react";
import { useForm, SubmitHandler  } from "react-hook-form";

let errorClass = "mt-[8px] text-state-error typo-sm-medium xl:typo-lg-regual text-right";


interface FormValue  { // 입력받을 데이터 타입
  content: string;
  author: string;
  referenceTitle: string;
  referenceUrl: string;
  tag:[];
}

export default function Page() {

  const {
    handleSubmit, // form onSubmit에 들어가는 함수 - 각 항목 마다 입력되면 submit 이벤트 처리 
    register, // onChange 등의 이벤트 객체 생성 - 어떤 항목 입력받을지
    setValue,
    watch, // register를 통해 받은 모든 값 확인
    formState: { errors }, // errors: register의 에러 메세지 자동 출력
  } = useForm<FormValue>({mode:"onBlur"})
  
let borderColor = errors.author ? "border-red-500" : "border-blue-300";
let inputClass = `typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] border-blue-300 pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`;


  const [selectedAuthor, setSelectedAuthor] = useState<string>("직접 입력"); //Radio Button
  const handleChange = (value: string) => {
    setSelectedAuthor(value);
  };

  const onSubmitHandler: SubmitHandler<FormValue> =(data)=>{ // 항목이 전부 입력되면 처리할 로직
    console.log(data)
      //TODO: API 연결
    //   const saveEpigram = async () => {
    //     await axios.post(`https://fe-project-epigram-api.vercel.app/15/epigrams`).then((res) => {
    //       console.log('에피그램 등록 완료');
    //       router.push(`/epigrams/${id}`)
    //     });
    //   };
  }

    return (
  
     <div className="flex justify-center h-screen">
        <div className="flex flex-col h-screen ml-[24px] mr-[24px] ">
        <h1 className="typo-lg-semibold mt-[24px] md:typo-xl-semibold xl:typo-2xl-semibold">에피그램 만들기</h1>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col mt-[24px] ">
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
            <TextArea 
            variant="outlined" placeholder="500자 이내로 입력해주세요" register={register("content", { required: true, maxLength: 500 })}  error={!!errors.content} 
            maxLengthError={errors.content && errors.content.type === "maxLength"}
          />
            {errors.content && errors.content.type === "required" && (
        		<div className={errorClass}>내용을 입력해주세요.</div>
        	)}
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
            <input {...register("author",{required:true})} placeholder="저자 이름 입력"
             className={`typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] ${borderColor} pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`}/>
            {errors.author && errors.author.type === "required" && (
        		<div className={errorClass}>저자를 입력해주세요.</div>
        	)}
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                출처
            </label>
            <input {...register("referenceTitle")} name="referenceTitle"  className={`${inputClass}`} placeholder="출처 제목 입력"/>
            <input {...register("referenceUrl")} name="referenceUrl" className={`${inputClass}`} placeholder="URL (ex. https://www.website.com)" pattern="https?\:\/\/.+"/>
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                태그
            </label>
            <input name="tag" className={`${inputClass}`} placeholder="입력하여 태그 작성 (최대 10자)"/>
            <Button type="button" variant="main" size={{ default: "sm", md: "md", xl: "md" }} className="mt-[24px] xl:mt-[40px]" onClick={handleSubmit(onSubmitHandler)} >
                작성 완료 
                </Button>
        </form>
        </div>
        </div>
    )
  }