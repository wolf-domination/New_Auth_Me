import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileOpen((prevState) => !prevState);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="profile-container" onClick={handleProfileToggle}>
        <ProfileButton user={sessionUser} />
        {isProfileOpen && (
          <div className="profile-dropdown">
            <ul>
              <li><NavLink to="/profile">Profile</NavLink></li>
              <li><NavLink to="/logout">Logout</NavLink></li>
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </>
    );
  }

  return (
    <nav className="navigation">

      <ul></ul>

      <ul className="nav-links">
        <li><NavLink to="/" activeClassName="active" >Home</NavLink></li>
        <li><NavLink to="/exp" activeClassName="active" >Experiences</NavLink></li>
        {/* <li><NavLink to="/" activeClassName="active">Homes</NavLink></li> */}
        
      </ul>

      <ul className="nav-links">
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
