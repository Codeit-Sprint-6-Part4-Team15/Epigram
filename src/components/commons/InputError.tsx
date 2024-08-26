import { PropsWithChildren } from 'react';

interface InputErrorProps extends PropsWithChildren {
  isVisible: boolean;
}

export default function InputError({ children, isVisible }: InputErrorProps) {
  return (
    <p
      className={`typo-sm-medium mt-[2px] min-h-[26px] text-state-error transition-opacity duration-300 ease-in-out lg:typo-lg-regular lg:mt-[4px] lg:min-h-[32px] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </p>
  );
}
