import { ReactNode } from 'react';

import IcoError from '@/public/assets/ic_error.svg';
import Image from 'next/image';

export default function LoadingError({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-[12px]">
      <Image src={IcoError} width={40} height={40} alt="아이콘" />
      <p className="text-center text-gray-700">{children}</p>
    </div>
  );
}
