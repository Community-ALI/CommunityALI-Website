import React, { useRef, useEffect, useState } from 'react';
import '../../../public/stylesheets/style.css';
import NavBar from '../../components/NavBar';
import './profile.css';
import Footer from "../../components/Footer";
import { BASE_BACKEND_URL } from '../../config';
import ProfilePicturePopup from './profilePicturePopup';
import { Buffer } from 'buffer';
function Profile() {
  const [account, setAccount] = useState({
    username: 'loading...',
    email: 'loading...',
    role: 'loading...',
    imageUrl: 'photos-optimized/user-pic.png'
  });
  const [services, setServices] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [buttonText, setButtonText] = useState('Edit Information');
  const [isShowingProfilePicturePopup, setIsShowingProfilePicturePopup] = useState(false);
  const nameRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-user-services`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setServices(data.dataServices);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-user-applications`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setApplications(data.dataApplications);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-account`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          console.log(data.dataAccount[0]);
          var imageUrl;
          try{
            const buffer = Buffer.from(data.dataAccount[0].profileImage.data);
            const base64 = buffer.toString('base64');
            imageUrl = `data:image/png;base64,${base64}`;
          }
          catch(err){
            console.log('no profile image, using default');
            imageUrl = 'photos-optimized/user-pic.png';
          }
          await setAccount(
            {
            username: data.dataAccount[0].username,
            email: data.dataAccount[0].email,
            role: '',
            imageUrl: imageUrl
          });
          const loaderWrapper = document.querySelector('.loader-wrapper');
          loaderWrapper.style.transition = 'opacity 0.5s';
          loaderWrapper.style.opacity = '0';
          setTimeout(() => {
            loaderWrapper.style.display = 'none';
          }, 500);
        } else {
          console.log('error: not logged in');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const uploadData = function () {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${BASE_BACKEND_URL}/userdata/set-account-data`, {
          method: 'POST', // Specify the HTTP method as POST
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ account: account }) // Set the request body here
        })
          .then(response => response.json())
          .then(data => {
            console.log('data sent');
          });
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    setButtonText(editMode ? 'Edit Information' : 'Save Information');
    if (!editMode) {
      nameRef.current.focus();
    } else {
      uploadData();
    }
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleClickOutsidePopup = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsShowingProfilePicturePopup(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="loader-wrapper">
        <span className="loader"><span className="loader-inner"></span></span>
      </div>
      {isShowingProfilePicturePopup &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={handleClickOutsidePopup}
        >
          <div ref={popupRef}>
            <ProfilePicturePopup
              isShowingProfilePicturePopup={isShowingProfilePicturePopup}
              onClose={() => setIsShowingProfilePicturePopup(false)}
            />
          </div>
        </div>}
      <NavBar isFixedPage={false} />
      <div className="profile-container">
        <div className="profile-picture">
          <img className="profile-img" src={account.imageUrl} onClick={() => { setIsShowingProfilePicturePopup(!isShowingProfilePicturePopup) }} />
          <div className="profile-details">
            <div className='profile-name-display'> {account.username} </div>
            <div className='profile-email-display'> {account.email}</div>
            <div className='profile-role-display'> Role: {account.role} </div>
          </div>
        </div>

        <div className="profile-input-container">
          <div className="profile-input">
            <label className="profile-name-title" htmlFor="name"> Full Name </label>
            <input
              type="text"
              className="profile-name"
              id="name"
              placeholder="First Last"
              value={account.username}
              onChange={handleInputChange}
              readOnly={!editMode}
              style={{ pointerEvents: !editMode ? "none" : "auto" }}
              ref={nameRef}
            />
          </div>

          <div className="profile-input">
            <label className="profile-email-title" htmlFor="email"> Email </label>
            <input
              type="email"
              className="profile-email"
              id="email"
              value={account.email}
              placeholder="example@example.com"
              onChange={handleInputChange}
              readOnly={!editMode}
              style={{ pointerEvents: !editMode ? "none" : "auto" }}
            />
          </div>

          <div className="profile-description-container">
            <label className="profile-description-title" htmlFor="message"> Description </label>
            <textarea
              className="profile-description"
              id="message"
              name="description"
              rows="5"
              placeholder="Write about yourself..."
              value={account.description}
              onChange={handleInputChange}
              readOnly={!editMode}
              style={{ pointerEvents: !editMode ? "none" : "auto" }}
            ></textarea>
          </div>

          <div className='profile-change-container'>
            <button className='profile-change'> Change Password </button>
            <button className='profile-change'> Request Role Change </button>
          </div>
        </div>

        <div className='profile-analytics'>
          <div className='profile-section-container'>
            <div className='profile-section-title'> Profile Created </div>
            <div className='profile-section-input'> {new Date(account.dateCreated).toLocaleDateString()} </div>
          </div>

          <div className="profile-section-container">
            <div className='profile-section-title'> Total Services Owned </div>
            <div className='profile-section-input'> {services.length || 0} </div>
          </div>

          <div className="profile-section-container">
            <div className='profile-section-title'> Total Services Applied </div>
            <div className='profile-section-input'> {applications.length || "loading..."} </div>
          </div>
        </div>

        <input type="button" className="profile-save-button"
          onClick={handleButtonClick}
          value={buttonText}
        />
        {editMode &&
          <input type="button" className="profile-save-button"
            onClick={() => { location.reload() }}
            value='cancel'
          />
        }
      </div>
      <Footer />
    </div>
  );
}

export default Profile;