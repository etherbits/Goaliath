import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { PortalContext } from "~/pages/_app";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ isOpen, children, onClose }) => {
  const portals = useContext(PortalContext);
  const rootPortal = portals?.root?.current;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    onClose();
  };

  return rootPortal
    ? createPortal(
      <div
        className={`fixed left-0 top-0 flex h-[100%] w-[100%]
        items-center justify-center bg-neutral-950 bg-opacity-90 backdrop-blur-sm ${isOpen
            ? "pointer-events-auto opacity-1"
            : "pointer-events-none opacity-0"
          }`}
        onClick={handleOverlayClick}
      >
        {children}
      </div>,
      rootPortal
    )
    : null;
};

export default Modal;
