import React, { useContext } from "react";
import { Button, type ButtonProps } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { ModalContext, ModalProvider } from "~/context/useModal";

interface Props extends ButtonProps {
  ModalComponent: React.ReactNode;
}

const ModalButton: React.FC<Props> = (props) => {
  const { ModalComponent, ...rest } = props;

  const {isOpen, toggleModal} = useContext(ModalContext)

  return (
    <>
      <Button {...rest} onClick={toggleModal} />
      <Modal isOpen={isOpen} onClose={toggleModal}>
        {ModalComponent}
      </Modal>
    </>
  );
};

export const ModalButtonWrapper: React.FC<Props> = (props) =>{
  return <ModalProvider>
    <ModalButton {...props}/>
  </ModalProvider>
}