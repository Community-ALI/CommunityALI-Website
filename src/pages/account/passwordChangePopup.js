import React, { useState } from 'react';
import './profile.css';
import { BASE_BACKEND_URL } from '../../config';

function PasswordChangePopup({ isShowingPasswordPopup, onClose }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordChangeSubmit = () => {
    // Ensure the new password and confirm new password match
    if (newPassword === confirmNewPassword) {
      
      const token = localStorage.getItem('token');
      if (token) {
        fetch(`${BASE_BACKEND_URL}/userdata/password-change-password`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ oldPassword: oldPassword, newPassword:newPassword })
        })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok'){
              alert('Password updated');
              window.location.reload();
            }
            else{
              alert(data.error);
            }
            
          });
          
      } else { 
      }
    } else {
      alert('New password and Confirm new password must match.');
    }
  };

  return (
    <div className="password-popup-container">
      <div className="pop-up-overlay"></div>
      <div className="password-popup-content">
        <div className='pop-up-content-title'> Enter Current Password </div>
        <div className='pop-up-password-container'>
          <input
            className="pop-up-old-password"
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
          <input
            className="pop-up-old-password"
            type="password"
            placeholder='New Password'
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <input
            className="pop-up-old-password"
            type="password"
            placeholder='Confirm New Password'
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />
          <a href="/forgot-password" className='pop-up-forgot-password'> Forgot Password? </a>
          <button className="pop-up-enter" onClick={handlePasswordChangeSubmit}>Enter</button>
          <button className="pop-up-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordChangePopup;
