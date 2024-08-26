import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ opened, onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const root = document.getElementById('modal-root');
    setModalRoot(root);
  }, []);

  if (!modalRoot) {
    return null; // modalRoot가 준비되지 않은 경우 아무것도 렌더링하지 않음
  }

  if (opened) {
    return createPortal(
      <div className="fixed top-0 z-10 flex h-lvh w-full items-center justify-center">
        <div className="h-full w-full bg-dim">
          <button
            type="button"
            className="h-full w-full opacity-0"
            onClick={handleClose}
          >
            모달 닫기
          </button>
        </div>
        <dialog open className="absolute bg-transparent">
          {children}
        </dialog>
      </div>,
      modalRoot,
    );
  }

  return null; // isOpen이 false일 때는 모달을 렌더링하지 않음
}
