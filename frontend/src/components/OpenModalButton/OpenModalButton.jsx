import { useModal } from '../../context/Modal';

function OpenModalButton({
  
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const handleClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick();
    setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  const style = {
  display: 'block',
  padding: '12px 5px',
  fontSize:"14px",
  textDecoration: 'none',
  color: '#333',
  fontWeight: 600,
  transition: 'color 0.2s ease',
  backgroundColor:"white",
  boxShadow: 'none',
  border: 'none',
  cursor:"pointer",
};


  return <button style={style} onClick={handleClick}>{buttonText}</button>;
}

export default OpenModalButton;
