'use client';

import React, {
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import '@/src/styles.css';
import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  variant?: 'outlined' | 'solid';
  register?: UseFormRegisterReturn;
  error?: boolean;
  maxLengthError?: boolean;
}

export default function TextArea({
  placeholder,
  variant = 'outlined',
  register,
  error,
  maxLengthError,
  ...props
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {};

  useEffect(() => {
    if (variant === 'outlined' && textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [props.value]);

  let widthClass = 'w-full';
  let heightClass = 'min-h-[80px] lg:min-h-[104px]';
  let backgroundColor = 'bg-transparent';
  let borderColor = error ? 'border-red-500' : 'border-blue-300';
  let borderRadius = 'rounded-[8px]';
  let paddingClass = 'py-[12px] px-[16px]';
  let textClass = 'typo-lg-regualr';
  let maxLength = 100;
  let defaultPlaceholder = '100자 이내로 입력해 주세요.';

  if (variant === 'solid') {
    heightClass = 'min-h-[132px] lg:min-h-[148px]';
    backgroundColor = 'bg-white';
    borderColor = 'border-transparent';
    borderRadius = 'rounded-[12px]';
    paddingClass = 'py-[10px] px-[16px]';
    maxLength = 500;
    defaultPlaceholder = '500자 이내로 입력해 주세요.';
  }

  return (
    <div>
      <textarea
        ref={textAreaRef}
        className={`resize-none border ${paddingClass} ${widthClass} ${heightClass} ${backgroundColor} ${borderColor} ${borderRadius} focus:border-black-600 focus:outline-none ${textClass} lg:typo-xl-regular ${
          variant === 'solid' ? 'overflow-y-auto' : 'overflow-hidden'
        }`}
        maxLength={maxLength}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(e) => {
          handleChange(e);
          if (register) register.onChange(e); // register의 onChange를 호출하여 react-hook-form의 상태를 업데이트
        }}
        spellCheck={false}
        autoCorrect="off"
        autoComplete="off"
        {...props}
        {...register} // register 속성 추가
      />
      {maxLengthError && (
        <p className="typo-sm-medium mt-1 text-right text-red-500">
          500자 이내로 입력해주세요.
        </p>
      )}
    </div>
  );
}
