/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalContent } from "@heroui/react";
import React from "react";

const CustomModal = ({ children, ...props }: any) => {
  return (
    <div>
      <Modal {...props}>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </div>
  );
};

export default CustomModal;
