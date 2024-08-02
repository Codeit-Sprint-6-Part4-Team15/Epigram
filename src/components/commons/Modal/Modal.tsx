import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  opened: boolean;
  children: ReactNode;
}

export default function Modal({ opened, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    const root = document.getElementById('modal-root');
    setModalRoot(root);
  }, []);

  if (!modalRoot) {
    return null; // modalRoot가 준비되지 않은 경우 아무것도 렌더링하지 않음
  }

  if (opened) {
    return (
      <>
      { createPortal(
      <div className="fixed z-10 top-0 flex h-lvh w-full items-center justify-center">
        <div className="bg-dim h-full w-full"></div>
        <dialog open className="absolute bg-transparent">
          {children}
        </dialog>
      </div>
      , modalRoot)}
      </>
    );
  }
}
