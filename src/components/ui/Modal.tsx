import React from 'react'
import { ModalContext } from '../../context/ModalContext';

const Modal = ({content}: {content: React.ReactNode}) => {

    const {closeModal} = React.useContext(ModalContext);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
        <div className="bg-[#0A0A0A] rounded-lg w-full max-w-lg border border-gray-400/20 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {content}
        </div>
    </div>
  )
}

export default Modal