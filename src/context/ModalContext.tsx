import { createContext, useContext, useState, ReactNode } from "react";

const ModalContext = createContext<{ openModal: () => void; closeModal: () => void; isOpen: boolean }>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false) }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
