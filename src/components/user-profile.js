import React, { useRef, Component, useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import LoginPopup from './LoginPopup';
import '../../public/stylesheets/style.css'

const UserProfileCircle = (Logout) => {
  const [username, setUsername] = useState('no username associated with token')


  useEffect(() => {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem('token');
        if (token) {
          console.log('sending request');
          const response = await fetch('http://localhost:3000/userdata/get-username',
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => response.json())
            .then(data => {
              setUsername(data.tokenUsername);
            })
        }
        else {
          console.log('no token found')
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();
  }, []);

  const imageUrl = "photos-optimized/user-pic.png";

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  function Logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

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
