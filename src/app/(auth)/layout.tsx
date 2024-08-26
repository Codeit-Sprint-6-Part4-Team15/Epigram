import { PropsWithChildren } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto mt-[60px] flex w-[312px] flex-col items-center md:w-[384px] lg:mt-[100px] lg:w-[640px]">
      <Link href="/">
        <div className="w-[170px] lg:w-[280px]">
          <Image
            className="m-auto mb-[40px] h-auto w-full lg:mb-[60px]"
            src="/assets/logo.svg"
            width={170}
            height={102}
            priority={true}
            alt="에피그램 로고"
          />
        </div>
      </Link>
      {children}
    </div>
  );
}
