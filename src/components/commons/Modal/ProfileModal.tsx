import IcoClose from '@/public/assets/ic_close.svg';
import IcoUser from '@/public/assets/ic_user.svg';
import { Writer } from '@/src/types/comments';
import Image from 'next/image';

interface ProfileModalProps {
  writer: Writer;
  onClose: () => void;
}

export default function ProfileModal({ writer, onClose }: ProfileModalProps) {
  return (
    <div className="flex min-h-[166px] w-[328px] flex-col items-center rounded-[12px] bg-[#F5F7FA] px-[40px] pb-[30px] pt-[24px] xl:min-h-[188px] xl:w-[360px]">
      <div className="flex w-full justify-end">
        <button type="button" onClick={onClose}>
          <Image src={IcoClose} width={20} height={20} alt="닫기" />
        </button>
      </div>
      <div className="flex flex-col items-center gap-[24px]">
        <figure className="relative h-[48px] w-[48px] overflow-hidden rounded-full border border-blue-300 bg-white">
          <Image src={writer.image ?? IcoUser} fill alt="프로필" />
        </figure>
        <strong className="typo-lg-semibold text-black-400 xl:typo-xl-semibold">
          {writer.nickname}
        </strong>
      </div>
    </div>
  );
}
