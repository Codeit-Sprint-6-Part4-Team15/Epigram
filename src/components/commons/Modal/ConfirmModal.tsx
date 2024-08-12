import IcoNotice from '@/public/assets/ic_notice.svg';
import Image from 'next/image';
import Button from '../Button';

interface ConfirmModalProps {
  onClose: () => void;
  onSubmit: () => void;
  type: '댓글' | '게시물'; // '댓글' 또는 '게시물'을 받을 수 있는 타입 지정
}

export default function ConfirmModal({ onClose, onSubmit, type }: ConfirmModalProps) {
  const message = `${type}을 삭제하시겠어요?`; // 댓글 또는 게시물에 맞는 메시지 생성
  const subMessage = `${type}은 삭제 후 복구할 수 없어요.`; // 서브 메시지

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="flex min-h-[238px] w-[320px] flex-col items-center justify-center gap-[24px] rounded-[12px] bg-white px-[16px] py-[24px] md:min-h-[282px] md:w-[372px] md:gap-[36px] md:px-[38px] md:py-[32px] xl:min-h-[332px] xl:w-[452px] xl:gap-[40px] xl:py-[40px]">
      <div className="flex flex-col items-center">
        <figure className="relative mb-[16px] h-[44px] w-[44px] md:mb-[24px] xl:h-[56px] xl:w-[56px]">
          <Image src={IcoNotice} fill alt="아이콘" />
        </figure>
        <div className="flex flex-col gap-[8px] text-center">
          <p className="typo-lg-semibold text-black-700 md:typo-xl-semibold xl:typo-2xl-semibold">
            {message} {/* 조건에 따라 메시지 출력 */}
          </p>
          <p className="typo-md-regular text-gray-400 md:typo-lg-regular xl:typo-2lg-regular">
            {subMessage} {/* 조건에 따라 서브 메시지 출력 */}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between gap-[16px]">
        <Button
          type="button"
          onClick={onClose}
          style={{ background: '#ECEFF4', color: '#2B2B2B' }}
          size={{ default: 'md', md: 'md', xl: 'md-2' }}
          variant="main"
        >
          취소
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          style={{ background: '#2D394E' }}
          size={{ default: 'md', md: 'md', xl: 'md-2' }}
          variant="main"
        >
          삭제하기
        </Button>
      </div>
    </div>
    </div>
  );
}
