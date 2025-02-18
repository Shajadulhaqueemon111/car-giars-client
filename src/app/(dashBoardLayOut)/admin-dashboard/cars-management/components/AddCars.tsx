"use client";
import CustomModal from "@/app/(dashBoardLayOut)/(userDashboard)/components/modal/customModal";
import { Button, ModalHeader, useDisclosure } from "@heroui/react";

import React from "react";
import AddCarForm from "./AddCarFrom";

const AddCars = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  return (
    <div className="my-3">
      <CustomModal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalHeader className="p-4">Add A Car</ModalHeader>
        <AddCarForm onClose={onClose} />
      </CustomModal>

      <Button className="w-full" size="md" variant="faded" onPress={onOpen}>
        Add Car
      </Button>
    </div>
  );
};

export default AddCars;
