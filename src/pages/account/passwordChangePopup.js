import React, { useRef, useEffect, useState } from 'react';
import './profile.css';

function PasswordChangePopup({ isShowingPasswordPopup, onClose }) {
  return (
    <div className="password-popup-container">
        <div className="pop-up-overlay"></div>
        <div className="password-popup-content">
            <div className='pop-up-content-title'> Enter Current Password </div>
            <div className='pop-up-password-container'>
                <input className="pop-up-old-password" type="password" placeholder="Old Password" />
                <a href="/forgot-password" className='pop-up-forgot-password'> Forgot Password? </a>
                <button className="pop-up-enter" onClick={onClose}>Enter</button>
                <button className="pop-up-cancel" onClick={onClose}>Cancel</button>
            </div>
      </div>
    </div>
  );
}

export default PasswordChangePopup;