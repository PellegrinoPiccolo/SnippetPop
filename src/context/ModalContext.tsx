import React from 'react';
import Modal from '../components/ui/Modal';

export const ModalContext = React.createContext<{
    isOpen: boolean;
    openModal: (content: React.ReactNode) => void;
    closeModal: () => void;
}>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {},
});

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [modalContent, setModalContent] = React.useState<React.ReactNode>(null);

    const openModal = (content: React.ReactNode) => {
        setModalContent(content);
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
        setModalContent(null);
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
            {children}
            {isOpen && <Modal content={modalContent} />}
        </ModalContext.Provider>
    );
}