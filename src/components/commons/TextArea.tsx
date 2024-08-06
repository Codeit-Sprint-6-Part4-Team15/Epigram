"use client";

import React, { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import '@/src/styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    placeholder?: string;
    variant?: "outlined" | "solid";
}

export default function TextArea({ placeholder, variant = "outlined", ...props }: TextAreaProps) {
  const [value, setValue] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (variant === "solid" && e.target.value.length > 500) {
      setIsOverLimit(true);
    } else {
      setIsOverLimit(false);
    }
  };
    
    useEffect(() => {
    if (variant === "outlined" && textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
    }, [value]);

    let widthClass = "w-full";
    let heightClass = "min-h-[80px] lg:min-h-[104px]";
    let backgroundColor = "bg-transparent";
    let borderColor = isOverLimit ? "border-red-500" : "border-line-100";
    let borderRadius = "rounded-[8px]";
    let paddingClass = "py-[12px] px-[16px]";
    let textClass = "typo-lg-regular"
    let maxLength = 100;
    let defaultPlaceholder = "100자 이내로 입력해 주세요.";

    if (variant === "solid") {
      heightClass = "min-h-[132px] lg:min-h-[148px]";
      backgroundColor = "bg-white";
      borderColor = "border-transparent";
      borderRadius = "rounded-[12px]"
      paddingClass = "py-[10px] px-[16px]"
      maxLength = 500;
      defaultPlaceholder = "500자 이내로 입력해 주세요.";
    }
    

  return (
    <div>
      <textarea
        ref={textAreaRef}
        className={`border resize-none ${paddingClass} ${widthClass} ${heightClass} ${backgroundColor} ${borderColor} ${borderRadius} focus:border-black-600 focus:outline-none ${textClass} lg:typo-xl-regular ${
          variant === "solid" ? "overflow-y-auto" : "overflow-hidden"
        }`}
        maxLength={maxLength}
        value={value}
        placeholder={placeholder || defaultPlaceholder}
        onChange={handleChange}
        spellCheck={false}
        autoCorrect="off"
        autoComplete="off"
        {...props}
      />
      {isOverLimit && (
        <p className="text-red-500 typo-sm-medium mt-1 text-right">
          500자 이내로 입력해주세요.
        </p>
      )}
    </div>
  );
};