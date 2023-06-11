import React, { useRef, Component, useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';
import NavBar from './NavBar';

const UserProfileCircle = ({ username, imageUrl }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    }

  return (
    <div className="user-profile-circle">
      <img className="user-profile-image" src={imageUrl} alt={username} onClick={toggleDropdown} />
      {showDropdown && (
        <div className="dropdown-menu">
            <LoginButton/>
        </div>
      )}
    </div>
  );
};

export default UserProfileCircle;
