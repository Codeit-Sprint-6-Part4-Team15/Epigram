import { PropsWithChildren } from 'react';

import Image from 'next/image';
import Link from 'next/link';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="m-auto w-[312px] md:w-[384px] lg:w-[640px]">
      <Link href="/">
        <Image
          className="m-auto mb-[60px] mt-[100px]"
          src="/assets/authPage/logo_epigram.svg"
          width={172}
          height={48}
          alt="에피그램 로고"
        />
      </Link>
      {children}
    </div>
  );
}
