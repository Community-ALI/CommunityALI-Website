import React, {useEffect, useState } from 'react';
import {BASE_BACKEND_URL} from '../config.js'

const UserProfileCircle = (Logout) => {
  const [username, setUsername] = useState('no username associated with token')


  useEffect(() => {
    const fetchData = async () => {
      try {
        var token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-username`,
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
    <div className="user-profile-circle relative">
      <img className="user-profile-image" src={imageUrl} alt={username} onClick={toggleDropdown} />
      <div className={`rounded-lg flex flex-col absolute dropdown-menu bg-ali-darkblue left-[-80px] py-4 
      top-16 transition-opacity duration-300 z-50 w-[165px] ${showDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <a className='transition-colors text-regal-blue flex justify-center items-center hover:bg-[#00468D] px-4 py-3' href="/profile">
          <i className="fa-solid fa-user" style={{ color: '#ffffff' }}></i>
          <p className='px-4 text-white'>Profile</p>
        </a> 
        {/* <button className='flex justify-center items-center hover:bg-[#ecaa1e] px-4' href="enter link here">
          <i className="fa-solid fa-marker" style={{ color: '#ffffff' }}></i>
          <p className='px-4 text-white'>Edit Profile</p>
        </button> */}
        <button onClick={Logout} className=' transition-colors flex justify-center items-center hover:bg-[#00468D] px-4 py-3'>
          <i className="fa-solid fa-right-from-bracket" style={{ color: '#ffffff' }}></i>
          <p
            className='px-4 text-white'
          >Logout</p>
        </button>
      </div>
    </div>
  );
};

export default UserProfileCircle;
