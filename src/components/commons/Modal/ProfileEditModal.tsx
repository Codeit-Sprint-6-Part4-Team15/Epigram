import { useState } from 'react';

import IcoClose from '@/public/assets/ic_close.svg';
import { User } from '@/src/types/auth';
import Image from 'next/image';

import { patchUserInfo, postImage } from '@/src/app/api/user';

import Button from '../Button';
import FileInput from '../FileInput';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdate: () => void;
}

export default function ProfileEditModal({
  user,
  onClose,
  onUpdate,
}: ProfileModalProps) {
  const [fileValue, setFileValue] = useState<File | null>(null);

  const handlePatch = async () => {
    if (fileValue) {
      const formData = new FormData();
      formData.append('image', fileValue);
      const imageUrl = await postImage(formData);

      if (imageUrl) {
        await patchUserInfo(imageUrl, user.nickname);
        onUpdate();
        onClose();
      }
    }
  };

  return (
    <div className="flex min-h-[166px] w-[328px] flex-col items-center gap-[20px] rounded-[12px] bg-[#F5F7FA] px-[40px] pb-[30px] pt-[24px] xl:min-h-[188px] xl:w-[360px]">
      <div className="flex w-full justify-end">
        <button type="button" onClick={onClose}>
          <Image src={IcoClose} width={20} height={20} alt="닫기" />
        </button>
      </div>
      <div className="flex w-full">
        <FileInput value={fileValue} onChange={setFileValue} />
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
          onClick={handlePatch}
          style={{ background: '#2D394E' }}
          size={{ default: 'md', md: 'md', xl: 'md-2' }}
          variant="main"
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
