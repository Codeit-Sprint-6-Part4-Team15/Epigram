import Image from "next/image";
import IcoNotice from "@/public/assets/ic_notice.svg";
import Button from "../Button";

interface ConfirmModalProps {
  onClose: () => void;
  onSubmit: () => void;
}

export default function ConfirmModal({ onClose, onSubmit }: ConfirmModalProps) {
  return (
    <div className="flex min-h-[238px] w-[320px] flex-col items-center justify-center rounded-[12px] bg-white md:min-h-[282px] md:w-[372px] xl:min-h-[332px] xl:w-[452px] gap-[24px] md:gap-[36px] xl:gap-[40px] py-[24px] md:py-[32px] xl:py-[40px] px-[16px] md:px-[38px]">
      <div className="flex flex-col items-center">
        <figure className="relative w-[44px] h-[44px] xl:w-[56px] xl:h-[56px] mb-[16px] md:mb-[24px]">
          <Image src={IcoNotice} fill alt="아이콘"/>
        </figure>
        <div className="flex flex-col gap-[8px] text-center">
          <p className="typo-lg-semibold text-black-700 md:typo-xl-semibold xl:typo-2xl-semibold">댓글을 삭제하시겠어요?</p>
          <p className="typo-md-regular text-gray-400 md:typo-lg-regular xl:typo-2lg-regular">댓글은 삭제 후 복구할 수 없어요.</p>
        </div>
      </div>
      <div className="w-full flex justify-between gap-[16px]">
        <Button type="button" onClick={onClose} style={{background:"#ECEFF4", color:"#2B2B2B"}} size={{default:"md", md:"md", xl:"md-2"}} variant="main">취소</Button>
        <Button type="button" onClick={onSubmit} style={{background:"#2D394E"}} size={{default:"md", md:"md", xl:"md-2"}} variant="main">삭제하기</Button>
      </div>
    </div>
  );
}
