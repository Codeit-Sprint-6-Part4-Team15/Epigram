"use client";
import { useState } from "react";
import Modal from "@/src/components/commons/Modal/Modal";
import useModal from "@/src/hooks/useModal";
import ConfirmModal from "@/src/components/commons/Modal/ConfirmModal";
import ProfileModal from "@/src/components/commons/Modal/ProfileModal";

// FIX: API 연결 후 삭제
const writer = {
  nickname: "지킬과 하이드",
  image: null,
  id: 1,
};

export default function Home() {
  const [isDeleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useModal(false);
  const [isProfileModalOpened, { open: openProfileModal, close: closeProfileModal }] = useModal(false);

  const handleDelete = () => {
    alert(1);
    closeDeleteModal();
  };

  return (
    <>
      <div>
        <button onClick={openDeleteModal}>삭제 모달 열기</button>
      </div>
      <div>
        <button onClick={openProfileModal}>프로필 모달 열기</button>
      </div>

      <Modal opened={isDeleteModalOpened}>
        <ConfirmModal message="댓글을 삭제하시겠어요?" btnText="삭제하기" onClose={closeDeleteModal} onSubmit={handleDelete} />
      </Modal>
      <Modal opened={isProfileModalOpened}>
        <ProfileModal writer={writer} onClose={closeProfileModal} />
      </Modal>
    </>
  );
}
