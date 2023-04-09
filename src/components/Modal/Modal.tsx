import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { PortalContext } from "~/pages/_app";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ isOpen, children, onClose }) => {
  const portals = useContext(PortalContext);
  const rootPortal = portals?.root?.current;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;

    onClose();
  };

  return rootPortal
    ? createPortal(
        <div
          className={`absolute left-0 top-0 flex min-h-[100vh] min-w-[100vw] 
        items-center justify-center bg-neutral-900 ${
          isOpen
            ? "pointer-events-auto opacity-95"
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
