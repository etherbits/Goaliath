import { type PropsWithChildren, createContext, useState } from "react";

interface ModalContext {
  isOpen: boolean;
  toggleModal: () => void;
}

export const ModalContext = createContext<ModalContext>({
  isOpen: false,
  toggleModal: () => void {},
});

export const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider value={{ isOpen, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};
