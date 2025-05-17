import React from 'react'
import { useModal } from '../../context/Modal'

export default function OpenModalButton({ modalComponent, buttonText, onButtonClick, onModalClose }) {
  const { setModalContent, setOnModalClose } = useModal()

  const handleClick = () => {
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose)
    setModalContent(modalComponent)
    if (typeof onButtonClick === 'function') onButtonClick()
  }

  return <button onClick={handleClick}>{buttonText}</button>
}