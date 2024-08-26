import { forwardRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

interface InputProps {
  type: string;
  placeholder: string;
  outlined?: boolean;
  autoComplete?: string;
  hasError?: boolean;
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
      hasError = false,
    }: InputProps & UseFormRegisterReturn,
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div
        className={`flex h-[44px] w-[312px] flex-row items-center rounded-xl border px-[16px] py-0 md:w-[384px] lg:h-[64px] lg:w-[640px] ${
          hasError
            ? 'animate-vibrate border-state-error ring-1 ring-state-error'
            : outlined
              ? 'border-blue-300'
              : 'border-blue-200'
        } ${
          outlined ? 'bg-white' : 'bg-blue-200'
        } transition duration-150 ease-in-out focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500`}
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
          } typo-lg-regular text-black-950 placeholder-blue-400 lg:typo-xl-regular autofill:bg-transparent focus:shadow-none focus:outline-none focus:ring-0`}
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
