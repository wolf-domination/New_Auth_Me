import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
  modalComponent,  // what to render inside the modal
  itemText,        // text for this <li>
  onItemClick,     // optional callback when clicked (we use this to close the menu)
  onModalClose     // optional callback after modal closes
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (typeof onModalClose === 'function') {
      setOnModalClose(onModalClose);
    }
    setModalContent(modalComponent);
    if (typeof onItemClick === 'function') {
      onItemClick();
    }
  };

  return (
    <li onClick={handleClick} className="modal-menu-item">
      {itemText}
    </li>
  );
}

export default OpenModalMenuItem;
