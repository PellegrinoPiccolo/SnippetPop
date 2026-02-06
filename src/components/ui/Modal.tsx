import React from 'react'
import { ModalContext } from '../../context/ModalContext';

const Modal = ({content}: {content: React.ReactNode}) => {

    const {closeModal} = React.useContext(ModalContext);

  return (
    <div>{content}</div>
  )
}

export default Modal