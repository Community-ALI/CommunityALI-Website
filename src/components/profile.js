import React, { useRef, Component, useEffect, useState } from 'react';
import '../../public/stylesheets/style.css';
import NavBar from './NavBar';
import './profile.css';
import Footer from "./Footer";

function Profile()
{
    const imageUrl = "photos-optimized/user-pic.png";

    return(
        <div className="profile-page">
            <NavBar isFixedPage={false}/>
            <div className="profile-container">
                <div className="profile-picture">
                    <img className="profile-img" src={imageUrl}/>
                    <div className="profile-details">
                        <div className='profile-name-display'> Adrean Cajigas </div>
                        <div className='profile-email-display'> adrean.cajigas@gmail.com </div>
                        <div className='profile-role-display'> Role: Service Admin </div>
                    </div>
                </div>

                <div class="profile-input-container">
                    <div class="profile-input">
                        <label class="profile-name-title" for="name"> Full Name </label>
                        <input
                            type="text"
                            class="profile-name"
                            id="name"
                            placeholder="Adrean Cajigas" />
                    </div>

                    <div class="profile-input">
                        <label class="profile-email-title" for="email"> Email </label>
                        <input
                            type="email"
                            class="profile-email"
                            id="email"
                            placeholder="adrean.cajigas@gmail.com" />
                    </div>

                    <div class="profile-description-container">
                        <label class="profile-description-title" for="message"> Description </label>
                        <textarea class="profile-description" rows="5" placeholder="Write about yourself..."></textarea>
                    </div>

                    <div className='profile-change-container'>
                        <button className='profile-change'> Change Password </button>
                        <button className='profile-change'> Request for Role Change </button>
                    </div>
                </div>

                <div className='profile-analytics'>
                    <div className='profile-section-container'>
                        <div className='profile-section-title'> Profile Created </div>
                        <div className='profile-section-input'> 1/10/2023 </div>
                    </div>

                    <div className="profile-section-container">
                        <div className='profile-section-title'> Total Services Owned </div>
                        <div className='profile-section-input'> 3</div>
                    </div>

                    <div className="profile-section-container">
                        <div className='profile-section-title'> Total Services Applied </div>
                        <div className='profile-section-input'> 12</div>
                    </div>
                </div>

                <input type="button" class="profile-save-button" 
                    value="Save Changes">
                </input>
            </div>

            <Footer />
        </div>
    )
}

export default Profile;