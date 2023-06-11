import React, { useRef, Component, useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';

const UserProfileCircle = (Logout) => {

  const username = "JohnDoe";
  const imageUrl = "photos-optimized/user-pic.png";

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="user-profile-circle">
      <img className="user-profile-image" src={imageUrl} alt={username} onClick={toggleDropdown} />
      {showDropdown && (
        <div className="dropdown-menu">
          <a
            className="navigation-button navigation-text"
            onClick={Logout}
            id="navigation-login"
          >Logout</a>
        </div>
      )}
    </div>
  );
};

export default UserProfileCircle;
