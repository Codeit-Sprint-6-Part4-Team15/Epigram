import { forwardRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import Image from 'next/image';

interface InputProps {
  type: string;
  placeholder: string;
  outlined?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps & UseFormRegisterReturn>(
  (
    {
      placeholder,
      outlined = false,
      onChange,
      onBlur,
      name,
    }: InputProps & UseFormRegisterReturn,
    ref,
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    return (
      <div
        className={`flex h-[44px] w-[312px] flex-row items-center rounded-xl px-[16px] py-0 md:w-[384px] lg:h-[64px] lg:w-[640px] ${outlined ? 'border border-blue-300 bg-white' : 'border border-blue-200 bg-blue-200'} has-[input:invalid]:border-state-error`}
      >
        <input
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          onInvalid={(e) => e.preventDefault()}
          name={name}
          className={`w-full ${outlined ? 'bg-white focus:outline-none' : 'bg-blue-200'} lg:typo-xl-regualr typo-lg-regular text-black-950 placeholder:text-blue-400`}
          type={
            name.includes('password')
              ? isPasswordVisible
                ? 'text'
                : 'password'
              : name
          }
          placeholder={placeholder}
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
