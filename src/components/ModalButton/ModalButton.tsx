import React, { useState } from "react";
import { Button, type ButtonProps } from "../Button/Button";
import { Modal } from "../Modal/Modal";

interface Props extends ButtonProps {
  ModalComponent: React.ReactNode;
}

export const ModalButton: React.FC<Props> = (props) => {
  const { ModalComponent, ...rest } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button {...rest} onClick={toggleModal} />
      <Modal isOpen={isOpen} onClose={toggleModal}>
        {ModalComponent}
      </Modal>
    </>
  );
};
