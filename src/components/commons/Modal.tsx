import { ReactNode } from "react";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ opened, onClose, children }: ModalProps) {
  if (opened) {
    return (
      <div className="fixed top-0 flex h-lvh w-full items-center justify-center">
        <div className="bg-dim h-full w-full"></div>
        <dialog open className="absolute bg-transparent">
          {children}
        </dialog>
      </div>
    );
  }
}
