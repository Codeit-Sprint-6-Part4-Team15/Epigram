import Image from "next/image";
import { PropsWithChildren } from "react";

export default function AuthLayout({children}: PropsWithChildren) {
    return (
        <div className="w-[312px] md:w-[384px] lg:w-[640px] m-auto">
            <Image className="m-auto mb-[60px]" src="/assets/authPage/logo_epigram.svg" width={172} height={48} alt="에피그램 로고"/>
            {children}
        </div>
    );
}
