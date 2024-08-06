import { useRef, useState } from "react";
import Image from 'next/image';
import visibilityIcon from '../../../public/visibility.svg';
import visibilityOnIcon from '../../../public/visibility_on.svg';

interface InputProps {
    type: string;
    placeholder: string;
    outlined?: boolean;
    errorMessage?: string;
}

function Input({ type, placeholder, outlined, errorMessage }: InputProps) {
    const [isInvalid, setIsInvalid] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const inputRef = useRef(null);
    return (
        <div className="flex flex-col">
            <div className={`w-[312px] h-[44px] md:w-[384px] lg:w-[640px] lg:h-[64px] bg-[#ffffff] rounded-xl flex flex-row border px-[16px] py-0 items-center ${isInvalid ? 'border-state-error' : ''}`}>
                <input ref={inputRef} className="w-full focus:outline-none typo-lg-regular lg:typo-xl-regualr placeholder:text-blue-400 text-black-950" type={type === 'password' ? isPasswordVisible ? 'text' : 'password' : type} placeholder={placeholder} />
                { type === 'password' && <Image src={isPasswordVisible ? visibilityIcon : visibilityOnIcon} alt={isPasswordVisible ? 'hide password' : 'show password'} height={24} width={24} onClick={() => {
                    setIsPasswordVisible(!isPasswordVisible);
                }}/>}
            </div>
            {isInvalid && 
                <p className="text-state-error typo-sm-medium lg:typo-lg-regular">샘플 에러메시지</p>
            }
        </div>
    );
}

export default Input;