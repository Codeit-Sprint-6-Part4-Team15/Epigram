"use client";

import { getEpigramById, updateEpigram } from "@/src/app/api/epigram";
import Wrapper from "@/src/components/commons/animation";
import Button from "@/src/components/commons/Button";
import RadioGroup from "@/src/components/commons/RadioGroup";
import TextArea from "@/src/components/commons/TextArea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

let errorClass = "mt-[8px] text-state-error typo-sm-medium xl:typo-lg-regual text-right";
let inputClass = `typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] border-blue-300 pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`;

interface FormValue {
  tags: string[];
  referenceUrl: string;
  referenceTitle: string;
  author: string;
  content: string;
}

export default function Edit({ params }: { params: { id: number } }) {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const id = params.id;
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValue>({ mode: "onBlur" });

  let borderColor = errors.author ? "border-red-500" : "border-blue-300";

  const [selectedAuthor, setSelectedAuthor] = useState<string>("directInput"); // 기본값을 직접 입력으로 설정
  const [authorInput, setAuthorInput] = useState<string>(""); // 직접 입력할 때의 텍스트 값을 관리
  const handleAuthorChange = (value: string) => {
    setSelectedAuthor(value);
    if (value !== "directInput") {
      setValue("author", value === "unknown" ? "알 수 없음" : "본인");
    } else {
      setValue("author", authorInput); // "직접 입력"일 경우의 값 설정
    }
  };

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorInput(e.target.value);
    if (selectedAuthor === "directInput") {
      setValue("author", e.target.value); // "직접 입력"이 선택된 경우에만 값 업데이트
    }
  };


  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const trimmedTag = tagInput.trim();
    if (
      e.key === "Enter" &&
      trimmedTag.length > 0 &&
      trimmedTag.length <= 10 &&
      tags.length < 3
    ) {
      const newTag = { id: Date.now(), name: trimmedTag };
      setTags([...tags, newTag]);
      setTagInput("");
      e.preventDefault();
    } else if (tags.length >= 3) {
      toast.info("태그는 3개까지 입력 가능합니다");
    }
  };

  const handleTagClick = (tagId: number) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const fetchEpigrams = async () => {
    try {
      const data = await getEpigramById(id);
      if (data) {
        setSelectedAuthor(data.author === "알 수 없음" ? "unknown" : data.author === "본인" ? "myself" : "directInput");
        setAuthorInput(data.author === "알 수 없음" || data.author === "본인" ? "" : data.author);
        setValue("author", data.author);
        setValue("content", data.content);
        setValue("referenceTitle", data.referenceTitle);
        setValue("referenceUrl", data.referenceUrl);
        setTags(data.tags);
      }
    } catch (error) {
      console.error("에피그램을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchEpigrams();
  }, []);

  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    try {
      // 태그 이름만 추출하여 문자열 배열로 변환
      data.tags = tags.map((tag) => tag.name);
      await updateEpigram(id, data);
      router.push(`/epigrams/${id}`);
    } catch (error) {
      console.error("에피그램 수정 실패:", error);
      toast.error("에피그램 수정에 실패했습니다");
    }
  };

  const onErrorHandler = () => {
    if (errors.content) {
      toast.error("내용을 입력해주세요.");
    }
    if (errors.author) {
      toast.error("저자를 입력해주세요.");
    }
  };

  return (
    <Wrapper>
    <div className="flex justify-center h-screen">
      <div className="flex flex-col h-screen ml-[24px] mr-[24px] ">
        <h1 className="typo-lg-semibold mt-[24px] md:typo-xl-semibold xl:typo-2xl-semibold">
          에피그램 수정
        </h1>
        <form
          onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
          className="flex flex-col mt-[24px]"
        >
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
            variant="outlined"
            placeholder="500자 이내로 입력해주세요"
            register={register("content", {
              required: true,
              maxLength: 500,
            })}
            error={!!errors.content}
            maxLengthError={
              errors.content && errors.content.type === "maxLength"
            }
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
          <RadioGroup
            name="authorRadio"
            size="sm"
            content={[
              { value: "directInput", label: "직접 입력" },
              { value: "unknown", label: "알 수 없음" },
              { value: "myself", label: "본인" },
            ]}
            selectedValue={selectedAuthor}
            onChange={handleAuthorChange}
          />
          {selectedAuthor === "directInput" && (
            <input
              {...register("author", { required: true })}
              onChange={handleAuthorInputChange}
              placeholder="저자 이름 입력"
              className={`typo-lg-regualr xl:typo-xl-regualr focus:border-black-600 focus:outline-none border-[1px] ${borderColor} pl-[16px] w-[312px] md:w-[384px] xl:w-[640px] h-[44px] xl:h-[64px] text-black-950 rounded-[12px] mt-[8px] md:mt-[12px] xl:mt-[16px]`}
            />
          )}
          {errors.author && errors.author.type === "required" && (
            <div className={errorClass}>저자를 입력해주세요.</div>
          )}
          <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
            출처
          </label>
          <input
            {...register("referenceTitle")}
            name="referenceTitle"
            className={`${inputClass}`}
            placeholder="출처 제목 입력"
          />
          <input
            {...register("referenceUrl")}
            name="referenceUrl"
            className={`${inputClass}`}
            placeholder="URL (ex. https://www.website.com)"
          />
          <label className="flex flex-col typo-md-semibold md:typo-lg-semibold xl:typo-xl-semibold mt-[40px] xl:mb-[24px] xl:mt-[54px]">
            태그
          </label>
          <input
            {...register("tags", { required: false })}
            name="tag"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleKeyDown}
            className={`${inputClass}`}
            placeholder="입력하여 태그 작성 (최대 10자)"
          />
          <div className="mt-[8px]">
            {tags.map((tag) => (
              <span
                key={tag.id}
                onClick={() => handleTagClick(tag.id)}
                className="inline-block bg-blue-200 text-blue-800 px-[8px] py-[4px] rounded-[8px] mr-[4px] mt-[4px] transition transform hover:scale-105"
              >
                #{tag.name}
              </span>
            ))}
          </div>
          <Button
            type="button"
            onClick={handleSubmit(onSubmitHandler, onErrorHandler)}
            variant="main"
            size={{ default: "sm", md: "md", xl: "md" }}
            className="mt-[24px] xl:mt-[40px] mb-[100px]"
          >
            작성 완료
          </Button>
        </form>
      </div>
    </div>
    </Wrapper>
  );
}
