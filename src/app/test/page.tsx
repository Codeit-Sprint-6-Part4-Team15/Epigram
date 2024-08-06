"use client";

import Button from "@/src/components/commons/Button";
import Dropdown from "@/src/components/commons/Dropdown";
import ConfirmModal from "@/src/components/commons/Modal/ConfirmModal";
import Modal from "@/src/components/commons/Modal/Modal";
import useModal from "@/src/hooks/useModal";
import { useState } from "react";


export default function Page() {
    const [selectedValue, setSelectedValue] = useState("필터: 없음");
    const [isDeleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useModal(false);

    const handleDelete = () => {
        alert(1);
        closeDeleteModal();
    }
    return (
        <div>
            <Dropdown selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
            <button type="button" onClick={openDeleteModal}>모달 열기</button>
            <Modal opened={isDeleteModalOpened}>
                <ConfirmModal onClose={closeDeleteModal} onSubmit={handleDelete} />
            </Modal>
            <Button type="button" size={{default:"md", md:"md", xl:"md-2"}} variant="main">버튼</Button>
        </div>
    )
  }