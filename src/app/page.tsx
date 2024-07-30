"use client";
import { useState } from "react";
import Modal from "@/src/components/commons/Modal/Modal";
import useModal from "@/src/hooks/useModal";
import ConfirmModal from "@/src/components/commons/Modal/ConfirmModal";

export default function Home() {
  const [isDeleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useModal(false);

  const handleDelete = () => {
    alert(1);
    closeDeleteModal();
  };

  return (
    <>
      <button onClick={openDeleteModal}>버튼</button>
      <Modal opened={isDeleteModalOpened}>
        <ConfirmModal message="댓글을 삭제하시겠어요?" btnText="삭제하기" onClose={closeDeleteModal} onSubmit={handleDelete} />
      </Modal>
    </>
  );
}
