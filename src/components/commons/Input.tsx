import { forwardRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

interface InputProps {
  type: string;
  placeholder: string;
  outlined?: boolean;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps & UseFormRegisterReturn>(
  (
    {
      placeholder,
      outlined = false,
      onChange,
      onBlur,
      name,
      autoComplete,
    }: InputProps & UseFormRegisterReturn,
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div
        className={`flex h-[44px] w-[312px] flex-row items-center rounded-xl px-[16px] py-0 md:w-[384px] lg:h-[64px] lg:w-[640px] ${outlined ? 'border border-blue-300 bg-white' : 'border border-blue-200 bg-blue-200'} transition duration-150 ease-in-out focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 has-[input:invalid]:border-state-error`}
      >
        <input
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          onInvalid={(e) => e.preventDefault()}
          name={name}
          autoComplete={autoComplete}
          className={`w-full ${
            outlined
              ? 'bg-white autofill:bg-white autofill:shadow-[inset_0_0_0px_1000px_white] focus:outline-none'
              : 'bg-blue-200 autofill:bg-blue-200 autofill:shadow-[inset_0_0_0px_1000px_#ECEFF4]'
          } lg:typo-xl-regualr typo-lg-regular text-black-950 placeholder:text-blue-400 autofill:bg-transparent focus:shadow-none focus:outline-none focus:ring-0`}
          type={
            name.includes('password')
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : name
          }
          placeholder={placeholder}
          //자동입력시 배경색상 맞춤
          style={{
            WebkitBoxShadow: outlined
              ? '0 0 0px 1000px white inset'
              : '0 0 0px 1000px #ECEFF4 inset',
            WebkitTextFillColor: 'black',
          }}
        />
        {name.includes('password') && (
          <Image
            src={isPasswordVisible ? '/visibility.svg' : '/visibility_on.svg'}
            alt={isPasswordVisible ? 'hide password' : 'show password'}
            height={24}
            width={24}
            onClick={() => {
              setIsPasswordVisible(!isPasswordVisible);
            }}
          />
        )}
      </div>
    );
  },
);

export default Input;
