import React, { useRef, Component, useEffect, useState } from 'react';
import '../../public/stylesheets/style.css';
import NavBar from './NavBar';
import './profile.css';
import Footer from "./Footer";
import {BASE_BACKEND_URL} from '../config'
import ProfilePicturePopup from './profilePicturePopup';
function Profile()
{
    const imageUrl = "photos-optimized/user-pic.png";
    const [account, setAccount] = useState({
      username: 'loading...',
      email: 'loading...',
      role: 'loading...'
    });
    const [services, setServices] = useState([]);
    const [applications, setApplications] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [buttonText, setButtonText] = useState('Edit Information');
    const [isShowingProfilePicturePopup, setIsShowingProfilePicturePopup] = useState(false);
    const [showUploader, setShowUploader] = useState(false);
    const nameRef = useRef(null);
    // services
    useEffect(() => {
        const fetchData = async () => {
          try {
            var token = localStorage.getItem('token');
            if (token) {
              const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-user-services`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                .then(response => response.json())
                .then(data => {
                  // 'data' variable will contain the received object with the data array and tokenUsername
                  setServices(data.dataServices);

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
      // applications
      useEffect(() => {
        const fetchData = async () => {
          try {
            var token = localStorage.getItem('token');
            if (token) {
              const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-user-applications`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                .then(response => response.json())
                .then(data => {
                  // 'data' variable will contain the received object with the data array and tokenUsername
                  setApplications(data.dataApplications);
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
    

      // account data
      useEffect(() => {
        const fetchData = async () => {
          try {
            var token = localStorage.getItem('token');
            if (token) {

              const response = await fetch(`${BASE_BACKEND_URL}/userdata/get-account`,
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                .then(response => response.json())
                .then(data => {
                  setAccount(data.dataAccount[0]);
                  console.log(data.dataAccount[0]);
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
    
    return(
      
        <div className="profile-page">
            {isShowingProfilePicturePopup && <ProfilePicturePopup isShowingProfilePicturePopup={isShowingProfilePicturePopup} />}
            <NavBar isFixedPage={false}/>
            <div className="profile-container">
                <div className="profile-picture">
                    <img className="profile-img" src={imageUrl} onClick={()=>{setIsShowingProfilePicturePopup(!isShowingProfilePicturePopup)}}/>
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
                            value={account.name}
                            readOnly={!editMode} // Set the readOnly attribute based on the value of editMode
                            style={{ pointerEvents: !editMode ? "none" : "auto" }} // Disable pointer events when editMode is false

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
                            readOnly={!editMode} // Set the readOnly attribute based on the value of editMode
                            style={{ pointerEvents: !editMode ? "none" : "auto" }} // Disable pointer events when editMode is false
                            />
                            
                    </div>

                    <div className="profile-description-container">
                        <label className="profile-description-title" htmlFor="message"> Description </label>
                        <textarea className="profile-description" rows="5" placeholder="Write about yourself..."
                        readOnly={!editMode} // Set the readOnly attribute based on the value of editMode
                        style={{ pointerEvents: !editMode ? "none" : "auto" }} // Disable pointer events when editMode is false
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
                        <div className='profile-section-input'> {account.dateCreated} </div>
                    </div>

                    <div className="profile-section-container">
                        <div className='profile-section-title'> Total Services Owned </div>
                        <div className='profile-section-input'> {services.length || 'loading...'}</div>
                    </div>

                    <div className="profile-section-container">
                        <div className='profile-section-title'> Total Services Applied </div>
                        <div className='profile-section-input'> {applications.length || "loading..."}</div>
                    </div>
                </div>

                <input type="button" className="profile-save-button" 
                    value="Save Changes">
                </input>
            </div>

            <Footer />
        </div>
    )
}

export default Profile;