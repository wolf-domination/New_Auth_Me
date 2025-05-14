import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaAlignJustify ,FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // Toggle the dropdown menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  // Close the dropdown menu when clicked outside
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Handle logout
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false); // Close the menu after logout
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const style = {
  display: 'block',
  padding: '12px 15px',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 600,
  transition: 'color 0.2s ease',
  backgroundColor:"white",
  boxShadow: 'none',
  border: 'none',
  cursor:"pointer",
};

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '9999px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    boxShadow: 'none',
    gap: '8px',
    cursor: 'pointer'
  };

  const iconContainerStyle = {
    backgroundColor: '#666',
    borderRadius: '50%',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '32px',
    height: '32px'
  };

  return (
    <>
    <button style={buttonStyle} onClick={toggleMenu}>
      <FaAlignJustify  size={16} />
      <div style={iconContainerStyle}>
        <FaUserCircle size={16} />
      </div>
    </button>
      
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <li>{user.email}</li>
            <li>
              <button style={style} onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                onButtonClick={() => setShowMenu(false)} // Close the menu when the modal is triggered
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                onButtonClick={() => setShowMenu(false)} // Close the menu when the modal is triggered
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
