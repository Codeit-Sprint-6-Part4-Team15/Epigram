"use client";
import Button from "@/src/components/commons/Button";
import RadioGroup from "@/src/components/commons/RadioGroup";
import TextArea from "@/src/components/commons/TextArea";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler  } from "react-hook-form";
import { getEpigrams, postEpigram } from "../api/epigram";
import {toast } from 'react-toastify';


let errorClass = "mt-[8px] text-state-error typo-sm-medium xl:typo-lg-regual text-right";
let inputClass = `typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] border-blue-300 pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`;

interface FormValue  {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export default function Page() {

  const {
    handleSubmit, 
    register,
    setValue,
    formState: { errors }, 
  } = useForm<FormValue>({mode:"onBlur"})
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [epigrams, setEpigrams] = useState<any[]>([]); 
  

  //TODO: const router = useRouter();

  let borderColor = errors.author ? "border-red-500" : "border-blue-300";

  const [selectedAuthor, setSelectedAuthor] = useState<string>("직접 입력");
  const handleAuthorChange = (value: string) => {
    setSelectedAuthor(value);
    if (value === "unknown") {
      setValue("author", "알 수 없음");
    } else if (value === "myself") {
      setValue("author", "본인");
    } else {
      setValue("author", ""); // "직접 입력"일 경우 빈 문자열로 설정
    }
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim().length > 0 && tagInput.length <= 10 && tags.length < 3) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault(); // Enter 키로 폼 제출 방지
    }else if(tags.length >= 3){
      toast.info('태그는 3개까지 입력 가능합니다');
    }
  };

  const handleTagClick = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const fetchEpigrams = async () => { // 데이터 확인용
    try {
      const data = await getEpigrams(10);
      setEpigrams(data);
      //TODO:경로설정 
    } catch (error) {
      console.error("에피그램 목록을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEpigrams();
  }, []);

  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    data.tags = tags;
    try {
      await postEpigram(data); 
      console.log("에피그램 등록 완료");
      fetchEpigrams(); 
    } catch (error) {
      console.error("에피그램 등록 실패:", error);
    }
  };
  const onErrorHandler = () => {
    if (errors.content) {
      toast.error('내용을 입력해주세요.');
    }
    if (errors.author) {
      toast.error('저자를 입력해주세요.');
    }
  };

    return (
  
     <div className="flex justify-center h-screen">
        <div className="flex flex-col h-screen ml-[24px] mr-[24px] ">
        <h1 className="typo-lg-semibold mt-[24px] md:typo-xl-semibold xl:typo-2xl-semibold">에피그램 수정</h1>
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
            <RadioGroup name="authorRadio" size="sm" 
            content={[{ value: "directInput", label: "직접 입력"}, {value: "unknown", label: "알 수 없음"}, {value:"myself", label: "본인" }]}
            selectedValue={selectedAuthor} onChange={handleAuthorChange} />
           {selectedAuthor === "directInput" && (
            <input {...register("author", { required: true })} placeholder="저자 이름 입력"
              className={`typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] ${borderColor} pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`} />
          )}
            {errors.author && errors.author.type === "required" && (
        		<div className={errorClass}>저자를 입력해주세요.</div>
        	)}
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                출처
            </label>
            <input {...register("referenceTitle")} name="referenceTitle"  className={`${inputClass}`} placeholder="출처 제목 입력"/>
            <input {...register("referenceUrl")} name="referenceUrl" className={`${inputClass}`} placeholder="URL (ex. https://www.website.com)"/>
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                태그
            </label>
            <input {...register("tags",{ required: false})} name="tag" value={tagInput} onChange={handleTagInputChange} onKeyPress={handleKeyDown} className={`${inputClass}`} placeholder="입력하여 태그 작성 (최대 10자)"/>
            <div className="mt-[8px]">
            {tags.map((tag, index) => (
              <span key={index} onClick={() => handleTagClick(index)} className="inline-block bg-blue-200 text-blue-800 px-[8px] py-[4px] rounded-[8px] mr-[4px] mt-[4px] transition transform hover:scale-105">
                #{tag}
              </span>
            ))}
          </div>
            <Button type="button" onClick={handleSubmit(onSubmitHandler,onErrorHandler)} variant="main" size={{ default: "sm", md: "md", xl: "md" }} className="mt-[24px] xl:mt-[40px] mb-[100px]">
                작성 완료 
            </Button>
        </form>
        </div>
      </div>
    )
  }