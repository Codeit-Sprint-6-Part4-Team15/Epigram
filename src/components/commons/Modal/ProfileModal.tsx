import { Writer } from "@/src/type";

interface ProfileModalProps {
  writer: Writer;
}

export default function ProfileModal({ writer }: ProfileModalProps) {
  return (
    <div className="flex min-h-[194px] w-[328px] flex-col items-center justify-center gap-[26px] rounded-[12px] bg-white md:min-h-[216px] md:gap-[36px] xl:min-h-[218px] xl:w-[360px] xl:gap-[40px]">
      <p className="typo-lg-semibold text-black-700 md:typo-xl-semibold xl:typo-2xl-semibold">{message}</p>
      <div className="flex justify-between gap-[16px]"></div>
    </div>
  );
}
