"use client";
import Button from "@/src/components/commons/Button";
import RadioGroup from "@/src/components/commons/RadioGroup";
import TextArea from "@/src/components/commons/TextArea";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import router from "next/router";

let inputClass = "typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] border-blue-300 pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]";

export default function Page() {
    const [form, setForm] = useState({
        content:'',
        author:'',
        referenceTitle:'',
        referenceUrl:'',
        tag:[],
    })
    const [selectedAuthor, setSelectedAuthor] = useState<string>("직접 입력"); //Radio Button
    const [errors, setErrors] = useState({
        letterMissing : "", 
        letterNumberError:"",
        authorMissing: "",
        typeMismatch : "", 
      })
    const [touched, setTouched] = useState({ //Input 방문 상태
        content:false,
        author:false,
    })

  const handleBlur = (e: { target: { name: any; }; }) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    })
  }
  const validate = useCallback(() => { //Input 유효성 검사
    const errors={
        letterMissing : "", 
        letterNumberError:"",
        authorMissing: "",
        typeMismatch : "", 
    }
    if (!form.content) {
        errors.letterMissing="내용을 입력해주세요."
    }
    if(form.content.length>500){
        errors.letterNumberError="500자 이내로 입력해주세요."
    }
    if (!form.author) {
        errors.authorMissing= "저자를 입력해주세요."
    }
    return errors;
  }, [form])

  useEffect(() => {
    validate()
  }, [validate])

    const handleChange = (value: string) => {
        const errors = validate()
        setErrors(errors)
        if (Object.values(errors).some(v => v)) {
          return
        }};
     const handleSubmit = (e: { preventDefault: () => void; }) => {
         e.preventDefault()
         setTouched({
            content: true,
            author: true,
            })
        
            const errors = validate()
            setErrors(errors)
            // 잘못된 값이면 제출 중단
            if (Object.values(errors).some(v => v)) {
              return
            }
          }

      //TODO: API 연결
    //   const saveEpigram = async () => {
    //     await axios.post(`https://fe-project-epigram-api.vercel.app/15/epigrams`).then((res) => {
    //       console.log('에피그램 등록 완료');
    //       router.push(`/epigrams/${id}`)
    //     });
    //   };

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
            <TextArea name="content" value={form.content}  onBlur={handleBlur} onChange={e=>setForm({...form, content:e.target.value})} variant="outlined" placeholder="500자 이내로 입력해주세요" />
            {touched.content && errors.letterNumberError && <span>{errors.letterNumberError}</span>}
            {touched.content && errors.letterMissing && <span>{errors.letterMissing}</span>}
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
            <input name="author" value={form.author}  onBlur={handleBlur} onChange={e=>setForm({...form, author:e.target.value})} className={`${inputClass}`} placeholder="저자 이름 입력"/>
            {touched.author && errors.authorMissing && <span>{errors.authorMissing}</span>}
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                출처
            </label>
            <input name="referenceTitle" value={form.referenceTitle} onChange={e=>setForm({...form, referenceTitle:e.target.value})}  className={`${inputClass}`} placeholder="출처 제목 입력"/>
            <input name="referenceUrl" value={form.referenceUrl} onChange={e=>setForm({...form, referenceUrl:e.target.value})} className={`${inputClass}`} placeholder="URL (ex. https://www.website.com)" pattern="https?\:\/\/.+"/>
            <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
                태그
            </label>
            <input name="tag" value={form.tag} onChange={e=>setForm({...form, referenceTitle:e.target.value})}  className={`${inputClass}`} placeholder="입력하여 태그 작성 (최대 10자)"/>
            <Button type="button" variant="main" size={{ default: "sm", md: "md", xl: "md" }} className="mt-[24px] xl:mt-[40px]" onClick={handleSubmit} disabled>
                작성 완료 
                </Button>
        </form>
        </div>
        </div>
    )
  }