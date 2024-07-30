interface ConfirmModalProps {
  message: string;
  btnText: string;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ConfirmModal({ message, btnText, onClose, onSubmit }: ConfirmModalProps) {
  return (
    <div className="flex min-h-[158px] w-[312px] flex-col items-center justify-center gap-[26px] rounded-[12px] bg-white md:min-h-[216px] md:w-[384px] md:gap-[36px] xl:min-h-[224px] xl:w-[400px] xl:gap-[40px]">
      <p className="typo-lg-semibold text-black-700 md:typo-xl-semibold xl:typo-2xl-semibold">{message}</p>
      <div className="flex justify-between gap-[16px]">
        <button type="button" onClick={onClose} className="typo-lg-regualr h-[48px] w-[112px] rounded-[12px] bg-blue-200 text-black-700 xl:typo-xl-regualr xl:h-[56px] xl:w-[136px]">
          취소
        </button>
        <button type="button" onClick={onSubmit} className="typo-lg-regualr h-[48px] w-[112px] rounded-[12px] bg-state-error text-white xl:typo-xl-regualr xl:h-[56px] xl:w-[136px]">
          {btnText}
        </button>
      </div>
    </div>
  );
}
